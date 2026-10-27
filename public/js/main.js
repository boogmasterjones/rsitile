/* Rock Solid Tile v3: one small script for every page. No libraries.
   Motion always plays (owner decision 2026-10-26); loops pause off screen and in background tabs (SITE_RULES 7.3). */
(function () {
  "use strict";
  var d = document, w = window, root = d.documentElement;
  var $ = function (s, c) { return (c || d).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || d).querySelectorAll(s)); };
  var phoneMQ = w.matchMedia("(max-width: 760px)");
  var fine = w.matchMedia("(hover: hover) and (pointer: fine)");
  var IO = "IntersectionObserver" in w;
  var gtagEvent = function (name, params) { if (typeof w.gtag === "function") w.gtag("event", name, params); };

  /* ---------- menu and drop-downs ---------- */
  var menuBtn = $(".menu-btn");
  var closeDrops = function (except) { $$(".nav-drop.open").forEach(function (n) { if (n !== except) { n.classList.remove("open"); $("button", n).setAttribute("aria-expanded", "false"); } }); };
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      var open = d.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Close the menu" : "Open the menu");
    });
  }
  $$(".nav-drop > button").forEach(function (b) {
    b.addEventListener("click", function () {
      var item = b.parentElement, open = !item.classList.contains("open");
      closeDrops(item);
      item.classList.toggle("open", open);
      b.setAttribute("aria-expanded", String(open));
    });
  });
  d.addEventListener("click", function (e) {
    if (!e.target.closest(".nav-drop")) closeDrops();
    if (d.body.classList.contains("menu-open") && !e.target.closest(".nav") && !e.target.closest(".menu-btn")) { d.body.classList.remove("menu-open"); if (menuBtn) menuBtn.setAttribute("aria-expanded", "false"); }
    if (e.target.closest(".nav a")) { d.body.classList.remove("menu-open"); if (menuBtn) menuBtn.setAttribute("aria-expanded", "false"); }
  });
  d.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDrops(); if (d.body.classList.contains("menu-open")) { d.body.classList.remove("menu-open"); if (menuBtn) { menuBtn.setAttribute("aria-expanded", "false"); menuBtn.focus(); } } }
  });

  /* ---------- header that slides back in, and the phone call bar ---------- */
  var head = $("[data-head]"), bar = $("[data-callbar]");
  var heroEl = $(".top") || $(".page-hero") || $("main > section");
  var formOnScreen = false, lastY = w.scrollY, ticking = false;
  var onScroll = function () {
    ticking = false;
    var y = w.scrollY, heroEnd = heroEl ? heroEl.offsetTop + heroEl.offsetHeight : 500;
    if (head) {
      var stuck = y > Math.min(heroEnd, 420);
      head.classList.toggle("stuck", stuck);
      head.classList.toggle("hide", stuck && phoneMQ.matches && y > lastY + 2 && !d.body.classList.contains("menu-open"));
    }
    if (bar) bar.classList.toggle("on", y > heroEnd - 80 && !formOnScreen);
    lastY = y;
  };
  w.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  if (IO) {
    var formIO = new IntersectionObserver(function (es) { formOnScreen = es.some(function (e) { return e.isIntersecting; }); onScroll(); });
    $$(".quote-form, .site-footer .foot-cta").forEach(function (f) { formIO.observe(f); });
  }
  onScroll();

  /* ---------- scroll-in reveals (only for blocks below the first screen, so nothing above the fold ever hides) ---------- */
  var rvSel = "[data-rv], .section-head, .card, .area-card, .related-card, .faq-list, .why-item, .step, .material, .cta-band > .container, .two-col, .carousel, .post-card";
  if (IO) {
    var rvIO = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); rvIO.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    var vh = w.innerHeight;
    $$(rvSel).forEach(function (el, i) {
      if (el.getBoundingClientRect().top < vh * 0.92) return;
      if (!el.style.getPropertyValue("--d") && !el.hasAttribute("data-rv")) el.style.setProperty("--d", String(i % 4));
      el.classList.add("rv");
      rvIO.observe(el);
    });
  }

  /* ---------- ambient loops pause when their band is off screen ---------- */
  if (IO) {
    var ambIO = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle("paused", !e.isIntersecting); }); });
    $$("[data-amb], .page-hero").forEach(function (el) { ambIO.observe(el); });
  }

  /* ---------- filmstrip carousel (homepage): arrows, keys, counter, autoplay with a Pause button (SITE_RULES 8.7, 9.8) ---------- */
  $$("[data-strip]").forEach(function (strip) {
    var sec = strip.closest("section") || d;
    var track = $("[data-track]", strip), shots = $$(".shot", track);
    var count = $("[data-count]", sec), fill = $("[data-bar]", sec), pb = $("[data-pause]", sec);
    var n = shots.length, cur = 0, paused = false, hover = false, visible = false, gliding = 0;
    var period = Number(strip.getAttribute("data-autoplay")) || 0;
    var pad = function () { return parseFloat(getComputedStyle(track).paddingLeft) || 0; };
    var setCur = function (k) {
      cur = (k + n) % n;
      shots.forEach(function (f, i) { f.classList.toggle("cur", i === cur); });
      if (count) count.innerHTML = String(cur + 1).padStart(2, "0") + "<span>/ " + n + "</span>";
      if (fill) fill.style.transform = "scaleX(" + (cur + 1) / n + ")";
    };
    var go = function (k) {
      setCur(k);
      gliding = Date.now();
      track.scrollTo({ left: shots[cur].offsetLeft - track.offsetLeft - pad(), behavior: "smooth" });
    };
    $("[data-prev]", sec).addEventListener("click", function () { go(cur - 1); });
    $("[data-next]", sec).addEventListener("click", function () { go(cur + 1); });
    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") { e.preventDefault(); go(cur + 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(cur - 1); }
    });
    // a manual swipe or scroll moves the counter too
    var st;
    track.addEventListener("scroll", function () {
      clearTimeout(st);
      st = setTimeout(function () {
        if (Date.now() - gliding < 900) return;
        var x = track.scrollLeft + pad(), best = 0, bd = 1e9;
        shots.forEach(function (f, i) { var dd = Math.abs(f.offsetLeft - track.offsetLeft - x); if (dd < bd) { bd = dd; best = i; } });
        setCur(best);
      }, 140);
    }, { passive: true });
    var setPaused = function (p) { paused = p; if (pb) { pb.textContent = p ? "Play" : "Pause"; pb.setAttribute("aria-pressed", String(p)); } };
    if (pb) pb.addEventListener("click", function () { setPaused(!paused); });
    ["pointerenter", "focusin", "touchstart"].forEach(function (ev) { strip.addEventListener(ev, function () { hover = true; }, { passive: true }); });
    ["pointerleave", "focusout"].forEach(function (ev) { strip.addEventListener(ev, function () { hover = false; }); });
    strip.addEventListener("touchend", function () { setTimeout(function () { hover = false; }, 4000); }, { passive: true });
    if (IO) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; }).observe(strip);
    setCur(0);
    if (period) setInterval(function () { if (!paused && !hover && visible && !d.hidden) go(cur + 1); }, period);
  });

  /* ---------- the smaller photo strips inside service pages (.carousel) ---------- */
  $$(".carousel").forEach(function (c) {
    var track = $(".carousel-track", c); if (!track) return;
    var step = function (dir) {
      var slide = $(".carousel-slide", track), amt = slide ? slide.getBoundingClientRect().width + 16 : 300;
      var max = track.scrollWidth - track.clientWidth;
      if (dir > 0 && track.scrollLeft >= max - 10) track.scrollTo({ left: 0, behavior: "smooth" });
      else if (dir < 0 && track.scrollLeft <= 10) track.scrollTo({ left: max, behavior: "smooth" });
      else track.scrollBy({ left: dir * amt, behavior: "smooth" });
    };
    var p = $(".carousel-prev", c), nx = $(".carousel-next", c);
    if (p) p.addEventListener("click", function () { step(-1); });
    if (nx) nx.addEventListener("click", function () { step(1); });
    track.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") { e.preventDefault(); step(1); } if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); } });
  });

  /* ---------- the signature: centre cross + hex grout traced once over the rectified floor photo ---------- */
  var sig = $("[data-sig]");
  if (sig && !phoneMQ.matches) {
    // hero-hex-floor.jpg (1400 x 823) is perspective-corrected: a hex centre at (321.1, 237.3), side 94.77 px.
    var s = 94.77, hw = Math.sqrt(3) * s, ox = 321.1, oy = 237.3, NS = "http://www.w3.org/2000/svg", C = [731.4, 379.5];
    var grout = $(".grout", sig), cross = $(".cross", sig), frag = d.createDocumentFragment();
    for (var j = -3; j <= 5; j++) for (var i = -3; i <= 8; i++) {
      var cx = ox + i * hw + ((j & 1) ? hw / 2 : 0), cy = oy + j * 1.5 * s;
      if (cx < -hw || cx > 1400 + hw || cy < -2 * s || cy > 823 + 2 * s) continue;
      var pts = [[0, -s], [hw / 2, -s / 2], [hw / 2, s / 2], [0, s], [-hw / 2, s / 2], [-hw / 2, -s / 2]].map(function (q) { return (cx + q[0]).toFixed(1) + " " + (cy + q[1]).toFixed(1); });
      var path = d.createElementNS(NS, "path"); path.setAttribute("d", "M" + pts.join("L") + "Z"); path.setAttribute("pathLength", "1");
      path.style.setProperty("--i", String(Math.round(Math.hypot(cx - C[0], cy - C[1]) / 150)));
      frag.appendChild(path);
    }
    grout.appendChild(frag);
    [[C[0], -10, C[0], 840], [-10, C[1], 1410, C[1]]].forEach(function (a) {
      var l = d.createElementNS(NS, "line"); ["x1", "y1", "x2", "y2"].forEach(function (k, n) { l.setAttribute(k, a[n]); }); l.setAttribute("pathLength", "1"); cross.appendChild(l);
    });
    var dot = d.createElementNS(NS, "rect"); dot.setAttribute("class", "dot");
    dot.setAttribute("x", C[0] - 13); dot.setAttribute("y", C[1] - 13); dot.setAttribute("width", 26); dot.setAttribute("height", 26); dot.setAttribute("transform", "rotate(45 " + C[0] + " " + C[1] + ")");
    cross.appendChild(dot);
    var cap = $("[data-sigcap]"), played = false;
    var play = function () { if (played) return; played = true; sig.classList.add("play"); setTimeout(function () { if (cap) cap.classList.add("on"); }, 2100); };
    var start = function () { setTimeout(play, 1300); };
    if (IO) { var sIO = new IntersectionObserver(function (es) { if (es[0].isIntersecting) { sIO.disconnect(); start(); } }, { threshold: 0.4 }); sIO.observe(sig); } else start();
  }

  /* ---------- the mosaic: a slow parallax and a slight tilt toward the pointer (desktop, fine pointer) ---------- */
  var mosaic = $("[data-mosaic]");
  if (mosaic && fine.matches && !phoneMQ.matches) {
    var hero = mosaic.closest(".hero"), tx = 0, ty = 0, sy = 0, raf = 0;
    var apply = function () { raf = 0; mosaic.style.transform = "translate3d(0," + (sy * -0.06).toFixed(1) + "px,0) rotateX(" + ty.toFixed(2) + "deg) rotateY(" + tx.toFixed(2) + "deg)"; };
    var ask = function () { if (!raf) raf = requestAnimationFrame(apply); };
    w.addEventListener("scroll", function () { sy = Math.min(w.scrollY, 900); ask(); }, { passive: true });
    hero.addEventListener("pointermove", function (e) { var r = hero.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - 0.5) * 2.4; ty = -((e.clientY - r.top) / r.height - 0.5) * 1.8; ask(); });
    hero.addEventListener("pointerleave", function () { tx = ty = 0; ask(); });
  }

  /* ---------- a soft brass glare that follows the pointer on cards ---------- */
  if (fine.matches) {
    d.addEventListener("pointermove", function (e) {
      var c = e.target.closest && e.target.closest(".rcard,.svc,.card"); if (!c) return;
      var r = c.getBoundingClientRect(); c.style.setProperty("--mx", (e.clientX - r.left) + "px"); c.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  }

  /* ---------- the jump link hands focus to the form ---------- */
  $$("[data-jump]").forEach(function (a) {
    a.addEventListener("click", function () { setTimeout(function () { var f = $("#qf-name"); if (f) f.focus({ preventScroll: true }); }, 600); });
  });

  /* ---------- GA4: every phone link fires call_click with its placement (SITE_RULES 2.7, 6.3) ---------- */
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest('a[href^="tel:"]'); if (!a) return;
    var sec = a.closest("section[id], header, footer, nav");
    var label = a.getAttribute("data-cta") || (sec ? (sec.id || sec.tagName.toLowerCase()) : "content");
    gtagEvent("call_click", { event_category: "engagement", event_label: (location.pathname.replace(/\W+/g, "_") + "_" + label).replace(/^_+/, "") });
  });

  /* ---------- Calendly: loaded only when someone opens or reaches it ---------- */
  var calLoaded = false;
  var loadCal = function () {
    if (calLoaded) return; calLoaded = true;
    var sc = d.createElement("script"); sc.src = "https://assets.calendly.com/assets/external/widget.js"; sc.async = true; d.body.appendChild(sc);
  };
  $$("[data-calendly-details]").forEach(function (det) { det.addEventListener("toggle", function () { if (det.open) loadCal(); }); });
  var cals = $$(".calendly-inline-widget").filter(function (el) { return !el.closest("details"); });
  if (cals.length) {
    if (IO) { var cIO = new IntersectionObserver(function (es) { if (es.some(function (e) { return e.isIntersecting; })) { cIO.disconnect(); loadCal(); } }, { rootMargin: "400px" }); cals.forEach(function (c) { cIO.observe(c); }); }
    else loadCal();
  }

  /* ---------- the quote form: opens step by step; page field; quote_form_submit after a valid submit ---------- */
  $$(".quote-form").forEach(function (form) {
    var pageField = form.querySelector('[name="page"]');
    if (pageField) pageField.value = location.pathname + location.search;
    form.addEventListener("submit", function (e) {
      if (e.defaultPrevented) return;
      if (form.checkValidity()) gtagEvent("quote_form_submit", { event_category: "lead", event_label: location.pathname });
    });

    var steps = $$(".qf-step", form);
    if (steps.length < 2) return;
    var LABELS = ["Contact Info", "How To Reach You", "Your Project", "Project Details"];
    var progress = d.createElement("div"); progress.className = "qf-progress"; progress.setAttribute("aria-live", "polite");
    var pLabel = d.createElement("span"), pTrack = d.createElement("span"), pBar = d.createElement("span");
    pTrack.className = "qf-progress-track"; pBar.className = "qf-progress-bar";
    pTrack.appendChild(pBar); progress.appendChild(pLabel); progress.appendChild(pTrack);
    form.insertBefore(progress, steps[0]);
    // A hidden required field would block submission without a visible error, so required is lifted while a step is hidden.
    var setHidden = function (step, hidden) {
      step.hidden = hidden;
      $$("[required], [data-was-required]", step).forEach(function (f) {
        if (hidden) { f.setAttribute("data-was-required", ""); f.removeAttribute("required"); }
        else if (f.hasAttribute("data-was-required")) { f.removeAttribute("data-was-required"); f.setAttribute("required", ""); }
      });
    };
    steps.forEach(function (st, i) { if (i > 0) setHidden(st, true); });
    var filled = function (el) { return !!el && el.value.trim() !== ""; };
    var done = function (i) {
      if (i === 0) { var ph = form.querySelector('[name="phone"]'); return filled(form.querySelector('[name="name"]')) && (ph ? ph.value.replace(/\D/g, "").length >= 7 : false); }
      if (i === 1) { var em = form.querySelector('[name="email"]'); return filled(em) && em.checkValidity(); }
      if (i === 2) return !!form.querySelector('[name="service[]"]:checked');
      return true;
    };
    var shown = function () { return steps.filter(function (st) { return !st.hidden; }).length; };
    var update = function () { var k = shown(); pLabel.textContent = "Step " + k + " of " + steps.length + " · " + (LABELS[k - 1] || LABELS[LABELS.length - 1]); pBar.style.width = Math.round(k / steps.length * 100) + "%"; };
    var reveal = function (st) { setHidden(st, false); st.classList.add("is-entering"); st.addEventListener("animationend", function () { st.classList.remove("is-entering"); }, { once: true }); };
    var sync = function () { for (var i = 0; i < steps.length - 1; i++) { if (steps[i].hidden) break; if (done(i) && steps[i + 1].hidden) reveal(steps[i + 1]); } update(); };
    form.addEventListener("input", sync);
    form.addEventListener("change", sync);
    form.addEventListener("submit", function (e) {
      if (steps.some(function (st) { return st.hidden; })) {
        e.preventDefault();
        steps.forEach(function (st) { if (st.hidden) reveal(st); }); update();
        setTimeout(function () { form.reportValidity(); }, 0);
      }
    }, true);
    update(); sync();
  });
})();
