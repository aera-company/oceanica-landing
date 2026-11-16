#!/bin/bash
# Animatic da Rota A v3 com trechos reais dos dois vídeos da Oceânica. Cortes secos, um plano por degrau.
# uso: ./build.sh [d|m]   d = 1920×1080 · m = 720×1280
cd "$(dirname "$0")"
V1=../../references/institutional-video/clips
V2=../../references/anniversary-47/clips
mode=${1:-d}
mkdir -p seg
G="huesaturation=saturation=-0.88:colors=b+c+m:strength=4,huesaturation=saturation=-0.55:colors=r:strength=2,eq=contrast=1.06:saturation=0.92"
# vídeo 2 vem em 1920×1012 (letterbox removido): amplia 6,7% e corta para 16:9
N2="scale=2049:1080,crop=1920:1080:64:0,fps=24000/1001"
crop(){ if [ "$mode" = m ]; then echo ",crop=608:1080:$1:0,scale=720:1280"; fi; }
enc="-an -c:v libx264 -crf 18 -preset medium -pix_fmt yuv420p -r 24000/1001"
ff(){ ffmpeg -nostdin -loglevel error -y "$@"; }
# seg <n> <arquivo> <filtro de entrada> <x do recorte mobile> <overlay> [-t dur]
seg(){
  local n=$1 src=$2 pre=$3 x=$4 ov=$5; shift 5
  ff "$@" -i "$src" -loop 1 -i ov/${mode}${ov}.png -filter_complex "[0]${pre}${G}$(crop $x),format=yuv420p[v];[v][1]overlay=shortest=1" $enc seg/${mode}${n}.mp4
}
seg 1 $V2/v2-28-claw-macro.mp4           "$N2,"                                         700 1 -t 3.0
seg 2 $V2/v2-27-pilot-manipulator.mp4     "$N2,"                                         420 2 -t 2.4
seg 3 $V1/s60-rov-suspended-lars.mp4      "setpts=1.5*PTS,framerate=fps=24000/1001,"     690 3
seg 4 $V1/s32-rov-entering-water.mp4      ""                                             660 4
seg 5 $V1/s34-sub-v-alongside-fpso.mp4    ""                                             800 5 -t 4.2
seg 6 $V2/v2-02-hull-bow-34-golden.mp4    "$N2,"                                         560 6 -t 2.8
# 7 · última imagem: desacelerada 1,6×, parada 2,6 s no fim; a folha 02 abre 1 s depois do corte
ff -i $V2/v2-15-vessel-sugarloaf.mp4 -loop 1 -i ov/${mode}7.png -loop 1 -i ov/${mode}8.png -filter_complex \
 "[0]$N2,setpts=1.6*PTS,framerate=fps=24000/1001,tpad=stop_mode=clone:stop_duration=2.6,${G}$(crop 506),format=yuv420p[v];[1]format=rgba,fade=out:st=1:d=0.6:alpha=1[a];[2]format=rgba,fade=in:st=1:d=0.6:alpha=1[b];[v][a]overlay=shortest=1[x];[x][b]overlay=shortest=1" $enc seg/${mode}7.mp4
printf "file '%s'\n" ${mode}1.mp4 ${mode}2.mp4 ${mode}3.mp4 ${mode}4.mp4 ${mode}5.mp4 ${mode}6.mp4 ${mode}7.mp4 > seg/${mode}.txt
out=animatic-route-a-v3.mp4; [ "$mode" = m ] && out=animatic-route-a-v3-mobile.mp4
ff -f concat -safe 0 -i seg/${mode}.txt -c copy -movflags +faststart $out
rm -rf seg
echo "$out $(ffprobe -v error -show_entries format=duration -of csv=p=0 $out) s"
