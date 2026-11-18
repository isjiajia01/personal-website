const dictionary = {
  meta: {
    baseUrl: "https://me.isjia.page",
    websiteName: "Jiajia Zhang 的作品集",
    authorName: "Jiajia Zhang",
    motto: "面向 internal tools 和 workflow systems 的 junior product/full-stack candidate。",
    mottos: [
      "我做 internal tools 和 workflow systems：证据清楚、人工可审、决策可复盘。",
      "最适合的方向：internal tools、support automation、operational decision support。",
    ],
    bio: `
我在哥本哈根，已于 2026 年 7 月完成 DTU 数学建模与计算硕士学位。

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
    about: "/zh/about",
  },
  labels: {
    home: "主页",
    works: "项目",
    about: "关于",
    featured: "优先看这里",
    archive: "补充材料",
    notFoundStatus: "纸空了",
    notFoundTitle: "托盘已空",
    notFoundSubtitle: "请正确放入纸张以打印内容。",
    notFoundButton: "← 打印主页",
    notFoundError: "ERR 404 · PAPER_NOT_FOUND",
    viewAllWorkEvidence: "查看完整项目证据",
    noocWorks: "优先从最能说明 internal tools、workflow automation 和 decision support 的项目看起。",
    aboutTitle: "关于",
    aboutSubtitle: "我如何理解 workflow systems、证据和实用自动化",
    openProject: "打开",
    contactCta: "联系我",
    skillsTitle: "技能与工具",
    skipToContent: "跳至内容",
    opensInNewTab: "（在新标签页中打开）",
  },
  homepage: {
    bioParagraphs: [
      [
        {
          type: "text" as const,
          value: "现居哥本哈根，已于 2026 年 7 月完成 ",
        },
        {
          type: "org" as const,
          id: "org-dtu",
          name: "DTU",
          href: "https://www.dtu.dk/",
          description:
            "丹麦技术大学（Technical University of Denmark）—— 数学建模与计算工程硕士，2026 年 7 月毕业。",
        },
        {
          type: "text" as const,
          value: " 数学建模与计算硕士学位，硕士论文结合 ",
        },
        {
          type: "org" as const,
          id: "org-mover",
          name: "Mover",
          href: "https://www.mover.dk/",
          description:
            "哥本哈根末端物流与多日配送规划平台。",
        },
        {
          type: "text" as const,
          value: " 场景研究多日配送规划与决策支持。",
        },
      ],
      [
        {
          type: "text" as const,
          value:
            "核心方向围绕 internal tools、带人工审核的 workflow automation、数据质量工作流与运营决策支持 —— 并以早期在 ",
        },
        {
          type: "org" as const,
          id: "org-deloitte",
          name: "Deloitte",
          href: "https://www.deloitte.com/",
          description: "早期企业系统与工程实践经历。",
        },
        {
          type: "text" as const,
          value: " 的工程实践及 ",
        },
        {
          type: "org" as const,
          id: "org-gdut",
          name: "GDUT",
          href: "https://www.gdut.edu.cn/",
          description: "广东工业大学 —— 本科工程与计算机基础。",
        },
        {
          type: "text" as const,
          value: " 的本科背景为基础。",
        },
      ],
      [
        {
          type: "text" as const,
          value:
            "除此之外，我独立设计、开发和上线了一批小型 Apple 应用 —— 其中 5 款已在 App Store 上架，覆盖 iPhone、Watch、TV、Mac 与 Safari，另有 3 款在路上。它们都在 ",
        },
        {
          type: "org" as const,
          id: "org-apps",
          name: "app.isjia.page",
          href: "https://app.isjia.page",
          description:
            "Apple 应用家族：Solis、Punctum、ThreadLite、Span、Wayfinder、Ordbro、Slip 与 DOT —— 本地优先，无账号、无广告、无追踪。",
        },
        {
          type: "text" as const,
          value: "。",
        },
      ],
    ],
  },
  works: [
    {
      slug: "opsdesk",
      name: "OpsDesk",
      year: "2026",
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
      image: { src: "/images/projects/opsdesk/opsdesk-1200.webp", width: 1200, height: 750, alt: "OpsDesk 工单页：原始 intake 被整理成结构化 package，旁边是 AI run trace 与 policy gate" },
      color: "blue",
      primary: true,
      homeFeatured: true,
    },
    {
      slug: "denmark-flex-planner",
      name: "Denmark Flex Planner",
      year: "2026",
      summary:
        "一个已上线的地图型决策支持工具，在预算、电网分区和区域约束下，为丹麦 EV 充电与本地灵活性投资确定优先级。",
      roleFit: "能源基础设施 · 约束优化 · 数据产品",
      evidence: [
        "整合丹麦公开的 EV、可再生能源、电网和地理数据，形成 municipality-level 规划证据",
        "支持比较不同情景，并在约束条件下优化投资组合，给出可解释的市镇级建议",
        "已部署 FastAPI + Next.js 产品，包含公开交互地图、API health checks 和可复现 smoke tests",
      ],
      stack: ["Python", "FastAPI", "Next.js", "公开数据", "约束优化", "Oracle deploy"],
      link: "https://flex.zhangjiajia.me",
      image: { src: "/images/projects/flex/flex-1200.webp", width: 1200, height: 750, alt: "Denmark Flex Planner：情景控制、市级优先级地图和市级详情面板" },
      color: "green",
      primary: true,
      homeFeatured: true,
    },
    {
      slug: "ascii-studio",
      name: "ASCII Studio",
      year: "2026",
      summary:
        "一个免费的浏览器工具：把任意图片或视频实时转成 ASCII、盲文、半色调、抖动或砖块纹理，全程本地渲染，不上传任何内容。",
      roleFit: "产品工程 · 浏览器图形 · 工具设计",
      evidence: [
        "14 种风格、19 套预设，直接在你自己的图片上实时调节，并支持配色、描边和发光",
        "视频边播放边转换，可导出最高 4K、最长一分钟的 MP4；图片可导出 JPEG 或透明 WebP",
        "完全在浏览器里运行：无需账号、无水印、不上传",
      ],
      stack: ["WebGL2", "Browser-only rendering", "Video export", "Interaction design"],
      link: "https://ascii.isjia.page",
      color: "emerald",
      primary: true,
      homeFeatured: true,
    },
    {
      slug: "dtu-mover-thesis",
      name: "DTU × Mover Thesis",
      year: "2026",
      summary:
        "一个有 Mover 场景背景的真实物流规划项目：决定多日配送如何接单、排路线，并在 depot 压力下做恢复。",
      roleFit: "Logistics planning · optimization · operational decision support",
      evidence: [
        "把路线约束、depot pressure、服务可行性和 runtime limit 转成决策支持系统",
        "用 guardrail 和实验解释什么时候可以安全接受一个搜索改进",
        "强项是分析能力、复杂系统理解，以及面向运营场景的产品/工具思维",
      ],
      stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design", "Operational analysis"],
      link: "/zh/works#dtu-mover-thesis",
      color: "orange",
      primary: true,
      homeFeatured: true,
    },
    {
      slug: "apple-apps",
      name: "Apple apps",
      year: "2026",
      summary:
        "八款独立设计、开发的小型 Apple 应用 —— 5 款已在 App Store 上架（覆盖 iPhone、Watch、TV、Mac 和 Safari），2 款审核中，1 款即将推出。",
      roleFit: "产品工程 · SwiftUI · App Store 发布运维",
      evidence: [
        "5 款已在 App Store 上架：Solis（日月历）、Punctum（点阵时钟）、Span（计划）、ThreadLite（Safari 扩展）、Wayfinder（标签页与会话）",
        "一个人跑完整个闭环：产品决策、SwiftUI 实现、隐私政策、上架文案、截图和审核沟通",
        "Ordbro、Slip 审核中，DOT 即将推出；所有应用都本地优先，无账号、无广告、无追踪",
      ],
      stack: [
        "Swift",
        "SwiftUI",
        "WidgetKit",
        "Safari 扩展",
        "App Store Connect",
        "隐私优先设计",
      ],
      link: "https://app.isjia.page",
      color: "purple",
      primary: true,
      homeFeatured: true,
    },
  ],
  skills: [
    { group: "语言", items: "Python, TypeScript, Julia, Swift" },
    { group: "Web 与数据", items: "Next.js, React, FastAPI, Postgres, Tailwind, WebGL2" },
    { group: "优化与分析", items: "Vehicle routing, ALNS, constrained optimization, experiment design" },
    { group: "Apple 平台", items: "SwiftUI, WidgetKit, Safari 扩展, App Store Connect" },
    { group: "交付", items: "Docker, GitHub Actions, Oracle deploy, static export" },
  ],
  contacts: [
    {
      label: "GitHub",
      name: "@isjiajia01",
      link: "https://github.com/isjiajia01",
    },
    {
      label: "LinkedIn",
      name: "Jiajia Zhang",
      link: "https://www.linkedin.com/in/jiajia-zhang-0a8a40289",
    },
    {
      label: "邮箱",
      name: "isjiajiazhang@gmail.com",
      link: "mailto:isjiajiazhang@gmail.com",
    },
    {
      label: "网站",
      name: "me.isjia.page",
      link: "https://me.isjia.page",
    },
    {
      label: "应用",
      name: "app.isjia.page",
      link: "https://app.isjia.page",
    },
  ],
  aboutContent: `
这里是 [Jiajia Zhang](https://me.isjia.page) 的个人网站。我在哥本哈根，已于 2026 年 7 月完成 DTU 数学建模与计算硕士学位。

### 自己把东西做完上线

2026 年起我也独立设计、开发和上线了一批小型 Apple 应用，都放在 [app.isjia.page](https://app.isjia.page)。其中 5 款已在 App Store 上架（Solis、Punctum、Span、ThreadLite、Wayfinder），Ordbro、Slip 审核中，DOT 即将推出。一个人做这些，意味着不仅写 SwiftUI，还要写隐私政策、上架文案、截图和回复审核 —— 这也是我会带进 internal tool 的端到端负责方式。

### 我怎么工作

我通常先看 operating problem：队列是什么？reviewer 需要什么证据才敢做下一步？自动化应该在哪里停？哪些东西需要记录、审批、replay 和衡量？

### 我最适合什么团队

主线是 internal tools 和 workflow systems：support queue、evidence package、human review、data-quality checks、operational logs 和 decision support。我会最适合正在做 internal tools、support/operations workflows、planning tools 或 decision-support products 的团队。OpsDesk、Denmark Flex Planner、ASCII Studio 和 DTU × Mover thesis 是最好的起点；Apple apps 证明我能独立把产品做到上线。

可以通过 [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com)、[LinkedIn](https://www.linkedin.com/in/jiajia-zhang-0a8a40289) 或 [GitHub](https://github.com/isjiajia01) 联系我。
  `,
};

export default dictionary;
