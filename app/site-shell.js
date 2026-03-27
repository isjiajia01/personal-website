"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { siteCopy } from "./data/copy";
import { getArchivedProjects, getFeaturedProjects } from "./data/projects";
import { AboutSection, ArchiveSection, ContactSection, Header, HeroSection, WorkSection } from "./home-sections";

const themeValues = ["light", "auto", "dark"];

function resolveTheme(mode, prefersDark) {
  return mode === "auto" ? (prefersDark ? "dark" : "light") : mode;
}

export default function SiteShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [themeMode, setThemeMode] = useState("auto");
  const [resolvedTheme, setResolvedTheme] = useState("dark");
  const [timeLabel, setTimeLabel] = useState("");
  const [displayTimeLabel, setDisplayTimeLabel] = useState("");
  const heroSectionRef = useRef(null);
  const workSectionRef = useRef(null);
  const scrollEnergyRef = useRef(0);
  const releaseTimerRef = useRef(null);
  const touchStartYRef = useRef(null);
  const snapLockRef = useRef(false);
  const snapFrameRef = useRef(0);
  const snapClassTimerRef = useRef(null);

  const featuredProjects = useMemo(() => getFeaturedProjects(), []);
  const archivedProjects = useMemo(() => getArchivedProjects(), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = window.localStorage.getItem("theme-preference");
    const nextTheme = themeValues.includes(storedTheme) ? storedTheme : "auto";
    setThemeMode(nextTheme);
    setResolvedTheme(resolveTheme(nextTheme, media.matches));

    const syncTheme = (event) => {
      const persistedMode = window.localStorage.getItem("theme-preference");
      const activeMode = themeValues.includes(persistedMode) ? persistedMode : "auto";
      setResolvedTheme(resolveTheme(activeMode, event.matches));
    };

    media.addEventListener("change", syncTheme);
    return () => media.removeEventListener("change", syncTheme);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    setResolvedTheme(resolveTheme(themeMode, media.matches));
  }, [themeMode]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.dataset.theme = resolvedTheme;
    root.dataset.themeMode = themeMode;
    body.dataset.theme = resolvedTheme;
    body.dataset.themeMode = themeMode;
    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", resolvedTheme === "light" ? "#f4eadb" : "#09111d");
    }
  }, [resolvedTheme, themeMode]);

  useEffect(() => {
    const formatTime = () => {
      const value = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Europe/Copenhagen"
      }).format(new Date());
      setTimeLabel(value);
    };

    formatTime();
    const timer = window.setInterval(formatTime, 30000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let scrollFrame = 0;
    let compactValue = false;

    const onScroll = () => {
      const nextCompact = window.scrollY > 24;
      if (nextCompact !== compactValue) {
        compactValue = nextCompact;
        setCompact(nextCompact);
      }
    };
    const onResize = () => {
      if (window.innerWidth > 840) {
        setMenuOpen(false);
      }
      syncHeroSnapProgress();
    };

    const syncHeroSnapProgress = () => {
      const heroNode = heroSectionRef.current;
      const workNode = workSectionRef.current;
      if (!heroNode || !workNode) return;

      if (reducedMotion) {
        heroNode.style.setProperty("--hero-snap-progress", "0");
        return;
      }

      const start = 0;
      const end = Math.max(workNode.offsetTop - window.innerHeight * 0.72, 1);
      const progress = Math.min(Math.max((window.scrollY - start) / end, 0), 1);
      heroNode.style.setProperty("--hero-snap-progress", progress.toFixed(3));
    };

    const handleScroll = () => {
      if (scrollFrame) return;
      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = 0;
        onScroll();
        syncHeroSnapProgress();
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      if (scrollFrame) {
        window.cancelAnimationFrame(scrollFrame);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (!timeLabel) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setDisplayTimeLabel(timeLabel);
      return;
    }

    const scrambleChars = "0123456789:APM ";
    let frame = 0;
    const extraFrames = 6;
    const totalFrames = timeLabel.length + extraFrames;

    const timer = window.setInterval(() => {
      const revealCount = Math.max(0, frame - 2);
      const nextLabel = timeLabel
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (index < revealCount) return char;
          return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
        })
        .join("");

      setDisplayTimeLabel(nextLabel);
      frame += 1;

      if (frame > totalFrames) {
        window.clearInterval(timer);
        setDisplayTimeLabel(timeLabel);
      }
    }, 42);

    return () => window.clearInterval(timer);
  }, [timeLabel]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const heroNode = heroSectionRef.current;
    const workNode = workSectionRef.current;
    if (!heroNode || !workNode) return;

    const releaseEnergy = () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }

      releaseTimerRef.current = window.setTimeout(() => {
        scrollEnergyRef.current = 0;
      }, 180);
    };

    const smoothScrollTo = (targetY, duration = 860) => {
      const startY = window.scrollY;
      const distance = targetY - startY;
      const startTime = performance.now();

      const easeOutQuint = (value) => 1 - Math.pow(1 - value, 5);

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeOutQuint(progress);
        window.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          snapFrameRef.current = window.requestAnimationFrame(step);
        }
      };

      snapFrameRef.current = window.requestAnimationFrame(step);
    };

    const triggerWorkArrivalCue = () => {
      const node = workNode;
      node.classList.remove("is-snap-arrival");
      void node.offsetWidth;
      node.classList.add("is-snap-arrival");

      if (snapClassTimerRef.current) {
        window.clearTimeout(snapClassTimerRef.current);
      }

      snapClassTimerRef.current = window.setTimeout(() => {
        node.classList.remove("is-snap-arrival");
      }, 900);
    };

    const smoothSnapToWork = () => {
      if (snapLockRef.current) return;
      snapLockRef.current = true;
      scrollEnergyRef.current = 0;
      window.dispatchEvent(new CustomEvent("hero-snap-transition", { detail: { active: true } }));
      const targetY = Math.max(workNode.offsetTop - 88, 0);
      smoothScrollTo(targetY, 980);
      triggerWorkArrivalCue();
      window.setTimeout(() => {
        snapLockRef.current = false;
        window.dispatchEvent(new CustomEvent("hero-snap-transition", { detail: { active: false } }));
      }, 1180);
    };

    const isHeroActive = () => {
      const heroRect = heroNode.getBoundingClientRect();
      const workRect = workNode.getBoundingClientRect();
      return heroRect.top <= 0 && workRect.top > window.innerHeight * 0.18;
    };

    const handleWheel = (event) => {
      if (event.deltaY <= 0 || snapLockRef.current || !isHeroActive()) return;

      scrollEnergyRef.current = Math.min(scrollEnergyRef.current + event.deltaY, 220);
      releaseEnergy();

      if (scrollEnergyRef.current < 145) return;

      event.preventDefault();
      smoothSnapToWork();
    };

    const handleTouchStart = (event) => {
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchEnd = (event) => {
      if (snapLockRef.current || !isHeroActive()) return;
      const startY = touchStartYRef.current;
      const endY = event.changedTouches[0]?.clientY ?? null;
      touchStartYRef.current = null;
      if (startY === null || endY === null) return;

      const swipeDistance = startY - endY;
      if (swipeDistance < 64) return;
      smoothSnapToWork();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (releaseTimerRef.current) {
        window.clearTimeout(releaseTimerRef.current);
      }
      if (snapFrameRef.current) {
        window.cancelAnimationFrame(snapFrameRef.current);
      }
      if (snapClassTimerRef.current) {
        window.clearTimeout(snapClassTimerRef.current);
      }
      window.dispatchEvent(new CustomEvent("hero-snap-transition", { detail: { active: false } }));
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll("[data-reveal]").forEach((node) => {
        node.classList.add("is-visible");
      });
      return;
    }

    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  const setTheme = (mode) => {
    setThemeMode(mode);
    window.localStorage.setItem("theme-preference", mode);
  };

  return (
    <div className="site-shell">
      <Header
        compact={compact}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        themeMode={themeMode}
        setTheme={setTheme}
        timeLabel={timeLabel}
        displayTimeLabel={displayTimeLabel}
        themeValues={themeValues}
      />

      <main className="editorial-main">
        <HeroSection heroSectionRef={heroSectionRef} />
        <WorkSection workSectionRef={workSectionRef} featuredProjects={featuredProjects} />
        <AboutSection />
        <ContactSection />
        <ArchiveSection archivedProjects={archivedProjects} />
      </main>
    </div>
  );
}
