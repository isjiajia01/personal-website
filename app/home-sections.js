"use client";

import Link from "next/link";
import { asciiBlocks, siteCopy } from "./data/copy";
import { projectCategoryLabels } from "./data/projects";
import HeroAsciiScene from "./hero-ascii-scene";
import HeroSparkField from "./hero-spark-field";

export function Header({
  compact,
  menuOpen,
  setMenuOpen,
  themeMode,
  setTheme,
  timeLabel,
  displayTimeLabel,
  themeValues
}) {
  return (
    <header className={`topbar ${compact ? "is-compact" : ""}`}>
      <nav className="nav editorial-nav">
        <a className="nav-brand" href="#home" onClick={() => setMenuOpen(false)}>
          [ JIAJIA ZHANG ]
        </a>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#work" onClick={() => setMenuOpen(false)}>
            {siteCopy.nav.work}
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            {siteCopy.nav.about}
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            {siteCopy.nav.contact}
          </a>
        </div>
        <div className="nav-meta">
          <span>{siteCopy.hero.location}</span>
          <span className="nav-time" aria-label={timeLabel || "--:-- --"}>
            {displayTimeLabel || timeLabel || "--:-- --"}
          </span>
          <span className="nav-status-dot" aria-hidden="true" />
        </div>
        <div className="nav-actions">
          <div className="theme-toggle" role="group" aria-label="Theme switcher">
            {themeValues.map((mode) => (
              <button
                key={mode}
                className="theme-button"
                type="button"
                aria-pressed={themeMode === mode}
                onClick={() => setTheme(mode)}
              >
                {mode}
              </button>
            ))}
          </div>
          <button
            className={`menu-toggle ${menuOpen ? "is-open" : ""}`}
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>
    </header>
  );
}

