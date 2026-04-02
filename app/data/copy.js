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
    label: "Systems, AI workflows, and internal products",
    title: "Jiajia Zhang",
    summary: "I build product surfaces and operating systems that make complex work feel calmer, clearer, and easier to trust.",
    cta: "Email me",
    scrollPrompt: "Scroll down to learn more about my work"
  },
  work: {
    index: "(01)",
    eyebrow: "// Work by type",
    title: "Work",
    intro:
      "I tend to work in three modes: shaping product surfaces, building internal systems, and translating analysis into decision support.",
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
        role: "Planning systems",
        detail:
          "In planning and optimization work, I focus on turning complex models into scenario comparisons, tradeoffs, and decision-support tools that operators can actually use."
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
