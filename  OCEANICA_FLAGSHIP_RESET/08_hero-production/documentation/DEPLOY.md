# Publicação na Vercel

Atualizado em 19/11/2026.

## O que está no ar

`https://oceanica-landing.vercel.app` mostra o protótipo do flagship: a hero por scroll e os sete capítulos, em português e inglês. A alternativa com autoplay está em `/autoplay.html`.

**Desde 19/11/2026 quem publica é a branch `main`,** por decisão de Tiago. Cada push na `main` republica o link sozinho, pela integração da Vercel com o GitHub.

## Como funciona

O `vercel.json` da raiz do repositório diz à Vercel para montar um site estático, em vez do app em Next.js:

1. **Instalação:** nenhuma.
2. **Build:** copia `OCEANICA_FLAGSHIP_RESET/08_hero-production/web/` para `dist/` e tira dali o servidor local e os arquivos de configuração.
3. **Saída:** a pasta `dist/`.

A cópia existe por um motivo: o nome da pasta do workspace começa com um espaço, e apontar a Vercel direto para ela seria arriscado. `dist/` é criada na Vercel durante o build e não fica no repositório.

O mesmo `vercel.json` traz os cabeçalhos (pedido de não indexação, cache de mídia e de fontes) e os redirecionamentos de `/pt` e `/en`.

## Para publicar uma mudança

Alterar os arquivos em `08_hero-production/web/`, commitar e dar push na `main`. Em cerca de um minuto o link público está atualizado.

Um push em qualquer outra branch gera uma prévia na Vercel, protegida por login, sem mexer no link público.

## O que mudou no repositório

- **A `main` avançou de `04c8a9a` para a ponta da branch `creative/v06-hero-v4`,** sem commit de merge. Além do flagship, isso levou para a `main` o commit `7f8f69e`, com o trabalho criativo anterior da pasta `v06/` (329 arquivos), que já estava na branch.
- **O app em Next.js continua no repositório** (`src/`, `package.json`, `public/`), mas **não é mais publicado.** O site antigo saiu do ar.
- **A branch `creative/v06-hero-v4` e a `main` estão no mesmo ponto.**

## Como voltar ao site antigo

**No ar, sem mexer no git.** A última publicação do site antigo (13/11/2026) continua guardada na Vercel:

```bash
vercel promote oceanica-landing-altmcxgin-tiagolima-aera-projects.vercel.app --scope tiagolima-aera-projects
```

Ou, no painel da Vercel, em Deployments, "Promote to Production" nessa publicação. Atenção: o próximo push na `main` publica o protótipo de novo.

**De vez.** Voltar o `vercel.json` da raiz para `{ "framework": "nextjs" }` e dar push na `main`.

## Histórico desta publicação

1. O protótipo foi ao ar primeiro pela linha de comando da Vercel, a partir de uma cópia da pasta `web/`, sem tocar na `main`. Era frágil: um push na `main` republicaria o site antigo.
2. No mesmo dia, o `vercel.json` da raiz foi trocado e testado em uma prévia gerada pela branch, que serviu o protótipo corretamente.
3. A `main` recebeu a branch e a Vercel publicou o commit `5e1da48`.

`deploy.sh` e `web/vercel.json` são do passo 1. **Não use `deploy.sh --prod`:** ele publicaria por fora do git e o link deixaria de corresponder à `main`. Sem `--prod`, o script ainda serve para gerar uma prévia avulsa.

## O que foi verificado no ar, na publicação da `main`

- O log da Vercel confirma: branch `main`, commit `5e1da48`.
- A página, os estilos, os scripts, as fontes, os posters, os vídeos e quadros das três sequências respondem com sucesso. `server.mjs` não é servido.
- O vídeo atende pedidos de intervalo, que o Safari exige.
- `/pt` e `/en` redirecionam para a página nova no idioma certo.
- O cabeçalho de não indexação está presente.
- No navegador embutido: os sete capítulos e o rodapé estão presentes, a proa aparece na abertura, a rolagem avança o filme, o scroll suave está ativo, sem erros no console e sem arquivo faltando.

### Um defeito encontrado no ar e corrigido

Na primeira publicação a hero apareceu preta por um instante. Quando a janela muda de tamanho e a sequência de quadros troca, o canvas vazio cobria o poster até os quadros novos chegarem. Agora o poster volta a aparecer nesse intervalo. A correção está no commit `96e7db5` e no ar.

## O que não foi verificado

- Safari e iPhone real, que continuam sendo o maior risco.
- A página em movimento, em rede real.
- Os links externos do capítulo 07, a partir do site publicado.

## O que continua valendo

- **O material no ar não está liberado:** imagens de dois vídeos do YouTube, pessoas identificáveis, copy e números ainda sem validação da Oceânica. O rodapé avisa que é um protótipo interno.
- **A página pede aos buscadores que não a indexem,** mas o endereço é público para quem tiver o link.
- **O repositório cresceu** de cerca de 23 MB para cerca de 100 MB, por causa das sequências de quadros, dos vídeos web e das imagens.
