#!/bin/sh
# SAQTA Доктор — «спроси устройство»: ноутбук сам рассказывает о батарее, диске и памяти.
# Читает только железо. Файлы, имена пользователя и компьютера не трогает, ничего не стирает и не меняет.
#
#   sh saqta-doctor.sh                       открыть паспорт в хабе SAQTA (сайт)
#   sh saqta-doctor.sh --app /путь/saqta.html открыть в офлайн-файле с флешки
#   sh saqta-doctor.sh --no-open             только напечатать ссылку
#   sh saqta-doctor.sh --json                только паспорт в JSON
#   sh saqta-doctor.sh --full-serial         серийный номер целиком (по умолчанию — последние 4 знака)
#
# macOS: ioreg (газомер батареи), system_profiler (модель, память, SSD и SMART, блокировка активации).
# Linux, в том числе загрузочная флешка: /sys/class/power_supply, /sys/class/dmi, /proc, smartctl (если есть).
# Формат паспорта — check/README.md.
set -u

APP_URL='https://smqlr.github.io/Unknown-app/'
OPEN=1
JSON_ONLY=0
FULL_SERIAL=0
while [ $# -gt 0 ]; do
  case "$1" in
    --app) APP_URL=${2:-}; shift 2 ;;
    --no-open) OPEN=0; shift ;;
    --json) JSON_ONLY=1; OPEN=0; shift ;;
    --full-serial) FULL_SERIAL=1; shift ;;
    -h|--help) sed -n '2,13p' "$0"; exit 0 ;;
    *) echo "Неизвестный параметр: $1 (см. --help)" >&2; exit 2 ;;
  esac
done

now_ms() {
  t=$(date +%s%3N 2>/dev/null)
  case "$t" in
    *N*|'') perl -MTime::HiRes=time -e 'printf "%d", time*1000' 2>/dev/null || echo "$(( $(date +%s) * 1000 ))" ;;
    *) echo "$t" ;;
  esac
}
START=$(now_ms)

