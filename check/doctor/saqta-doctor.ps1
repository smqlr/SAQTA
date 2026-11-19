<#
SAQTA Доктор для Windows — «спроси устройство»: ноутбук сам рассказывает о батарее, диске и памяти.
Читает только железо. Файлы, имена пользователя и компьютера не трогает, ничего не стирает и не меняет.

  powershell -ExecutionPolicy Bypass -File saqta-doctor.ps1                      паспорт в хабе SAQTA (сайт)
  powershell -ExecutionPolicy Bypass -File saqta-doctor.ps1 -App D:\saqta.html   офлайн-файл с флешки
  powershell -ExecutionPolicy Bypass -File saqta-doctor.ps1 -NoOpen              только напечатать ссылку
  powershell -ExecutionPolicy Bypass -File saqta-doctor.ps1 -Json                только паспорт в JSON
  powershell -ExecutionPolicy Bypass -File saqta-doctor.ps1 -FullSerial          серийный номер целиком

Батарея: WMI root\wmi (BatteryStaticData, BatteryFullChargedCapacity, BatteryCycleCount),
запасной путь — powercfg /batteryreport /xml. Диск: Get-PhysicalDisk и счётчики надёжности
(износ и часы работы Windows отдаёт только администратору). Формат паспорта — check/README.md.
Работает в Windows PowerShell 5.1 и PowerShell 7.
#>
param(
  [string]$App = 'https://smqlr.github.io/SAQTA/',
  [switch]$NoOpen,
  [switch]$Json,
  [switch]$FullSerial
)
$ErrorActionPreference = 'Stop'
if ($env:SAQTA_MOCKS) { . $env:SAQTA_MOCKS } # для тестов: подмена Get-CimInstance и других команд
$sw = [Diagnostics.Stopwatch]::StartNew()

function Get-Cim([string]$Ns, [string]$Cls) {
  try { return @(Get-CimInstance -Namespace $Ns -ClassName $Cls -ErrorAction Stop) } catch { return @() }
}
function Get-FirstNumber($Objs, [string]$Prop) {
  foreach ($o in $Objs) {
    $v = $o.$Prop
    if ($null -ne $v -and [double]$v -gt 0) { return [long]$v }
  }
  return $null
}
function Get-Text($v) {
  if ($null -eq $v) { return $null }
  $t = "$v".Trim()
  if ($t) { return $t }
  return $null
}

# ── Батарея: чип отдаёт заводскую и текущую ёмкость и число циклов ─────────
$battery = $null
$static = Get-Cim 'root\wmi' 'BatteryStaticData'
$design = Get-FirstNumber $static 'DesignedCapacity'
$full = Get-FirstNumber (Get-Cim 'root\wmi' 'BatteryFullChargedCapacity') 'FullChargedCapacity'
$cycles = Get-FirstNumber (Get-Cim 'root\wmi' 'BatteryCycleCount') 'CycleCount'
$chip = $null
if ($static.Count -gt 0) { $chip = Get-Text ("{0} {1}" -f $static[0].ManufactureName, $static[0].DeviceName) }
$src = 'wmi'
if (-not $design -or -not $full) {
  # Запасной путь: отчёт о батарее Windows в XML
  $tmp = Join-Path $env:TEMP ("saqta-battery-{0}.xml" -f $PID)
  try {
    & powercfg /batteryreport /output $tmp /xml | Out-Null
    [xml]$x = Get-Content -LiteralPath $tmp -Raw -Encoding UTF8
    $b = @($x.BatteryReport.Batteries.Battery)[0]
    if ($b -and [long]$b.DesignCapacity -gt 0) {
      $design = [long]$b.DesignCapacity
      $full = [long]$b.FullChargeCapacity
      if ([long]$b.CycleCount -gt 0) { $cycles = [long]$b.CycleCount }
      $chip = Get-Text ("{0} {1}" -f $b.Manufacturer, $b.Id)
      $src = 'batteryreport'
    }
  } catch { } finally { Remove-Item -LiteralPath $tmp -ErrorAction SilentlyContinue }
}
if ($design -and $full) {
  $battery = [ordered]@{ unit = 'mWh'; design = $design; full = $full; cycles = $cycles; chip = $chip; cellsMv = @(); qmax = @(); tMaxC = $null; tMinC = $null; pf = $null; src = $src }
}

