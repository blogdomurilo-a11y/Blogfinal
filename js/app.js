const S = window.SITE;
const page = document.body.dataset.page;
const $ = s => document.querySelector(s);
const fmt = d => new Date(d + "T12:00:00").toLocaleDateString("pt-BR");

/* ---------- cabeçalho e rodapé (vêm de config.js) ---------- */
$("#site-header").innerHTML = `
  <div class="wrap bar">
    <a class="brand" href="index.html">${S.title}</a>
    <nav>${S.nav.map(n => `<a href="${n.link}" ${n.id === page ? 'aria-current="page"' : ""}>${n.nome}</a>`).join("")}</nav>
  </div>`;
$("#site-footer").innerHTML = `
  <div class="wrap foot-grid">
    <div><p class="foot-brand">${S.title}</p><p class="foot-text">${S.tagline}</p></div>
    <div><p class="foot-title">Navegar</p>${S.nav.map(n => `<a href="${n.link}">${n.nome}</a>`).join("")}</div>
    <div><p class="foot-title">Contato</p>${S.social.map(n => `<a href="${n.link}">${n.nome}</a>`).join("")}</div>
  </div>
  <div class="dunes">${Art.dunes()}</div>`;

/* ---------- dados ---------- */
const loadPosts = () => fetch("posts/posts.json").then(r => r.json())
  .then(l => l.sort((a, b) => b.date.localeCompare(a.date)));
const fail = el => el.innerHTML = `<p class="notice">Não foi possível carregar os textos. Se abriu o arquivo direto no navegador, rode um servidor local (python3 -m http.server) ou publique no GitHub Pages.</p>`;

const card = (p, i) => `
  <a class="card${i === 0 ? " featured" : ""}" href="post.html?p=${p.slug}">
    <div class="card-img ${p.cover ? "" : "hatch"}">${p.cover ? `<img src="${p.cover}" alt="${p.cover_alt || p.title}" loading="lazy">` : ""}</div>
    <div class="card-body">
      <p class="meta">${p.category || "Diário"}</p>
      <h3>${p.title}</h3>
      <p class="excerpt">${p.subtitle || ""}</p>
      <p class="card-foot"><span>Ler texto</span><span>${fmt(p.date)}</span></p>
    </div>
  </a>`;

/* ---------- páginas ---------- */
if (page === "home") {
  $("#hero-art").innerHTML = Art.mountains();
  $("#hero-title").textContent = S.title;
  $("#hero-tag").textContent = S.tagline;
  loadPosts().then(l => {
    $("#count").textContent = l.length + (l.length === 1 ? " texto" : " textos");
    $("#grid").innerHTML = l.slice(0, 9).map(card).join("");
  }).catch(() => fail($("#grid")));
}
if (page === "arquivo") {
  loadPosts().then(l => $("#grid").innerHTML = l.map(p => card(p, -1)).join("")).catch(() => fail($("#grid")));
}
if (page === "sobre") $("#sobre-texto").textContent = S.sobre;
if (page === "post") {
  const slug = new URLSearchParams(location.search).get("p") || "";
  const box = $("#post");
  if (!/^[\w-]+$/.test(slug)) box.innerHTML = `<p class="notice">Texto não encontrado.</p>`;
  else Promise.all([loadPosts(), fetch(`posts/${slug}.md`).then(r => { if (!r.ok) throw 0; return r.text(); })])
    .then(([l, md]) => {
      const m = l.find(p => p.slug === slug) || { title: slug, date: "2000-01-01" };
      document.title = `${m.title} | ${S.title}`;
      const corpo = md.replace(/\r\n/g, "\n").replace(/^---\n[\s\S]*?\n---\s*/, ""); // tira o cabeçalho
      box.innerHTML = `
        <header class="post-head">
          <p class="meta">${m.category || "Diário"}, ${fmt(m.date)}</p>
          <h1>${m.title}</h1>${m.subtitle ? `<p class="lead">${m.subtitle}</p>` : ""}
        </header>
        ${m.cover ? `<img class="post-cover" src="${m.cover}" alt="${m.cover_alt || m.title}">` : ""}
        <div class="prose">${window.marked ? marked.parse(corpo) : "<pre>" + corpo + "</pre>"}</div>
        <p class="back"><a href="index.html">Voltar para os textos</a></p>`;
    }).catch(() => box.innerHTML = `<p class="notice">Texto não encontrado.</p>`);
}
