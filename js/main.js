(function () {
  "use strict";

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  var isMobile = function () {
    return window.matchMedia("(max-width: 980px)").matches;
  };

  document.querySelectorAll(".nav-item > a").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var parent = link.parentElement;
      var hasDropdown = parent.querySelector(".dropdown");
      if (hasDropdown && isMobile()) {
        e.preventDefault();
        var isOpen = parent.classList.toggle("is-open");
        link.setAttribute("aria-expanded", String(isOpen));
      }
    });
  });

  document.addEventListener("click", function (e) {
    if (!nav || !toggle) return;
    if (!nav.classList.contains("is-open")) return;
    if (nav.contains(e.target) || toggle.contains(e.target)) return;
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  });

  var track = document.querySelector(".carousel-track");
  if (track) {
    var carousel = track.closest(".carousel");
    var prevBtn = document.querySelector(".carousel-prev");
    var nextBtn = document.querySelector(".carousel-next");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var GAP = 20;
    var SPEED_PX_PER_SEC = 45;

    if (carousel && !reduceMotion) {
      var originalWidth = track.scrollWidth;
      var originalSlides = Array.prototype.slice.call(track.children);
      originalSlides.forEach(function (slide) {
        var clone = slide.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });

      var distance = originalWidth + GAP;
      var duration = distance / SPEED_PX_PER_SEC;
      track.style.setProperty("--marquee-distance", distance + "px");
      track.style.setProperty("--marquee-duration", duration + "s");
      carousel.classList.add("carousel--auto");
      track.classList.add("is-marquee");
    }

    var scrollByAmount = function (direction) {
      var slide = track.querySelector(".carousel-slide");
      var gap = 20;
      var amount = slide ? slide.getBoundingClientRect().width + gap : 300;
      track.scrollBy({ left: direction * amount, behavior: reduceMotion ? "auto" : "smooth" });
    };

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        scrollByAmount(-1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        scrollByAmount(1);
      });
    }

    track.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByAmount(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByAmount(-1);
      }
    });
  }

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
