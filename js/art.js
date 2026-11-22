/* Ilustrações em linhas (estilo gravura), geradas por código.
   Usam as cores do tema (css/theme.css), então acompanham qualquer mudança. */
window.Art = (() => {
  const ridge = (w, base, amp, seed, f) => {
    const p = [];
    for (let x = -20; x <= w + 20; x += 10)
      p.push([x, base - amp * (Math.sin(x / f + seed) + 0.5 * Math.sin(x / (f / 2.3) + seed * 2))]);
    return p;
  };
  const layers = (w, h, defs, fill, stroke) => {
    let s = "";
    defs.forEach(d => {
      const p = ridge(w, d.base, d.amp, d.seed, d.f);
      const poly = p.map(q => q[0] + "," + q[1].toFixed(1)).join(" ");
      s += `<polygon points="${poly} ${w + 20},${h + 20} -20,${h + 20}" fill="${fill}"/>`;
      for (let k = 0; k < d.lines; k++) {
        const o = k * d.gap;
        s += `<polyline points="${p.map(q => q[0] + "," + (q[1] + o).toFixed(1)).join(" ")}" fill="none" stroke="${stroke}" stroke-width="${k ? 0.8 : 1.6}" stroke-opacity="${k ? 0.85 - k * 0.03 : 1}"/>`;
      }
    });
    return s;
  };
  const sun = (cx, cy, r) => {
    let s = `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="currentColor" stroke-width="1.4"/>`;
    for (let i = 0; i < 36; i++) {
      const a = (i / 36) * Math.PI * 2, r1 = r + 8, r2 = r + (i % 2 ? 22 : 32);
      s += `<line x1="${cx + r1 * Math.cos(a)}" y1="${cy + r1 * Math.sin(a)}" x2="${cx + r2 * Math.cos(a)}" y2="${cy + r2 * Math.sin(a)}" stroke="currentColor" stroke-width="0.9"/>`;
    }
    for (let y = -r + 6; y < r; y += 6) {
      const hw = Math.sqrt(r * r - y * y);
      s += `<line x1="${cx - hw}" y1="${cy + y}" x2="${cx + hw}" y2="${cy + y}" stroke="currentColor" stroke-width="0.7" stroke-opacity=".55"/>`;
    }
    return s;
  };
  return {
    mountains() {
      const w = 800, h = 560;
      const defs = [
        { base: 300, amp: 70, seed: 1, f: 140, lines: 18, gap: 6 },
        { base: 400, amp: 55, seed: 3, f: 110, lines: 14, gap: 6 },
        { base: 490, amp: 38, seed: 5, f: 85,  lines: 10, gap: 6 }
      ];
      return `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="Montanhas em linhas finas sob um sol" preserveAspectRatio="xMidYMax slice" style="color:var(--ink)">${sun(560, 150, 46)}${layers(w, h, defs, "var(--bg)", "var(--ink)")}</svg>`;
    },
    dunes() {
      const w = 1440, h = 160;
      const defs = [
        { base: 70,  amp: 12, seed: 1, f: 170, lines: 5, gap: 7 },
        { base: 105, amp: 10, seed: 3, f: 130, lines: 5, gap: 7 },
        { base: 138, amp: 6,  seed: 5, f: 90,  lines: 3, gap: 7 }
      ];
      return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" aria-hidden="true">${layers(w, h, defs, "var(--bg)", "var(--ink)")}</svg>`;
    }
  };
})();
