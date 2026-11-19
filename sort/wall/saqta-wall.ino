// SAQTA — сортировочная стена: свет над ящиками по командам из приложения хаба.
// ESP32-WROOM-32 + 12 полосок WS2812B по 8 светодиодов, соединённых последовательно (ящик N — светодиоды (N−1)×8 … N×8−1).
// Питание полосок — отдельный блок 5 В 2 А, общий минус с ESP32. Данные — GPIO 5 через резистор 330 Ом.
// Протокол (USB, 115200 бод, строка с '\n'):
//   L 5 11  — погасить прошлое и зажечь ящики 5 и 11 зелёным;  H 12 — добавить ящик 12 красным (батарея);  C — погасить;  T — тест.
// Библиотека: Adafruit NeoPixel (Arduino IDE → Управлять библиотеками).
// Статус: прототип для пилота, на железе ещё не проверен.

#include <Adafruit_NeoPixel.h>

const int PIN = 5;
const int BINS = 12;
const int PER_BIN = 8;
const uint8_t BRIGHT = 40; // ≈ 15% яркости: 3 горящих ящика берут меньше 0,5 А

Adafruit_NeoPixel strip(BINS * PER_BIN, PIN, NEO_GRB + NEO_KHZ800);
String line;

void fillBin(int bin, uint32_t color) {
  for (int i = 0; i < PER_BIN; i++) strip.setPixelColor((bin - 1) * PER_BIN + i, color);
}

void handle(String cmd) {
  cmd.trim();
  if (cmd.length() == 0) return;
  char op = cmd.charAt(0);
  if (op == 'C') { strip.clear(); strip.show(); Serial.println("OK"); return; }
  if (op == 'T') {
    for (int b = 1; b <= BINS; b++) { strip.clear(); fillBin(b, strip.Color(0, 180, 90)); strip.show(); delay(150); }
    strip.clear(); strip.show(); Serial.println("OK"); return;
  }
  if (op != 'L' && op != 'H') { Serial.println("ERR unknown command"); return; }
  uint32_t color = op == 'H' ? strip.Color(220, 30, 20) : strip.Color(0, 180, 90);
  if (op == 'L') strip.clear(); // новая вещь — гасим прошлые ящики; H добавляет красный к уже горящим
  int pos = 1;
  bool any = false;
  while (pos < (int)cmd.length()) {
    while (pos < (int)cmd.length() && cmd.charAt(pos) == ' ') pos++;
    int start = pos;
    while (pos < (int)cmd.length() && cmd.charAt(pos) != ' ') pos++;
    if (pos > start) {
      int bin = cmd.substring(start, pos).toInt();
      if (bin < 1 || bin > BINS) { Serial.println("ERR bin out of range"); return; }
      fillBin(bin, color);
      any = true;
    }
  }
  if (!any) { Serial.println("ERR no bins"); return; }
  strip.show();
  Serial.println("OK");
}

void setup() {
  Serial.begin(115200);
  strip.begin();
  strip.setBrightness(BRIGHT);
  strip.clear();
  strip.show();
}

void loop() {
  while (Serial.available()) {
    char c = (char)Serial.read();
    if (c == '\n') { handle(line); line = ""; }
    else if (c != '\r' && line.length() < 64) line += c;
  }
}