export function HeroSection({ heroSectionRef }) {
  return (
    <section className="hero-section hero-reset reveal-section is-visible" id="home" data-reveal ref={heroSectionRef}>
      <div className="editorial-hero">
        <div className="hero-ambient-layer" aria-hidden="true">
          <HeroSparkField />
        </div>
        <div className="editorial-intro">
          <HeroAsciiScene />
          <div className="hero-cta-stack reveal-item is-visible" data-reveal style={{ "--reveal-delay": "120ms" }}>
            <a className="button button-primary editorial-cta" href="mailto:isjiajiazhang@gmail.com">
              {siteCopy.hero.cta}
            </a>
            <p className="hero-scroll">
              <span
                className="hero-scroll-copy"
                style={{
                  "--steps-count": siteCopy.hero.scrollPrompt.length,
                  "--steps-width": `${siteCopy.hero.scrollPrompt.length}ch`
                }}
              >
                {siteCopy.hero.scrollPrompt}
              </span>
              <span className="hero-scroll-arrow" aria-hidden="true">
                ↓
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkSection({ workSectionRef, featuredProjects }) {
  return (
    <section className="section editorial-section reveal-section" id="work" data-reveal ref={workSectionRef}>
      <div className="section-index reveal-item" data-reveal>
        {siteCopy.work.index}
      </div>
      <div className="section-body reveal-item" data-reveal style={{ "--reveal-delay": "40ms" }}>
        <p className="eyebrow reveal-item work-arrival-eyebrow" data-reveal style={{ "--reveal-delay": "80ms" }}>{siteCopy.work.eyebrow}</p>
        <h2 className="reveal-item work-arrival-title" data-reveal style={{ "--reveal-delay": "120ms" }}>{siteCopy.work.title}</h2>
        <p className="section-copy reveal-item" data-reveal style={{ "--reveal-delay": "140ms" }}>{siteCopy.work.intro}</p>
        <div className="editorial-list">
          {siteCopy.work.current.map((item, index) => (
            <article
              className="timeline-row reveal-item"
              data-reveal
              style={{ "--reveal-delay": `${160 + index * 70}ms` }}
              key={`${item.role}-${item.company}`}
            >
              <div className="timeline-year">{item.role}</div>
              <div className="timeline-content">
                <h3>{item.company}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="project-grid project-grid-reset">
          {featuredProjects.map((project, index) => (
            <article
              className={`project-card editorial-project-card reveal-item${index < 2 ? " work-arrival-card" : ""}`}
              data-reveal
              style={{ "--reveal-delay": `${220 + index * 90}ms` }}
              key={project.slug}
            >
              <span className="card-kicker">{project.year}</span>
              <h3>{project.title.en}</h3>
              <p>{project.summary.en}</p>
              <div className="tag-row">
                <span>{projectCategoryLabels[project.category].en}</span>
                {project.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="card-actions">
                <Link href={`/projects/${project.slug}/`}>{siteCopy.work.detailCta}</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section className="section editorial-section reveal-section" id="about" data-reveal>
      <div className="section-index reveal-item" data-reveal>
        {siteCopy.about.index}
      </div>
      <div className="section-body reveal-item" data-reveal style={{ "--reveal-delay": "40ms" }}>
        <p className="eyebrow reveal-item" data-reveal style={{ "--reveal-delay": "80ms" }}>{siteCopy.about.eyebrow}</p>
        <h2 className="reveal-item" data-reveal style={{ "--reveal-delay": "120ms" }}>{siteCopy.about.title}</h2>
        <p className="section-copy reveal-item" data-reveal style={{ "--reveal-delay": "140ms" }}>{siteCopy.about.intro}</p>
        <div className="editorial-list">
          {siteCopy.about.timeline.map((item, index) => (
            <article
              className="timeline-row reveal-item"
              data-reveal
              style={{ "--reveal-delay": `${160 + index * 80}ms` }}
              key={`${item.years}-${item.role}`}
            >
              <div className="timeline-year">{item.years}</div>
              <div className="timeline-content">
                <h3>{item.role}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="capability-grid">
          {siteCopy.about.principles.map((principle) => (
            <article className="capability-card reveal-item" data-reveal style={{ "--reveal-delay": "260ms" }} key={principle}>
              <p>{principle}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="section editorial-section reveal-section" id="contact" data-reveal>
      <div className="section-index reveal-item" data-reveal>
        {siteCopy.contact.index}
      </div>
      <div className="section-body reveal-item" data-reveal style={{ "--reveal-delay": "40ms" }}>
        <p className="eyebrow reveal-item" data-reveal style={{ "--reveal-delay": "80ms" }}>{siteCopy.contact.eyebrow}</p>
        <div className="contact-layout">
          <div className="contact-copy">
            <h2 className="reveal-item" data-reveal style={{ "--reveal-delay": "120ms" }}>{siteCopy.contact.title}</h2>
            <p className="section-copy reveal-item" data-reveal style={{ "--reveal-delay": "160ms" }}>{siteCopy.contact.lead}</p>
            <div className="contact-actions reveal-item" data-reveal style={{ "--reveal-delay": "210ms" }}>
              <a className="button button-primary contact-button" href="mailto:isjiajiazhang@gmail.com">
                {siteCopy.contact.cta}
              </a>
              <a className="button button-secondary contact-button" href="https://github.com/isjiajia01" target="_blank" rel="noreferrer">
                {siteCopy.contact.secondaryCta}
              </a>
            </div>
          </div>
          <div className="contact-signature-wrap reveal-item" data-reveal style={{ "--reveal-delay": "240ms" }}>
            <pre className="ascii-art ascii-art-bottom contact-signature" aria-hidden="true">
              {asciiBlocks.bottom}
            </pre>
          </div>
        </div>
        <p className="footer-note reveal-item" data-reveal style={{ "--reveal-delay": "320ms" }}>{siteCopy.contact.footer}</p>
      </div>
    </section>
  );
}

export function ArchiveSection({ archivedProjects }) {
  if (!archivedProjects.length) return null;

  return (
    <section className="section editorial-section editorial-archive reveal-section" data-reveal>
      <div className="section-index reveal-item" data-reveal>(04)</div>
      <div className="section-body reveal-item" data-reveal style={{ "--reveal-delay": "40ms" }}>
        <p className="eyebrow reveal-item" data-reveal style={{ "--reveal-delay": "80ms" }}>// Archive</p>
        <h2 className="reveal-item" data-reveal style={{ "--reveal-delay": "120ms" }}>Additional projects</h2>
        <div className="project-grid project-grid-reset">
          {archivedProjects.map((project, index) => (
            <article
              className="project-card editorial-project-card reveal-item"
              data-reveal
              style={{ "--reveal-delay": `${170 + index * 90}ms` }}
              key={project.slug}
            >
              <span className="card-kicker">{project.year}</span>
              <h3>{project.title.en}</h3>
              <p>{project.summary.en}</p>
              <div className="card-actions">
                <Link href={`/projects/${project.slug}/`}>Open summary</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
