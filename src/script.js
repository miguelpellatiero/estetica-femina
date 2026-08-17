(function () {
  "use strict";

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Header scroll state ---- */
  var header = document.querySelector(".site-header");
  var toTop = document.getElementById("to-top");

  function onScroll() {
    var scrolled = window.scrollY > 12;
    if (header) header.classList.toggle("scrolled", scrolled);
    if (toTop) toTop.classList.toggle("visible", window.scrollY > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---- Mobile nav toggle ---- */
  var navToggle = document.getElementById("nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");

  if (navToggle && mobileNav) {
    navToggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    mobileNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mobileNav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- Hero staggered entrance ---- */
  window.requestAnimationFrame(function () {
    document.querySelectorAll(".hero .reveal").forEach(function (el) {
      el.classList.add("in");
    });
  });

  /* ---- Scroll reveal for the rest of the page ---- */
  var revealTargets = document.querySelectorAll(
    "section .reveal:not(.hero .reveal), .reveal-up"
  );

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("in");
    });
  }

  /* ---- Contact form (static demo — no backend) ---- */
  var form = document.getElementById("contact-form");
  var note = document.getElementById("form-note");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.name.value.trim();
      var phone = form.phone.value.trim();

      if (!name || !phone) {
        note.textContent = "Preencha nome e WhatsApp para continuar.";
        note.style.color = "var(--rose-soft)";
        return;
      }

      var service = form.service.value;
      var message = form.message.value.trim();

      var text =
        "Olá! Meu nome é " + name +
        ". Tenho interesse em: " + service +
        (message ? ". " + message : "") +
        ".";

      var whatsappUrl =
        "https://wa.me/5512981811492?text=" + encodeURIComponent(text);

      note.textContent = "Abrindo o WhatsApp para confirmar seu horário…";
      note.style.color = "var(--sage)";

      window.open(whatsappUrl, "_blank", "noopener");
      form.reset();
    });
  }
})();