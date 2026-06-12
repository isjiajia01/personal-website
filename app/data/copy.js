export function resolveLocale(value) {
  return value === "zh" ? "zh" : "en";
}

export const asciiBlocks = {
  top: String.raw`
     ** **          
    /**//           
    /** **  ******  
    /**/** //////** 
    /**/**  ******* 
**  /**/** **////** 
//***** /**//********
 /////  //  //////// 
  `,
  bottom: String.raw`
_      
  / . _ 
(_/ / /_|
  `
};

export const siteCopy = {
  nav: {
    work: "Work",
    about: "About",
    contact: "Contact"
  },
  hero: {
    location: "CPH [DK]",
    label: "Product systems · AI workflow · Internal tools",
    title: "Jiajia Zhang",
    summary: "I build the operating layer for complex work: product surfaces, workflow systems, and decision tools that make ambiguity easier to act on.",
    cta: "Email me",
    secondaryCta: "See work",
    scrollPrompt: "Scroll down to learn more about my work"
  },
  work: {
    index: "(01)",
    eyebrow: "// Selected work",
    title: "Work that turns complexity into operating systems",
    intro:
      "The strongest through-line is practical systems work: AI workflow control planes, optimization-backed decision support, and polished product surfaces that stay legible under real constraints.",
    fastLaneLabel: "Hiring fast lane",
    fastLaneLinks: [
      { href: "#opsdesk", label: "OpsDesk" },
      { href: "#mover-planning-thesis", label: "Mover thesis" },
      { href: "#nimbus", label: "Nimbus" }
    ],
    detailCta: "Open case"
  },
  about: {
    index: "(02)",
    eyebrow: "// How I work",
    title: "Between product judgment and system depth",
    intro:
      "I am most useful where teams need to turn messy operations, data, or AI-assisted work into tools people can actually trust. My background in industrial engineering, optimization, product interfaces, and full-stack prototypes helps me move from problem framing to working systems without losing the operational context.",
    workingStyle:
      "I like collaboration that is concrete: define the workflow, expose the tradeoffs, build the smallest reliable system, and leave behind evidence that makes the next decision easier.",
    timeline: [
      {
        years: "2026",
        role: "Product systems",
        detail:
          "Across Nimbus, I treated interface design, backend aggregation, fallback logic, and context modules as one connected product system rather than separate layers."
      },
      {
        years: "2026",
        role: "Decision-first UX",
        detail:
          "In Nu, I focused on decision speed: helping people scan nearby options, understand departures, and act quickly without carrying extra interface noise."
      },
      {
        years: "2026",
        role: "Planning systems",
        detail:
          "In planning and optimization work, I focus on turning complex models into scenario comparisons, tradeoffs, and decision-support tools that operators can actually use."
      }
    ],
    principles: [
      "Workflow-first: start from the operating problem, not the feature list.",
      "Evidence-aware: make safety, fallback behavior, and verification visible.",
      "Product-minded: keep the interface calm enough for real decisions."
    ]
  },
  contact: {
    index: "(03)",
    eyebrow: "// Say hello",
    title: "Open to full-time product systems, AI workflow, and internal tooling roles",
    lead: "Available for full-time start from July 2026 after completing my current academic obligations. Based in Copenhagen and open to roles where clarity, reliability, and execution quality matter.",
    cta: "Email me",
    secondaryCta: "View GitHub",
    footer: "© 2026 Jiajia Zhang  Copenhagen, Denmark"
  }
};

export const detailPageCopy = {
  backHome: "Back to work",
  sectionLabel: "Case file",
  switchLabel: "Language",
  typeLabel: "Type",
  roleLabel: "Role",
  platformLabel: "Platform",
  contributionLabel: "Contribution",
  summaryLabel: "Project summary",
  stackLabel: "Stack",
  challengeTitle: "Problem",
  approachTitle: "Approach",
  impactTitle: "Outcome",
  relatedTitle: "Related work",
  projectLinkLabel: "Links",
  openProject: "Open case"
};