# ── JSON без внешних программ ───────────────────────────────────────────────
jstr() {
  if [ -z "${1:-}" ]; then printf 'null'; return; fi
  printf '"%s"' "$(printf '%s' "$1" | tr -d '\000-\037' | sed 's/\\/\\\\/g; s/"/\\"/g')"
}
jnum() {
  case "${1:-}" in
    ''|*[!0-9.-]*|-|.) printf 'null' ;;
    *) printf '%s' "$1" ;;
  esac
}
jarr() {
  out=''
  for v in ${1:-}; do
    case "$v" in ''|*[!0-9-]*) continue ;; esac
    out="${out:+$out,}$v"
  done
  printf '[%s]' "$out"
}
mask() {
  s=${1:-}
  if [ -z "$s" ] || [ "$FULL_SERIAL" = 1 ] || [ ${#s} -le 4 ]; then printf '%s' "$s"; return; fi
  printf '...%s' "$(printf '%s' "$s" | tail -c 4)"
}
trim() { printf '%s' "${1:-}" | sed 's/^[[:space:]]*//; s/[[:space:]]*$//'; }

BAT=null
DISKS=''
VENDOR='' MODEL='' CPU='' RAM='' SERIAL='' OSNAME='' LOCK='' KIND=laptop
B_DESIGN='' B_FULL='' B_UNIT='' B_CYCLES='' B_CHIP='' B_CELLS='' B_QMAX='' B_TMAX='' B_TMIN='' B_PF='' B_SRC=''

# ── macOS ───────────────────────────────────────────────────────────────────
mac() {
  T=$(mktemp -d 2>/dev/null || mktemp -d -t saqta) || exit 1
  # plutil печатает ошибку в stdout, поэтому смотрим на код возврата
  pl() { v=$(plutil -extract "$2" raw -o - "$1" 2>/dev/null) && printf '%s' "$v"; }
  ints() { plutil -extract "$2" xml1 -o - "$1" 2>/dev/null | sed -n 's:.*<integer>\(-\{0,1\}[0-9]*\)</integer>.*:\1:p' | tr '\n' ' '; }

  ioreg -r -c AppleSmartBattery -a > "$T/b.plist" 2>/dev/null
  if [ -s "$T/b.plist" ] && [ "$(pl "$T/b.plist" 0.BatteryInstalled)" = true ]; then
    B_SRC=ioreg
    B_UNIT=mAh
    B_DESIGN=$(pl "$T/b.plist" 0.DesignCapacity)
    B_FULL=$(pl "$T/b.plist" 0.AppleRawMaxCapacity)
    [ -n "$B_FULL" ] || B_FULL=$(pl "$T/b.plist" 0.NominalChargeCapacity)
    if [ -z "$B_FULL" ]; then
      m=$(pl "$T/b.plist" 0.MaxCapacity) # у Intel-маков это мА·ч, у Apple Silicon — проценты
      [ -n "$m" ] && [ "$m" -gt 100 ] 2>/dev/null && B_FULL=$m
    fi
    B_CYCLES=$(pl "$T/b.plist" 0.CycleCount)
    B_CHIP=$(pl "$T/b.plist" 0.DeviceName)
    B_PF=$(pl "$T/b.plist" 0.PermanentFailureStatus)
    B_CELLS=$(ints "$T/b.plist" 0.BatteryData.CellVoltage)
    B_QMAX=$(ints "$T/b.plist" 0.BatteryData.Qmax)
    B_TMAX=$(pl "$T/b.plist" 0.BatteryData.LifetimeData.MaximumTemperature)
    B_TMIN=$(pl "$T/b.plist" 0.BatteryData.LifetimeData.MinimumTemperature)
  fi

  system_profiler SPHardwareDataType -xml > "$T/h.plist" 2>/dev/null
  VENDOR=Apple
  name=$(pl "$T/h.plist" 0._items.0.machine_name)
  ident=$(pl "$T/h.plist" 0._items.0.machine_model)
  MODEL="$name${ident:+ ($ident)}"
  case "$name" in *Book*) KIND=laptop ;; '') KIND=laptop ;; *) KIND=desktop ;; esac
  CPU=$(pl "$T/h.plist" 0._items.0.chip_type)
  [ -n "$CPU" ] || CPU=$(pl "$T/h.plist" 0._items.0.cpu_type)
  RAM=$(pl "$T/h.plist" 0._items.0.physical_memory | sed -n 's/^\([0-9][0-9]*\) GB.*/\1/p')
  SERIAL=$(pl "$T/h.plist" 0._items.0.serial_number)
  case "$(pl "$T/h.plist" 0._items.0.activation_lock_status)" in
    *enabled*) LOCK=enabled ;;
    *disabled*) LOCK=disabled ;;
  esac
  OSNAME="macOS $(sw_vers -productVersion 2>/dev/null)"

  for TYPE in SPNVMeDataType SPSerialATADataType; do
    system_profiler "$TYPE" -xml > "$T/d.plist" 2>/dev/null || continue
    case $TYPE in SPNVMeDataType) bus=nvme ;; *) bus=sata ;; esac
    c=0
    while [ $c -lt 4 ]; do
      i=0
      while [ $i -lt 4 ]; do
        k="0._items.$c._items.$i"
        dn=$(pl "$T/d.plist" "$k._name")
        [ -n "$dn" ] || break
        bytes=$(pl "$T/d.plist" "$k.size_in_bytes")
        gb=''
        [ -n "$bytes" ] && gb=$(awk -v b="$bytes" 'BEGIN { printf "%d", b / 1e9 + 0.5 }')
        case "$(pl "$T/d.plist" "$k.smart_status")" in
          Verified) smart=ok ;;
          Failing|*ail*) smart=fail ;;
          *) smart=unknown ;;
        esac
        d="{\"model\":$(jstr "$dn"),\"bus\":\"$bus\",\"gb\":$(jnum "$gb"),\"smart\":\"$smart\",\"wearPct\":null,\"hours\":null}"
        DISKS="${DISKS:+$DISKS,}$d"
        i=$((i + 1))
      done
      [ $i -eq 0 ] && break
      c=$((c + 1))
    done
  done
  rm -rf "$T"
}

