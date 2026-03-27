export const projectCatalog = [
  {
    slug: "nimbus",
    category: "product",
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
    slug: "transport-sim",
    category: "analysis",
    year: "2026",
    featured: true,
    kicker: {
      en: "Decision Support",
      zh: "决策支持"
    },
    title: {
      en: "Transport-Sim",
      zh: "Transport-Sim"
    },
    summary: {
      en: "A transport network simulation and optimization demo shaped as a decision-support surface for discussing scenarios, tradeoffs, and operations.",
      zh: "一个交通网络仿真与优化演示，被塑造成决策支持界面，而不是单纯展示模型本身。"
    },
    tags: ["Optimization", "Streamlit", "Scenario Design"],
    links: [],
    details: {
      challenge: {
        en: "Optimization work is often hard to discuss with non-specialists because interfaces stay too close to the model and too far from the decision.",
        zh: "优化工作往往难以和非专业受众沟通，因为界面离模型太近、离决策太远。"
      },
      approach: {
        en: "Built the demo around scenarios, tradeoffs, and transport operations questions rather than mathematical machinery alone.",
        zh: "围绕情景、权衡和交通运营问题组织演示，而不是只围绕数学机制本身。"
      },
      impact: {
        en: "Made optimization work easier to explain, easier to evaluate with stakeholders, and easier to connect to operational decisions.",
        zh: "让这类工作更容易解释，也更容易连接到真实运营决策。"
      },
      role: {
        en: "Problem framing, simulation design, and decision-support presentation.",
        zh: "问题定义、仿真设计与决策支持呈现。"
      },
      stack: ["Python", "OR", "Streamlit", "Plotly"]
    }
  }
];

export const projectCategoryLabels = {
  product: { en: "Product", zh: "产品" },
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

export function getArchivedProjects() {
  return [];
}

export function getCategoryOptions() {
  return Object.keys(projectCategoryLabels);
}
