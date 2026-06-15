"use client";

import Link from "next/link";
import { siteCopy } from "./data/copy";

function PrintedSection({ id, label, children, className = "" }) {
  return (
    <section className={`printed-section ${className}`} id={id}>
      {label ? (
        <div className="printed-section-label-row">
          <span className="printed-label">{label}</span>
          <span className="printed-rule" />
        </div>
      ) : null}
      {children}
    </section>
  );
}

function PrintedDivider({ variant = "dashed" }) {
  return <div className={`printed-divider printed-divider-${variant}`} aria-hidden="true" />;
}

function ExternalArrow() {
  return <span aria-hidden="true">→</span>;
}

export function Header({ themeMode, setTheme, timeLabel, themeValues }) {
  return (
    <header className="printer-nav-wrap">
      <nav className="printer-nav" aria-label="Primary navigation">
        <a className="printer-brand" href="#home">
          Jiajia Zhang
        </a>
        <div className="printer-nav-links">
          <a href="#work">{siteCopy.nav.work}</a>
          <a href="#about">{siteCopy.nav.about}</a>
          <a href="#contact">{siteCopy.nav.contact}</a>
        </div>
        <div className="printer-nav-meta">
          <span>{siteCopy.hero.location}</span>
          <span>{timeLabel || "--:-- --"}</span>
        </div>
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
      </nav>
    </header>
  );
}

export function HeroSection() {
  return (
    <PrintedSection id="home" className="profile-section">
      <div className="profile-head">
        <div>
          <p className="micro-label">Personal operating index</p>
          <h1>Jiajia Zhang</h1>
          <p className="profile-motto">{siteCopy.hero.summary}</p>
        </div>
        <div className="profile-stamp" aria-hidden="true">
          <span>JZ</span>
        </div>
      </div>
      <div className="contact-strip">
        <a href="mailto:isjiajiazhang@gmail.com">EMAIL</a>
        <a href="https://github.com/isjiajia01" target="_blank" rel="noreferrer">GITHUB</a>
        <a href="https://me.zhangjiajia.me/" target="_blank" rel="noreferrer">WEBSITE</a>
        <a href="#work">WORK INDEX</a>
      </div>
    </PrintedSection>
  );
}

export function WorkSection({ projectGroups }) {
  return (
    <>
      <PrintedDivider variant="dotted" />
      <PrintedSection id="work" label="Selected work">
        <div className="section-copy-block">
          <h2>{siteCopy.work.title}</h2>
          <p>{siteCopy.work.intro}</p>
        </div>
        <div className="quick-links" aria-label="Featured project shortcuts">
          <span>{siteCopy.work.fastLaneLabel}</span>
          {siteCopy.work.fastLaneLinks.map((link) => (
            <a href={link.href} key={link.href}>{link.label}</a>
          ))}
        </div>
        <div className="work-index">
          {projectGroups.map((group, groupIndex) => (
            <section className="work-group" key={group.key}>
              <div className="work-group-heading">
                <span>{String(groupIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{group.title}</h3>
                  <p>{group.intro}</p>
                </div>
              </div>
              <div className="work-list">
                {group.projects.map((project) => (
                  <Link className="work-item" href={`/projects/${project.slug}/`} key={project.slug} id={project.slug}>
                    <div className="work-icon" aria-hidden="true">{project.title.en.slice(0, 1)}</div>
                    <div className="work-item-main">
                      <span className="work-kicker">{project.kicker.en} · {project.year}</span>
                      <h4>{project.title.en}</h4>
                      <p>{project.summary.en}</p>
                    </div>
                    <div className="work-tags" aria-label={`${project.title.en} tags`}>
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <ExternalArrow />
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </PrintedSection>
    </>
  );
}

export function AboutSection() {
  return (
    <>
      <PrintedDivider />
      <PrintedSection id="about" label="How I work">
        <div className="section-copy-block">
          <h2>{siteCopy.about.title}</h2>
          <p>{siteCopy.about.intro}</p>
          <p>{siteCopy.about.workingStyle}</p>
        </div>
        <div className="timeline-list">
          {siteCopy.about.timeline.map((item) => (
            <article className="timeline-item" key={`${item.years}-${item.role}`}>
              <span>{item.years}</span>
              <div>
                <h3>{item.role}</h3>
                <p>{item.detail}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="principle-grid">
          {siteCopy.about.principles.map((principle) => (
            <article className="principle-card" key={principle}>{principle}</article>
          ))}
        </div>
      </PrintedSection>
    </>
  );
}

export function ContactSection({ timeLabel }) {
  return (
    <>
      <PrintedDivider />
      <PrintedSection id="contact" label="Say hello">
        <div className="contact-layout">
          <div className="section-copy-block">
            <h2>{siteCopy.contact.title}</h2>
            <p>{siteCopy.contact.lead}</p>
          </div>
          <div className="contact-card">
            <span className="micro-label">Current status</span>
            <p>Based in Copenhagen · local time {timeLabel || "--:-- --"}</p>
            <div className="contact-actions">
              <a href="mailto:isjiajiazhang@gmail.com">{siteCopy.contact.cta}</a>
              <a href="https://github.com/isjiajia01" target="_blank" rel="noreferrer">
                {siteCopy.contact.secondaryCta}
              </a>
            </div>
          </div>
        </div>
        <p className="footer-note">{siteCopy.contact.footer}</p>
      </PrintedSection>
    </>
  );
}
