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
    <div className="site-shell">
      <div className="page-glow page-glow-a" aria-hidden="true" />
      <div className="page-glow page-glow-b" aria-hidden="true" />
      <main>
        <section className="section section-projects">
          <div className="section-heading">
            <p className="eyebrow">{copy.sectionLabel}</p>
            <h2>{localize(locale, project.title)}</h2>
            <p className="section-copy">{localize(locale, project.summary)}</p>
            <div className="hero-actions" style={{ marginTop: "1rem" }}>
              <Link className="button button-secondary" href={`/?lang=${locale}#work`}>
                {copy.backHome}
              </Link>
              <Link
                className="button button-secondary"
                href={`/projects/${project.slug}/?lang=${switchLocale}`}
              >
                {copy.switchLabel}: {switchLocale.toUpperCase()}
              </Link>
            </div>
          </div>

          <article className="project-card project-detail-card" style={{ marginBottom: "1rem" }}>
            <span className="card-kicker">{localize(locale, project.kicker)}</span>
            <h3>{copy.summaryLabel}</h3>
            <p>{localize(locale, project.summary)}</p>
            <dl className="project-meta-grid project-detail-meta-grid">
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
            <h3 style={{ marginTop: "1rem" }}>{copy.stackLabel}</h3>
            <div className="tag-row">
              {project.details.stack.map((stackItem) => (
                <span key={stackItem}>{stackItem}</span>
              ))}
            </div>
            {project.links?.length ? (
              <>
                <h3 style={{ marginTop: "1rem" }}>{copy.projectLinkLabel}</h3>
                <div className="card-actions">
                  {project.links.map((link) => (
                    <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {localize(locale, link.label)}
                    </a>
                  ))}
                </div>
              </>
            ) : null}
          </article>

          <div className="capability-grid project-detail-outcome-grid">
            <article className="capability-card">
              <h3>{copy.challengeTitle}</h3>
              <p>{localize(locale, project.details.challenge)}</p>
            </article>
            <article className="capability-card">
              <h3>{copy.approachTitle}</h3>
              <p>{localize(locale, project.details.approach)}</p>
            </article>
            <article className="capability-card">
              <h3>{copy.impactTitle}</h3>
              <p>{localize(locale, project.details.impact)}</p>
            </article>
          </div>
        </section>

        <section className="section section-capabilities">
          <div className="section-heading compact">
            <p className="eyebrow">{copy.relatedTitle}</p>
          </div>
          <div className="project-grid">
            {localizedRelatedProjects.map((related) => (
              <article className="project-card" key={related.slug}>
                <span className="card-kicker">{localize(locale, related.kicker)}</span>
                <h3>{localize(locale, related.title)}</h3>
                <p>{localize(locale, related.summary)}</p>
                <div className="tag-row">
                  {related.tags.slice(0, 3).map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="card-actions">
                  <Link href={`/projects/${related.slug}/?lang=${locale}`}>{copy.openProject}</Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
