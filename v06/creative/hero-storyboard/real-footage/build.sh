#!/bin/bash
# Monta o animatic da hero A2 com trechos reais do vídeo institucional. uso: ./build.sh [d|m]
cd "$(dirname "$0")"
C=../../references/institutional-video/clips
G="huesaturation=saturation=-0.88:colors=b+c+m:strength=4,huesaturation=saturation=-0.55:colors=r:strength=2,eq=contrast=1.06:saturation=0.92"
mode=${1:-d}
mkdir -p seg
if [ "$mode" = m ]; then W=720;H=1280; else W=1920;H=1080; fi
# recorte vertical por plano (x de início do recorte de 608 px sobre 1920 × 1080)
crop(){ if [ "$mode" = m ]; then echo "crop=608:1080:$1:0,scale=720:1280,"; fi; }
enc="-an -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p -r 24000/1001"
ff(){ ffmpeg -nostdin -loglevel error -y "$@"; }
# 01 · ROV suspenso no LARS · 2,25 s desacelerado 1,5× → 3,4 s
ff -i $C/s60-rov-suspended-lars.mp4 -loop 1 -i ov/${mode}1.png -filter_complex "[0]setpts=1.5*PTS,framerate=fps=24000/1001,$G,$(crop 690)format=yuv420p[v];[v][1]overlay=shortest=1" $enc seg/${mode}1.mp4
# 02 · ROV junto ao costado, equipe · primeiros 4,2 s
ff -t 4.2 -i $C/s72-rov-alongside-hull.mp4 -loop 1 -i ov/${mode}2.png -filter_complex "[0]$G,$(crop 740)format=yuv420p[v];[v][1]overlay=shortest=1" $enc seg/${mode}2.mp4
# 03 · o ROV entra na água · 4,3 s
ff -i $C/s32-rov-entering-water.mp4 -loop 1 -i ov/${mode}3.png -filter_complex "[0]$G,$(crop 660)format=yuv420p[v];[v][1]overlay=shortest=1" $enc seg/${mode}3.mp4
# 04 · Oceanicasub V junto ao FPSO · 4,75 s desacelerado 1,25× + 1,2 s parado; a folha 02 abre aos 3 s
ff -i $C/s34-sub-v-alongside-fpso.mp4 -loop 1 -i ov/${mode}4.png -loop 1 -i ov/${mode}5.png -filter_complex "[0]setpts=1.25*PTS,framerate=fps=24000/1001,tpad=stop_mode=clone:stop_duration=1.2,$G,$(crop 800)format=yuv420p[v];[2]format=rgba,fade=in:st=3:d=0.6:alpha=1[p5];[1]format=rgba,fade=out:st=3:d=0.6:alpha=1[p4];[v][p4]overlay=shortest=1[a];[a][p5]overlay=shortest=1" $enc seg/${mode}4.mp4
printf "file '%s'\n" ${mode}1.mp4 ${mode}2.mp4 ${mode}3.mp4 ${mode}4.mp4 > seg/${mode}.txt
out=animatic-real.mp4; [ "$mode" = m ] && out=animatic-real-mobile.mp4
ff -f concat -safe 0 -i seg/${mode}.txt -c copy -movflags +faststart $out
echo "$out $(ffprobe -v error -show_entries format=duration -of csv=p=0 $out) s"
