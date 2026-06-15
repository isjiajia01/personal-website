"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { detailPageCopy, resolveLocale } from "../../data/copy";
import { projectCategoryLabels } from "../../data/projects";

function localize(locale, value) {
  if (typeof value === "string") {
    return value;
  }
  return value?.[locale] ?? value?.en ?? "";
}

function PrintedSection({ label, children }) {
  return (
    <section className="printed-section">
      <div className="printed-section-label-row">
        <span className="printed-label">{label}</span>
        <span className="printed-rule" />
      </div>
      {children}
    </section>
  );
}

function PrintedDivider() {
  return <div className="printed-divider" aria-hidden="true" />;
}

export default function ProjectDetailClient({ project, relatedProjects }) {
  const [locale, setLocale] = useState("en");
  const copy = detailPageCopy;
  const switchLocale = locale === "en" ? "zh" : "en";

  useEffect(() => {
    const localeFromQuery = new URLSearchParams(window.location.search).get("lang");
    const storedLocale = resolveLocale(window.localStorage.getItem("locale-preference"));
    const nextLocale = resolveLocale(localeFromQuery ?? storedLocale);
    setLocale(nextLocale);
    window.localStorage.setItem("locale-preference", nextLocale);
  }, []);

  const localizedRelatedProjects = useMemo(() => relatedProjects, [relatedProjects]);

  return (
    <div className="page-grid min-h-screen">
      <main className="project-page">
        <div className="paper-wrap">
          <div className="paper-edge paper-edge-top" aria-hidden="true" />
          <article className="paper project-paper printer-content-area">
            <Link className="back-link" href={`/?lang=${locale}#work`}>
              ← {copy.backHome}
            </Link>

            <PrintedSection label={copy.sectionLabel}>
              <div className="project-hero">
                <div>
                  <p className="micro-label">{localize(locale, project.kicker)}</p>
                  <h1>{localize(locale, project.title)}</h1>
                  <p>{localize(locale, project.summary)}</p>
                </div>
                <Link className="project-stamp" href={`/projects/${project.slug}/?lang=${switchLocale}`}>
                  {copy.switchLabel}<br />{switchLocale.toUpperCase()}
                </Link>
              </div>
            </PrintedSection>

            <PrintedDivider />

            <PrintedSection label={copy.summaryLabel}>
              <div className="project-summary-card">
                <dl className="project-meta-grid">
                  <div>
                    <dt>{copy.typeLabel}</dt>
                    <dd>{localize(locale, projectCategoryLabels[project.category])}</dd>
                  </div>
                  <div>
                    <dt>{copy.roleLabel}</dt>
                    <dd>{project.role}</dd>
                  </div>
                  <div>
                    <dt>{copy.platformLabel}</dt>
                    <dd>{project.platform}</dd>
                  </div>
                  <div>
                    <dt>{copy.contributionLabel}</dt>
                    <dd>{project.contribution.join(" · ")}</dd>
                  </div>
                </dl>
                <div className="tag-row">
                  <span>{project.year}</span>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="tag-row">
                  {project.details.stack.map((stackItem) => (
                    <span key={stackItem}>{stackItem}</span>
                  ))}
                </div>
                {project.links?.length ? (
                  <div className="contact-actions">
                    {project.links.map((link) => (
                      <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                        {localize(locale, link.label)}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </PrintedSection>

            <PrintedDivider />

            <PrintedSection label="Evidence notes">
              <div className="project-detail-outcome-grid">
                <article className="detail-card">
                  <h3>{copy.challengeTitle}</h3>
                  <p>{localize(locale, project.details.challenge)}</p>
                </article>
                <article className="detail-card">
                  <h3>{copy.approachTitle}</h3>
                  <p>{localize(locale, project.details.approach)}</p>
                </article>
                <article className="detail-card">
                  <h3>{copy.impactTitle}</h3>
                  <p>{localize(locale, project.details.impact)}</p>
                </article>
              </div>
            </PrintedSection>

            <PrintedDivider />

            <PrintedSection label={copy.relatedTitle}>
              <div className="related-grid">
                {localizedRelatedProjects.map((related) => (
                  <article className="related-card" key={related.slug}>
                    <div>
                      <p className="micro-label">{localize(locale, related.kicker)}</p>
                      <h3>{localize(locale, related.title)}</h3>
                      <p>{localize(locale, related.summary)}</p>
                    </div>
                    <Link className="related-card-link" href={`/projects/${related.slug}/?lang=${locale}`}>
                      {copy.openProject} →
                    </Link>
                  </article>
                ))}
              </div>
            </PrintedSection>
          </article>
          <div className="paper-edge paper-edge-bottom" aria-hidden="true" />
        </div>
      </main>
    </div>
  );
}