# ── Linux (и загрузочная флешка) ────────────────────────────────────────────
# SAQTA_ROOT — подмена корня для тестов: $SAQTA_ROOT/sys, $SAQTA_ROOT/proc, $SAQTA_ROOT/etc
linux() {
  R=${SAQTA_ROOT:-}
  rd() { [ -r "$1" ] && head -n 1 "$1" 2>/dev/null | tr -d '\r'; }
  for B in "$R"/sys/class/power_supply/BAT* "$R"/sys/class/power_supply/battery; do
    [ -d "$B" ] || continue
    B_SRC=sysfs
    if [ -r "$B/energy_full_design" ]; then
      B_UNIT=mWh
      B_DESIGN=$(awk -v v="$(rd "$B/energy_full_design")" 'BEGIN { printf "%d", v / 1000 }')
      B_FULL=$(awk -v v="$(rd "$B/energy_full")" 'BEGIN { printf "%d", v / 1000 }')
    elif [ -r "$B/charge_full_design" ]; then
      B_UNIT=mAh
      B_DESIGN=$(awk -v v="$(rd "$B/charge_full_design")" 'BEGIN { printf "%d", v / 1000 }')
      B_FULL=$(awk -v v="$(rd "$B/charge_full")" 'BEGIN { printf "%d", v / 1000 }')
    fi
    B_CYCLES=$(rd "$B/cycle_count")
    [ "$B_CYCLES" = 0 ] && B_CYCLES='' # многие прошивки пишут 0, когда счётчика нет
    B_CHIP=$(trim "$(rd "$B/manufacturer") $(rd "$B/model_name")")
    break
  done
  [ "${B_DESIGN:-0}" = 0 ] && B_DESIGN='' && B_FULL='' && B_SRC=''

  dmi="$R/sys/class/dmi/id"
  VENDOR=$(trim "$(rd "$dmi/sys_vendor")")
  prod=$(trim "$(rd "$dmi/product_name")")
  ver=$(trim "$(rd "$dmi/product_version")")
  case "$VENDOR" in LENOVO|Lenovo) MODEL="${ver:-$prod}${ver:+ ($prod)}" ;; *) MODEL=$prod ;; esac
  SERIAL=$(trim "$(rd "$dmi/product_serial")")
  case "$(rd "$dmi/chassis_type")" in 8|9|10|14|31|32) KIND=laptop ;; 3|4|5|6|7|13|15|16|35|36) KIND=desktop ;; esac
  CPU=$(trim "$(sed -n 's/^model name[[:space:]]*:[[:space:]]*//p' "$R/proc/cpuinfo" 2>/dev/null | head -n 1)")
  RAM=$(awk '/^MemTotal:/ { printf "%d", $2 / 1048576 + 0.5 }' "$R/proc/meminfo" 2>/dev/null)
  OSNAME=$(sed -n 's/^PRETTY_NAME="\{0,1\}\([^"]*\)"\{0,1\}$/\1/p' "$R/etc/os-release" 2>/dev/null | head -n 1)
  [ -n "$OSNAME" ] || OSNAME=Linux

  for d in "$R"/sys/block/*; do
    [ -d "$d" ] || continue
    name=${d##*/}
    case "$name" in loop*|ram*|zram*|sr*|dm-*|md*|fd*|mmcblk*boot*) continue ;; esac
    [ "$(rd "$d/removable")" = 1 ] && continue # флешку SAQTA Доктора не считаем
    model=$(trim "$(rd "$d/device/model")")
    sectors=$(rd "$d/size")
    gb=''
    [ -n "$sectors" ] && gb=$(awk -v s="$sectors" 'BEGIN { printf "%d", s * 512 / 1e9 + 0.5 }')
    case "$name" in nvme*) bus=nvme ;; mmcblk*) bus=emmc ;; *) bus=sata ;; esac
    smart=unknown wear='' hours=''
    if command -v smartctl >/dev/null 2>&1; then
      out=$(smartctl -H -A "/dev/$name" 2>/dev/null)
      case "$out" in
        *PASSED*|*"SMART Health Status: OK"*) smart=ok ;;
        *FAILED*) smart=fail ;;
      esac
      wear=$(printf '%s\n' "$out" | sed -n 's/^Percentage Used:[[:space:]]*\([0-9]*\)%.*/\1/p' | head -n 1)
      hours=$(printf '%s\n' "$out" | sed -n 's/^Power On Hours:[[:space:]]*\([0-9,]*\).*/\1/p' | tr -d ',' | head -n 1)
      [ -n "$hours" ] || hours=$(printf '%s\n' "$out" | awk '$2 == "Power_On_Hours" { print $10; exit }' | sed 's/[^0-9].*//')
    fi
    d="{\"model\":$(jstr "$model"),\"bus\":\"$bus\",\"gb\":$(jnum "$gb"),\"smart\":\"$smart\",\"wearPct\":$(jnum "$wear"),\"hours\":$(jnum "$hours")}"
    DISKS="${DISKS:+$DISKS,}$d"
  done
}

