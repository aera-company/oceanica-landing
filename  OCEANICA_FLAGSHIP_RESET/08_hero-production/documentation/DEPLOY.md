# Publicação na Vercel

Atualizado em 19/11/2026.

## O que está no ar

`https://oceanica-landing.vercel.app` mostra o protótipo do flagship: a hero por scroll e os sete capítulos, em português e inglês. A alternativa com autoplay está em `/autoplay.html`.

Publicado em 19/11/2026, a pedido de Tiago, no projeto `oceanica-landing` da Vercel.

## Como foi publicado

O projeto da Vercel está configurado para o site antigo, em Next.js, que mora na raiz do repositório e é publicado pela branch `main`. O protótipo é um site estático em `08_hero-production/web/`.

Para não alterar a `main` nem a configuração do projeto, a publicação foi feita **direto pela linha de comando da Vercel**, a partir de uma cópia só dessa pasta:

1. `web/vercel.json` diz à Vercel que a pasta é estática, sem build.
2. `web/.vercelignore` deixa o servidor local (`server.mjs`) de fora.
3. Uma prévia foi publicada e conferida antes da produção.

Para publicar de novo depois de uma mudança:

```bash
08_hero-production/deploy.sh          # prévia
08_hero-production/deploy.sh --prod   # produção
```

O script copia `web/` para uma pasta temporária fora do repositório e publica dali. Publicar de dentro do repositório não serve: a Vercel ligaria o projeto à raiz e publicaria o site antigo.

## O que precisa saber

- **A `main` não mudou.** O site antigo continua lá. **Um push na `main` publica o site antigo de novo e tira o protótipo do ar**, porque a integração com o GitHub continua ativa.
- **O que está no ar não corresponde a nenhuma branch publicada pela Vercel.** O código está na branch `creative/v06-hero-v4`, mas a Vercel recebeu os arquivos pela linha de comando.
- **Tornar isso definitivo** exige decidir o destino do site antigo: ou a `main` passa a servir o protótipo, ou o protótipo ganha um projeto próprio na Vercel.
- **Os endereços antigos `/pt` e `/en`** redirecionam para a página nova no idioma certo.
- **A página pede aos buscadores que não a indexem,** pela página e pelo cabeçalho. O endereço continua público para quem tiver o link.
- **O material no ar não está liberado:** imagens de dois vídeos do YouTube, pessoas identificáveis, copy e números ainda sem validação da Oceânica. O rodapé avisa que é um protótipo interno.

## Como voltar atrás

A versão que estava no ar antes (site em Next.js, de 13/11/2026) continua guardada na Vercel como `oceanica-landing-altmcxgin-tiagolima-aera-projects.vercel.app`. Para restaurá-la:

```bash
vercel promote oceanica-landing-altmcxgin-tiagolima-aera-projects.vercel.app --scope tiagolima-aera-projects
```

Ou, no painel da Vercel, em Deployments, escolher essa publicação e usar "Promote to Production".

## O que foi verificado no ar

- A página, os estilos, os scripts, as fontes, os posters, os três vídeos e quadros das três sequências respondem com sucesso; `server.mjs` não é servido.
- O vídeo atende pedidos de intervalo, que o Safari exige.
- A página chega comprimida (cerca de 10 KB de HTML).
- No navegador embutido: os sete capítulos e o rodapé estão presentes, os quadros da hero carregam, a rolagem avança o filme e troca a frase, o scroll suave está ativo, sem erros no console e sem arquivo faltando.

### Um defeito encontrado no ar e corrigido

Ao abrir o link, a hero apareceu preta por um instante. Causa: quando a janela muda de tamanho e a sequência de quadros troca (de desktop para celular, por exemplo), o canvas vazio cobria o poster até os quadros novos chegarem. Agora o poster volta a aparecer nesse intervalo. Conferido localmente e republicado.

## O que não foi verificado

- Safari e iPhone real, que continuam sendo o maior risco.
- A página em movimento, em rede real.
- Os links externos do capítulo 07, a partir do site publicado.
