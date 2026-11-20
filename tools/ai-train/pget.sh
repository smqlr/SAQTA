#!/usr/bin/env bash
# Параллельная докачка большого файла кусками (curl -r), потом склейка
# pget.sh <url> <out> <size> <parts>
url=$1; out=$2; size=$3; parts=${4:-8}
chunk=$(( (size + parts - 1) / parts ))
for ((i=0; i<parts; i++)); do
  from=$(( i * chunk )); to=$(( from + chunk - 1 )); (( to >= size )) && to=$(( size - 1 ))
  curl -sS --retry 3 -r $from-$to -o "$out.part$i" "$url" &
done
wait
: > "$out"
for ((i=0; i<parts; i++)); do cat "$out.part$i" >> "$out"; rm -f "$out.part$i"; done
ls -la "$out"
