"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RouteTransition } from "./route-transition";

export interface SiteShellProps {
  children: React.ReactNode;
  lang: string;
  authorName: string;
  labels: {
    skipToContent: string;
    home: string;
    works: string;
    about: string;
    opensInNewTab: string;
  };
  urls: {
    home: string;
    works: string;
    about: string;
  };
  contacts: Array<{
    label: string;
    link: string;
  }>;
  hideLanguageSwitch?: boolean;
}

export function SiteShell({
  children,
  lang,
  authorName,
  labels,
  urls,
  contacts,
  hideLanguageSwitch = false,
}: SiteShellProps) {
  const pathname = usePathname() || `/${lang}`;

  // Product and legal pages already own their main landmark and page layout.
  const productPaths = ["/solis", "/punctum", "/threadlite", "/wayfinder", "/undertekst"];
  if (productPaths.some((path) => pathname === path || pathname.startsWith(`${path}/`))) {
    return <>{children}</>;
  }

  // Routes with no Chinese version: hide the language switch instead of linking to a 404.
  const enOnly = hideLanguageSwitch || (lang === "en" && pathname.startsWith("/notes"));
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

  const isAboutActive =
    pathname === urls.about || pathname.startsWith(`${urls.about}/`);

  const navItems = [
    { label: labels.home, href: urls.home, active: isHomeActive },
    // Notes are English only, so the zh nav does not link to them.
    ...(lang === "en"
      ? [{ label: "Notes", href: "/notes/", active: pathname.startsWith("/notes") }]
      : []),
    { label: labels.about, href: urls.about, active: isAboutActive },
  ];

  const footerContacts = contacts.filter(
    (c) => c.label.toLowerCase() !== "website",
  );
  const currentYear = new Date().getFullYear();

  const linkBase =
    "press inline-block px-2 py-3 -mx-2 -my-3 hover:text-(--rose) active:text-(--rose)";

  return (
    <RouteTransition className="paper">
      <div className="paper-column pt-8 pb-16 sm:pt-12 print:pt-0">
        {/* Skip to content link */}
        <a
          href="#main"
          className="sr-only print:hidden focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:border focus:border-stone-300 focus:bg-white focus:px-3 focus:py-1.5 focus:text-[13px] focus:text-stone-900 focus:shadow-sm dark:focus:border-zinc-700 dark:focus:bg-zinc-900 dark:focus:text-zinc-100"
        >
          {labels.skipToContent}
        </a>

        {/* Navigation: always visible, five short labels fit at 320px so no overlay menu */}
        <nav
          className="rise flex flex-wrap items-center justify-between gap-y-3 text-[14px] print:hidden"
          aria-label="Main"
        >
          <div className="flex items-center gap-x-4 sm:gap-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`${linkBase} ${
                  item.active
                    ? "text-stone-800 underline decoration-stone-300 decoration-1 underline-offset-[6px] dark:text-zinc-100 dark:decoration-zinc-600"
                    : "text-stone-500 dark:text-zinc-400"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          {!enOnly && (
            <Link
              href={switchPath}
              hrefLang={otherLang === "zh" ? "zh-Hans" : "en"}
              className={`${linkBase} ml-auto shrink-0 whitespace-nowrap text-[12px] tracking-wide max-sm:basis-full max-sm:text-right text-stone-500 dark:text-zinc-400`}
            >
              {otherLangLabel}
            </Link>
          )}
        </nav>

        {/* Main content */}
        <main
          id="main"
          tabIndex={-1}
          className="mt-16 outline-none sm:mt-24 print:mt-0"
        >
          {children}
        </main>

        {/* Footer. The lighter * * * ornament is now the brand mark: the site shows
            no other mark in its chrome, and at 48 px the 3D disc still reads. */}
        <footer className="mt-24 text-[13px] leading-5 text-stone-500 dark:text-zinc-400">
          <p aria-hidden="true" className="mb-8 text-center print:hidden">
            <Image
              src="/static/jj-mark-96.png"
              alt=""
              width={48}
              height={48}
              className="mx-auto block h-12 w-12"
            />
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            {footerContacts.map((contact, i) => {
              const isMail = contact.link.startsWith("mailto:");
              return (
                <span key={contact.label} className="inline-flex items-center">
                  {i > 0 && (
                    <span
                      className="mr-2 text-stone-300 dark:text-zinc-600"
                      aria-hidden="true"
                    >
                      ·
                    </span>
                  )}
                  <a
                    href={contact.link}
                    target={isMail ? undefined : "_blank"}
                    rel={isMail ? undefined : "noopener noreferrer"}
                    className="group press inline-block px-1 py-2.5 -mx-1 -my-2.5 hover:text-(--rose) active:text-(--rose)"
                  >
                    {contact.label}
                    {!isMail && (
                      <>
                        <span aria-hidden="true" className="link-arrow ml-0.5">
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
    </RouteTransition>
  );
}

export default SiteShell;
