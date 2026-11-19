#!/bin/zsh
# Animatic da hero (KV1 na abertura). Uso: animatic/build.sh
# Fontes: ../../../videos (copias do YouTube, NAO liberadas). Camadas de texto: ov/ (geradas de overlay.html).
cd "$(dirname "$0")"
V1=(../../../videos/*qzGU8XxzSTI*.mp4); V2=(../../../videos/*ao00*.mp4)
FPS=24000/1001
# seg nome fonte inicio dur_fonte velocidade grade ato_ui ato_txt txt_in txt_out extra
seg(){
  local n=$1 src=$2 ss=$3 ds=$4 sp=$5 grade=$6 ui=$7 tx=$8 tin=$9 tout=${10} extra=${11}
  local D=$(printf "%.3f" $((ds/sp)))
  local pre="scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080"
  [[ $src == V2 ]] && pre="crop=1920:1012:0:34,$pre" && f=$V2 || f=$V1
  local tempo="setpts=PTS/$sp,fps=$FPS"; (( sp < 1 )) && tempo="setpts=PTS/$sp,minterpolate=fps=$FPS:mi_mode=blend"
  local tf="format=rgba"
  (( tin )) && tf="$tf,fade=in:st=0.35:d=0.6:alpha=1"
  (( tout )) && tf="$tf,fade=out:st=$((D-tout-0.1)):d=0.45:alpha=1"
  ffmpeg -v error -y -ss $ss -t $ds -i $f -loop 1 -t $D -i ov/ui_$ui.png -loop 1 -t $D -i ov/txt_$tx.png -filter_complex \
   "[0:v]$pre,$tempo,$grade${extra:+,$extra},format=yuv420p[v];[2:v]${tf}[t];[v][1:v]overlay[a];[a][t]overlay,format=yuv420p" \
   -t $D -an -c:v libx264 -crf 19 -preset medium -r $FPS seg/$n.mp4 && echo "$n  ${D}s"
}
GV1="eq=saturation=0.72:contrast=0.97:brightness=0.01"
# 1 Embarcacoes: proa de frente, 0,45x; no fim o quadro fecha em direcao a linha d'agua (recorte animado, nao e movimento de camera)
seg 1_embarcacoes V2 57.35 2.05 0.45 "eq=contrast=1.08:saturation=1.05:brightness=-0.03" 1 1 1 1.5 \
 "scale=3840:2160:flags=lanczos,zoompan=z='if(lt(on,80),1,1+0.9*pow((on-80)/29,2))':x='iw/2-iw/zoom/2':y='(ih-ih/zoom)*0.93':d=1:s=1920x1080:fps=$FPS,fade=out:st=3.95:d=0.6:color=0x06090A"
# 2 Mergulhadores: 0,65x; entra do escuro, sai estourando em branco
seg 2_mergulhadores V2 75.05 2.2 0.65 "colorbalance=gs=-0.18:gm=-0.06:bs=0.06,eq=contrast=1.12:brightness=-0.07:saturation=0.92" 2 2 1 0.5 "fade=in:st=0:d=0.5:color=0x06090A,fade=out:st=2.95:d=0.43:color=white"
# 3 ROVs: entra na agua (vem do branco), depois a garra. A frase atravessa o corte
seg 3a_rov-agua V1 86.3 3.5 1 "$GV1" 3 3 1 0 "fade=in:st=0:d=0.45:color=white"
seg 3b_garra V2 89.9 3.3 1 "eq=saturation=0.5:contrast=1.04" 3 3 0 0.2 ""
# 4 Tecnologia: piloto, 0,75x. Corte seco no gesto
seg 4_tecnologia V2 87.3 2.4 0.75 "eq=saturation=0.85" 4 4 1 0.2 ""
# 5 Engenharia: ferramenta, depois icamento. A frase atravessa o corte
seg 5a_ferramenta V1 41.85 2.1 1 "$GV1" 5 5 1 0 ""
seg 5b_icamento V1 90.5 2.8 1 "$GV1" 5 5 0 0.2 ""
# Fecho: embarcacao junto a unidade, 0,8x
seg 6_fecho V1 94.5 4.4 0.8 "$GV1" 6 6 1 0 "fade=out:st=4.9:d=0.6:color=black"
(cd seg && print -l *.mp4 | sed "s/^/file '/;s/$/'/" > list.txt)
ffmpeg -v error -y -f concat -safe 0 -i seg/list.txt -c copy animatic-hero-kv1.mp4 && ffprobe -v error -show_entries format=duration,size -of default=nw=1 animatic-hero-kv1.mp4
