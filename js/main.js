/* =========================================================
   main.js — renders all content from data.js, wires up
   countdown · AOS · gallery · gate · blessings · music
   Every block is wrapped in safe() so one failure can never
   break the rest of the page.
   ========================================================= */

(function () {
  "use strict";

  /* Keep <html class="no-js"> until AOS is confirmed running — that class is
     what forces [data-aos] elements visible. Removing it early is exactly what
     made the whole page invisible when aos.js failed to load. */
  var html = document.documentElement;

  function revealEverything() {
    html.classList.add("aos-off");
    html.classList.remove("no-js");
  }
  /* last-resort failsafe: never leave the visitor staring at a blank page */
  setTimeout(function () {
    if (html.classList.contains("no-js")) {
      console.warn("AOS not ready — forcing all content visible.");
      revealEverything();
    }
  }, 4000);

  var D = window.WEDDING || {};
  var $ = function (id) { return document.getElementById(id); };

  function safe(label, fn) {
    try { fn(); }
    catch (e) { if (window.console) console.warn(label + " failed:", e && e.message); }
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }
  function imgTag(src, alt) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt || "") + '" loading="lazy" ' +
      'onerror="this.remove()" />';
  }

  /* ---------------- NAV, HERO, GATE TEXT ---------------- */
  safe("brand", function () {
    if ($("navBrand")) $("navBrand").textContent = D.brand || "";
    if ($("heroBrand")) $("heroBrand").textContent = D.tagline || "";
    if ($("heroGroom")) $("heroGroom").textContent = (D.groom || "").toUpperCase();
    if ($("heroBride")) $("heroBride").textContent = (D.bride || "").toUpperCase();
    if ($("heroDate")) $("heroDate").textContent = D.dateLabel || "";
    if ($("heroMuhurtham")) $("heroMuhurtham").textContent = D.muhurtham || "";
    if ($("footerNote")) $("footerNote").textContent = (D.footerNote || "") + "  " + (D.hashtag || "");
    document.title = (D.brand || "Wedding") + " | Wedding Invitation";
  });

  safe("gate", function () {
    var g = D.gate || {};
    if ($("gateTitle")) $("gateTitle").textContent = g.title || "Swagatam";
    if ($("gateTelugu")) $("gateTelugu").textContent = g.telugu || "";
    if ($("gateGreeting")) $("gateGreeting").textContent = g.greeting || "";
    if ($("gateBtnText")) $("gateBtnText").textContent = g.button || "Enter Invitation";
    if (g.image && $("gateImg")) $("gateImg").src = g.image;
    var heroImg = document.createElement("img");
    heroImg.className = "hero-img";
    heroImg.alt = "";
    heroImg.onerror = function () { this.remove(); };
    if ((D.hero || {}).image) heroImg.src = D.hero.image;
    var media = $("heroMedia");
    if (media && (D.hero || {}).image) media.insertBefore(heroImg, media.firstChild);
  });

  safe("blessings", function () {
    var list = D.blessings || [];
    var stage = document.querySelectorAll("#blessStage .bless-fly");
    var bar = document.querySelectorAll("#blessBar span");
    list.forEach(function (b, i) {
      if (stage[i]) stage[i].textContent = b;
      if (bar[i]) bar[i].textContent = b;
    });
  });

  /* ---------------- COUNTDOWN ---------------- */
  safe("countdown", function () {
    if (!D.datetime) return;
    var target = new Date(D.datetime).getTime();
    var dEl = $("cdDays"), hEl = $("cdHours"), mEl = $("cdMins"), sEl = $("cdSecs");
    function pad(n) { return ("0" + n).slice(-2); }
    function tick() {
      var diff = Math.max(0, target - Date.now());
      var dd = Math.floor(diff / 864e5); diff %= 864e5;
      var hh = Math.floor(diff / 36e5);  diff %= 36e5;
      var mm = Math.floor(diff / 6e4);
      var ss = Math.floor((diff % 6e4) / 1e3);
      if (dEl) dEl.textContent = pad(dd);
      if (hEl) hEl.textContent = pad(hh);
      if (mEl) mEl.textContent = pad(mm);
      if (sEl) sEl.textContent = pad(ss);
    }
    tick();
    setInterval(tick, 1000);
  });

  safe("saveDate", function () {
    var b = $("saveBtn"); if (!b || !D.datetime) return;
    var start = new Date(D.datetime);
    var end = new Date(start.getTime() + 5 * 36e5);
    function z(d) { return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, ""); }
    b.href = "https://calendar.google.com/calendar/render?action=TEMPLATE"
      + "&text=" + encodeURIComponent((D.groom || "") + " & " + (D.bride || "") + " Wedding")
      + "&dates=" + z(start) + "/" + z(end)
      + "&details=" + encodeURIComponent((D.muhurtham || "") + " — " + ((D.venues || [])[0] || {}).name)
      + "&location=" + encodeURIComponent(((D.venues || [])[0] || {}).address || "");
  });

  /* ---------------- COUPLE ---------------- */
  safe("couple", function () {
    var row = $("coupleRow"); if (!row) return;
    row.innerHTML = (D.people || []).map(function (p, i) {
      var flip = i % 2 === 1;
      return '' +
      '<div class="col-12 col-lg-6" data-aos="fade-' + (flip ? "left" : "right") + '" data-aos-delay="' + (i * 120) + '">' +
        '<article class="person-card">' +
          '<div class="person-frame">' +
            '<div class="person-photo">' +
              imgTag(p.photo, p.name) +
              '<span class="initials">' + esc(p.initials || "") + '</span>' +
            '</div>' +
            '<span class="person-badge">' + esc(p.badge || "") + '</span>' +
          '</div>' +
          '<div class="person-copy">' +
            '<h3>' + esc(p.name) + '</h3>' +
            '<p class="person-telugu">' + esc(p.telugu || "") + '</p>' +
            '<p class="person-parents">' + esc(p.relation || "") + '<br>' +
              '<strong>' + esc(p.father || "") + '</strong> &amp;<br>' +
              '<strong>' + esc(p.mother || "") + '</strong>' +
            '</p>' +
            '<p class="person-family">' + esc(p.family || "") + '</p>' +
          '</div>' +
        '</article>' +
      '</div>';
    }).join("");
  });

  /* ---------------- CELEBRATIONS ---------------- */
  safe("celebrations", function () {
    var row = $("celebrationRow"); if (!row) return;
    row.innerHTML = (D.celebrations || []).map(function (c, i) {
      return '' +
      '<div class="col-12 col-md-6" data-aos="zoom-in" data-aos-delay="' + (i * 120) + '">' +
        '<article class="event-card' + (c.highlight ? " highlight" : "") + '">' +
          '<div class="event-icon">' + esc(c.icon || "✧") + '</div>' +
          '<h3>' + esc(c.title) + '</h3>' +
          '<p class="event-meta">' + esc(c.date) + ' • ' + esc(c.day || "") + ' • ' + esc(c.time) + '</p>' +
          '<p>' + esc(c.description) + '</p>' +
        '</article>' +
      '</div>';
    }).join("");
  });

  /* ---------------- TIMELINES ---------------- */
  safe("timelines", function () {
    var row = $("timelineRow"); if (!row) return;
    row.innerHTML = (D.timelines || []).map(function (t, i) {
      return '' +
      '<div class="col-12 col-lg-6" data-aos="fade-up" data-aos-delay="' + (i * 140) + '">' +
        '<div class="timeline-card">' +
          '<h3>' + esc(t.title) + '</h3>' +
          '<ul class="timeline">' +
            t.items.map(function (it) {
              return '<li class="' + (it.highlight ? "highlight" : "") + '">' +
                '<span class="tl-time">' + esc(it.time) + '</span>' +
                '<h4>' + esc(it.title) + '</h4>' +
                '<p>' + esc(it.text) + '</p></li>';
            }).join("") +
          '</ul>' +
        '</div>' +
      '</div>';
    }).join("");
  });

  /* ---------------- VENUES ---------------- */
  safe("venues", function () {
    var row = $("venueRow"); if (!row) return;
    row.innerHTML = (D.venues || []).map(function (v, i) {
      return '' +
      '<div class="col-12 col-lg-6" data-aos="fade-up" data-aos-delay="' + (i * 120) + '">' +
        '<article class="venue-card">' +
          '<div class="venue-banner">' +
            imgTag(v.image, v.name) +
            (v.icon ? '<span class="v-emoji">' + esc(v.icon) + '</span>' : "") +
            '<span class="venue-tag">' + esc(v.tag || "") + '</span>' +
          '</div>' +
          '<div class="venue-body">' +
            '<div class="row g-3 align-items-stretch">' +
              '<div class="col-12 col-md-6">' +
                '<h4>' + esc(v.name) + '</h4>' +
                '<p class="venue-address">' + esc(v.address) + '</p>' +
                '<ul class="venue-facts">' +
                  (v.facts || []).map(function (f) {
                    return '<li><i class="bi ' + esc(f.icon || "bi-geo-alt") + '"></i><span>' + esc(f.text) + '</span></li>';
                  }).join("") +
                '</ul>' +
                '<a class="maps-link" href="' + esc(v.mapsUrl) + '" target="_blank" rel="noopener">' +
                  'Open in Google Maps <i class="bi bi-arrow-up-right"></i></a>' +
              '</div>' +
              '<div class="col-12 col-md-6">' +
                '<div class="venue-map">' +
                  '<iframe title="' + esc(v.name) + ' map" loading="lazy" src="' + esc(v.mapEmbed) + '"></iframe>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</article>' +
      '</div>';
    }).join("");
  });

  /* ---------------- GALLERY ---------------- */
  safe("gallery", function () {
    var inner = $("galleryInner"); if (!inner) return;
    inner.innerHTML = (D.gallery || []).map(function (g, i) {
      return '' +
      '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
        '<div class="gallery-slide" data-index="' + i + '">' +
          imgTag(g.image, g.caption) +
        '</div>' +
      '</div>';
    }).join("");

    /* indicators + lightbox */
    var wrap = $("galleryCarousel");
    if (wrap && (D.gallery || []).length) {
      var ind = document.createElement("div");
      ind.className = "carousel-indicators position-static justify-content-center mt-3 mb-0";
      ind.innerHTML = (D.gallery || []).map(function (_, i) {
        return '<button type="button" data-bs-target="#galleryCarousel" data-bs-slide-to="' + i + '"' +
          (i === 0 ? ' class="active"' : "") + ' aria-label="Slide ' + (i + 1) + '"></button>';
      }).join("");
      wrap.appendChild(ind);
    }

    var lb = $("lightbox"), lbImg = $("lightboxImg");
    inner.addEventListener("click", function (e) {
      var slide = e.target.closest(".gallery-slide");
      if (!slide || !lb || !lbImg) return;
      var real = slide.querySelector("img");
      if (real && real.getAttribute("src")) { lbImg.src = real.src; lb.hidden = false; }
    });
    var close = $("lightboxClose");
    if (close) close.addEventListener("click", function () { lb.hidden = true; });
    if (lb) lb.addEventListener("click", function (e) { if (e.target === lb) lb.hidden = true; });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && lb) lb.hidden = true; });
  });

  /* ---------------- FAMILY ---------------- */
  safe("family", function () {
    var row = $("familyRow"); if (!row) return;
    row.innerHTML = (D.families || []).map(function (f, i) {
      return '' +
      '<div class="col-12 col-lg-6" data-aos="fade-' + (i % 2 ? "left" : "right") + '">' +
        '<article class="family-card">' +
          '<div class="family-photo">' + imgTag(f.image, f.names) + esc(f.initials || "") + '</div>' +
          '<div class="family-side">' + esc(f.side) + '</div>' +
          '<h3>' + esc(f.names) + '</h3>' +
          '<p>' + esc(f.family) + '</p>' +
          '<p class="mb-0">' + esc(f.message) + '</p>' +
        '</article>' +
      '</div>';
    }).join("");

    var g = $("gratitude");
    if (g) g.innerHTML = (D.gratitude || []).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join("");
  });

  /* ---------------- CONTACT ---------------- */
  safe("contact", function () {
    var row = $("contactRow"); if (!row) return;
    var msg = encodeURIComponent(D.waMessage || "");
    row.innerHTML = (D.contacts || []).map(function (c, i) {
      return '' +
      '<div class="col-12 col-md-6 col-lg-5" data-aos="zoom-in" data-aos-delay="' + (i * 120) + '">' +
        '<article class="contact-card">' +
          '<div class="contact-label">' + esc(c.label) + '</div>' +
          '<h3>' + esc(c.name) + '</h3>' +
          '<a class="phone" href="tel:' + esc(c.tel) + '"><i class="bi bi-telephone-fill me-1"></i>' + esc(c.phone) + '</a>' +
          '<div class="contact-place"><i class="bi bi-geo-alt me-1"></i>' + esc(c.place) + '</div>' +
          '<a class="wa-btn" href="https://wa.me/' + esc(c.whatsapp) + '?text=' + msg + '" target="_blank" rel="noopener">' +
            '<i class="bi bi-whatsapp"></i> WhatsApp</a>' +
        '</article>' +
      '</div>';
    }).join("");
  });

  /* hero no longer uses the rotating ॐ icon — block removed */

  /* navbar stays transparent at every scroll position */

  /* ---------------- ANCHOR SCROLL (capped duration) ---------------- */
  safe("anchors", function () {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.addEventListener("click", function (e) {
      var a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a) return;
      var id = a.getAttribute("href");
      if (!id || id === "#") return;
      var el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      var startY = window.pageYOffset;
      var targetY = el.getBoundingClientRect().top + startY - 72;
      if (targetY < 0) targetY = 0;
      if (reduce) { window.scrollTo(0, targetY); return; }
      var dur = 420, t0 = 0;
      function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / dur);
        var ease = 1 - Math.pow(1 - p, 3);
        window.scrollTo(0, startY + (targetY - startY) * ease);
        if (p < 1) window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    });
  });

  /* ---------------- MUSIC (35s clip, looping) ---------------- */
  var CLIP_START = 0;   /* seconds into the MP3 where the clip begins */
  var CLIP_LEN = 35;    /* clip length in seconds — loops forever */
  var song = null, musicStarted = false, muted = false;
  try {
    song = new Audio("audio/radha-ramanam.mp3");
    song.preload = "auto";
    song.volume = 0.9;
    /* hard loop inside the 35s window */
    song.addEventListener("timeupdate", function () {
      if (song.currentTime >= CLIP_START + CLIP_LEN) song.currentTime = CLIP_START;
    });
    song.addEventListener("ended", function () {
      song.currentTime = CLIP_START;
      var p = song.play(); if (p && p.catch) p.catch(function () {});
    });
  } catch (e) { song = null; /* audio unavailable — ignore */ }

  function startMusic() {
    if (!song || musicStarted) return;
    musicStarted = true;
    try {
      song.currentTime = CLIP_START;
      var p = song.play();
      if (p && p.catch) p.catch(function () { /* autoplay blocked — first user tap starts it */ });
    } catch (e) { /* audio blocked — ignore */ }
  }
  /* if autoplay was blocked, start the song on the visitor's first tap anywhere */
  document.addEventListener("pointerdown", function () {
    if (song && musicStarted && song.paused && !muted) {
      var p = song.play(); if (p && p.catch) p.catch(function () {});
    }
  });
  safe("mute", function () {
    var b = $("muteBtn"); if (!b) return;
    b.addEventListener("click", function () {
      muted = !muted;
      if (song) {
        song.muted = muted;
        if (!muted && song.paused && musicStarted) {
          var p = song.play(); if (p && p.catch) p.catch(function () {});
        }
      }
      b.innerHTML = '<i class="bi ' + (muted ? "bi-volume-mute-fill" : "bi-volume-up-fill") + '"></i>';
    });
  });

  /* ---------------- PETALS CANVAS ---------------- */
  function startPetals() {
    try {
      var c = $("petals");
      if (!c || !c.getContext) return;
      var ctx2d = c.getContext("2d");
      function size() { c.width = window.innerWidth; c.height = window.innerHeight; }
      size();
      var colors = ["#f2b72a", "#e9a7a7", "#ffe9b0"];
      var count = window.innerWidth < 768 ? 18 : 32;
      var P = [];
      for (var i = 0; i < count; i++) {
        P.push({
          x: Math.random() * c.width,
          y: Math.random() * -c.height,
          s: 4 + Math.random() * 7,
          v: 0.6 + Math.random() * 1.5,
          r: Math.random() * Math.PI,
          col: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      var last = 0;
      function loop(ts) {
        /* half frame-rate + pause while the tab is hidden */
        if (!document.hidden && ts - last > 32) {
          last = ts;
          ctx2d.clearRect(0, 0, c.width, c.height);
          P.forEach(function (p) {
            p.y += p.v; p.r += 0.02;
            if (p.y > c.height + 12) { p.y = -12; p.x = Math.random() * c.width; }
            ctx2d.save();
            ctx2d.translate(p.x, p.y);
            ctx2d.rotate(p.r);
            ctx2d.globalAlpha = 0.85;
            ctx2d.fillStyle = p.col;
            ctx2d.beginPath();
            ctx2d.ellipse(0, 0, p.s, p.s * 0.6, 0, 0, Math.PI * 2);
            ctx2d.fill();
            ctx2d.restore();
          });
        }
        window.requestAnimationFrame(loop);
      }
      window.requestAnimationFrame(loop);
      window.addEventListener("resize", size);
    } catch (e) { /* canvas blocked — ignore */ }
  }

  /* ---------------- GATE + BLESSINGS ---------------- */
  var opened = false;
  function openInvitation() {
    if (opened) return;
    opened = true;
    var gate = $("gate"), stage = $("blessStage"), bar = $("blessBar");
    if (gate) gate.classList.add("is-open");
    if (stage) stage.classList.add("on");
    startMusic();
    startPetals();
    document.querySelectorAll("#blessStage .bless-fly").forEach(function (el, i) {
      setTimeout(function () { el.classList.add("in"); }, 400 + i * 700);
    });
    setTimeout(function () {
      if (stage) stage.classList.remove("on");
      if (bar) bar.classList.add("show");
      document.body.classList.add("has-blessings");
    }, 400 + 3 * 700 + 900);
    if (window.AOS) window.AOS.refreshHard();
  }
  safe("enter", function () {
    var b = $("enterBtn");
    if (b) b.addEventListener("click", openInvitation);
  });
  /* never leave the visitor stuck behind the gate */
  setTimeout(function () {
    var g = $("gate");
    if (g && !g.classList.contains("is-open")) openInvitation();
  }, 15000);

  /* ---------------- AOS INIT ---------------- */
  safe("aos", function () {
    if (!window.AOS) {
      console.warn("aos.js not found — animations disabled, content stays visible.");
      revealEverything();
      return;
    }
    window.AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: function () {
        return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      }
    });
    /* AOS is live -> it is now safe to hand visibility control over to it */
    html.classList.remove("no-js");
    html.classList.add("js");
    setTimeout(function () { window.AOS.refresh(); }, 300);
  });

})();