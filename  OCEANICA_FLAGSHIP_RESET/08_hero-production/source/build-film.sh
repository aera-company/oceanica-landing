#!/bin/zsh
# Filme da hero: master, versoes web, mobile e posters. Sem audio em nenhuma saida. Uso: source/build-film.sh
cd "$(dirname "$0")/.."; source source/cut.sh
names=()
for s in $SHOTS; do p=("${(@s:|:)s}"); n=${p[1]}; names+=$n
  src=$V1; pre=""; tempo=""
  if [[ ${p[2]} == V2 ]]; then src=$V2; pre="crop=1920:1012:0:34,"; tempo="setpts=N/($FPS)/TB,"; fi   # 25 qps: cada quadro uma vez a 23,976
  ffmpeg -v error -y -ss ${p[3]} -t ${p[4]} -i $src -vf "${pre}${FIT},${tempo}${p[6]},format=yuv420p" -r $FPS -an -c:v libx264 -crf 10 -preset slow source/seg/$n.mp4
  ffmpeg -v error -y -i source/seg/$n.mp4 -vf "crop=810:1080:${p[5]}:0,scale=720:960:flags=lanczos,setsar=1" -r $FPS -an -c:v libx264 -crf 12 source/seg/${n}_m.mp4
  echo "$n $(ffprobe -v error -show_entries format=duration -of csv=p=0 source/seg/$n.mp4)"
done
: > source/seg/d.txt; : > source/seg/m.txt
for n in $names; do echo "file '$n.mp4'" >> source/seg/d.txt; echo "file '${n}_m.mp4'" >> source/seg/m.txt; done
d(){ ffprobe -v error -show_entries format=duration -of csv=p=0 source/seg/$1.mp4 }
s1=$(( $(d 01a_proa)+$(d 01b_sub-ix) )); s2=$(( s1+$(d 02_rov-agua) )); s3=$(( s2+$(d 03a_rov-submerso)+$(d 03b_mergulhador) )); T=$(( s3+$(d 04_fpso) ))
printf '{"scenes":[0,%.3f,%.3f,%.3f],"duration":%.3f}\n' $s1 $s2 $s3 $T | tee source/timeline.json
X264=(-an -c:v libx264 -pix_fmt yuv420p -movflags +faststart -r $FPS)
# 1. Master limpo (sem texto): base de tudo
ffmpeg -v error -y -f concat -safe 0 -i source/seg/d.txt -c copy -an final-video/oceanica-hero_master_clean.mp4
# 2. Masters com titulos, para revisao fora do site
for l in en pt; do
  o="fade=in:st=0.5:d=0.6:alpha=1,fade=out:st=$((s1-0.75)):d=0.45:alpha=1"
  m="fade=in:st=$((s2+0.35)):d=0.6:alpha=1,fade=out:st=$((s3-0.6)):d=0.4:alpha=1"
  c="fade=in:st=$((s3+0.35)):d=0.7:alpha=1"
  ffmpeg -v error -y -i final-video/oceanica-hero_master_clean.mp4 -loop 1 -t $T -i source/ov/ui.png -loop 1 -t $T -i source/ov/open_$l.png -loop 1 -t $T -i source/ov/mid_$l.png -loop 1 -t $T -i source/ov/close_$l.png -filter_complex \
   "[2:v]format=rgba,${o}[o];[3:v]format=rgba,${m}[m];[4:v]format=rgba,${c}[c];[0:v][1:v]overlay[a];[a][o]overlay[b];[b][m]overlay[e];[e][c]overlay,format=yuv420p" -t $T $X264 -crf 14 -preset slow final-video/oceanica-hero_master_titled_${l:u}.mp4
done
# 3. Web desktop (sem texto: os titulos sao HTML)
ffmpeg -v error -y -i final-video/oceanica-hero_master_clean.mp4 $X264 -crf 23 -preset slow -maxrate 4500k -bufsize 9000k -profile:v high -level 4.1 -g 48 web/media/hero-1080.mp4
ffmpeg -v error -y -i final-video/oceanica-hero_master_clean.mp4 -vf "scale=1280:720:flags=lanczos" $X264 -crf 24 -preset slow -maxrate 2200k -bufsize 4400k -profile:v high -level 3.1 -g 48 web/media/hero-720.mp4
# 4. Mobile 3:4, recorte proprio por plano, sem ampliar (810x1080 nativos -> 720x960)
ffmpeg -v error -y -f concat -safe 0 -i source/seg/m.txt -c copy -an mobile/oceanica-hero_mobile_master_720x960.mp4
ffmpeg -v error -y -i mobile/oceanica-hero_mobile_master_720x960.mp4 $X264 -crf 24 -preset slow -maxrate 1600k -bufsize 3200k -profile:v main -level 3.1 -g 48 web/media/hero-mobile.mp4
cp web/media/hero-mobile.mp4 mobile/oceanica-hero_mobile_web_720x960.mp4
cp web/media/hero-1080.mp4 final-video/oceanica-hero_web_1080.mp4; cp web/media/hero-720.mp4 final-video/oceanica-hero_web_720.mp4
# 5. Posters = primeiro quadro exato do filme (para o loop e a troca poster->video nao saltarem)
ffmpeg -v error -y -i final-video/oceanica-hero_master_clean.mp4 -frames:v 1 poster/_d.png
ffmpeg -v error -y -i mobile/oceanica-hero_mobile_master_720x960.mp4 -frames:v 1 poster/_m.png
python3 - <<'PY'
from PIL import Image
for src,name in (('poster/_d.png','hero-poster-desktop'),('poster/_m.png','hero-poster-mobile')):
    im=Image.open(src).convert('RGB')
    im.save(f'poster/{name}.jpg',quality=86,progressive=True,optimize=True)
    im.save(f'poster/{name}.webp',quality=82,method=6)
    im.save(f'poster/{name}.avif',quality=62)
    print(name, im.size)
PY
rm poster/_d.png poster/_m.png; cp poster/*.jpg poster/*.webp poster/*.avif web/media/
for f in final-video/*.mp4 final-video/*.webm mobile/*.mp4; do ffprobe -v error -show_entries stream=codec_type -of csv=p=0 $f | tr '\n' ' '; printf "%8.1f kbps  %6.2f MB  %s\n" $(( $(ffprobe -v error -show_entries format=bit_rate -of csv=p=0 $f)/1000.0 )) $(( $(stat -f %z $f)/1048576.0 )) $f; done
ls -la poster

# 6. Sequencias de quadros para a hero por scroll (metodo da new-3d-landbase: WebP, ~40 quadros por 100vh, alvo < 12 MB)
# Os arquivos sao sobrescritos; se o numero de quadros diminuir, apague a pasta antiga a mao antes.
for t in "d1600|1600:900|70" "d1280|1280:720|72"; do p=("${(@s:|:)t}"); mkdir -p web/media/seq/${p[1]}
  ffmpeg -v error -y -i final-video/oceanica-hero_master_clean.mp4 -vf "fps=8.516,scale=${p[2]}:flags=lanczos" -c:v libwebp -f image2 -q:v ${p[3]} -compression_level 6 web/media/seq/${p[1]}/f_%04d.webp; done
mkdir -p web/media/seq/m720
ffmpeg -v error -y -i mobile/oceanica-hero_mobile_master_720x960.mp4 -vf "fps=7.3" -c:v libwebp -f image2 -q:v 72 -compression_level 6 web/media/seq/m720/f_%04d.webp
for d in web/media/seq/*; do echo "$d: $(ls $d | wc -l) quadros, $(du -sh $d | cut -f1)"; done