case "${SAQTA_OS:-$(uname -s)}" in
  Darwin) mac ;;
  *) linux ;;
esac

if [ -n "$B_DESIGN" ] && [ -n "$B_FULL" ] && [ "$B_DESIGN" -gt 0 ] 2>/dev/null; then
  BAT="{\"unit\":\"$B_UNIT\",\"design\":$(jnum "$B_DESIGN"),\"full\":$(jnum "$B_FULL"),\"cycles\":$(jnum "$B_CYCLES"),\"chip\":$(jstr "$B_CHIP"),\"cellsMv\":$(jarr "$B_CELLS"),\"qmax\":$(jarr "$B_QMAX"),\"tMaxC\":$(jnum "$B_TMAX"),\"tMinC\":$(jnum "$B_TMIN"),\"pf\":$(jnum "$B_PF"),\"src\":\"$B_SRC\"}"
fi
MS=$(( $(now_ms) - START ))
JSON="{\"saqta\":1,\"tool\":$(jstr "saqta-doctor.sh 1.0 · $OSNAME"),\"ms\":$MS,\"device\":{\"kind\":\"$KIND\",\"vendor\":$(jstr "$VENDOR"),\"model\":$(jstr "$MODEL"),\"cpu\":$(jstr "$CPU"),\"ramGB\":$(jnum "$RAM"),\"serial\":$(jstr "$(mask "$SERIAL")"),\"os\":$(jstr "$OSNAME"),\"lock\":$(jstr "$LOCK")},\"battery\":$BAT,\"disks\":[$DISKS]}"

if [ "$JSON_ONLY" = 1 ]; then
  printf '%s\n' "$JSON"
  exit 0
fi

B64=$(printf '%s' "$JSON" | base64 | tr '+/' '-_' | tr -d '=\n')
case "$APP_URL" in
  http://*|https://*|file:*) BASE=$APP_URL ;;
  *)
    if [ ! -f "$APP_URL" ]; then echo "Нет файла приложения: $APP_URL" >&2; exit 2; fi
    BASE="file://$(cd "$(dirname "$APP_URL")" && pwd)/$(basename "$APP_URL")"
    BASE=$(printf '%s' "$BASE" | sed 's/ /%20/g')
    ;;
esac
LINK="${BASE%%#*}#hub/doctor=$B64"

echo "SAQTA Доктор · ${VENDOR:+$VENDOR }$MODEL"
if [ "$BAT" != null ]; then
  soh=$(awk -v f="$B_FULL" -v d="$B_DESIGN" 'BEGIN { printf "%d", f * 100 / d + 0.5 }')
  unit_ru=$( [ "$B_UNIT" = mAh ] && echo 'мА·ч' || echo 'мВт·ч' )
  echo "  Батарея: здоровье $soh% ($B_FULL из $B_DESIGN $unit_ru)${B_CYCLES:+, циклов: $B_CYCLES}${B_CHIP:+, чип $B_CHIP}"
  [ -n "$B_CELLS" ] && echo "  Группы ячеек, мВ: $B_CELLS"
  [ -n "$B_PF" ] && [ "$B_PF" != 0 ] && echo "  Внимание: аварийный флаг чипа — пакет не вскрывать"
else
  echo "  Батарея: нет (системный блок или чип не ответил)"
fi
[ -n "$DISKS" ] && printf '%s\n' "$DISKS" | tr '}' '\n' | sed -n 's/.*"model":"\([^"]*\)".*"smart":"\([a-z]*\)".*/  Диск: \1, SMART: \2/p' | sed 's/SMART: ok$/SMART: в норме/; s/SMART: fail$/SMART: СБОЙ/; s/SMART: unknown$/SMART: нет данных (запустите от root)/'
[ "$LOCK" = enabled ] && echo "  Блокировка активации включена: целым не продаём, только детали"
echo "  Прочитано за $MS мс"
echo
echo "Ссылка для хаба SAQTA:"
echo "$LINK"
if [ "$OPEN" = 1 ]; then
  if command -v open >/dev/null 2>&1 && [ "$(uname -s)" = Darwin ]; then open "$LINK"
  elif command -v xdg-open >/dev/null 2>&1; then xdg-open "$LINK" >/dev/null 2>&1 &
  else echo "Откройте ссылку в браузере или вставьте её в хабе: «Спроси устройство»."
  fi
fi
