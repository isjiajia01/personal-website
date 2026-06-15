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
    motto: "Junior product-minded builder for internal tools, AI workflows, and decision systems.",
    mottos: [
      "I turn messy operations into reviewable tools.",
      "Internal products, AI workflow guardrails, and decision support — with evidence, not hype.",
      "A portfolio for roles around full-stack products, support automation, data quality, and operations systems.",
    ],
    bio: `
A Copenhagen-based MSc student at DTU, building practical systems for complex work.

My strongest work sits between software engineering, product judgment, operations, data quality, and AI-assisted workflows.
    `,
    fillKeywords(keywords?: string[]): string[] {
      return [
        "Jiajia Zhang",
        "full-stack developer",
        "internal tools",
        "AI workflows",
        "support automation",
        "data quality",
        "operations systems",
        "iOS SwiftUI",
        "optimization",
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
    featured: "Role Evidence",
    archive: "Supporting Proof",
    brandName: "JIAJIA",
    brandTagline: "Work Portfolio",
    notFoundStatus: "Paper Tray Empty",
    notFoundTitle: "Out of Paper",
    notFoundSubtitle: "Please insert paper correctly to print content.",
    notFoundButton: "← Print Home",
    notFoundError: "ERR 404 · PAPER_NOT_FOUND",
    printedOn: "Printed on",
    noocWorks: "Selected work, organized by the roles it helps me explain.",
    aboutTitle: "About",
    aboutSubtitle: "Product-minded full-stack builder for internal tools and workflow systems",
    focus: "Current Focus",
    evidence: "Evidence",
    roleFit: "Role Fit",
    stack: "Stack",
    openProject: "Open",
    contactMe: "Contact",
    icon(label: string) {
      return `Icon for ${label}`;
    },
  },
  homepage: {
    headline: "I build small, grounded systems for teams that need better workflow, evidence, and decisions.",
    subline:
      "Looking for junior/graduate roles around full-stack product engineering, AI workflow adoption, operations tooling, data quality, and analytical internal systems.",
    proofPoints: [
      "Full-stack portfolio with deployed internal-tool demos",
      "AI workflow control plane with approval, audit, feedback memory, and replay",
      "SwiftUI/iOS product work with backend-facing weather data features",
      "Optimization thesis with Mover context for last-mile planning decisions",
    ],
    roleTargets: [
      "Junior Full-stack / Backend-leaning Product Engineer",
      "AI Workflow / Internal Tools Builder",
      "Data / Operations Analyst with engineering depth",
      "Technical Graduate / Business Systems role",
    ],
    note:
      "The site stays a little playful because I like tools with personality — but the content is organized for hiring conversations.",
  },
  works: [
    {
      name: "OpsDesk",
      summary:
        "An AI-native support and operations desk that turns customer cases into reviewable evidence, decisions, drafts, approvals, and audit trails.",
      roleFit: "Internal tools · AI workflow adoption · support automation · product engineering",
      evidence: [
        "Deployed demo with support queue, review packages, approval gates, feedback memory, and replay",
        "Shows how I think about safe AI: bounded suggestions, human approval, auditability, and evaluation loops",
        "Useful for explaining customer-support automation and fintech/operations guardrails",
      ],
      stack: ["Next.js", "TypeScript", "Postgres", "Docker", "AI workflow design", "Oracle deploy"],
      link: "https://jobops.zhangjiajia.me/opsdesk",
      color: "blue",
      primary: true,
    },
    {
      name: "Nimbus Weather Journal",
      summary:
        "A polished iOS weather-journal product with SwiftUI surfaces, widget/shared settings, weather data flows, radar/wind features, and fallback behavior.",
      roleFit: "iOS · product engineering · API-backed consumer app · quality/release discipline",
      evidence: [
        "TestFlight/release-lane style project with CI-quality-gate thinking",
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
      roleFit: "Optimization · decision support · logistics analytics · operations research",
      evidence: [
        "Connects academic modeling with operational constraints, runtime budgets, and fallback decisions",
        "Frames solver behavior through evidence, safety guards, and benchmark families rather than black-box claims",
        "Useful for analytics, planning, supply-chain, and decision-support roles",
      ],
      stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design", "Data analysis"],
      link: "#",
      color: "orange",
      primary: true,
    },
    {
      name: "Cargo Guard",
      summary:
        "A lightweight data-quality cockpit for logistics events: contracts, freshness/completeness checks, ETA drift, severity routing, and owner actions.",
      roleFit: "Data quality · DataOps · logistics analytics · governance tooling",
      evidence: [
        "Turns raw shipment-event issues into contracts, severity, owners, and next actions",
        "Designed as portfolio proof for data quality and AI governance roles, not as fake enterprise production",
        "Shows practical data-product thinking: checks, routing, dashboard, and operational language",
      ],
      stack: ["Python", "JSON contracts", "Data validation", "HTML dashboard", "Logistics data"],
      link: "#",
      color: "yellow",
      primary: true,
    },
    {
      name: "Life-OS / Personal Workflow System",
      summary:
        "A personal operating system for project memory, application tracking, workflow routing, and AI-assisted work with verification habits.",
      roleFit: "Operations systems · knowledge management · AI-assisted workflows",
      evidence: [
        "Shows how I structure work across job applications, projects, thesis evidence, and deployment notes",
        "Relevant for roles that need systematic execution, not just coding tasks",
        "Keeps source-of-truth documents, logs, and reusable workflows instead of scattered notes",
      ],
      stack: ["Markdown", "Automation", "AI agents", "Workflow design", "Git"],
      link: "#",
      color: "green",
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

### What I am looking for

Junior or graduate roles where product sense and engineering depth both matter: full-stack internal tools, AI workflow adoption, operations systems, data quality, planning analytics, and technical business systems.

### How I work

I like starting from an operating problem rather than a technology label. What is the queue? What evidence does a human need? Where should automation stop? What needs to be logged, reviewed, replayed, or measured?

### What this portfolio proves

OpsDesk shows AI workflow and support-automation thinking. Nimbus shows product polish and iOS/API implementation. Cargo Guard shows data-quality and governance language. My DTU/Mover thesis shows optimization-backed decision support. This site keeps the presentation light, but the project framing is intentionally practical.

You can reach me at [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com), [LinkedIn](https://www.linkedin.com/in/jiajia-zhang-0a8a40289), or [GitHub](https://github.com/isjiajia01).
  `,
};

export default dictionary;
