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
    afgang: "/zh/projects/afgang",
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
      "Afgang：本地优先的交通工具，包含计划时刻可达范围、保守地图曲面、事务化数据更新和跨浏览器验证。",
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
      name: "Denmark Flex Planner",
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
      color: "green",
      primary: true,
    },
    {
      name: "Afgang",
      summary:
        "一个本地优先的哥本哈根交通工具，把通勤决策和基于计划时刻表的保守可达范围放在同一产品中。",
      roleFit: "全栈工程 · 公共交通数据 · 地理空间可靠性",
      evidence: [
        "基于官方 Rejseplanen GTFS 和 OpenStreetMap 数据，通过进程内 r5py/R5 计算 15/30/45/60 分钟计划时刻可达范围",
        "用事务化 candidate/promotion/rollback 生命周期绑定 GTFS、OSM、network、runtime、版本、哈希和服务日期",
        "通过 86 项测试、Chromium/WebKit 四种视口验证，以及 12 条边界路线审计；没有乐观 contour bucket",
      ],
      stack: ["Python", "FastAPI", "r5py/R5", "GTFS", "GeoPandas", "MapLibre", "生命周期设计"],
      link: "/zh/projects/afgang",
      color: "emerald",
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
  afgangCase: {
    title: "Afgang",
    eyebrow: "Owner-local 交通工具 · 哥本哈根 · 2026",
    summary:
      "Afgang 回答两个日常交通问题：我应该什么时候出门，以及按照哥本哈根的计划时刻表，15、30、45 或 60 分钟能到哪里？",
    metaDescription:
      "Afgang 案例：使用官方 Rejseplanen GTFS、OpenStreetMap 数据、保守可达范围和事务化数据运维构建的 FastAPI + R5 交通工具。",
    backToWorks: "返回项目",
    status: ["Scheduled", "Owner-local", "案例"],
    sectionLabels: {
      outcome: "产品结果",
      system: "系统设计",
      decisions: "工程决策",
      lifecycle: "数据生命周期",
      validation: "验证",
      interface: "界面",
      boundaries: "声明边界",
      sources: "数据与地图来源",
    },
    metrics: [
      { value: "86", label: "项自动化测试" },
      { value: "4", label: "层出行时间" },
      { value: "12", label: "条边界路线审计" },
      { value: "0", label: "个乐观 contour bucket" },
    ],
    outcome: [
      "通勤页把保存的起点、终点和到达目标转成出门时间决策，并提供可刷新的路线分段和 owner 控制的浏览器提醒。",
      "可达范围页在本地计算计划时刻曲面。用户选择起点和整分钟出发时间后，可以在响应式地图上比较 15、30、45 和 60 分钟的嵌套区域。",
    ],
    systemIntro:
      "浏览器只和 Afgang 通信。FastAPI lifespan 加载一个长期存在的 R5 network，进程内锁串行化计算，有界 TTL cache 处理重复请求。",
    systemFlow: [
      "官方 Rejseplanen GTFS + 丹麦 OSM",
      "哈希绑定的 manifest v2",
      "r5py 1.1.7 / R5 7.5.1",
      "保守的 250 m 六边形曲面",
      "Leaflet + MapLibre 界面",
    ],
    decisions: [
      {
        title: "替换失效的 routing dependency",
        body: "首个验证基线使用 OTP 2.5 的 sandbox TravelTime API。OTP 2.6 删除了该 API，因此生产路径迁移到进程内 R5，没有保留失效兼容层，也没有继续暴露单独的服务端口。",
      },
      {
        title: "优先选择保守几何",
        body: "R5 出行时间被转换为 250 m 六边形，并加入 25 m 站点 anchor 和五分钟 anchor margin。地图可以低估边界，但经过审计的 contour 不会做乐观的站点级承诺。",
      },
      {
        title: "把数据身份作为硬门槛",
        body: "GTFS、OSM、序列化 network、runtime JAR、引擎版本、哈希和真实服务日期共同定义一个 bundle identity。身份无效或过期时 fail closed，不会手工延长时刻表覆盖。",
      },
    ],
    lifecycleIntro:
      "活跃 reachability 数据从不原地重建。每次 feed 更新都走一条可恢复事务：",
    lifecycle: [
      "在不中断活跃应用的情况下准备隔离 candidate。",
      "构建 R5 network，并审计服务日期、警告、哈希和边界证据。",
      "短暂停止应用，通过原子目录重命名提升完整 bundle。",
      "运行 health 和 smoke checks；失败时自动恢复旧 bundle 和 freshness state。",
    ],
    validationIntro:
      "release gate 把单元测试和 failure injection 与真实引擎、真实浏览器检查结合起来。Chromium 和 WebKit 依次在桌面、平板、手机竖屏和手机横屏尺寸运行。",
    validationDetail:
      "12 条代表性公交和铁路检查中，contour bucket 为 10 条精确、2 条保守、0 条乐观。点到点 bucket 有 11 条一致；København H–Køge 的一处差异被明确记录，没有重新包装成一致。",
    interfaceBody:
      "两个页面使用同一套安静的 utility language：系统字体、紧凑控件、可见状态、响应式几何、键盘焦点、reduced-motion 支持，以及 vector basemap 初始化失败时的 raster fallback。",
    limits: [
      "可达范围只基于计划时刻表，不是 realtime。",
      "当前应用是绑定到 127.0.0.1 的 owner-only 服务，不是公开生产部署。",
      "Contour 是概览几何；靠近边界时仍需检查具体路线。",
      "不声明商业用户、交通运营商采用或企业规模运行。",
    ],
    sourceIntro:
      "公共交通时刻来自 Rejseplanen Labs static GTFS，遵循 CC BY 4.0。道路 routing 数据独立来自 OpenStreetMap；展示的 vector basemap 使用 OpenFreeMap 和 OpenMapTiles。",
    sourceLinks: {
      rejseplanen: "Rejseplanen Labs GTFS",
      openStreetMap: "OpenStreetMap 版权",
      openFreeMap: "OpenFreeMap",
      openMapTiles: "OpenMapTiles",
    },
    imageAlts: {
      reachabilityDesktop:
        "Afgang 桌面可达范围地图，显示从 Nørreport Station 出发的四层计划时刻 contour",
      commuteDesktop:
        "Afgang 通勤页，显示从 DTU 到 Nørreport Station 的出门时间决策和路线分段",
      reachabilityMobile:
        "Afgang 手机可达范围地图，包含出行时间图例和计算控件",
    },
    imageCaptions: {
      reachability: "从 Nørreport Station 出发的四层计划时刻可达范围。",
      commute: "通勤页把下一步决策及其证据放在同一条扫描路径中。",
      mobile: "控制面板成为手机底部面板，同时保留可见地图。",
    },
  },
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
这里是 [Jiajia Zhang](https://me.zhangjiajia.me) 的求职向个人索引。我在哥本哈根，已于 2026 年 7 月完成 DTU 数学建模与计算硕士学位。

### 为什么是这些项目

我不是想把自己包装成四种不同候选人。主线是 internal tools 和 workflow systems：support queue、evidence package、human review、data-quality checks、operational logs 和 decision support。

### 我怎么工作

我通常先看 operating problem：队列是什么？reviewer 需要什么证据才敢做下一步？自动化应该在哪里停？哪些东西需要记录、审批、replay 和衡量？

### 我最适合什么团队

我会最适合正在做 internal tools、support/operations workflows、planning tools 或 decision-support products 的团队。OpsDesk、Denmark Flex Planner、Afgang、Nimbus 和 DTU × Mover thesis 是最好的起点；Cargo Guard 只是 data-quality thinking 的补充证据。

这个 portfolio 本身也是一个 Next.js static export 的内容和部署小项目。可以通过 [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com)、[LinkedIn](https://www.linkedin.com/in/jiajia-zhang-0a8a40289) 或 [GitHub](https://github.com/isjiajia01) 联系我。
  `,
};

export default dictionary;
