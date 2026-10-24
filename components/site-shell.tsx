"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CharRuler } from "./char-ruler";

export interface SiteShellProps {
  children: React.ReactNode;
  lang: string;
  authorName: string;
  labels: {
    skipToContent: string;
    home: string;
    works: string;
    resume: string;
    about: string;
    opensInNewTab: string;
  };
  urls: {
    home: string;
    works: string;
    resume: string;
    about: string;
  };
  contacts: Array<{
    label: string;
    link: string;
  }>;
}

export function SiteShell({
  children,
  lang,
  authorName,
  labels,
  urls,
  contacts,
}: SiteShellProps) {
  const pathname = usePathname() || `/${lang}`;

  const otherLang = lang === "zh" ? "en" : "zh";
  const otherLangLabel = lang === "zh" ? "English" : "中文";

  let switchPath: string;
  if (pathname.startsWith(`/${lang}`)) {
    switchPath = pathname.replace(new RegExp(`^/${lang}`), `/${otherLang}`);
  } else if (pathname === "/") {
    switchPath = `/${otherLang}`;
  } else {
    switchPath = `/${otherLang}${pathname}`;
  }

  const isHomeActive =
    pathname === urls.home ||
    pathname === `${urls.home}/` ||
    (lang === "en" && (pathname === "/" || pathname === ""));

  const isWorkActive =
    pathname === urls.works ||
    pathname.startsWith(`${urls.works}/`) ||
    pathname.startsWith(`/${lang}/projects/afgang`) ||
    pathname.startsWith("/projects/afgang");

  const isResumeActive =
    pathname === urls.resume || pathname.startsWith(`${urls.resume}/`);

  const isAboutActive =
    pathname === urls.about || pathname.startsWith(`${urls.about}/`);

  const navItems = [
    { label: labels.home, href: urls.home, active: isHomeActive },
    { label: labels.works, href: urls.works, active: isWorkActive },
    { label: labels.resume, href: urls.resume, active: isResumeActive },
    { label: labels.about, href: urls.about, active: isAboutActive },
  ];

  const footerContacts = contacts.filter(
    (c) => c.label.toLowerCase() !== "website",
  );
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen w-full dark:bg-zinc-950">
      <CharRuler />
      <div className="px-6 pt-16 pb-16 sm:pt-24" style={{ maxWidth: "calc(var(--measure, 80ch) + 3rem)" }}>
      {/* Skip to content link */}
      <a
        href="#main"
        className="sr-only print:hidden focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:border focus:border-zinc-300 focus:bg-white focus:px-3 focus:py-1.5 focus:text-[13px] focus:text-zinc-900 focus:shadow-sm dark:focus:border-zinc-700 dark:focus:bg-zinc-900 dark:focus:text-zinc-100"
      >
        {labels.skipToContent}
      </a>

      {/* Navigation */}
      <nav
        className="mb-16 flex items-center justify-between text-[15px] print:hidden"
        aria-label="Main"
      >
        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={
                item.active
                  ? "underline decoration-zinc-400 underline-offset-[6px] font-normal text-zinc-900 dark:decoration-zinc-500 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }
            >
              {item.label}
            </Link>
          ))}
        </div>
        <Link
          href={switchPath}
          hrefLang={otherLang === "zh" ? "zh-Hans" : "en"}
          className="text-[13px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
        >
          {otherLangLabel}
        </Link>
      </nav>

      {/* Main content */}
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-24 border-t border-zinc-300 pt-6 text-[13px] leading-5 text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {footerContacts.map((contact, i) => {
            const isMail = contact.link.startsWith("mailto:");
            return (
              <span key={contact.label} className="inline-flex items-center">
                {i > 0 && (
                  <span
                    className="mr-2 text-zinc-300 dark:text-zinc-600"
                    aria-hidden="true"
                  >
                    ·
                  </span>
                )}
                <a
                  href={contact.link}
                  target={isMail ? undefined : "_blank"}
                  rel={isMail ? undefined : "noopener noreferrer"}
                  className="group hover:text-zinc-900 dark:hover:text-zinc-100"
                >
                  {contact.label}
                  {!isMail && (
                    <>
                      <span aria-hidden="true" className="ml-0.5 inline-block motion-safe:transition-transform motion-safe:duration-(--motion-link) motion-safe:ease-snap motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5">
                        ↗
                      </span>
                      <span className="sr-only"> {labels.opensInNewTab}</span>
                    </>
                  )}
                </a>
              </span>
            );
          })}
        </div>
        <p className="mt-3">
          © {authorName} {currentYear}
        </p>
      </footer>
      </div>
    </div>
  );
}

export default SiteShell;
