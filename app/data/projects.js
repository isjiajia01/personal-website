export const projectCatalog = [
  {
    slug: "nimbus",
    category: "product",
    group: "product-surfaces",
    year: "2026",
    featured: true,
    kicker: {
      en: "Weather Product",
      zh: "天气产品"
    },
    title: {
      en: "Nimbus",
      zh: "Nimbus"
    },
    summary: {
      en: "A weather product spanning app UI, aggregation logic, radar, and richer context modules, built to stay dependable under messy real-world data.",
      zh: "一个覆盖应用界面、聚合逻辑、雷达与丰富上下文模块的天气产品系统。"
    },
    role: "End-to-end builder",
    platform: "iOS + backend",
    contribution: ["Product framing", "App architecture", "Fallback logic"],
    tags: ["SwiftUI", "Cloud Run", "Weather APIs"],
    links: [
      {
        href: "https://github.com/isjiajia01/10.01_Nimbus",
        label: { en: "View repo", zh: "查看仓库" },
        external: true
      }
    ],
    details: {
      challenge: {
        en: "Weather interfaces often look polished on the surface but break under inconsistent upstream data and uneven context depth.",
        zh: "天气产品往往表面精致，但在上游数据不稳定和上下文深度不足时很容易失衡。"
      },
      approach: {
        en: "Worked across app presentation, backend aggregation, provider fallback, and visual weather modules as one integrated product system.",
        zh: "把应用界面、后端聚合、供应商回退和天气可视模块当作一个整体产品系统来处理。"
      },
      impact: {
        en: "Produced a more resilient product surface with stronger fallback behavior, clearer context, and a better day-to-day weather experience.",
        zh: "形成了更稳健的产品界面，在降级行为和日常天气体验上都更清晰。"
      },
      role: {
        en: "Product framing, app architecture, backend evolution, and release workflow.",
        zh: "产品定义、应用架构、后端演进与发布流程。"
      },
      stack: ["SwiftUI", "Python", "Cloud Run", "API Integration"]
    }
  },
  {
    slug: "nu",
    category: "product",
    group: "product-surfaces",
    year: "2026",
    featured: true,
    kicker: {
      en: "Transit Product",
      zh: "交通产品"
    },
    title: {
      en: "Nu",
      zh: "Nu"
    },
    summary: {
      en: "A commuter-first iOS transit app prototype focused on helping people scan options quickly and act with confidence in motion.",
      zh: "一个面向通勤场景的 iOS 交通原型，重点是快速扫描、判断与行动。"
    },
    role: "Product builder",
    platform: "iOS",
    contribution: ["Decision-first UX", "Native architecture", "Interface design"],
    tags: ["SwiftUI", "Transit", "MapKit"],
    links: [
      {
        href: "https://github.com/isjiajia01/10.02_Nu",
        label: { en: "View repo", zh: "查看仓库" },
        external: true
      }
    ],
    details: {
      challenge: {
        en: "Transit data is easy to fetch and hard to turn into fast, action-ready commuter decisions.",
        zh: "交通数据很容易获取，但很难转化成可直接行动的高频通勤决策。"
      },
      approach: {
        en: "Built the app around user flow first: nearby stops, departures, journey detail, and map context with less interface noise.",
        zh: "先按用户流程组织应用：附近站点、发车信息、行程详情和地图上下文，并尽量减少界面噪音。"
      },
      impact: {
        en: "Created a more legible transit experience for repeated commuter decisions where time pressure and low attention matter.",
        zh: "形成了一个更适合真实通勤场景中反复决策的可读体验。"
      },
      role: {
        en: "Product framing, native app architecture, and interface design.",
        zh: "产品定义、原生应用架构与界面设计。"
      },
      stack: ["SwiftUI", "Transit APIs", "MapKit"]
    }
  },
  {
    slug: "life-os",
    category: "system",
    group: "internal-systems",
    year: "2026",
    featured: true,
    kicker: {
      en: "Internal System",
      zh: "内部系统"
    },
    title: {
      en: "Life OS",
      zh: "Life OS"
    },
    summary: {
      en: "A personal operating system for execution: structured memory, reusable workflows, project tracking, and automation that reduce daily ambiguity.",
      zh: "一个围绕执行构建的个人操作系统：把记忆、流程、项目跟踪与自动化组织成可复用结构。"
    },
    role: "System designer",
    platform: "Docs + scripts + agent workflows",
    contribution: ["Workflow design", "Knowledge structure", "Automation"],
    tags: ["Systems", "Automation", "Knowledge"],
    details: {
      challenge: {
        en: "Personal and project execution tends to fragment across chats, notes, scripts, and half-finished ideas.",
        zh: "个人执行与项目推进很容易碎裂在聊天、笔记、脚本和半成品流程之间。"
      },
      approach: {
        en: "Organized projects, memory, prompts, and automation into one operating layer so context could persist and execution could restart quickly.",
        zh: "把项目、记忆、提示词与自动化组织成同一层操作系统，让上下文能持续、执行能快速重启。"
      },
      impact: {
        en: "Improved continuity across projects and reduced the cost of switching between planning, shipping, and follow-up work.",
        zh: "提高了跨项目连续性，也降低了在规划、交付与跟进之间切换的成本。"
      },
      role: {
        en: "System design, information architecture, workflow orchestration, and automation glue.",
        zh: "系统设计、信息架构、流程编排与自动化粘合。"
      },
      stack: ["Markdown", "Scripts", "Agents", "Automation"]
    }
  },
  {
    slug: "mover-planning-thesis",
    category: "analysis",
    group: "decision-support",
    year: "2026",
    featured: true,
    kicker: {
      en: "Decision Support",
      zh: "决策支持"
    },
    title: {
      en: "Mover × DTU Planning Thesis",
      zh: "Mover × DTU 规划研究"
    },
    summary: {
      en: "Operations research and planning work focused on turning optimization models into decision support that a real operations team can use.",
      zh: "把优化模型转成真实运营团队可用的决策支持工具与规划研究。"
    },
    role: "Research + product translator",
    platform: "Optimization + decision tools",
    contribution: ["Model framing", "Scenario design", "Operational translation"],
    tags: ["Optimization", "Planning", "Decision Support"],
    details: {
      challenge: {
        en: "Optimization models create value only when operators can compare scenarios, understand tradeoffs, and act on the output.",
        zh: "优化模型只有在运营方能比较情景、理解权衡并据此行动时才真正产生价值。"
      },
      approach: {
        en: "Framed the work as an operational collaboration with Mover, focusing on scenario comparison, planning logic, and decision-ready outputs instead of model complexity alone.",
        zh: "把研究定位为与 Mover 的真实运营协作，重点放在情景比较、规划逻辑和可决策输出，而不只是模型复杂度。"
      },
      impact: {
        en: "Made planning work easier to communicate and more likely to influence real operational decisions.",
        zh: "让规划研究更容易被沟通，也更可能真正影响运营决策。"
      },
      role: {
        en: "Optimization framing, scenario planning, and translation from research output to operational support.",
        zh: "优化问题定义、情景规划，以及从研究输出到运营支持的转译。"
      },
      stack: ["Optimization", "Scenario Analysis", "Planning", "Decision Support"]
    }
  }
];

