"use client";

import Link from "next/link";
import { asciiBlocks, siteCopy } from "./data/copy";
import CozyWindowShade from "./cozy-window-shade";
import HeroAsciiScene from "./hero-ascii-scene";

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
          <CozyWindowShade />
        </div>
        <div className="editorial-intro">
          <HeroAsciiScene />
          <div className="hero-copy-band reveal-item is-visible" data-reveal style={{ "--reveal-delay": "90ms" }}>
            <p className="hero-kicker">{siteCopy.hero.label}</p>
            <h1 className="hero-heading">{siteCopy.hero.title}</h1>
            <p className="hero-summary">{siteCopy.hero.summary}</p>
          </div>
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

        <div className="work-groups">
          {featuredProjects.map((group, groupIndex) => (
            <section
              className="work-group reveal-item"
              data-reveal
              style={{ "--reveal-delay": `${180 + groupIndex * 80}ms` }}
              key={group.key}
            >
              <div className="work-group-head">
                <p className="work-group-kicker">// {String(groupIndex + 1).padStart(2, "0")}</p>
                <h3 className="work-group-title">{group.title}</h3>
                <p className="work-group-intro">{group.intro}</p>
              </div>
              <div className="project-grid project-grid-reset work-group-grid">
                {group.projects.map((project, projectIndex) => (
                  <article
                    className={`project-card editorial-project-card reveal-item${groupIndex === 0 && projectIndex < 2 ? " work-arrival-card" : ""}`}
                    data-reveal
                    style={{ "--reveal-delay": `${220 + groupIndex * 80 + projectIndex * 70}ms` }}
                    key={project.slug}
                  >
                    <span className="card-kicker">{project.kicker.en}</span>
                    <h3>{project.title.en}</h3>
                    <p>{project.summary.en}</p>
                    <dl className="project-meta-grid">
                      <div>
                        <dt>Role</dt>
                        <dd>{project.role}</dd>
                      </div>
                      <div>
                        <dt>Platform</dt>
                        <dd>{project.platform}</dd>
                      </div>
                      <div>
                        <dt>Contribution</dt>
                        <dd>{project.contribution.join(" · ")}</dd>
                      </div>
                    </dl>
                    <div className="tag-row">
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
            </section>
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