# ── Устройство: модель, процессор, память, серийный номер (по умолчанию — последние 4 знака) ──
$cs = @(Get-Cim 'root\cimv2' 'Win32_ComputerSystem') | Select-Object -First 1
$csp = @(Get-Cim 'root\cimv2' 'Win32_ComputerSystemProduct') | Select-Object -First 1
$bios = @(Get-Cim 'root\cimv2' 'Win32_BIOS') | Select-Object -First 1
$cpuInfo = @(Get-Cim 'root\cimv2' 'Win32_Processor') | Select-Object -First 1
$osInfo = @(Get-Cim 'root\cimv2' 'Win32_OperatingSystem') | Select-Object -First 1
$encl = @(Get-Cim 'root\cimv2' 'Win32_SystemEnclosure') | Select-Object -First 1
$vendor = if ($cs) { Get-Text $cs.Manufacturer } else { $null }
$model = if ($cs) { Get-Text $cs.Model } else { $null }
if ($vendor -match '^LENOVO' -and $csp -and (Get-Text $csp.Version)) { $model = '{0} ({1})' -f (Get-Text $csp.Version), $model }
$ramBytes = 0
foreach ($m in (Get-Cim 'root\cimv2' 'Win32_PhysicalMemory')) { $ramBytes += [double]$m.Capacity }
if ($ramBytes -le 0 -and $cs) { $ramBytes = [double]$cs.TotalPhysicalMemory }
$ramGB = if ($ramBytes -gt 0) { [int][math]::Round($ramBytes / 1GB) } else { $null }
$kind = 'laptop'
if ($encl -and (@($encl.ChassisTypes) | Where-Object { @(3, 4, 5, 6, 7, 13, 15, 16, 35, 36) -contains [int]$_ })) { $kind = 'desktop' }
$serial = if ($bios) { Get-Text $bios.SerialNumber } else { $null }
if ($serial -and -not $FullSerial -and $serial.Length -gt 4) { $serial = '...' + $serial.Substring($serial.Length - 4) }
$osName = if ($osInfo) { Get-Text $osInfo.Caption } else { 'Windows' }
$cpuName = if ($cpuInfo) { Get-Text $cpuInfo.Name } else { $null }

# ── Диски: здоровье по SMART (Healthy / Warning / Unhealthy), износ и часы — если Windows отдаёт ──
$disks = @()
try {
  foreach ($pd in @(Get-PhysicalDisk -ErrorAction Stop)) {
    $busRaw = "$($pd.BusType)"
    if ($busRaw -eq 'USB' -or $busRaw -eq '7') { continue } # флешку Доктора и внешние диски не считаем
    $bus = switch ($busRaw) { 'NVMe' { 'nvme' } '17' { 'nvme' } 'SATA' { 'sata' } '11' { 'sata' } default { $busRaw.ToLower() } }
    $h = "$($pd.HealthStatus)"
    $smart = 'unknown'
    if ($h -eq 'Healthy' -or $h -eq '0') { $smart = 'ok' } elseif ($h -eq 'Warning' -or $h -eq 'Unhealthy' -or $h -eq '1' -or $h -eq '2') { $smart = 'fail' }
    $wear = $null; $hours = $null
    try {
      $rc = $pd | Get-StorageReliabilityCounter -ErrorAction Stop
      if ($null -ne $rc.Wear) { $wear = [int]$rc.Wear }
      if ($null -ne $rc.PowerOnHours) { $hours = [long]$rc.PowerOnHours }
    } catch { }
    $disks += , ([ordered]@{ model = (Get-Text $pd.FriendlyName); bus = $bus; gb = [long][math]::Round([double]$pd.Size / 1e9); smart = $smart; wearPct = $wear; hours = $hours })
  }
} catch { }

$ms = [int]$sw.Elapsed.TotalMilliseconds
$passport = [ordered]@{
  saqta = 1
  tool = "saqta-doctor.ps1 1.0 · $osName"
  ms = $ms
  device = [ordered]@{ kind = $kind; vendor = $vendor; model = $model; cpu = $cpuName; ramGB = $ramGB; serial = $serial; os = $osName; lock = $null }
  battery = $battery
  disks = $disks
}
$jsonText = ConvertTo-Json -InputObject $passport -Depth 6 -Compress
if ($Json) { Write-Output $jsonText; return }

$b64 = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes($jsonText)).TrimEnd('=').Replace('+', '-').Replace('/', '_')
if ($App -match '^(https?|file):') { $base = $App } else {
  if (-not (Test-Path -LiteralPath $App)) { Write-Error "Нет файла приложения: $App"; exit 2 }
  $base = ([Uri](Resolve-Path -LiteralPath $App).ProviderPath).AbsoluteUri
}
$base = $base.Split('#')[0]
$link = "$base#hub/doctor=$b64"

Write-Output ("SAQTA Доктор · {0} {1}" -f $vendor, $model).Trim()
if ($battery) {
  $soh = [int][math]::Round($full * 100.0 / $design)
  $line = "  Батарея: здоровье $soh% ($full из $design мВт·ч)"
  if ($cycles) { $line += ", циклов: $cycles" }
  if ($chip) { $line += ", чип $chip" }
  Write-Output $line
} else { Write-Output '  Батарея: нет (системный блок или чип не ответил)' }
foreach ($d in $disks) {
  $st = switch ($d.smart) { 'ok' { 'в норме' } 'fail' { 'СБОЙ' } default { 'нет данных' } }
  $extra = ''
  if ($null -ne $d.wearPct) { $extra += ", износ $($d.wearPct)%" }
  if ($null -ne $d.hours) { $extra += ", $($d.hours) ч" }
  Write-Output "  Диск: $($d.model), SMART: $st$extra"
}
Write-Output "  Прочитано за $ms мс"
Write-Output ''
Write-Output 'Ссылка для хаба SAQTA:'
Write-Output $link
if (-not $NoOpen) {
  if ($base -like 'file:*') {
    # Windows отрезает #… у файловых ссылок — копируем ссылку, хаб примет её в «Спроси устройство»
    try { Set-Clipboard -Value $link; Write-Output 'Ссылка скопирована: хаб → «Спроси устройство» → вставить.' } catch { }
    Start-Process $base
  } else { Start-Process $link }
}