export const projectCategoryLabels = {
  product: { en: "Product", zh: "产品" },
  system: { en: "Internal System", zh: "内部系统" },
  analysis: { en: "Decision Support", zh: "决策支持" }
};

export function getProjectSlugs() {
  return projectCatalog.map((project) => project.slug);
}

export function getProjectBySlug(slug) {
  return projectCatalog.find((project) => project.slug === slug) ?? null;
}

export function getFeaturedProjects() {
  return projectCatalog;
}

export const projectGroups = [
  {
    key: "product-surfaces",
    title: "Product Surfaces",
    intro: "Interfaces, apps, and user-facing systems where the job is to make a fast decision feel obvious and trustworthy."
  },
  {
    key: "internal-systems",
    title: "Internal Systems",
    intro: "Operating layers, workflows, and internal tools that reduce coordination overhead and make repeat work easier to run well."
  },
  {
    key: "decision-support",
    title: "Decision Support",
    intro: "Planning and optimization work shaped into scenario comparisons, tradeoffs, and outputs that can support a real operating decision."
  }
];

export function getProjectsByGroup() {
  return projectGroups.map((group) => ({
    ...group,
    projects: projectCatalog.filter((project) => project.group === group.key)
  }));
}

export function getCategoryOptions() {
  return Object.keys(projectCategoryLabels);
}
