const topbar = document.querySelector("[data-topbar]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navLinks = document.querySelector("[data-nav-links]");
const revealNodes = document.querySelectorAll(".reveal");
const revealSteps = document.querySelectorAll(".reveal-step");
const hero = document.querySelector("[data-hero]");
const themeModeButtons = document.querySelectorAll("[data-theme-value]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
let heroTargetProgress = 0;
let heroFastProgress = 0;
let heroMidProgress = 0;
let heroSlowProgress = 0;
let rafId = 0;
let themeTransitionTimer = 0;

const closeMenu = () => {
  document.body.classList.remove("menu-open");
};

const applyTheme = (mode, animated = false) => {
  const resolvedTheme = mode === "auto" ? (systemTheme.matches ? "dark" : "light") : mode;

  document.body.dataset.theme = resolvedTheme;
  document.body.dataset.themeMode = mode;
  themeModeButtons.forEach((button) => {
    const isActive = button.dataset.themeValue === mode;
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", resolvedTheme === "light" ? "#f5eee4" : "#07111f");
  }
  if (animated && !reduceMotion.matches) {
    document.body.classList.add("theme-transitioning");
    window.clearTimeout(themeTransitionTimer);
    themeTransitionTimer = window.setTimeout(() => {
      document.body.classList.remove("theme-transitioning");
    }, 760);
  }
};

const syncTopbar = () => {
  if (!topbar) return;
  topbar.classList.toggle("is-compact", window.scrollY > 36);
};

const syncHeroMotion = () => {
  if (!hero) return;

  if (reduceMotion.matches) {
    hero.style.setProperty("--hero-progress", "0");
    hero.style.setProperty("--hero-progress-mid", "0");
    hero.style.setProperty("--hero-progress-slow", "0");
    return;
  }

  const rect = hero.getBoundingClientRect();
  const distance = Math.max(rect.height * 0.72, 1);
  heroTargetProgress = Math.min(Math.max(-rect.top / distance, 0), 1);

  if (!rafId) {
    rafId = window.requestAnimationFrame(stepHeroMotion);
  }
};

const stepHeroMotion = () => {
  const lerp = (current, target, factor) => current + (target - current) * factor;

  heroFastProgress = lerp(heroFastProgress, heroTargetProgress, 0.22);
  heroMidProgress = lerp(heroMidProgress, heroTargetProgress, 0.14);
  heroSlowProgress = lerp(heroSlowProgress, heroTargetProgress, 0.09);

  hero.style.setProperty("--hero-progress", heroFastProgress.toFixed(3));
  hero.style.setProperty("--hero-progress-mid", heroMidProgress.toFixed(3));
  hero.style.setProperty("--hero-progress-slow", heroSlowProgress.toFixed(3));

  const settled =
    Math.abs(heroFastProgress - heroTargetProgress) < 0.002 &&
    Math.abs(heroMidProgress - heroTargetProgress) < 0.002 &&
    Math.abs(heroSlowProgress - heroTargetProgress) < 0.002;

  if (settled) {
    rafId = 0;
    return;
  }

  rafId = window.requestAnimationFrame(stepHeroMotion);
};

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

const revealStepObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const index = Number(entry.target.dataset.revealIndex || 0);
      entry.target.style.transitionDelay = `${index * 150}ms`;
      entry.target.classList.add("is-visible");
      revealStepObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -12% 0px" }
);

revealNodes.forEach((node) => revealObserver.observe(node));
revealSteps.forEach((node, index) => {
  node.dataset.revealIndex = String(index % 3);
  revealStepObserver.observe(node);
});

const savedThemeMode = window.localStorage.getItem("theme-preference");
if (savedThemeMode === "light" || savedThemeMode === "dark" || savedThemeMode === "auto") {
  applyTheme(savedThemeMode, false);
} else {
  applyTheme("auto", false);
}

syncTopbar();
syncHeroMotion();

window.addEventListener(
  "scroll",
  () => {
    syncTopbar();
    syncHeroMotion();
  },
  { passive: true }
);

if (menuToggle) {
  menuToggle.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
}

themeModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextMode = button.dataset.themeValue;
    applyTheme(nextMode, true);
    window.localStorage.setItem("theme-preference", nextMode);
  });
});

if (navLinks) {
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });
}

window.addEventListener("resize", () => {
  syncHeroMotion();
  if (window.innerWidth > 760) {
    closeMenu();
  }
});

reduceMotion.addEventListener("change", () => {
  syncHeroMotion();
});

systemTheme.addEventListener("change", () => {
  if (document.body.dataset.themeMode === "auto") {
    applyTheme("auto", true);
  }
});
