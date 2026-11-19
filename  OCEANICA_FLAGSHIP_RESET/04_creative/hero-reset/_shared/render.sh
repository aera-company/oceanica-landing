#!/bin/zsh
# Renderiza os tres key visuals (desktop 1920x1080 @2x, mobile 390x844 @3x, renderizado em 780x1688 @1.5 porque o Chrome headless nao aceita janela menor que 500 px). Uso: _shared/render.sh
cd "$(dirname "$0")/.."
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
for k in kv1 kv2 kv3; do
  K=$(echo $k | tr a-z A-Z)
  "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=2 --window-size=1920,1080 --virtual-time-budget=4000 --screenshot="$PWD/$k/_d.png" "file://$PWD/$k/$k.html" 2>/dev/null
  "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1.5 --window-size=780,1688 --virtual-time-budget=4000 --screenshot="$PWD/$k/_m.png" "file://$PWD/$k/$k.html" 2>/dev/null
  python3 -c "
from PIL import Image
Image.open('$k/_d.png').convert('RGB').save('$k/${K}_still.jpg',quality=92)
Image.open('$k/_m.png').convert('RGB').save('$k/${K}_mobile.jpg',quality=90)"
  rm -f $k/_d.png $k/_m.png
done
ls -la kv*/KV*.jpg
