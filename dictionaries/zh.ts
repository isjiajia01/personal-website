import {
  RiLinkedinBoxLine as LinkedInIcon,
  RiMailLine as EnvelopeIcon,
  RiSendPlaneLine as PaperAirplaneIcon,
} from "@remixicon/react";
import { SiGithub } from "@icons-pack/react-simple-icons";


const dictionary = {
  meta: {
    baseUrl: "https://me.zhangjiajia.me",
    websiteName: "Jiajia Zhang 的作品集",
    motto: "面向 internal tools、AI workflows 和决策系统的 junior product-minded builder。",
    mottos: [
      "把混乱的工作流变成可检查、可复盘的小系统。",
      "做 internal products、AI workflow guardrails 和 decision support，不靠空泛 AI 词。",
      "这个站点是给岗位和面试看的，但保留一点手工打印纸的个性。",
    ],
    bio: `
我在哥本哈根，正在完成 DTU 硕士。

我最适合的方向在 software engineering、product judgment、operations、data quality 和 AI-assisted workflows 之间。
    `,
    fillKeywords(keywords?: string[]): string[] {
      return [
        "Jiajia Zhang",
        "full-stack developer",
        "internal tools",
        "AI workflows",
        "support automation",
        "data quality",
        "operations systems",
        "iOS SwiftUI",
        "optimization",
        "作品集",
        ...(keywords ?? []),
      ];
    },
  },
  urls: {
    home: "/zh",
    works: "/zh/works",
    resume: "/zh/resume",
    about: "/zh/about",
  },
  labels: {
    home: "主页",
    works: "项目",
    resume: "简历",
    about: "关于",
    featured: "岗位证据",
    archive: "补充证据",
    brandName: "JIAJIA",
    brandTagline: "Work Portfolio",
    notFoundStatus: "纸空了",
    notFoundTitle: "托盘已空",
    notFoundSubtitle: "请正确放入纸张以打印内容。",
    notFoundButton: "← 打印主页",
    notFoundError: "ERR 404 · PAPER_NOT_FOUND",
    printedOn: "打印于",
    noocWorks: "按面试和岗位解释方式整理的代表项目。",
    aboutTitle: "关于",
    aboutSubtitle: "面向 internal tools 和 workflow systems 的 product-minded full-stack builder",
    focus: "当前方向",
    evidence: "证据",
    roleFit: "岗位关联",
    stack: "技术/方法",
    openProject: "打开",
    contactMe: "联系",
    icon(label: string) {
      return `${label} 的图标`;
    },
  },
  homepage: {
    headline: "我做的是小而清楚的系统：让复杂工作流更容易被判断、执行和复盘。",
    subline:
      "目前主要面向 junior/graduate 岗位：full-stack product engineering、AI workflow adoption、operations tooling、data quality 和 analytical internal systems。",
    proofPoints: [
      "有部署可打开的 internal-tool / support workflow demo",
      "能解释 AI 工作流里的证据、审批、反馈记忆、审计和 replay",
      "有 SwiftUI/iOS 产品项目，也有后端/API 数据流经验",
      "DTU × Mover thesis 体现优化建模、实验和决策支持能力",
    ],
    roleTargets: [
      "Junior Full-stack / backend-leaning product engineer",
      "AI workflow / internal tools builder",
      "Data / operations analyst with engineering depth",
      "Technical graduate / business systems role",
    ],
    note:
      "站点视觉可以轻松一点，但内容会尽量按招聘方关心的问题来组织：我能做什么、证据在哪里、适合什么岗位。",
  },
  works: [
    {
      name: "OpsDesk",
      summary:
        "一个 AI-native support / operations desk，把客户问题转成证据、建议、草稿、审批、反馈记忆和审计轨迹。",
      roleFit: "Internal tools · AI workflow adoption · support automation · product engineering",
      evidence: [
        "有线上 demo：支持队列、review package、approval gate、feedback memory、replay 都能打开看",
        "体现我对安全 AI 的理解：建议有边界、人类审批、可审计、可评估",
        "适合用来讲 customer-support automation、fintech/operations guardrails 和 workflow design",
      ],
      stack: ["Next.js", "TypeScript", "Postgres", "Docker", "AI workflow design", "Oracle deploy"],
      link: "https://jobops.zhangjiajia.me/opsdesk",
      color: "blue",
      primary: true,
    },
    {
      name: "Nimbus Weather Journal",
      summary:
        "一个 SwiftUI 天气日记产品，覆盖天气数据、widget/shared settings、radar/wind features 和 fallback 行为。",
      roleFit: "iOS · product engineering · API-backed consumer app · quality/release discipline",
      evidence: [
        "有 TestFlight / release-lane 思路和质量门控证据",
        "月相/illumination 和天气功能能说明 feature separation、service layer、UI state handling",
        "适合用来讲 SwiftUI、产品细节、API integration 和 app release discipline",
      ],
      stack: ["Swift", "SwiftUI", "WeatherKit", "SceneKit", "Widgets", "Backend APIs"],
      link: "https://github.com/isjiajia01/10.01_Nimbus",
      color: "cyan",
      primary: true,
    },
    {
      name: "DTU × Mover Thesis",
      summary:
        "围绕 multi-day last-mile vehicle routing 的 depot-aware rolling decomposition 和 guarded search 框架。",
      roleFit: "Optimization · decision support · logistics analytics · operations research",
      evidence: [
        "把学术建模和实际运营约束、runtime budget、fallback decision 连起来",
        "强调 evidence、safety guard 和 benchmark family，而不是黑箱式地说算法更强",
        "适合 analytics、planning、supply-chain 和 decision-support 相关岗位",
      ],
      stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design", "Data analysis"],
      link: "#",
      color: "orange",
      primary: true,
    },
    {
      name: "Cargo Guard",
      summary:
        "一个轻量级物流数据质量 cockpit：数据契约、freshness/completeness 检查、ETA drift、severity routing 和 owner action。",
      roleFit: "Data quality · DataOps · logistics analytics · governance tooling",
      evidence: [
        "把 shipment-event 问题转成 contract、severity、owner 和 next action",
        "定位是数据质量 / AI governance 方向的作品集证据，不包装成虚假的企业生产经验",
        "体现 data-product thinking：检查、路由、dashboard 和业务语言",
      ],
      stack: ["Python", "JSON contracts", "Data validation", "HTML dashboard", "Logistics data"],
      link: "#",
      color: "yellow",
      primary: true,
    },
    {
      name: "Life-OS / Personal Workflow System",
      summary:
        "围绕项目记忆、申请追踪、workflow routing 和 AI-assisted work 的个人操作系统。",
      roleFit: "Operations systems · knowledge management · AI-assisted workflows",
      evidence: [
        "能说明我如何组织 job applications、projects、thesis evidence 和 deployment notes",
        "适合需要系统执行力的岗位，不只是单点写代码",
        "保留 source-of-truth docs、logs 和 reusable workflows，而不是散乱笔记",
      ],
      stack: ["Markdown", "Automation", "AI agents", "Workflow design", "Git"],
      link: "#",
      color: "green",
      primary: false,
    },
    {
      name: "This Website",
      summary:
        "基于 nooc.me 代码视觉改造的打印纸作品集，把个人主页整理成更适合招聘/面试的索引。",
      roleFit: "Frontend polish · content systems · deployment hygiene",
      evidence: [
        "保留有辨识度的 visual shell，同时把内容重组为 hiring conversation",
        "Next.js static export，通过 GitHub Actions 部署到个人 Oracle host",
        "体现审美、迭代速度，以及根据反馈快速调整的能力",
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
      label: "邮箱",
      name: "isjiajiazhang@gmail.com",
      link: "mailto:isjiajiazhang@gmail.com",
      icon: EnvelopeIcon,
    },
    {
      label: "网站",
      name: "me.zhangjiajia.me",
      link: "https://me.zhangjiajia.me",
      icon: PaperAirplaneIcon,
    },
  ],
  aboutContent: `
这里是 [Jiajia Zhang](https://me.zhangjiajia.me) 的求职向个人索引。我在哥本哈根，正在完成 DTU 硕士。

### 我在找什么

Junior / graduate 方向，最好是 product sense 和 engineering depth 都有用的角色：full-stack internal tools、AI workflow adoption、operations systems、data quality、planning analytics、technical business systems。

### 我怎么工作

我通常不是从技术标签开始，而是先看 operating problem：队列是什么？人需要哪些证据？自动化应该在哪里停？哪些东西需要被记录、审批、复盘和衡量？

### 这个作品集想证明什么

OpsDesk 证明 AI workflow 和 support automation 的思路；Nimbus 证明产品细节和 iOS/API 实现；Cargo Guard 证明 data quality 和 governance 语言；DTU/Mover thesis 证明优化建模和 decision support。这个站点看起来轻松一点，但项目组织方式是面向实际岗位的。

可以通过 [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com)、[LinkedIn](https://www.linkedin.com/in/jiajia-zhang-0a8a40289) 或 [GitHub](https://github.com/isjiajia01) 联系我。
  `,
};

export default dictionary;
