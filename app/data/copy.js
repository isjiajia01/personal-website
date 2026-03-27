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
    timeline: [
      {
        years: "2026",
        role: "Nimbus",
        detail:
          "Worked across app presentation, backend aggregation, provider fallback, and richer weather context as one product system."
      },
      {
        years: "2026",
        role: "Nu",
        detail:
          "Built a native iOS transit prototype organized around commuter flow: nearby stops, departures, and journey detail."
      },
      {
        years: "2026",
        role: "Transport-Sim",
        detail:
          "Framed transport optimization and simulation work around scenarios, tradeoffs, and operational decision-making."
      }
    ]
  },
  contact: {
    index: "(03)",
    eyebrow: "// Say hello",
    title: "Contact",
    lead: "If the work above is close to what you need, email me.",
    cta: "Email me",
    footer: "© 2026 Jiajia Zhang  Copenhagen, Denmark"
  }
};

export const detailPageCopy = {
  backHome: "Back to work",
  sectionLabel: "Case file",
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
