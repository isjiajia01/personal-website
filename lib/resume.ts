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
      "已于 2026 年 7 月完成 DTU 数学建模与计算硕士学位，面向初级产品 / 全栈（junior product/full-stack）角色，主线是内部工具（internal tools）、有人工审核的工作流自动化（workflow automation with human review）与运营决策支持（operational decision support）。最强证据是 OpsDesk、Nimbus 与 DTU × Mover 硕士论文（thesis）；Cargo Guard 只是数据质量补充证据。",
    imageDescription:
      "Jiajia Zhang，构建内部工具（internal tools）、工作流自动化（workflow automation）、数据质量工作流（data-quality workflows）、SwiftUI 产品与决策支持。",
    highlights: [],
    sectionLabels: {
      preferences: "求职方向",
      experience: "项目/经历证据",
      skills: "能力栈",
      education: "教育背景",
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
        items: ["丹麦（Denmark）", "哥本哈根（Copenhagen）", "混合 / 远程（Hybrid/Remote）", "面向欧洲团队（EU-facing teams）"],
      },
      {
        kind: "industries",
        label: "业务场景",
        items: [
          "内部工具（Internal tools）",
          "工作流自动化（Workflow automation）",
          "客服与运营（Support operations）",
          "数据质量（Data quality）",
        ],
      },
      {
        kind: "roles",
        label: "岗位",
        items: [
          "初级产品工程师（Junior Product Engineer）",
          "初级全栈（Junior Full-stack）",
          "内部工具构建者（Internal Tools Builder）",
        ],
      },
    ],
    experiences: [
      {
        role: "作品集构建者 / 产品导向工程师（Portfolio Builder / Product-minded Engineer）",
        organization: "个人项目（Personal Projects）",
        location: "哥本哈根（Copenhagen）",
        period: "2025 - 现在",
        summary:
          "围绕真实岗位场景做可打开、可解释的作品：支持自动化（support automation）、工作流系统（workflow systems）、数据质量校验（data-quality checks）与 iOS 产品实现。重点不是堆功能，而是让招聘方面试时能看到问题定义、证据、边界和实现选择。",
        projects: [
          {
            name: "OpsDesk",
            note: "AI 客服与运营工作流演示（AI support / operations workflow demo）",
            href: "https://jobops.zhangjiajia.me/opsdesk",
            description:
              "构建客服与运营工作台：队列、证据包、草稿回复、审批关卡、反馈记忆与审计回放（audit replay）。体现有人工审核的工作流自动化（workflow automation with human review）、可复盘与评估思路。",
            stack: ["Next.js", "TypeScript", "Postgres", "Docker", "AI workflow design"],
          },
          {
            name: "Cargo Guard",
            note: "数据质量工作台（Data quality cockpit）",
            description:
              "小型 Python 数据检查演示：检查物流记录是否缺字段、重复、过期或包含无效值，并输出 JSON 运行结果与 HTML 报告方便审核（review）。",
            stack: ["Python", "JSON contracts", "Data validation", "HTML report"],
          },
          {
            name: "Nimbus Weather Journal",
            note: "SwiftUI / iOS 产品（SwiftUI / iOS product）",
            href: "https://github.com/isjiajia01/10.01_Nimbus",
            description:
              "SwiftUI 天气日记项目，覆盖天气数据、小组件与共享设置（widget/shared settings）、雷达与风场特性（radar/wind features）、月相照明（moon illumination）与兜底（fallback）行为。",
            stack: ["Swift", "SwiftUI", "WeatherKit", "SceneKit", "Widgets"],
          },
        ],
      },
      {
        role: "硕士论文课题 / 运筹优化研究（MSc Thesis / Optimization Research）",
        organization: "DTU × Mover",
        location: "丹麦（Denmark）",
        period: "2025 - 2026",
        summary:
          "与 Mover 场景相关的仓库感知滚动分解（depot-aware rolling decomposition）研究，关注多日末端配送规划在运营压力（operational stress）下的可行性、运行耗时预算（runtime budget）、兜底机制（fallback）与安全护栏搜索（guarded search）。",
        projects: [
          {
            name: "Depot-aware rolling decision support",
            note: "末端配送规划（Last-mile planning）",
            href: undefined,
            description:
              "设计并评估面向多日配送规划的滚动架构（rolling architecture）、Pareto 护栏（Pareto guard）、SDAP 运行耗时设定（SDAP runtime framing）与仓库压力搜索（depot-pressure search），用实验区分运营可行性（operational feasibility）、可复现性（repeatability）与学术搜索深度证据。",
            stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design"],
          },
        ],
      },
      {
        role: "早期工程基础（Earlier Engineering Foundation）",
        organization: "Dehui, Deloitte, DTU, GDUT",
        location: "中国 / 丹麦（China / Denmark）",
        period: "2018 - 2026",
        summary:
          "早期开发与课程背景支撑：Java/Spring 后端、JavaScript/Vue 前端、计算机与工业工程基础，以及 DTU 期间的数据、优化与系统建模训练。",
        projects: [
          {
            name: "Backend / frontend foundation",
            href: undefined,
            description:
              "具备 Java/Spring、JavaScript/Vue、SQL/API 与工程课程基础，适用于初级全栈（junior full-stack）、内部工具（internal tools）与业务系统（business systems）方向。",
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
        items: [
          "内部工具（Internal tools）",
          "工作流设计（Workflow design）",
          "审批关卡（Approval gates）",
          "审计与回放（Audit/replay）",
          "反馈闭环（Feedback loops）",
        ],
      },
      {
        label: "数据/优化",
        items: [
          "数据质量（Data quality）",
          "JSON 数据契约（JSON contracts）",
          "物流数据（Logistics data）",
          "Julia",
          "车辆路径规划（Vehicle routing）",
          "实验设计（Experiment design）",
        ],
      },
      {
        label: "移动/交付",
        items: ["Swift", "SwiftUI", "WeatherKit", "Docker", "GitHub Actions", "Oracle 部署（Oracle deploy）"],
      },
    ],
    education: {
      school: "Technical University of Denmark (DTU)",
      degree: "工程硕士，数学建模与计算（MSc, Mathematical Modelling and Computation）",
      location: "丹麦（Denmark）",
      period: "Sep 2023 - Jul 2026",
    },
  },
  en: {
    pageTitle: "Resume Index",
    name: "Jiajia Zhang",
    summary:
      "DTU MSc Engineering graduate in Mathematical Modelling and Computation, with the degree completed in July 2026. Targeting junior product/full-stack roles around internal tools, workflow automation with human review, and operational decision support. Strongest evidence: OpsDesk, Nimbus, and the DTU × Mover thesis; Cargo Guard is supporting data-quality evidence.",
    imageDescription:
      "Jiajia Zhang building internal tools, workflow automation, data-quality workflows, SwiftUI products, and decision support.",
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
        items: ["Internal tools", "Workflow automation", "Support operations", "Data quality"],
      },
      {
        kind: "roles",
        label: "Roles",
        items: ["Junior Product Engineer", "Junior Full-stack", "Internal Tools Builder"],
      },
    ],
    experiences: [
      {
        role: "Portfolio Builder / Product-minded Engineer",
        organization: "Personal Projects",
        location: "Copenhagen",
        period: "2025 - Present",
        summary:
          "Built job-facing portfolio systems around support automation, workflow systems, data-quality checks, and iOS product implementation. The emphasis is not feature volume, but clear problem framing, evidence, boundaries, and explainable implementation choices.",
        projects: [
          {
            name: "OpsDesk",
            note: "AI support / operations workflow demo",
            href: "https://jobops.zhangjiajia.me/opsdesk",
            description:
              "Built a support/operations desk with queues, evidence packages, draft replies, approval gates, feedback memory, and audit replay. Demonstrates workflow automation with human review, traceability, and evaluation thinking.",
            stack: ["Next.js", "TypeScript", "Postgres", "Docker", "AI workflow design"],
          },
          {
            name: "Cargo Guard",
            note: "Data quality cockpit",
            description:
              "Built a small Python data-checking demo for logistics records: missing fields, duplicates, stale records, invalid values, JSON run output, and an HTML report for review.",
            stack: ["Python", "JSON contracts", "Data validation", "HTML report"],
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
        role: "Earlier Engineering Foundation",
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
      degree: "MSc, Mathematical Modelling and Computation",
      location: "Denmark",
      period: "Sep 2023 - Jul 2026",
    },
  },
};
