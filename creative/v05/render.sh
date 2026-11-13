#!/bin/bash
# Render the art-direction frames with headless Chrome. usage: creative/v05/render.sh <a|b|c> [frames...]
cd "$(dirname "$0")/../.."
c=$1; shift; frames=${@:-1 2 3 m}
mkdir -p "creative/v05/concept-$c/frames"
for f in $frames; do
  if [ "$f" = "m" ]; then w=390; h=844; mob=1; else w=1440; h=900; mob=0; fi
  SCRATCH="${SCRATCH:-/tmp}" SCROLL=0 MOBILE=$mob node scripts/cdp.mjs shot "file://$PWD/creative/v05/concept-$c/index.html?f=$f" "creative/v05/concept-$c/frames/$f.webp" $w $h >/dev/null 2>&1 &
done
wait
