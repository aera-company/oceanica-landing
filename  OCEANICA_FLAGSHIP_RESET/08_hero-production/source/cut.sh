# Lista de corte e tratamento. Lido por build-film.sh e pelo teste de cor. zsh.
# Fontes (somente leitura): ../videos/. V1 = institucional (qzGU8XxzSTI) · V2 = 47 anos (ao00-ruSDWY)
V1=(../videos/*qzGU8XxzSTI*.mp4); V2=(../videos/*ao00*.mp4)
FPS=24000/1001
FIT="scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080,setsar=1"
# nome | fonte | inicio | duracao | x do recorte mobile 3:4 (810 px de 1920) | tratamento
SHOTS=(
 "01a_proa|V2|57.32|2.08|582|eq=saturation=1.02:contrast=1.03"
 "01b_sub-ix|V2|4.96|3.00|1010|eq=saturation=1.02:contrast=1.03"
 "02_rov-agua|V1|86.10|4.15|555|vignette=angle=PI/7:mode=backward,eq=saturation=0.74:gamma=1.05:contrast=1.02"
 "03a_rov-submerso|V1|57.35|3.20|434|vignette=angle=PI/9:mode=backward,eq=saturation=0.80:contrast=1.14:gamma=0.98,unsharp=7:7:0.45"
 "03b_mergulhador|V2|75.05|2.20|560|colorbalance=gs=-0.16:gm=-0.05:bs=0.05,eq=contrast=1.08:brightness=-0.035:saturation=0.96,unsharp=5:5:0.3"
 "04_fpso|V1|94.35|4.60|470|vignette=angle=PI/7:mode=backward,eq=saturation=0.74:gamma=1.12:contrast=0.98"
)
