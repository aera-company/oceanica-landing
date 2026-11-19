#!/bin/zsh
# Publica o protótipo (pasta web/) no projeto oceanica-landing da Vercel.
#   ./deploy.sh          prévia
#   ./deploy.sh --prod   produção (https://oceanica-landing.vercel.app)
# Copia web/ para uma pasta temporária FORA do repositório e publica dali: de dentro do repositório,
# a Vercel ligaria o projeto à raiz e publicaria o site antigo em Next.js. Ver documentation/DEPLOY.md.
set -e
here="$(cd "$(dirname "$0")" && pwd)"
stage="${TMPDIR:-/tmp}/oceanica-flagship-deploy"
mkdir -p "$stage"
rsync -a --exclude '.DS_Store' --exclude 'server.mjs' --exclude '.vercel' "$here/web/" "$stage/"
cd "$stage"
[ -f .vercel/project.json ] || vercel link --yes --project oceanica-landing
if [ "$1" = "--prod" ]; then vercel deploy --prod --yes; else vercel deploy --yes; fi
