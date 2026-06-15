export interface ResumeContact {
  kind: "website" | "email" | "github" | "linkedin";
  label: string;
  value: string;
  href: string;
}

export interface ResumePreferenceGroup {
  kind: "cities" | "industries" | "roles";
  label: string;
  items: string[];
}

export interface ResumeProject {
  name: string;
  note?: string;
  href?: string;
  description: string;
  stack: string[];
}

export interface ResumeExperience {
  role: string;
  organization: string;
  location?: string;
  period: string;
  summary: string;
  projects: ResumeProject[];
}

export interface ResumeSkillGroup {
  label: string;
  items: string[];
}

export interface ResumeEducation {
  school: string;
  degree: string;
  location: string;
  period: string;
}

export interface ResumeContent {
  pageTitle: string;
  name: string;
  summary: string;
  imageDescription: string;
  highlights: string[];
  sectionLabels: {
    preferences: string;
    experience: string;
    skills: string;
    education: string;
  };
  contacts: ResumeContact[];
  preferenceGroups: ResumePreferenceGroup[];
  experiences: ResumeExperience[];
  skillGroups: ResumeSkillGroup[];
  education: ResumeEducation;
}

export const resumeContent: Record<"zh" | "en", ResumeContent> = {
  zh: {
    pageTitle: "简历索引",
    name: "Jiajia Zhang",
    summary:
      "DTU 硕士，面向 junior/graduate 角色的 product-minded builder。项目集中在 internal tools、AI workflow control plane、iOS/SwiftUI 产品、数据质量 cockpit 和优化驱动的决策支持。适合需要工程实现、产品判断、运营流程理解和证据化沟通的岗位。",
    imageDescription:
      "Jiajia Zhang，做 internal tools、AI workflows、SwiftUI 产品、数据质量和优化决策支持。",
    highlights: [],
    sectionLabels: {
      preferences: "求职方向",
      experience: "项目/经历证据",
      skills: "能力栈",
      education: "教育",
    },
    contacts: [
      {
        kind: "website",
        label: "网站",
        value: "me.zhangjiajia.me",
        href: "https://me.zhangjiajia.me",
      },
      {
        kind: "email",
        label: "邮箱",
        value: "isjiajiazhang@gmail.com",
        href: "mailto:isjiajiazhang@gmail.com",
      },
      {
        kind: "github",
        label: "GitHub",
        value: "github.com/isjiajia01",
        href: "https://github.com/isjiajia01",
      },
      {
        kind: "linkedin",
        label: "LinkedIn",
        value: "Jiajia Zhang",
        href: "https://www.linkedin.com/in/jiajia-zhang-0a8a40289",
      },
    ],
    preferenceGroups: [
      {
        kind: "cities",
        label: "地点",
        items: ["Denmark", "Copenhagen", "Hybrid/Remote", "EU-facing teams"],
      },
      {
        kind: "industries",
        label: "业务场景",
        items: ["Internal tools", "Operations", "Support automation", "Logistics", "Data quality"],
      },
      {
        kind: "roles",
        label: "岗位",
        items: ["Junior Full-stack", "AI Workflow", "Data/Operations Analyst", "Technical Graduate"],
      },
    ],
    experiences: [
      {
        role: "Portfolio Builder / Product-minded Engineer",
        organization: "Personal Projects",
        location: "Copenhagen",
        period: "2025 - 现在",
        summary:
          "围绕真实岗位场景做可打开、可解释的作品：支持自动化、AI 工作流、数据质量、iOS 产品和个人 workflow systems。重点不是堆功能，而是让招聘方面试时能看到问题定义、证据、边界和落地方式。",
        projects: [
          {
            name: "OpsDesk",
            note: "AI support / operations workflow demo",
            href: "https://jobops.zhangjiajia.me/opsdesk",
            description:
              "构建支持/运营工作台：队列、证据包、草稿回复、审批门、反馈记忆、审计 replay。体现 bounded AI、human-in-the-loop、可复盘和评估思路。",
            stack: ["Next.js", "TypeScript", "Postgres", "Docker", "AI workflow design"],
          },
          {
            name: "Cargo Guard",
            note: "Data quality cockpit",
            description:
              "用物流 shipment-event 合成数据展示数据契约、freshness/completeness/range/duplicate 检查、ETA drift 和 owner/severity/action routing。",
            stack: ["Python", "JSON contracts", "Data validation", "HTML dashboard"],
          },
          {
            name: "Nimbus Weather Journal",
            note: "SwiftUI / iOS product",
            href: "https://github.com/isjiajia01/10.01_Nimbus",
            description:
              "SwiftUI 天气日记项目，覆盖天气数据、widget/shared settings、radar/wind features、月相/illumination 和 fallback 行为。",
            stack: ["Swift", "SwiftUI", "WeatherKit", "SceneKit", "Widgets"],
          },
        ],
      },
      {
        role: "MSc Thesis / Optimization Research",
        organization: "DTU × Mover",
        location: "Denmark",
        period: "2025 - 2026",
        summary:
          "与 Mover 场景相关的 depot-aware rolling decomposition 研究，关注多日末端配送规划在 operational stress 下的可行性、runtime budget、fallback 和 guarded search。",
        projects: [
          {
            name: "Depot-aware rolling decision support",
            note: "Last-mile planning",
            href: undefined,
            description:
              "设计并评估面向多日配送规划的 rolling architecture、Pareto guard、SDAP runtime framing 和 depot-pressure search，用实验区分 operational feasibility、repeatability 和 academic search-depth evidence。",
            stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design"],
          },
        ],
      },
      {
        role: "Industry / Coursework Foundation",
        organization: "Dehui, Deloitte, DTU, GDUT",
        location: "China / Denmark",
        period: "2018 - 2026",
        summary:
          "早期开发和课程背景支撑：Java/Spring 后端、JavaScript/Vue 前端、计算机与工业工程基础，以及 DTU 期间的数据、优化和系统建模训练。",
        projects: [
          {
            name: "Backend / frontend foundation",
            href: undefined,
            description:
              "有 Java/Spring、JavaScript/Vue、SQL/API 和工程课程基础，可用于 junior full-stack、internal tools 和 business systems 方向。",
            stack: ["Java", "Spring", "JavaScript", "Vue", "SQL", "REST APIs"],
          },
        ],
      },
    ],
    skillGroups: [
      {
        label: "工程",
        items: ["TypeScript", "Next.js", "React", "Node.js", "Python", "Java/Spring", "SQL", "REST APIs"],
      },
      {
        label: "产品/系统",
        items: ["Internal tools", "Workflow design", "Approval gates", "Audit/replay", "Feedback loops"],
      },
      {
        label: "数据/优化",
        items: ["Data quality", "JSON contracts", "Logistics data", "Julia", "Vehicle routing", "Experiment design"],
      },
      {
        label: "移动/交付",
        items: ["Swift", "SwiftUI", "WeatherKit", "Docker", "GitHub Actions", "Oracle deploy"],
      },
    ],
    education: {
      school: "Technical University of Denmark (DTU)",
      degree: "MSc, Mathematical Modelling and Computation / Operations-oriented thesis with Mover context",
      location: "Denmark",
      period: "2024 - 2026",
    },
  },
  en: {
    pageTitle: "Resume Index",
    name: "Jiajia Zhang",
    summary:
      "DTU MSc student and product-minded builder targeting junior/graduate roles around internal tools, AI workflow control planes, iOS/SwiftUI products, data-quality cockpits, and optimization-backed decision support. Strongest fit: teams that need engineering implementation, product judgment, operational thinking, and evidence-based communication.",
    imageDescription:
      "Jiajia Zhang building internal tools, AI workflows, SwiftUI products, data quality systems, and optimization decision support.",
    highlights: [],
    sectionLabels: {
      preferences: "Target Roles",
      experience: "Project Evidence",
      skills: "Capability Stack",
      education: "Education",
    },
    contacts: [
      {
        kind: "website",
        label: "Website",
        value: "me.zhangjiajia.me",
        href: "https://me.zhangjiajia.me",
      },
      {
        kind: "email",
        label: "Email",
        value: "isjiajiazhang@gmail.com",
        href: "mailto:isjiajiazhang@gmail.com",
      },
      {
        kind: "github",
        label: "GitHub",
        value: "github.com/isjiajia01",
        href: "https://github.com/isjiajia01",
      },
      {
        kind: "linkedin",
        label: "LinkedIn",
        value: "Jiajia Zhang",
        href: "https://www.linkedin.com/in/jiajia-zhang-0a8a40289",
      },
    ],
    preferenceGroups: [
      {
        kind: "cities",
        label: "Location",
        items: ["Denmark", "Copenhagen", "Hybrid/Remote", "EU-facing teams"],
      },
      {
        kind: "industries",
        label: "Work Context",
        items: ["Internal tools", "Operations", "Support automation", "Logistics", "Data quality"],
      },
      {
        kind: "roles",
        label: "Roles",
        items: ["Junior Full-stack", "AI Workflow", "Data/Operations Analyst", "Technical Graduate"],
      },
    ],
    experiences: [
      {
        role: "Portfolio Builder / Product-minded Engineer",
        organization: "Personal Projects",
        location: "Copenhagen",
        period: "2025 - Present",
        summary:
          "Built job-facing portfolio systems around support automation, AI workflows, data quality, iOS products, and personal workflow systems. The emphasis is not feature volume, but clear problem framing, evidence, boundaries, and deployable artifacts.",
        projects: [
          {
            name: "OpsDesk",
            note: "AI support / operations workflow demo",
            href: "https://jobops.zhangjiajia.me/opsdesk",
            description:
              "Built a support/operations desk with queues, evidence packages, draft replies, approval gates, feedback memory, and audit replay. Demonstrates bounded AI, human-in-the-loop workflow, traceability, and evaluation thinking.",
            stack: ["Next.js", "TypeScript", "Postgres", "Docker", "AI workflow design"],
          },
          {
            name: "Cargo Guard",
            note: "Data quality cockpit",
            description:
              "Created a lightweight data-quality cockpit for synthetic logistics shipment events: contracts, freshness/completeness/range/duplicate checks, ETA drift, and owner/severity/action routing.",
            stack: ["Python", "JSON contracts", "Data validation", "HTML dashboard"],
          },
          {
            name: "Nimbus Weather Journal",
            note: "SwiftUI / iOS product",
            href: "https://github.com/isjiajia01/10.01_Nimbus",
            description:
              "Built and structured SwiftUI weather-journal features across weather data, widget/shared settings, radar/wind features, moon illumination, and fallback behavior.",
            stack: ["Swift", "SwiftUI", "WeatherKit", "SceneKit", "Widgets"],
          },
        ],
      },
      {
        role: "MSc Thesis / Optimization Research",
        organization: "DTU × Mover",
        location: "Denmark",
        period: "2025 - 2026",
        summary:
          "Worked on a Mover-context depot-aware rolling decomposition thesis for multi-day last-mile planning under operational stress, focusing on feasibility, runtime budgets, fallback behavior, and guarded search.",
        projects: [
          {
            name: "Depot-aware rolling decision support",
            note: "Last-mile planning",
            href: undefined,
            description:
              "Designed and evaluated rolling architecture, Pareto guards, SDAP runtime framing, and depot-pressure search, separating operational feasibility, repeatability, and academic search-depth evidence.",
            stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design"],
          },
        ],
      },
      {
        role: "Industry / Coursework Foundation",
        organization: "Dehui, Deloitte, DTU, GDUT",
        location: "China / Denmark",
        period: "2018 - 2026",
        summary:
          "Earlier development and coursework foundation: Java/Spring backend, JavaScript/Vue frontend, computer-science and industrial-engineering background, plus DTU training in data, optimization, and systems modeling.",
        projects: [
          {
            name: "Backend / frontend foundation",
            href: undefined,
            description:
              "Practical foundation across Java/Spring, JavaScript/Vue, SQL/API work, and engineering coursework for junior full-stack, internal-tools, and business-systems roles.",
            stack: ["Java", "Spring", "JavaScript", "Vue", "SQL", "REST APIs"],
          },
        ],
      },
    ],
    skillGroups: [
      {
        label: "Engineering",
        items: ["TypeScript", "Next.js", "React", "Node.js", "Python", "Java/Spring", "SQL", "REST APIs"],
      },
      {
        label: "Product / Systems",
        items: ["Internal tools", "Workflow design", "Approval gates", "Audit/replay", "Feedback loops"],
      },
      {
        label: "Data / Optimization",
        items: ["Data quality", "JSON contracts", "Logistics data", "Julia", "Vehicle routing", "Experiment design"],
      },
      {
        label: "Mobile / Delivery",
        items: ["Swift", "SwiftUI", "WeatherKit", "Docker", "GitHub Actions", "Oracle deploy"],
      },
    ],
    education: {
      school: "Technical University of Denmark (DTU)",
      degree: "MSc, Mathematical Modelling and Computation / Operations-oriented thesis with Mover context",
      location: "Denmark",
      period: "2024 - 2026",
    },
  },
};
