"use client";

import { useEffect, useMemo, useState } from "react";
import { getProjectsByGroup } from "./data/projects";
import { AboutSection, ContactSection, Header, HeroSection, WorkSection } from "./home-sections";

const themeValues = ["light", "auto", "dark"];

function resolveTheme(mode, prefersDark) {
  return mode === "auto" ? (prefersDark ? "dark" : "light") : mode;
}

export default function SiteShell() {
  const [themeMode, setThemeMode] = useState("light");
  const [resolvedTheme, setResolvedTheme] = useState("light");
  const [timeLabel, setTimeLabel] = useState("");

  const projectGroups = useMemo(() => getProjectsByGroup(), []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storedTheme = window.localStorage.getItem("theme-preference");
    const nextTheme = themeValues.includes(storedTheme) ? storedTheme : "light";
    setThemeMode(nextTheme);
    setResolvedTheme(resolveTheme(nextTheme, media.matches));

    const syncTheme = (event) => {
      const persistedMode = window.localStorage.getItem("theme-preference");
      const activeMode = themeValues.includes(persistedMode) ? persistedMode : nextTheme;
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
    root.dataset.theme = resolvedTheme;
    root.dataset.themeMode = themeMode;
    document.body.dataset.theme = resolvedTheme;
    document.body.dataset.themeMode = themeMode;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", resolvedTheme === "light" ? "#dfded4" : "#0a0c12");
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

  const setTheme = (mode) => {
    setThemeMode(mode);
    window.localStorage.setItem("theme-preference", mode);
  };

  return (
    <div className="page-grid min-h-screen">
      <Header themeMode={themeMode} setTheme={setTheme} timeLabel={timeLabel} themeValues={themeValues} />
      <main className="printer-stage">
        <div className="printer-shell" aria-hidden="true">
          <div className="printer-shell-top">
            <span className="printer-light" />
            <span className="printer-slot" />
            <span className="printer-dial">◌</span>
          </div>
        </div>
        <div className="paper-wrap">
          <div className="paper-edge paper-edge-top" aria-hidden="true" />
          <article className="paper printer-content-area">
            <HeroSection />
            <WorkSection projectGroups={projectGroups} />
            <AboutSection />
            <ContactSection timeLabel={timeLabel} />
          </article>
          <div className="paper-edge paper-edge-bottom" aria-hidden="true" />
        </div>
      </main>
    </div>
  );
}
