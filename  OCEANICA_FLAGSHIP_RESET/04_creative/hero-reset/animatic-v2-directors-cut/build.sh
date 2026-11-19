#!/bin/zsh
# Institutional Director's Cut. Uso: ./build.sh   (gera A/B x EN/PT)
# Regras deste corte: velocidade real em todos os planos, sem zoom, sem fusao, sem tela preta. So cortes secos; so o texto tem fade.
cd "$(dirname "$0")"
V1=(../../../videos/*qzGU8XxzSTI*.mp4); V2=(../../../videos/*ao00*.mp4)
FPS=24000/1001
FIT="scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,setsar=1"
LOOK="eq=contrast=1.04"   # olhar comum, aplicado depois da correcao de cada fonte
G1="eq=saturation=0.70:gamma=1.04"                       # V1: tira a saturacao embutida
G2="eq=saturation=0.96"                                  # V2: quase intacto
seg(){ # nome fonte inicio dur grade
  if [[ $2 == V2 ]]; then   # 25 qps -> cada quadro exibido uma vez a 23,976 (4% mais lento, sem mistura de quadros)
    ffmpeg -v error -y -ss $3 -t $4 -i $V2 -vf "crop=1920:1012:0:34,$FIT,setpts=N/($FPS)/TB,$5,$LOOK,format=yuv420p" -r $FPS -an -c:v libx264 -crf 14 seg/$1.mp4
  else
    ffmpeg -v error -y -ss $3 -t $4 -i $V1 -vf "$FIT,$5,$LOOK,format=yuv420p" -r $FPS -an -c:v libx264 -crf 14 seg/$1.mp4
  fi
  echo "$1 $(ffprobe -v error -show_entries format=duration -of csv=p=0 seg/$1.mp4)"
}
if [[ -z $SKIP_SEG ]]; then
seg 01a_proa        V2 57.32 2.08 "$G2"
seg 01b_sub-ix      V2 4.96  3.00 "$G2"
seg 02_rov-agua     V1 86.10 4.15 "$G1"
seg 03a_rov-submerso V1 57.05 3.60 "eq=saturation=0.78:gamma=1.04"
seg 03b_mergulhador V2 75.05 2.20 "colorbalance=gs=-0.18:gm=-0.06:bs=0.06,eq=contrast=1.08:brightness=-0.05:saturation=0.92"
seg 04A_fpso        V1 94.35 4.60 "$G1"
seg 04B_mar-aberto  V1 210.40 2.78 "$G1"
fi
d(){ ffprobe -v error -show_entries format=duration -of csv=p=0 seg/$1.mp4 }
cut(){ # variante lingua
  local v=$1 l=$2 last; [[ $1 == A ]] && last=seg/04A_fpso.mp4 || last=seg/04B_mar-aberto.mp4
  local s1=$(( $(d 01a_proa)+$(d 01b_sub-ix) )) ; local s2=$(( s1+$(d 02_rov-agua) )); local s3=$(( s2+$(d 03a_rov-submerso)+$(d 03b_mergulhador) ))
  local T=$(( s3+$(ffprobe -v error -show_entries format=duration -of csv=p=0 $last) ))
  local o="fade=in:st=0.5:d=0.6:alpha=1,fade=out:st=$((s1-0.75)):d=0.45:alpha=1"
  local m="fade=in:st=$((s2+0.35)):d=0.6:alpha=1,fade=out:st=$((s3-0.6)):d=0.4:alpha=1"
  local c="fade=in:st=$((s3+0.3)):d=0.6:alpha=1"
  ffmpeg -v error -y -i seg/01a_proa.mp4 -i seg/01b_sub-ix.mp4 -i seg/02_rov-agua.mp4 -i seg/03a_rov-submerso.mp4 -i seg/03b_mergulhador.mp4 -i $last \
   -loop 1 -t $T -i ov/ui.png -loop 1 -t $T -i ov/open_$l.png -loop 1 -t $T -i ov/mid_$l.png -loop 1 -t $T -i ov/close_$l.png -filter_complex \
   "[0:v][1:v][2:v][3:v][4:v][5:v]concat=n=6:v=1[v];[7:v]format=rgba,${o}[o];[8:v]format=rgba,${m}[m];[9:v]format=rgba,${c}[c];[v][6:v]overlay[a];[a][o]overlay[b];[b][m]overlay[e];[e][c]overlay,format=yuv420p" \
   -t $T -an -c:v libx264 -crf 18 -preset medium -r $FPS oceanica-directors-cut_${v}_${l:u}.mp4
  printf "%s %s  %.2fs  cenas: 0 | %.2f | %.2f | %.2f\n" $v ${l:u} $T $s1 $s2 $s3
}
for v in A B; do for l in en pt; do cut $v $l; done; done
