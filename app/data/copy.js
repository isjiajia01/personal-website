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
    label: "Systems, products, and execution design",
    title: "Jiajia Zhang",
    subtitle:
      "I work across internal systems, AI workflows, product surfaces, and decision support.",
    summary:
      "I design and build product systems, AI workflows, and internal tools that make complex work clearer, faster, and more reliable.",
    cta: "Email me",
    scrollPrompt: "Scroll down to learn more about my work"
  },
  keywords: [
    "Weather Product",
    "Transit UX",
    "Transport Simulation",
    "Decision Support",
    "SwiftUI",
    "System Design",
    "Product Thinking",
    "Operational Context",
    "Optimization",
    "Interface Clarity"
  ],
  work: {
    index: "(01)",
    eyebrow: "// Current work",
    title: "Work",
    intro:
      "Selected projects that show how I frame ambiguous problems, shape product surfaces, and turn technical depth into usable systems.",
    current: [
      {
        role: "Product Builder",
        company: "Nimbus",
        detail:
          "Building a weather product that combines app interface, backend aggregation, radar, and richer context modules."
      },
      {
        role: "Product Builder",
        company: "Nu",
        detail:
          "Designing a commuter-first transit experience focused on nearby stations, departures, and fast decision-making."
      },
      {
        role: "System Builder",
        company: "Transport-Sim",
        detail:
          "Shaping transport optimization and simulation into a decision-support interface instead of a model-only demonstration."
      }
    ],
    selectedTitle: "Selected projects",
    detailCta: "Open case"
  },
  about: {
    index: "(02)",
    eyebrow: "// The path so far",
    title: "About",
    intro:
      "My work sits between product direction and system depth. I like turning fuzzy operating problems into tools, workflows, and interfaces that teams can trust under real conditions.",
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
        role: "Operational clarity",
        detail:
          "In transport simulation work, I shifted the conversation from model complexity toward scenarios, tradeoffs, and the decisions operators actually need to make."
      }
    ],
    principles: [
      "I work comfortably across interface, architecture, and workflow design when the problem demands end-to-end ownership.",
      "I care about systems that remain legible after launch, especially where reliability, fallback behavior, and operational clarity matter.",
      "I am most energized by products and internal tools that reduce ambiguity and make hard work easier to execute."
    ]
  },
  contact: {
    index: "(03)",
    eyebrow: "// Say hello",
    title: "Contact",
    lead: "Open to product systems, AI workflow, and internal tooling work where clarity, reliability, and execution quality matter.",
    availability: "Currently open to selected roles, collaborations, and thoughtful product conversations.",
    cta: "Email me",
    secondaryCta: "View GitHub",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/isjiajia01"
      }
    ],
    footer: "© 2026 Jiajia Zhang  Copenhagen, Denmark"
  }
};

export const detailPageCopy = {
  backHome: "Back to work",
  sectionLabel: "Case file",
  switchLabel: "Language",
  summaryLabel: "Project summary",
  roleLabel: "Scope",
  stackLabel: "Stack",
  challengeTitle: "Problem",
  approachTitle: "Approach",
  impactTitle: "Outcome",
  relatedTitle: "Related work",
  projectLinkLabel: "Links",
  openProject: "Open case"
};
