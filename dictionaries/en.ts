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
    analyticalProof: "Planning / Analytics Proof",
    icon(label: string) {
      return `Icon for ${label}`;
    },
  },
  homepage: {
    headline:
      "I build internal tools and workflow systems for teams that need clearer evidence, safer automation, and better decisions.",
    subline:
      "Best fit: junior product/full-stack roles around internal tools, support automation, and operational decision support. iOS product work and optimization research are adjacent proof, not separate directions.",
    proofPoints: [
      "OpsDesk: a deployed support/operations demo with evidence packages, draft actions, approval gates, feedback memory, and audit replay.",
      "Nimbus: SwiftUI/iOS product implementation with weather data flows, widgets, fallback behavior, and feature-level polish.",
      "DTU × Mover Thesis: a real logistics planning project that turns routing constraints into decision-support evidence.",
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
      name: "Denmark Flex Planner",
      summary:
        "A live, map-first decision-support tool for prioritizing Danish EV charging and local flexibility investments under budget, grid-zone, and regional constraints.",
      roleFit: "Energy infrastructure · constrained optimization · data product",
      evidence: [
        "Combines Danish public EV, renewable, grid, and geospatial data into municipality-level planning evidence",
        "Lets users compare scenarios and optimize a constrained investment portfolio with explainable municipality recommendations",
        "Deployed FastAPI and Next.js product with a public interactive map, API health checks, and reproducible smoke tests",
      ],
      stack: ["Python", "FastAPI", "Next.js", "Public data", "Constrained optimization", "Oracle deploy"],
      link: "https://flex.zhangjiajia.me",
      color: "green",
      primary: true,
    },
    {
      name: "Cargo Guard",
      summary:
        "A small Python demo that checks whether logistics data is complete, fresh, valid, and ready to trust before teams use it.",
      roleFit: "Data quality · operational checks · supporting evidence",
      evidence: [
        "Runs local checks for missing fields, duplicate IDs, invalid values, stale records, and unusual shipment data",
        "Exports a JSON run and simple HTML report so issues can be reviewed instead of hidden in a spreadsheet",
        "Useful as supporting proof for data-quality thinking, but not the main portfolio story",
      ],
      stack: ["Python", "JSON contracts", "Data validation", "HTML report", "Logistics demo data"],
      link: "#",
      color: "yellow",
      primary: false,
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
        "A real logistics planning project with Mover context: decide how multi-day deliveries should be admitted, routed, and recovered when depots are under stress.",
      roleFit: "Logistics planning · optimization · operational decision support",
      evidence: [
        "Turns routing constraints, depot pressure, service feasibility, and runtime limits into a decision-support system",
        "Uses guardrails and experiments to explain when a search improvement is safe to accept",
        "Strong proof for analytical thinking, complex systems, and operations-facing product work",
      ],
      stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design", "Operational analysis"],
      link: "#",
      color: "orange",
      primary: true,
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

I would be most useful on teams building internal tools, support/operations workflows, planning tools, or decision-support products. OpsDesk, Denmark Flex Planner, Nimbus, and the DTU × Mover thesis are the best starting points; Cargo Guard is supporting proof for data-quality thinking.

This portfolio itself is also a small content-and-deployment project built with Next.js static export. You can reach me at [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com), [LinkedIn](https://www.linkedin.com/in/jiajia-zhang-0a8a40289), or [GitHub](https://github.com/isjiajia01).
  `,
};

export default dictionary;
