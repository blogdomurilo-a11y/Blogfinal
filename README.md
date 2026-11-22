# Cadernos de Campo (site estático, sem build)

HTML, CSS e JavaScript puros. Sem Jekyll, sem instalar nada. Você controla cada pixel.

## Publicar (uma vez só)
1. Crie um repositório **público** no GitHub.
2. Envie os arquivos: Add file > Upload files, arrastando o CONTEÚDO da pasta (não o zip). A pasta oculta `.github` costuma ficar de fora no envio pelo navegador.
3. Settings > Pages > Source: **GitHub Actions**. Faça isso ANTES do próximo passo.
4. Crie o arquivo `.github/workflows/publicar.yml` pelo próprio GitHub (Add file > Create new file, digitando o caminho no campo do nome) e cole o conteúdo do `publicar.yml` que vem no zip.
5. O commit dispara a publicação. Acompanhe na aba Actions até o círculo ficar verde.

## Publicar um texto novo (no dia a dia)
1. No GitHub, abra a pasta `posts` > Add file > Create new file.
2. Nome do arquivo: letras sem acento, números e hífen, terminando em `.md` (ex.: `meu-texto.md`).
3. Cole o conteúdo (cabeçalho + texto) e faça o commit. Em cerca de 1 minuto o texto está no ar.
Arquivos que começam com `_` (como `_modelo.md`) são ignorados.

Para testar no computador: `node scripts/build-index.mjs` e depois `python3 -m http.server`.

## Onde mexer
| Quero mudar...             | Arquivo                |
|----------------------------|------------------------|
| Cores, fontes, bordas      | `css/theme.css`        |
| Layout e componentes       | `css/style.css`        |
| Nome, menu, rodapé, sobre  | `js/config.js`         |
| Ilustrações em linhas      | `js/art.js`            |
| Estrutura de cada página   | `index.html`, `arquivo.html`, `post.html`, `sobre.html` |
| Novo texto                 | `posts/nome.md` (cabeçalho com título, subtítulo, categoria, data) |
| Como o índice é montado    | `scripts/build-index.mjs` |

## Modelos de pastas
**A. Simples (este projeto):** `css/ js/ img/ posts/` na raiz.
**B. Por categoria:** `posts/pesquisa/`, `posts/processo/`; ajuste o script de índice e a regra de slug em `js/app.js`.
**C. Mídia organizada:** `img/capas/`, `img/posts/2026/`, `docs/`.
**D. Evoluir para framework:** se o blog crescer, mover para Astro ou Eleventy mantendo `css/` e `posts/`, com índice gerado automaticamente.
