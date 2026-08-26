(function () {
  "use strict";

  /* Wire up every [data-wa] element to its contextual WhatsApp link */
  document.querySelectorAll("[data-wa]").forEach(function (el) {
    var ctx = el.getAttribute("data-wa") || "geral";
    el.setAttribute("href", window.PAPERMOON.waLink(ctx));
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
    el.addEventListener("click", function () {
      if (typeof window.gtag === "function") {
        window.gtag("event", "whatsapp_click", {
          context: ctx,
          location: el.getAttribute("data-wa-location") || "unknown",
        });
      }
    });
  });

  /* Header: solid/blur state on scroll */
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile nav */
  var toggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".nav-mobile");
  if (toggle && nav) {
    var closeNav = function () {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      nav.classList.toggle("is-open", !open);
      document.body.style.overflow = open ? "" : "hidden";
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach(function (el, i) {
      el.style.setProperty("--i", i % 6);
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* Steps progress line (desktop) fills as the section scrolls through view */
  var stepsSection = document.querySelector(".steps-wrap");
  var progressSpan = document.querySelector(".steps-progress span");
  if (stepsSection && progressSpan) {
    var updateProgress = function () {
      var rect = stepsSection.getBoundingClientRect();
      var vh = window.innerHeight;
      var total = rect.height + vh * 0.5;
      var passed = vh * 0.85 - rect.top;
      var pct = Math.min(1, Math.max(0, passed / total));
      progressSpan.style.height = (pct * 100) + "%";
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
  }

  /* Lightbox for gallery */
  var lightbox = document.querySelector(".lightbox");
  if (lightbox) {
    var lightboxImg = lightbox.querySelector("img");
    var lightboxCaption = lightbox.querySelector(".lightbox-caption");
    var lastFocused = null;

    var openLightbox = function (trigger) {
      var img = trigger.querySelector("img");
      if (!img) return;
      lastFocused = trigger;
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || "";
      lightboxCaption.textContent = trigger.getAttribute("data-caption") || "";
      lightbox.classList.add("is-open");
      lightbox.querySelector(".lightbox-close").focus();
      document.body.style.overflow = "hidden";
    };

    var closeLightbox = function () {
      lightbox.classList.remove("is-open");
      document.body.style.overflow = "";
      if (lastFocused) lastFocused.focus();
    };

    document.querySelectorAll(".gallery-trigger").forEach(function (btn) {
      btn.addEventListener("click", function () { openLightbox(btn); });
    });
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  /* Current year in footer */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
