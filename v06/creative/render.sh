#!/bin/bash
# Renderiza os key visuals com Chrome headless. uso: ./render.sh <a|b|c> [quadros...]
cd "$(dirname "$0")"
CH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
c=$1; shift; frames=${@:-1 2 3 m}
for f in $frames; do
  if [ "$f" = "m" ]; then size=390,844; else size=1600,900; fi
  "$CH" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 --virtual-time-budget=6000 \
    --window-size=$size --screenshot="$PWD/concept-$c/frames/$f.png" "file://$PWD/concept-$c/index.html?f=$f" >/dev/null 2>&1
  python3 -c "from PIL import Image;im=Image.open('concept-$c/frames/$f.png').convert('RGB');im.save('concept-$c/frames/$f.jpg',quality=86)" && rm "concept-$c/frames/$f.png"
done
ls -la concept-$c/frames
