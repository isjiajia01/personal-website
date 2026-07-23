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
A Copenhagen-based DTU MSc Engineering graduate in Mathematical Modelling and Computation, building practical systems for complex operational work.

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
    afgang: "/en/projects/afgang",
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
      "Afgang: a local-first transport utility with scheduled reachability, conservative map surfaces, transactional data updates, and cross-browser verification.",
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
      name: "Afgang",
      summary:
        "A local-first Copenhagen transport utility combining commute decisions with conservative, timetable-based reachability maps.",
      roleFit: "Full-stack engineering · transit data · geospatial reliability",
      evidence: [
        "Runs scheduled 15/30/45/60-minute reachability in-process with r5py/R5 over official Rejseplanen GTFS and OpenStreetMap data",
        "Binds GTFS, OSM, network, runtime, versions, hashes, and service dates in a transactional candidate/promotion/rollback lifecycle",
        "Verified by 86 tests, Chromium and WebKit across four viewports, and 12 boundary checks with zero optimistic contour buckets",
      ],
      stack: ["Python", "FastAPI", "r5py/R5", "GTFS", "GeoPandas", "MapLibre", "Lifecycle design"],
      link: "/en/projects/afgang",
      color: "emerald",
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
  afgangCase: {
    title: "Afgang",
    eyebrow: "Owner-local transport utility · Copenhagen · 2026",
    summary:
      "Afgang answers two daily transport questions: when should I leave, and how far can Copenhagen's scheduled network take me in 15, 30, 45, or 60 minutes?",
    metaDescription:
      "Afgang case study: a FastAPI and R5 transport utility built with official Rejseplanen GTFS, OpenStreetMap data, conservative reachability surfaces, and transactional data operations.",
    backToWorks: "Back to work",
    status: ["Scheduled", "Owner-local", "Case study"],
    sectionLabels: {
      outcome: "Product outcome",
      system: "System design",
      decisions: "Engineering decisions",
      lifecycle: "Data lifecycle",
      validation: "Verification",
      interface: "Interface",
      boundaries: "Claim boundaries",
      sources: "Data and map sources",
    },
    metrics: [
      { value: "86", label: "automated tests" },
      { value: "4", label: "travel-time layers" },
      { value: "12", label: "boundary routes audited" },
      { value: "0", label: "optimistic contour buckets" },
    ],
    outcome: [
      "The commute view turns a saved origin, destination, and arrival target into a leave-time decision, refreshable journey legs, and owner-controlled browser alerts.",
      "The reachability view computes schedule-based surfaces locally. A user chooses an origin and whole-minute departure, then compares nested 15, 30, 45, and 60-minute areas on a responsive map.",
    ],
    systemIntro:
      "The browser talks only to Afgang. One FastAPI lifespan loads a long-lived R5 network, while a process-local lock serializes calculations and a bounded TTL cache handles repeated requests.",
    systemFlow: [
      "Official Rejseplanen GTFS + Denmark OSM",
      "Hash-bound manifest v2",
      "r5py 1.1.7 / R5 7.5.1",
      "Conservative 250 m hex surface",
      "Leaflet + MapLibre interface",
    ],
    decisions: [
      {
        title: "Replace an obsolete routing dependency",
        body: "The verified baseline used OTP 2.5's sandbox TravelTime API. OTP 2.6 removed that API, so the production path moved to in-process R5 instead of preserving a dead compatibility layer or exposing another service port.",
      },
      {
        title: "Prefer conservative geometry",
        body: "R5 travel times are converted into 250 m hex cells, with 25 m stop anchors and a five-minute anchor margin. The map may understate a boundary, but the audited contours do not make optimistic station-level promises.",
      },
      {
        title: "Make data identity a hard gate",
        body: "GTFS, OSM, the serialized network, runtime JAR, engine versions, hashes, and real service dates define one bundle identity. Invalid or expired identity fails closed instead of silently extending timetable coverage.",
      },
    ],
    lifecycleIntro:
      "Active reachability data is never rebuilt in place. Each feed update follows a recoverable transaction:",
    lifecycle: [
      "Prepare an isolated candidate without interrupting the active app.",
      "Build the R5 network and audit service dates, warnings, hashes, and boundary evidence.",
      "Stop briefly and promote the complete bundle with atomic directory renames.",
      "Run health and smoke checks; automatically restore the prior bundle and freshness state on failure.",
    ],
    validationIntro:
      "The release gate combined unit and failure-injection coverage with real engine and browser checks. Chromium and WebKit ran sequentially at desktop, tablet, mobile portrait, and mobile landscape sizes.",
    validationDetail:
      "In 12 representative rail and bus checks, contour buckets were 10 exact, 2 conservative, and 0 optimistic. Point-to-point buckets agreed in 11 cases; one København H–Køge discrepancy remains documented rather than reclassified.",
    interfaceBody:
      "Both views share one quiet utility language: system typography, compact controls, visible status, responsive geometry, keyboard focus, reduced-motion handling, and a raster fallback when the vector basemap cannot initialize.",
    limits: [
      "Reachability is scheduled and timetable-based, not realtime.",
      "The current application is an owner-only service bound to 127.0.0.1, not a public production deployment.",
      "Contours are overview geometry; a concrete journey check remains necessary near a boundary.",
      "No commercial users, transport-operator adoption, or enterprise-scale operation is claimed.",
    ],
    sourceIntro:
      "Transit schedules come from Rejseplanen Labs static GTFS under CC BY 4.0. Routing streets come separately from OpenStreetMap; the displayed vector basemap uses OpenFreeMap and OpenMapTiles.",
    sourceLinks: {
      rejseplanen: "Rejseplanen Labs GTFS",
      openStreetMap: "OpenStreetMap copyright",
      openFreeMap: "OpenFreeMap",
      openMapTiles: "OpenMapTiles",
    },
    imageAlts: {
      reachabilityDesktop:
        "Afgang desktop reachability map showing four scheduled travel-time contours from Nørreport Station",
      commuteDesktop:
        "Afgang commute view showing a leave-time decision and journey legs from DTU to Nørreport Station",
      reachabilityMobile:
        "Afgang mobile reachability map with travel-time legend and calculation controls",
    },
    imageCaptions: {
      reachability: "Scheduled reachability from Nørreport Station across four travel-time layers.",
      commute: "The commute view keeps the next decision and its evidence in one scan path.",
      mobile: "The map remains visible while the control surface becomes a mobile bottom sheet.",
    },
  },
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
This is a job-facing personal index for [Jiajia Zhang](https://me.zhangjiajia.me), based in Copenhagen. I completed the DTU MSc Engineering degree in Mathematical Modelling and Computation in July 2026.

### Why these projects

I am not trying to look like four different candidates. The main thread is internal tools and workflow systems: support queues, evidence packages, human review, data-quality checks, operational logs, and decision support.

### How I work

I usually start from the operating problem. What is the queue? What does a reviewer need to trust the next action? Where should automation stop? What should be logged, approved, replayed, or measured?

### Where I fit first

I would be most useful on teams building internal tools, support/operations workflows, planning tools, or decision-support products. OpsDesk, Denmark Flex Planner, Afgang, Nimbus, and the DTU × Mover thesis are the best starting points; Cargo Guard is supporting proof for data-quality thinking.

This portfolio itself is also a small content-and-deployment project built with Next.js static export. You can reach me at [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com), [LinkedIn](https://www.linkedin.com/in/jiajia-zhang-0a8a40289), or [GitHub](https://github.com/isjiajia01).
  `,
};

export default dictionary;
