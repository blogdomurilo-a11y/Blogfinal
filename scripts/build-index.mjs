// Lê todos os arquivos posts/*.md, extrai o cabeçalho (entre ---) e gera posts/posts.json.
// Roda sozinho no GitHub (veja .github/workflows/publicar.yml). Para testar local: node scripts/build-index.mjs
import { readdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = "posts";
const hoje = new Date().toISOString().slice(0, 10);
const lista = [];

for (const arq of readdirSync(dir)) {
  if (!arq.endsWith(".md") || arq.startsWith("_")) continue;   // arquivos começados por _ são ignorados
  const slug = arq.slice(0, -3);
  if (!/^[\w-]+$/.test(slug)) { console.warn(`Ignorado (nome inválido, use letras sem acento, números e hífen): ${arq}`); continue; }

  const texto = readFileSync(`${dir}/${arq}`, "utf8").replace(/\r\n/g, "\n");
  const m = texto.match(/^---\n([\s\S]*?)\n---/);
  const meta = {};
  if (m) for (const linha of m[1].split("\n")) {
    const i = linha.indexOf(":");
    if (i > 0) meta[linha.slice(0, i).trim()] = linha.slice(i + 1).trim().replace(/^["']|["']$/g, "");
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(meta.date || "")) { console.warn(`Sem data válida em ${arq}; usando hoje.`); meta.date = hoje; }

  lista.push({
    slug,
    title: meta.title || slug,
    subtitle: meta.subtitle || "",
    category: meta.category || "Diário",
    date: meta.date,
    ...(meta.cover ? { cover: meta.cover, cover_alt: meta.cover_alt || meta.title || slug } : {})
  });
}

lista.sort((a, b) => b.date.localeCompare(a.date));
writeFileSync(`${dir}/posts.json`, JSON.stringify(lista, null, 2) + "\n");
console.log(`posts.json gerado com ${lista.length} texto(s).`);
