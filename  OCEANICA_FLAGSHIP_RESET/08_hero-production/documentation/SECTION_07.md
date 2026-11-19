# Capítulo 07 · Conexão, rodapé e navegação

Data: 18/11/2026. Endereço: `http://localhost:4173/#conexao`. Nada publicado.

Com este capítulo, os sete da arquitetura do briefing estão no protótipo.

## O que é

O fim da página: transformar interesse em ação e dar a navegação institucional.

- **Tom:** escuro, sobre a imagem da abertura (a proa de frente), bem apagada. A página termina onde começou.
- **Título:** "Fale com a Oceânica."
- **Quatro caminhos,** em linhas grandes, cada um com uma frase e uma seta de saída: Comercial, Investidores, Carreiras, Fornecedores. São links para as páginas oficiais do site atual, em nova aba.
- **Rodapé:** marca e assinatura; os quatro endereços com telefone; atalhos para os capítulos da página; canal de denúncia e política de privacidade; redes sociais; razão social e CNPJ; aviso de protótipo.
- **Sem formulário.** O protótipo não tem servidor para receber mensagens; um formulário aqui seria falso. Os caminhos levam aos canais que a Oceânica já opera.

## Navegação

Os cinco itens do topo apontavam todos para a seção 02, porque os outros capítulos não existiam. Agora cada um leva a um capítulo real, e os nomes mudaram para corresponder:

| Item | Destino |
|---|---|
| A Oceânica | 02 · Escala operacional |
| Capacidades | 03 · Capacidades |
| Operação | 04 · Oceânica Universe |
| Soluções | 05 · Soluções |
| Contato | 07 · Conexão |

O capítulo 06, Confiança, não tem item no topo; está nos atalhos do rodapé. Cinco itens é o limite que a navegação aguenta sem ficar pesada.

## Destinos e fontes

Site oficial, lido em 18/11/2026.

| Caminho | Destino em português | Destino em inglês |
|---|---|---|
| Comercial | `oceanica.com.br/contato/contatos-comerciais/` | `oceanica.com.br/en/contacts/` |
| Investidores | `oceanica.com.br/investidores/servicos-aos-investidores/fale-com-ri/` | `oceanica.com.br/en/investors/investor-services/contact-ir/` |
| Carreiras | `sejaoceanica.gupy.io` | o mesmo |
| Fornecedores | `oceanica.com.br/portal-fornecedor/` | o mesmo |
| Canal de denúncia | `contatoseguro.com.br/oceanica` · 0800 800 8055 | o mesmo |
| Política de privacidade | `oceanica.com.br/politica-de-privacidade-de-dados-pessoais/` | o mesmo |
| LinkedIn | `linkedin.com/company/oceanica` | |
| Instagram | `instagram.com/oceanica.engenharia` | |
| Facebook | `facebook.com/oceanica.sub` | |

### Endereços no rodapé

Da seção "Matriz e Filiais" do site.

| Unidade | Endereço | Telefone |
|---|---|---|
| Rio de Janeiro, matriz | Avenida das Américas, 3.434, Bloco 01, Salas 301 a 308, Barra da Tijuca | (21) 2139-4250 |
| Macaé | Rua Odete Coutinho Pereira, 225, Vale Encantado | (22) 3321-6250 |
| Rio das Ostras | Avenida Zen, s/n, Quadra B, Zen | (22) 3321-6300 |
| Niterói | Avenida Feliciano Sodré, 325, Centro | não informado no site |

Razão social e CNPJ: Oceânica Engenharia e Consultoria S.A., 29.980.141/0001-08.

### O que precisa de atenção

- **Não abri as páginas de destino de Comercial, Fornecedores, privacidade e canal de denúncia.** Os endereços estão no menu do site e foram confirmados como links, mas o conteúdo delas não foi lido.
- **A página de contato do site está vazia** (só título). Por isso o caminho Comercial leva a "Contatos comerciais", e não a "Contato".
- **O destino em inglês de Comercial é a página geral de contatos,** porque não achei a versão em inglês de "Contatos comerciais".
- **Rio das Ostras tem duas unidades no site** (Avenida Zen e Rua do Engenheiro). O rodapé mostra só a primeira.
- **Não há e-mail nem nome de contato** em nenhuma página lida, então o rodapé não tem nenhum.
- **O site não tem YouTube** nos ícones, embora os dois filmes usados aqui estejam no YouTube.
- **Sem ano no rodapé.** O site diz "Copyright © 2025"; preferi não repetir uma data defasada.

## O que foi verificado

- 12 capturas: abertura, caminhos e rodapé em 1440 × 900; abertura em 1920 × 1080; caminhos em inglês; rodapé em 1280 × 720; quatro posições em 390 × 844; mais 768 × 1024 e 360 × 640 (`screens-scroll/secao07-*`). Nenhuma tem rolagem horizontal.
- No navegador embutido, em 1440 × 900, com o scroll suave ligado, sem erros no console:
  - o item "Contato" do topo levou ao capítulo 07, parando logo abaixo da navegação;
  - os cinco itens do topo têm os destinos da tabela acima, e os nomes mudam em inglês;
  - a troca para inglês mudou os destinos de Comercial e Investidores para as páginas em inglês do site;
  - "Voltar ao início" levou a página ao topo.

## O que não foi verificado

- **Os links externos não foram clicados.** Conferi os endereços, não abri as páginas a partir do protótipo.
- A sensação do salto longo com o scroll suave (do topo ao capítulo 07 são mais de quinze telas).
- O menu do celular com os novos destinos, em telefone real.
- Safari, iPhone, teclado e leitor de tela.

## Limitações

1. **Os caminhos levam para fora do protótipo,** ao site atual. Em produção, parte deles deveria virar página ou formulário do próprio flagship.
2. **Não há contato direto** (e-mail, nome, formulário) na página.
3. **A imagem de fundo é a mesma da abertura** e não está liberada.
4. **A assinatura em inglês no rodapé é tradução minha.**
5. **A navegação continua clara sobre os capítulos escuros.**

## Arquivos

| Arquivo | Função |
|---|---|
| `web/css/connect.css` | Estilos do capítulo e do rodapé |
| `web/js/connect.js` | Textos e destinos nos dois idiomas |
| `design/section-07_desktop-board.jpg`, `section-07_mobile-board.jpg` | Pranchas |
| `documentation/screens-scroll/secao07-*` | Capturas |

Para refazer as capturas: `node 08_hero-production/documentation/capture-scroll.mjs secao07` (servidor ligado).
