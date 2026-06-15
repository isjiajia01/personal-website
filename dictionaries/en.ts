import {
  RiLinkedinBoxLine as LinkedInIcon,
  RiMailLine as EnvelopeIcon,
  RiSendPlaneLine as PaperAirplaneIcon,
} from "@remixicon/react";
import { SiGithub } from "@icons-pack/react-simple-icons";

const dictionary = {
  meta: {
    baseUrl: "https://me.zhangjiajia.me",
    websiteName: "Jiajia Zhang",
    motto: "Junior product/full-stack candidate for internal tools and workflow systems.",
    mottos: [
      "I build internal tools and workflow systems with clear evidence, human review, and practical decision support.",
      "Best fit: junior product/full-stack roles around internal tools, support automation, and operational decision systems.",
      "A job-facing portfolio for hiring conversations — still printed on slightly playful paper.",
    ],
    bio: `
A Copenhagen-based DTU MSc student building practical systems for complex operational work.

My strongest work sits around internal tools, workflow automation with human review, data-quality workflows, and decision-support systems.
    `,
    fillKeywords(keywords?: string[]): string[] {
      return [
        "Jiajia Zhang",
        "junior product engineer",
        "full-stack developer",
        "internal tools",
        "workflow automation",
        "support automation",
        "decision support",
        "data quality",
        "operations systems",
        "iOS SwiftUI",
        "portfolio",
        ...(keywords ?? []),
      ];
    },
  },
  urls: {
    home: "/en",
    works: "/en/works",
    resume: "/en/resume",
    about: "/en/about",
  },
  labels: {
    home: "Home",
    works: "Work",
    resume: "Resume",
    about: "About",
    featured: "Best Starting Points",
    archive: "Supporting Material",
    brandName: "JIAJIA",
    brandTagline: "Workflow & Product Systems",
    notFoundStatus: "Paper Tray Empty",
    notFoundTitle: "Out of Paper",
    notFoundSubtitle: "Please insert paper correctly to print content.",
    notFoundButton: "← Print Home",
    notFoundError: "ERR 404 · PAPER_NOT_FOUND",
    printedOn: "Printed on",
    noocWorks: "Start with the projects most relevant to internal tools, workflow automation, and operational decision support.",
    aboutTitle: "About",
    aboutSubtitle: "How I think about workflow systems, evidence, and practical automation",
    focus: "Best Fit",
    evidence: "Strongest Evidence",
    roleFit: "Candidate Focus",
    stack: "Stack",
    openProject: "Open",
    contactMe: "Contact",
    productProof: "Product Engineering Proof",
    analyticalProof: "Planning / Analytics Proof",
    icon(label: string) {
      return `Icon for ${label}`;
    },
  },
  homepage: {
    headline:
      "I build internal tools and workflow systems for teams that need clearer evidence, safer automation, and better decisions.",
    subline:
      "Best fit: junior product/full-stack roles around internal tools, support automation, and operational decision support. Data quality and iOS product work are adjacent proof, not separate directions.",
    proofPoints: [
      "OpsDesk: a deployed support/operations demo with evidence packages, draft actions, approval gates, feedback memory, and audit replay.",
      "Cargo Guard: a data-quality cockpit that turns logistics event issues into contracts, severity, owners, and next actions.",
      "Nimbus: SwiftUI/iOS product implementation with weather data flows, widgets, fallback behavior, and feature-level polish.",
    ],
    roleTargets: [
      "Junior Product / Full-stack Engineer",
      "Internal Tools / Workflow Automation Builder",
    ],
    note:
      "The site keeps a little personality, but the path is practical: start with Work, then Resume if you want the compact hiring version.",
  },
  works: [
    {
      name: "OpsDesk",
      summary:
        "A support/operations demo that turns cases into evidence, draft actions, approvals, feedback memory, and replayable logs.",
      roleFit: "Internal tools · workflow automation with human review · support operations",
      evidence: [
        "Deployed demo with support queue, review packages, approval gates, feedback memory, and replay",
        "Shows bounded automation: suggestions stay reviewable, sensitive actions require approval, and runs leave audit traces",
        "Useful for explaining customer-support automation and operations guardrails without claiming enterprise-scale production",
      ],
      stack: ["Next.js", "TypeScript", "Postgres", "Docker", "Workflow design", "Oracle deploy"],
      link: "https://jobops.zhangjiajia.me/opsdesk",
      color: "blue",
      primary: true,
    },
    {
      name: "Cargo Guard",
      summary:
        "A lightweight data-quality cockpit for logistics events: contracts, freshness/completeness checks, ETA drift, severity routing, and owner actions.",
      roleFit: "Data-quality workflows · logistics operations · governance tooling",
      evidence: [
        "Turns raw shipment-event issues into contracts, severity, owners, and next actions",
        "Designed as portfolio proof for data-quality and governance roles, not as fake enterprise production",
        "Shows practical data-product thinking: checks, routing, dashboard, and operational language",
      ],
      stack: ["Python", "JSON contracts", "Data validation", "HTML dashboard", "Logistics data"],
      link: "#",
      color: "yellow",
      primary: true,
    },
    {
      name: "Nimbus Weather Journal",
      summary:
        "A polished iOS weather-journal product with SwiftUI surfaces, shared settings, weather data flows, radar/wind features, and fallback behavior.",
      roleFit: "Product engineering · SwiftUI · API-backed consumer app",
      evidence: [
        "Includes TestFlight distribution, CI checks, and feature-level implementation details",
        "Moon/illumination and weather features show feature separation, service layers, and UI state handling",
        "Good proof for SwiftUI, product polish, and backend/API integration discussions",
      ],
      stack: ["Swift", "SwiftUI", "WeatherKit", "SceneKit", "Widgets", "Backend APIs"],
      link: "https://github.com/isjiajia01/10.01_Nimbus",
      color: "cyan",
      primary: true,
    },
    {
      name: "DTU × Mover Thesis",
      summary:
        "A depot-aware rolling decomposition and guarded search framework for multi-day last-mile vehicle routing under operational stress.",
      roleFit: "Decision support · logistics analytics · optimization research",
      evidence: [
        "Connects academic modeling with operational constraints, runtime budgets, and fallback decisions",
        "Frames solver behavior through evidence, safety guards, and benchmark families rather than black-box claims",
        "Useful for planning, supply-chain, analytics, and decision-support roles",
      ],
      stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design", "Data analysis"],
      link: "#",
      color: "orange",
      primary: false,
    },
    {
      name: "This Website",
      summary:
        "A printer-paper portfolio adapted from the nooc.me codebase and reshaped into a compact, job-facing personal index.",
      roleFit: "Frontend polish · content systems · deployment hygiene",
      evidence: [
        "Preserves a distinctive visual shell while reorganizing the content around hiring conversations",
        "Static-export Next.js site deployed through GitHub Actions to a personal Oracle host",
        "Shows taste, speed, and willingness to iterate from feedback",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind", "Static export", "GitHub Actions"],
      link: "https://me.zhangjiajia.me",
      color: "rose",
      primary: false,
    },
  ],
  contacts: [
    {
      label: "GitHub",
      name: "@isjiajia01",
      link: "https://github.com/isjiajia01",
      icon: SiGithub,
    },
    {
      label: "LinkedIn",
      name: "Jiajia Zhang",
      link: "https://www.linkedin.com/in/jiajia-zhang-0a8a40289",
      icon: LinkedInIcon,
    },
    {
      label: "Email",
      name: "isjiajiazhang@gmail.com",
      link: "mailto:isjiajiazhang@gmail.com",
      icon: EnvelopeIcon,
    },
    {
      label: "Website",
      name: "me.zhangjiajia.me",
      link: "https://me.zhangjiajia.me",
      icon: PaperAirplaneIcon,
    },
  ],
  aboutContent: `
This is a job-facing personal index for [Jiajia Zhang](https://me.zhangjiajia.me), based in Copenhagen and finishing an MSc at DTU.

### Why these projects

I am not trying to look like four different candidates. The main thread is internal tools and workflow systems: support queues, evidence packages, human review, data-quality checks, operational logs, and decision support.

### How I work

I usually start from the operating problem. What is the queue? What does a reviewer need to trust the next action? Where should automation stop? What should be logged, approved, replayed, or measured?

### Where I fit first

I would be most useful on teams building internal tools, support/operations workflows, data-quality processes, or decision-support products. OpsDesk and Cargo Guard are the best starting points; Nimbus adds product-engineering proof; the DTU × Mover thesis adds planning and analytics depth.

This portfolio itself is also a small content-and-deployment project built with Next.js static export. You can reach me at [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com), [LinkedIn](https://www.linkedin.com/in/jiajia-zhang-0a8a40289), or [GitHub](https://github.com/isjiajia01).
  `,
};

export default dictionary;
