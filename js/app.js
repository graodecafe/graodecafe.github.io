(function () {
  "use strict";
  document.documentElement.classList.add("js");

  /* ---------- utilidades ---------- */
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text; // sempre texto puro: nada do cardápio vira HTML
    return n;
  }
  function price(v, cls) {
    var s = el("span", cls);
    s.appendChild(el("small", null, "R$"));
    s.appendChild(document.createTextNode(String(v)));
    return s;
  }
  function picture(foto, alt, sizes) {
    var img = el("img");
    img.src = "img/" + foto + ".webp";
    img.srcset = "img/" + foto + "-400.webp 400w, img/" + foto + ".webp 720w";
    img.sizes = sizes;
    img.alt = alt;
    img.loading = "lazy";
    img.decoding = "async";
    return img;
  }

  /* ---------- cardápio ---------- */
  var MENU = Array.isArray(window.CARDAPIO) ? window.CARDAPIO : [];
  var root = document.getElementById("secoes");
  var chipsBar = document.getElementById("chips");

  /* Se o arquivo do cardápio tiver algum erro de digitação, a página não fica vazia */
  if (!MENU.length) {
    var aviso = el("p", "nojs", "Nosso cardápio está sendo atualizado. Fale com a gente pelo WhatsApp: ");
    var wa = el("a", null, "(75) 99218-0990");
    wa.href = "https://wa.me/5575992180990";
    wa.target = "_blank"; wa.rel = "noopener noreferrer";
    aviso.appendChild(wa);
    root.appendChild(aviso);
  }

  MENU.forEach(function (cat, i) {
    if (!cat || !cat.id || !cat.titulo) return; // ignora categoria incompleta
    var sec = el("section", "cat");
    sec.id = cat.id;
    sec.setAttribute("aria-labelledby", "t-" + cat.id);

    var h = el("header", "cat-h");
    h.appendChild(el("span", "cat-n", (i + 1 < 10 ? "0" : "") + (i + 1)));
    var h2 = el("h2", null, cat.titulo);
    h2.id = "t-" + cat.id;
    h.appendChild(h2);
    sec.appendChild(h);

    var d = cat.destaque;
    if (d && d.foto) {
      var fig = el("figure", "feat");
      fig.appendChild(picture(d.foto, d.nome, "(max-width: 560px) 100vw, 516px"));
      var cap = el("figcaption");
      cap.appendChild(el("span", "feat-k", "Destaque"));
      cap.appendChild(el("strong", null, d.nome));
      if (d.texto) cap.appendChild(el("span", "feat-c", d.texto));
      if (d.preco) cap.appendChild(price(d.preco, "feat-p"));
      fig.appendChild(cap);
      sec.appendChild(fig);
    }

    var ul = el("ul", "list");
    (cat.itens || []).forEach(function (it) {
      if (!it || !it.nome) return; // ignora item sem nome
      var li = el("li", "it");
      var l = el("div", "it-l");
      l.appendChild(el("span", "it-n", it.nome));
      if (it.detalhe) l.appendChild(el("span", "it-d", it.detalhe));
      li.appendChild(l);
      var dots = el("span", "it-dots");
      dots.setAttribute("aria-hidden", "true");
      li.appendChild(dots);
      if (Array.isArray(it.opcoes) && it.opcoes.length) {
        li.className = "it multi";
        var ops = el("div", "it-ops");
        it.opcoes.forEach(function (o) {
          if (!o || !o.preco) return;
          var row = el("span", "op");
          row.appendChild(el("span", "op-n", o.nome || ""));
          row.appendChild(price(o.preco, "it-p"));
          ops.appendChild(row);
        });
        li.appendChild(ops);
      } else if (it.preco) li.appendChild(price(it.preco, "it-p"));
      ul.appendChild(li);
    });
    sec.appendChild(ul);
    root.appendChild(sec);

    var a = el("a", null, cat.titulo);
    a.href = "#" + cat.id;
    a.setAttribute("data-t", cat.id);
    chipsBar.appendChild(a);
  });

  var strip = document.getElementById("vitrine");
  (window.VITRINE || []).forEach(function (v) {
    var f = el("figure");
    f.appendChild(picture(v.foto, v.nome, "240px"));
    f.appendChild(el("figcaption", null, v.nome));
    strip.appendChild(f);
  });

  /* ---------- aberto / fechado (horário da Bahia) ---------- */
  var H = { 0: [[420, 540], [900, 1260]], 1: [], 2: [[840, 1260]], 3: [[840, 1260]], 4: [[840, 1260]], 5: [[840, 1260]], 6: [[420, 540], [900, 1260]] };
  var DN = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  function fmt(m) { var h = Math.floor(m / 60), mm = m % 60; return (h < 10 ? "0" : "") + h + "h" + (mm ? (mm < 10 ? "0" : "") + mm : ""); }
  function now() {
    try {
      var o = {};
      new Intl.DateTimeFormat("en-US", { timeZone: "America/Bahia", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
        .formatToParts(new Date()).forEach(function (x) { o[x.type] = x.value; });
      return { d: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(o.weekday), m: (+o.hour % 24) * 60 + (+o.minute) };
    } catch (e) { var d = new Date(); return { d: d.getDay(), m: d.getHours() * 60 + d.getMinutes() }; }
  }
  var neonW = document.getElementById("neonW"), lastOpen = null;
  function setNeon(open, sub) {
    var st = document.getElementById("status");
    neonW.textContent = open ? "Aberto" : "Fechado";
    document.getElementById("statusTx").textContent = sub;
    if (open !== lastOpen) {
      st.className = "neon " + (open ? "on" : "off") + (lastOpen === null && open ? " ignite" : "");
      lastOpen = open;
    }
  }
  function upd() {
    var t = now(), T = H[t.d], i;
    document.querySelectorAll(".row").forEach(function (r) { r.classList.toggle("today", r.getAttribute("data-days").split(",").indexOf(String(t.d)) > -1); });
    for (i = 0; i < T.length; i++) if (t.m >= T[i][0] && t.m < T[i][1]) { setNeon(true, "até as " + fmt(T[i][1])); return; }
    for (i = 0; i < T.length; i++) if (t.m < T[i][0]) { setNeon(false, "abre hoje às " + fmt(T[i][0])); return; }
    for (var k = 1; k <= 7; k++) { var d = (t.d + k) % 7; if (H[d].length) { setNeon(false, "abre " + (k === 1 ? "amanhã" : DN[d]) + " às " + fmt(H[d][0][0])); return; } }
  }
  upd(); setInterval(upd, 60000);

  /* ---------- frase sempre em uma linha ---------- */
  var tg = document.querySelector(".tag");
  function fit() {
    tg.style.fontSize = "";
    var w = tg.parentNode.clientWidth, s = parseFloat(getComputedStyle(tg).fontSize), i = 0;
    tg.style.display = "inline-block";
    while (tg.scrollWidth > w && s > 12 && i < 40) { s -= 0.5; tg.style.fontSize = s + "px"; i++; }
    tg.style.display = "";
  }
  fit(); window.addEventListener("resize", fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  /* ---------- categoria ativa + botão flutuante ---------- */
  var chips = chipsBar.querySelectorAll("a"), cur = null, fab = document.getElementById("fab");
  function setOn(id) {
    if (id === cur) return; cur = id;
    chips.forEach(function (c) {
      var on = c.getAttribute("data-t") === id;
      c.classList.toggle("on", on);
      if (on) c.setAttribute("aria-current", "true"); else c.removeAttribute("aria-current");
      if (on) chipsBar.scrollTo({ left: c.offsetLeft - chipsBar.clientWidth / 2 + c.offsetWidth / 2, behavior: "smooth" });
    });
  }
  var cats = document.querySelectorAll(".cat"), ticking = false;
  function spy() {
    ticking = false;
    var y = window.scrollY + 120, id = null;
    cats.forEach(function (s) { if (s.offsetTop <= y) id = s.id; });
    setOn(id);
    var show = window.scrollY > window.innerHeight * 0.5;
    fab.classList.toggle("show", show);
    fab.querySelector("a").tabIndex = show ? 0 : -1;
  }
  window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(spy); } }, { passive: true });
  spy();

  /* ---------- degradê nas bordas da barra de categorias ---------- */
  var nav = document.querySelector(".nav");
  function edges() {
    var max = chipsBar.scrollWidth - chipsBar.clientWidth;
    nav.classList.toggle("more-r", chipsBar.scrollLeft < max - 4);
    nav.classList.toggle("more-l", chipsBar.scrollLeft > 4);
  }
  chipsBar.addEventListener("scroll", edges, { passive: true });
  window.addEventListener("resize", edges);
  edges();

  /* ---------- revelar ao rolar ---------- */
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add("vis"); io.unobserve(x.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    rv.forEach(function (n) { io.observe(n); });
  } else rv.forEach(function (n) { n.classList.add("vis"); });
})();
