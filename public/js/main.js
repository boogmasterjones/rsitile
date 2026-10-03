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

  document.querySelectorAll(".carousel").forEach(function (carousel) {
    var track = carousel.querySelector(".carousel-track");
    if (!track) return;

    var prevBtn = carousel.querySelector(".carousel-prev");
    var nextBtn = carousel.querySelector(".carousel-next");
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var scrollByAmount = function (direction) {
      var slide = track.querySelector(".carousel-slide");
      var gap = 20;
      var amount = slide ? slide.getBoundingClientRect().width + gap : 300;
      var maxScroll = track.scrollWidth - track.clientWidth;
      var atEnd = track.scrollLeft >= maxScroll - 10;
      var atStart = track.scrollLeft <= 10;

      if (direction > 0 && atEnd) {
        track.scrollTo({ left: 0, behavior: reduceMotion ? "auto" : "smooth" });
      } else if (direction < 0 && atStart) {
        track.scrollTo({ left: maxScroll, behavior: reduceMotion ? "auto" : "smooth" });
      } else {
        track.scrollBy({ left: direction * amount, behavior: reduceMotion ? "auto" : "smooth" });
      }
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
  });

  // The header stays off-canvas over the hero until the visitor scrolls,
  // then slides in as a normal fixed nav bar.
  var siteHeader = document.querySelector(".site-header");
  if (siteHeader) {
    var updateHeaderVisibility = function () {
      siteHeader.classList.toggle("is-visible", window.scrollY > 10);
    };
    window.addEventListener("scroll", updateHeaderVisibility, { passive: true });
    updateHeaderVisibility();
  }

  /* ---------- Progressive quote form ----------
     The form opens as just name + phone and reveals the next group each time
     the visitor finishes the one before it, so it never looks like a wall of
     fields. Without JS every step stays visible and the form works as a plain
     single-page form. */
  document.querySelectorAll(".quote-form").forEach(function (form) {
    var steps = Array.prototype.slice.call(form.querySelectorAll(".qf-step"));
    if (steps.length < 2) return;

    var LABELS = ["Contact Info", "How To Reach You", "Your Project", "Project Details"];

    var progress = document.createElement("div");
    progress.className = "qf-progress";
    var progressLabel = document.createElement("span");
    var progressTrack = document.createElement("span");
    progressTrack.className = "qf-progress-track";
    var progressBar = document.createElement("span");
    progressBar.className = "qf-progress-bar";
    progressTrack.appendChild(progressBar);
    progress.appendChild(progressLabel);
    progress.appendChild(progressTrack);
    form.insertBefore(progress, steps[0]);

    // A hidden `required` field makes the browser block submission without ever
    // firing a submit event (it can't focus what it can't show), so required is
    // lifted while a step is hidden and restored the moment it's revealed.
    var setStepHidden = function (step, hidden) {
      step.hidden = hidden;
      step.querySelectorAll("[required], [data-was-required]").forEach(function (field) {
        if (hidden) {
          field.setAttribute("data-was-required", "");
          field.removeAttribute("required");
        } else if (field.hasAttribute("data-was-required")) {
          field.removeAttribute("data-was-required");
          field.setAttribute("required", "");
        }
      });
    };

    steps.forEach(function (step, i) {
      if (i > 0) setStepHidden(step, true);
    });

    var filled = function (el) {
      return !!el && el.value.trim() !== "";
    };

    // A step unlocks the next one once the visitor has given it what it needs.
    var isComplete = function (index) {
      if (index === 0) {
        var name = form.querySelector('[name="name"]');
        var phone = form.querySelector('[name="phone"]');
        var digits = phone ? phone.value.replace(/\D/g, "") : "";
        return filled(name) && digits.length >= 7;
      }
      if (index === 1) {
        var email = form.querySelector('[name="email"]');
        return filled(email) && email.checkValidity();
      }
      if (index === 2) {
        return !!form.querySelector('[name="service[]"]:checked');
      }
      return true;
    };

    var revealedCount = function () {
      return steps.filter(function (step) {
        return !step.hidden;
      }).length;
    };

    var updateProgress = function () {
      var shown = revealedCount();
      var label = LABELS[shown - 1] || LABELS[LABELS.length - 1];
      progressLabel.textContent = "Step " + shown + " of " + steps.length + " · " + label;
      progressBar.style.width = Math.round((shown / steps.length) * 100) + "%";
    };

    var reveal = function (step) {
      setStepHidden(step, false);
      step.classList.add("is-entering");
      step.addEventListener(
        "animationend",
        function () {
          step.classList.remove("is-entering");
        },
        { once: true }
      );
    };

    // Walk forward from the top: each completed step opens the one after it,
    // and steps never collapse again once shown.
    var sync = function () {
      for (var i = 0; i < steps.length - 1; i++) {
        if (steps[i].hidden) break;
        if (isComplete(i) && steps[i + 1].hidden) {
          reveal(steps[i + 1]);
        }
      }
      updateProgress();
    };

    var revealAll = function () {
      steps.forEach(function (step) {
        if (step.hidden) reveal(step);
      });
      updateProgress();
    };

    form.addEventListener("input", sync);
    form.addEventListener("change", sync);

    // Submitting early (or pressing Enter) shouldn't fail silently on a
    // required field that's still hidden — open everything, then validate.
    form.addEventListener("submit", function (e) {
      if (steps.some(function (step) { return step.hidden; })) {
        e.preventDefault();
        revealAll();
        // Let the just-revealed fields lay out before the browser tries to
        // focus whichever one is invalid. (setTimeout rather than rAF, which
        // is paused while the tab is in the background.)
        setTimeout(function () {
          form.reportValidity();
        }, 0);
      }
    });

    updateProgress();
    // Browsers can restore or autofill values before this runs.
    sync();
  });

  var yearEl = document.querySelector("[data-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();
