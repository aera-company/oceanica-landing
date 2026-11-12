#!/bin/bash
# Render preview frames with headless Chrome. usage: concepts/hero/render.sh <concept number> [frames...]
cd "$(dirname "$0")/../.."
c=$1; shift; frames=${@:-1 2 3 4 m}
for f in $frames; do
  if [ "$f" = "m" ]; then w=390; h=844; mob=1; else w=1440; h=900; mob=0; fi
  SCRATCH="${SCRATCH:-/tmp}" SCROLL=0 MOBILE=$mob node scripts/cdp.mjs shot "file://$PWD/concepts/hero/c$c.html?f=$f" "concepts/hero/renders/c$c-$f.webp" $w $h >/dev/null 2>&1 &
done
wait
