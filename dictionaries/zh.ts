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
    motto: "面向 internal tools 和 workflow systems 的 junior product/full-stack candidate。",
    mottos: [
      "我做 internal tools 和 workflow systems：证据清楚、人工可审、决策可复盘。",
      "最适合的方向：internal tools、support automation、operational decision support。",
      "这是一个求职向作品集，但仍然保留一点打印纸的个性。",
    ],
    bio: `
我在哥本哈根，正在完成 DTU 硕士。

主线不是“什么都做”，而是围绕 internal tools、workflow automation with human review、data-quality workflows 和 decision-support systems。
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
    featured: "优先看这里",
    archive: "补充材料",
    brandName: "JIAJIA",
    brandTagline: "Workflow & Product Systems",
    notFoundStatus: "纸空了",
    notFoundTitle: "托盘已空",
    notFoundSubtitle: "请正确放入纸张以打印内容。",
    notFoundButton: "← 打印主页",
    notFoundError: "ERR 404 · PAPER_NOT_FOUND",
    printedOn: "打印于",
    noocWorks: "优先从最能说明 internal tools、workflow automation 和 decision support 的项目看起。",
    aboutTitle: "关于",
    aboutSubtitle: "我如何理解 workflow systems、证据和实用自动化",
    focus: "最适合方向",
    evidence: "最强证据",
    roleFit: "候选人定位",
    stack: "技术/方法",
    openProject: "打开",
    contactMe: "联系",
    analyticalProof: "规划 / 分析证据",
    icon(label: string) {
      return `${label} 的图标`;
    },
  },
  homepage: {
    headline: "我做 internal tools 和 workflow systems：让团队更容易看清证据、安全自动化、做出决策。",
    subline:
      "最匹配 junior product/full-stack 方向，尤其是 internal tools、support automation 和 operational decision support。iOS 产品和优化研究是相邻证据，不是分散主线。",
    proofPoints: [
      "OpsDesk：线上 support/operations demo，包含 evidence package、draft action、approval gate、feedback memory 和 audit replay。",
      "Nimbus：SwiftUI/iOS 产品，实现天气数据流、widget/shared settings、fallback 行为和产品细节。",
      "DTU × Mover Thesis：真实物流规划项目，把路线约束转成可解释的决策支持证据。",
    ],
    roleTargets: [
      "Junior Product / Full-stack Engineer",
      "Internal Tools / Workflow Automation Builder",
    ],
    note:
      "站点可以有一点个性，但路径是实用的：先看项目证据，再看简历版总结。",
  },
  works: [
    {
      name: "OpsDesk",
      summary:
        "一个 support/operations demo，把客户问题转成证据、草稿动作、审批、反馈记忆和可 replay 的日志。",
      roleFit: "Internal tools · workflow automation with human review · support operations",
      evidence: [
        "有线上 demo：support queue、review package、approval gate、feedback memory、replay 都能打开看",
        "体现 bounded automation：建议可审、敏感动作需要审批、运行过程留下 audit trace",
        "适合讲 customer-support automation 和 operations guardrails，但不包装成企业级生产系统",
      ],
      stack: ["Next.js", "TypeScript", "Postgres", "Docker", "Workflow design", "Oracle deploy"],
      link: "https://jobops.zhangjiajia.me/opsdesk",
      color: "blue",
      primary: true,
    },
    {
      name: "Cargo Guard",
      summary:
        "一个小型 Python demo，用来检查物流数据是否完整、新鲜、有效，是否值得团队继续使用。",
      roleFit: "Data quality · operational checks · supporting evidence",
      evidence: [
        "本地检查缺失字段、重复 ID、无效值、过期记录和异常物流数据",
        "输出 JSON run 和简单 HTML report，让问题能被 review，而不是藏在表格里",
        "适合作为 data-quality thinking 的补充证据，但不是作品集主线",
      ],
      stack: ["Python", "JSON contracts", "Data validation", "HTML report", "Logistics demo data"],
      link: "#",
      color: "yellow",
      primary: false,
    },
    {
      name: "Nimbus Weather Journal",
      summary:
        "一个 SwiftUI 天气日记产品，覆盖天气数据、shared settings、radar/wind features 和 fallback 行为。",
      roleFit: "Product engineering · SwiftUI · API-backed consumer app",
      evidence: [
        "包含 TestFlight distribution、CI checks 和 feature-level implementation details",
        "月相/illumination 和天气功能能说明 feature separation、service layer、UI state handling",
        "适合用来讲 SwiftUI、产品细节和 API integration",
      ],
      stack: ["Swift", "SwiftUI", "WeatherKit", "SceneKit", "Widgets", "Backend APIs"],
      link: "https://github.com/isjiajia01/10.01_Nimbus",
      color: "cyan",
      primary: true,
    },
    {
      name: "DTU × Mover Thesis",
      summary:
        "一个有 Mover 场景背景的真实物流规划项目：决定多日配送如何接单、排路线，并在 depot 压力下做恢复。",
      roleFit: "Logistics planning · optimization · operational decision support",
      evidence: [
        "把路线约束、depot pressure、服务可行性和 runtime limit 转成决策支持系统",
        "用 guardrail 和实验解释什么时候可以安全接受一个搜索改进",
        "强项是分析能力、复杂系统理解，以及面向运营场景的产品/工具思维",
      ],
      stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design", "Operational analysis"],
      link: "#",
      color: "orange",
      primary: true,
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

### 为什么是这些项目

我不是想把自己包装成四种不同候选人。主线是 internal tools 和 workflow systems：support queue、evidence package、human review、data-quality checks、operational logs 和 decision support。

### 我怎么工作

我通常先看 operating problem：队列是什么？reviewer 需要什么证据才敢做下一步？自动化应该在哪里停？哪些东西需要记录、审批、replay 和衡量？

### 我最适合什么团队

我会最适合正在做 internal tools、support/operations workflows、planning tools 或 decision-support products 的团队。OpsDesk、Nimbus 和 DTU × Mover thesis 是最好的起点；Cargo Guard 只是 data-quality thinking 的补充证据。

这个 portfolio 本身也是一个 Next.js static export 的内容和部署小项目。可以通过 [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com)、[LinkedIn](https://www.linkedin.com/in/jiajia-zhang-0a8a40289) 或 [GitHub](https://github.com/isjiajia01) 联系我。
  `,
};

export default dictionary;
