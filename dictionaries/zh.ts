import {
  RiLinkedinBoxLine as LinkedInIcon,
  RiMailLine as EnvelopeIcon,
  RiSendPlaneLine as PaperAirplaneIcon,
} from "@remixicon/react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import type { WorkItem } from "./index";

const dictionary = {
  meta: {
    baseUrl: "https://me.zhangjiajia.me",
    websiteName: "Jiajia Zhang 的作品集",
    motto: "面向内部工具（internal tools）与工作流系统（workflow systems）的初级产品 / 全栈（junior product/full-stack）候选人。",
    mottos: [
      "我构建内部工具（internal tools）与工作流系统（workflow systems）：证据清楚、人工可审、决策可复盘。",
      "最匹配的方向：内部工具（internal tools）、支持自动化（support automation）与运营决策支持（operational decision support）。",
      "面向招聘沟通的求职作品集 —— 依然印在带有一点趣味的纸张上。",
    ],
    bio: `
我在哥本哈根，已于 2026 年 7 月完成 DTU 数学建模与计算硕士学位。

主线不是“什么都做”，而是围绕内部工具（internal tools）、含人工审核的工作流自动化（workflow automation with human review）、数据质量工作流（data-quality workflows）与决策支持系统（decision-support systems）。
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
    viewResume: "查看简历",
    emailMe: "发邮件给我",
    seeWork: "查看项目",
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
    viewAllWorkEvidence: "查看完整项目证据",
    noocWorks: "优先从最能体现内部工具（internal tools）、工作流自动化（workflow automation）和运营决策支持（operational decision support）的项目看起。",
    aboutTitle: "关于",
    aboutSubtitle: "我如何理解工作流系统（workflow systems）、证据与实用自动化",
    focus: "最适合方向",
    evidence: "最强证据",
    roleFit: "候选人定位",
    stack: "技术/方法",
    openProject: "打开",
    contactMe: "联系",
    analyticalProof: "规划 / 分析证据",
    language: "语言",
    theme: "主题",
    themeSystem: "跟随系统",
    themeLight: "浅色",
    themeDark: "深色",
    icon(label: string) {
      return `${label} 的图标`;
    },
  },
  homepage: {
    headline: "我构建内部工具与工作流系统 —— 更清晰的证据、更安全的自动化、更好的决策。",
    subline:
      "最匹配初级产品 / 全栈（junior product/full-stack）方向，特别是内部工具（internal tools）、支持自动化（support automation）与运营决策支持（operational decision support）。iOS 产品和优化研究是相邻证据，不是分散主线。",
    proofPoints: [
      "OpsDesk：已部署的客服与运营演示（support/operations demo），包含证据包（evidence package）、草拟操作（draft action）、审批关卡（approval gate）、反馈记忆（feedback memory）与审计回放（audit replay）。",
      "Afgang：本地优先的哥本哈根出行工具（transport utility），包含计划时刻可达范围、保守的地图呈现（map surfaces）、事务化数据更新与跨浏览器验证。",
      "DTU × Mover 硕士论文课题（thesis）：真实物流规划项目，把路线约束转成决策支持证据。",
    ],
    roleTargets: [
      "Junior Product / Full-stack Engineer",
      "Internal Tools / Workflow Automation Builder",
    ],
    evidenceLead:
      "面向初级产品 / 全栈工程师（Junior Product / Full-stack Engineer）与内部工具 / 工作流自动化构建（Internal Tools / Workflow Automation Builder）方向。",
    note:
      "站点保留了一点个性，但浏览路径很明确：先看项目证据，需要精简求职版本时再看简历。",
  },
  works: [
    {
      name: "OpsDesk",
      summary:
        "一个客服与运营演示项目（support/operations demo），将工单案例转化为证据、草拟操作、审批关卡、反馈记忆与可回放（replayable）日志。",
      roleFit: "内部工具（internal tools） · 含人工审核的工作流自动化（workflow automation with human review） · 客服与运营（support operations）",
      evidence: [
        "已部署的在线演示（deployed demo）：包含支持工单队列（support queue）、审核证据包（review package）、审批关卡（approval gate）、反馈记忆（feedback memory）与操作回放（replay）",
        "体现有边界的自动化（bounded automation）：系统建议保持可审、高风险操作须经审批，且运行全程保留审计痕迹（audit trace）",
        "适合阐释客户支持自动化（customer-support automation）与运营护栏（operations guardrails），同时不夸大为企业级生产系统",
      ],
      stack: ["Next.js", "TypeScript", "Postgres", "Docker", "Workflow design", "Oracle deploy"],
      domain: "jobops.zhangjiajia.me",
      image: {
        src: "/images/projects/opsdesk/opsdesk-1200.webp",
        srcSmall: "/images/projects/opsdesk/opsdesk-600.webp",
        width: 1200,
        height: 750,
        alt: "高风险客服工单审核界面，包含结构化证据包与人工审批操作",
      },
      link: "https://jobops.zhangjiajia.me/opsdesk",
      color: "blue",
      primary: true,
      homeFeatured: true,
    },
    {
      name: "Denmark Flex Planner",
      summary:
        "一个已上线的地图优先决策支持工具（decision-support tool），在预算、电网分区和区域约束下，为丹麦电动车（EV）充电与本地灵活性投资确定优先级。",
      roleFit: "能源基础设施 · 约束优化 · 数据产品",
      evidence: [
        "整合丹麦公开的电动车（EV）、可再生能源、电网和地理空间数据，形成市镇级（municipality-level）规划证据",
        "支持比较不同情景，并在约束条件下优化投资组合，给出可解释的市镇级建议",
        "已部署的 FastAPI 与 Next.js 产品，包含公开交互地图、API 健康检查（health checks）与可复现的冒烟测试（smoke tests）",
      ],
      stack: ["Python", "FastAPI", "Next.js", "公开数据", "约束优化", "Oracle deploy"],
      domain: "flex.zhangjiajia.me",
      image: {
        src: "/images/projects/flex/flex-1200.webp",
        srcSmall: "/images/projects/flex/flex-600.webp",
        width: 1200,
        height: 750,
        alt: "丹麦全国市镇优先级地图，包含电网压力、可再生能源指标与预算控制项",
      },
      link: "https://flex.zhangjiajia.me",
      color: "green",
      primary: true,
      homeFeatured: true,
    },
    {
      name: "Afgang",
      summary:
        "一个本地优先（local-first）的哥本哈根公共交通工具，将通勤决策与基于计划时刻表的保守可达范围地图融于一体。",
      roleFit: "全栈工程 · 公共交通数据 · 地理空间可靠性",
      evidence: [
        "基于官方 Rejseplanen GTFS 和 OpenStreetMap 数据，通过进程内 r5py/R5 计算 15/30/45/60 分钟计划时刻可达范围",
        "通过事务化的“候选 / 发布 / 回滚”（candidate/promotion/rollback）生命周期，严格绑定 GTFS、OSM、路网模型（network）、运行时（runtime）、版本、哈希与服务日期",
        "通过 86 项自动化测试、Chromium 与 WebKit 跨四种视口的验证，以及 12 条边界路线审计，实现 0 个乐观等时线分桶（optimistic contour buckets）",
      ],
      stack: ["Python", "FastAPI", "r5py/R5", "GTFS", "GeoPandas", "MapLibre", "生命周期设计"],
      image: {
        src: "/images/projects/afgang/reachability-desktop.webp",
        srcSmall: "/images/projects/afgang/reachability-desktop-600.webp",
        width: 1440,
        height: 900,
        alt: "哥本哈根公共交通可达范围地图",
      },
      link: "/zh/projects/afgang",
      color: "emerald",
      primary: true,
      homeFeatured: true,
    },
    {
      name: "Cargo Guard",
      summary:
        "一个小型 Python 演示工具（demo），用于在团队使用前检查物流数据是否完整、新鲜、有效并值得信赖。",
      roleFit: "数据质量（data quality） · 运营校验（operational checks） · 辅助证据（supporting evidence）",
      evidence: [
        "在本地检查缺失字段、重复 ID、无效数值、过期记录和异常运单数据",
        "导出 JSON 运行结果和简洁的 HTML 报告（HTML report），让问题可被人工审核（review），而非隐藏在电子表格中",
        "可作为数据质量思维（data-quality thinking）的佐证材料，但并非作品集的核心主线",
      ],
      stack: ["Python", "JSON contracts", "Data validation", "HTML report", "Logistics demo data"],
      link: "#",
      color: "yellow",
      primary: false,
      homeFeatured: false,
    },
    {
      name: "Nimbus Weather Journal",
      summary:
        "一款打磨精致的 iOS 天气日记产品，包含 SwiftUI 界面、共享设置（shared settings）、天气数据流、雷达 / 风场特性（radar/wind features）与容灾降级（fallback）处理。",
      roleFit: "产品工程（product engineering） · SwiftUI · API 驱动的客户端应用（consumer app）",
      evidence: [
        "包含 TestFlight 分发（distribution）、持续集成检查（CI checks）与特性级实现细节",
        "月相照明（illumination）与天气模块体现了清晰的特性解耦（feature separation）、服务层划分（service layers）及界面状态管理（UI state handling）",
        "可充分佐证 SwiftUI 开发能力、产品打磨细节及后端 / API 集成（API integration）经验",
      ],
      stack: ["Swift", "SwiftUI", "WeatherKit", "SceneKit", "Widgets", "Backend APIs"],
      link: "https://github.com/isjiajia01/10.01_Nimbus",
      color: "cyan",
      primary: true,
      homeFeatured: false,
    },
    {
      name: "DTU × Mover Thesis",
      summary:
        "依托 Mover 实际场景的真实物流规划项目：在仓库（depot）高负载压力下，决定多日配送如何准入、排线与应急恢复。",
      roleFit: "物流规划（logistics planning） · 运筹优化（optimization） · 运营决策支持（operational decision support）",
      evidence: [
        "将路径规划约束、仓库负载压力（depot pressure）、服务可行性与运行耗时限制（runtime limits）转化为决策支持系统",
        "利用安全护栏（guardrails）与控制实验，清晰解释何种情况下接受搜索算法的优化结果是安全的",
        "有力佐证了分析思维、复杂系统理解力，以及面向实际运营场景的产品设计能力",
      ],
      stack: ["Julia", "Vehicle routing", "ALNS", "Optimization", "Experiment design", "Operational analysis"],
      link: "#",
      color: "orange",
      primary: true,
      homeFeatured: false,
    },
    {
      name: "This Website",
      summary:
        "基于 nooc.me 代码改造的打印纸风格作品集，将个人主页重塑为紧凑、聚焦招聘对话的求职索引。",
      roleFit: "前端细节打磨（frontend polish） · 内容系统（content systems） · 严谨部署规范（deployment hygiene）",
      evidence: [
        "保留极具辨识度的视觉外壳（visual shell），同时围绕招聘沟通重构全部内容呈现",
        "采用 Next.js 静态导出（static export），通过 GitHub Actions 自动化部署至个人 Oracle 主机",
        "体现了良好的审美、工程交付速度以及根据反馈敏捷迭代的能力",
      ],
      stack: ["Next.js", "TypeScript", "Tailwind", "Static export", "GitHub Actions"],
      link: "https://me.zhangjiajia.me",
      color: "rose",
      primary: false,
      homeFeatured: false,
    },
  ] as WorkItem[],
  afgangCase: {
    title: "Afgang",
    eyebrow: "仅限个人本地使用（owner-local）的交通工具 · 哥本哈根 · 2026",
    summary:
      "Afgang 回答两个日常交通问题：我应该什么时候出门，以及按照哥本哈根的计划时刻表，15、30、45 或 60 分钟能到哪里？",
    metaDescription:
      "Afgang 案例：使用官方 Rejseplanen GTFS、OpenStreetMap 数据、保守可达范围和事务化数据运维构建的 FastAPI + R5 交通工具。",
    backToWorks: "返回项目",
    status: ["计划时刻（Scheduled）", "本地自用（Owner-local）", "案例研究"],
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
      { value: "0", label: "个乐观等时线分桶（contour bucket）" },
    ],
    outcome: [
      "通勤页将已保存的起点、终点和到达目标转化为出发时间决策，并提供可刷新的分段路线与使用者自主控制（owner-controlled）的浏览器提醒。",
      "可达范围页在本地计算计划时刻曲面。用户选择起点和整分钟出发时间后，可以在响应式地图上比较 15、30、45 和 60 分钟的嵌套区域。",
    ],
    systemIntro:
      "浏览器仅与 Afgang 后端通信。单个 FastAPI 生命周期（lifespan）加载常驻的 R5 路网模型（network），进程内锁将密集计算串行化，并通过有界生存时间缓存（TTL cache）高效处理重复请求。",
    systemFlow: [
      "官方 Rejseplanen GTFS + 丹麦 OSM",
      "哈希绑定的清单文件（manifest v2）",
      "r5py 1.1.7 / R5 7.5.1",
      "保守的 250 m 六边形曲面",
      "Leaflet + MapLibre 界面",
    ],
    decisions: [
      {
        title: "替换已废弃的寻路依赖（routing dependency）",
        body: "首个验证基线使用 OTP 2.5 的沙盒出行时间 API（sandbox TravelTime API）。OTP 2.6 删除了该 API，因此生产环境迁移到进程内 R5，避免维护已失效的兼容层，也不再额外暴露独立的服务端口。",
      },
      {
        title: "优先选择保守几何",
        body: "R5 出行耗时被转换为 250 m 六边形单元，并加入 25 m 站点吸附锚点（anchor）与 5 分钟锚点容差裕量（anchor margin）。地图宁可适度低估边界，但经审计的等时线（contour）绝不做乐观的站点级虚假承诺。",
      },
      {
        title: "把数据身份作为硬门槛",
        body: "GTFS、OSM、序列化路网（network）、运行时（runtime JAR）、引擎版本、哈希与真实服务日期共同定义统一的数据包标识（bundle identity）。当标识无效或过期时直接熔断关闭（fail closed），绝不静默越界延长时刻表覆盖。",
      },
    ],
    lifecycleIntro:
      "在线可达范围（reachability）数据绝不在位就地重建。每次数据源更新（feed update）均遵循可恢复的事务流程：",
    lifecycle: [
      "在不中断运行中应用的情况下，准备隔离的候选版本（candidate）。",
      "构建 R5 路网模型（network），严格审计服务日期、系统警告、校验哈希与边界证据。",
      "极短暂停机，通过目录的原子重命名将完整数据包（bundle）切换生效。",
      "运行健康检查与冒烟测试（health and smoke checks）；若校验失败则自动回滚至上一版本数据包与新鲜度状态（freshness state）。",
    ],
    validationIntro:
      "发布门禁（release gate）将单元测试、故障注入（failure injection）与真实引擎、真实浏览器端检查紧密结合。自动化流程在 Chromium 和 WebKit 上依次覆盖桌面、平板、手机竖屏及横屏 4 种尺寸。",
    validationDetail:
      "在 12 条具代表性的轨道与公交检查中，等时线分桶（contour bucket）结果为 10 条精确、2 条保守、0 条冒进乐观。点到点分桶有 11 条完全吻合；København H–Køge 间的一处偏差被如实记录归档，绝不重新粉饰粉刷。",
    interfaceBody:
      "两个视图共享同一套克制的实用工具设计语言（utility language）：采用系统原生字体、紧凑控件、状态指示、响应式几何布局、键盘焦点与减弱动态效果（reduced-motion）支持，并在矢量底图（vector basemap）初始化失败时提供栅格兜底（raster fallback）。",
    limits: [
      "可达范围计算严格基于固定时刻表，并非实时路况数据（realtime）。",
      "当前应用仅为绑定在 127.0.0.1 的个人自用服务（owner-only），并非对外公开的生产环境。",
      "等时线曲面（contour）属于宏观概览几何；靠近时间边界时仍需以具体点到点路线查询为准。",
      "不虚称商业用户体量、交通运营商采纳或企业级规模运作。",
    ],
    sourceIntro:
      "公共交通时刻表源自 Rejseplanen Labs 静态 GTFS（static GTFS），遵循 CC BY 4.0 许可协议。道路寻路（routing）数据独立采自 OpenStreetMap；界面所呈现的矢量底图（vector basemap）则使用 OpenFreeMap 和 OpenMapTiles。",
    sourceLinks: {
      rejseplanen: "Rejseplanen Labs GTFS",
      openStreetMap: "OpenStreetMap 版权",
      openFreeMap: "OpenFreeMap",
      openMapTiles: "OpenMapTiles",
    },
    imageAlts: {
      reachabilityDesktop:
        "Afgang 桌面端可达范围地图，显示从 Nørreport Station 出发的 4 层计划时刻等时线（contour）",
      commuteDesktop:
        "Afgang 通勤视图，显示从 DTU 至 Nørreport Station 的出门时间决策与路线分段",
      reachabilityMobile:
        "Afgang 移动端可达范围地图，包含出行时间图例与计算控件",
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
这里是 [Jiajia Zhang](https://me.zhangjiajia.me) 的求职向个人索引。我在哥本哈根，已于 2026 年 7 月完成 DTU 数学建模与计算工程硕士学位。

### 为什么是这些项目

我并不想把自己包装成几种不同的候选人。我的技术主线是内部工具（internal tools）与工作流系统（workflow systems）：客服工单队列（support queue）、结构化证据包（evidence package）、人工审核（human review）、数据质量校验（data-quality checks）、运营日志（operational logs）与决策支持（decision support）。

### 我怎么工作

我通常从实际运营问题（operating problem）出发：待处理队列是什么？审核人员（reviewer）需要什么证据才敢推进下一步？自动化应该在何处停止并交还人工？哪些操作必须被记录、审批、回放（replay）与衡量？

### 我最适合什么团队

我最能发挥价值的团队，是正在构建内部工具（internal tools）、客服与运营工作流（support/operations workflows）、规划工具（planning tools）或决策支持产品（decision-support products）的团队。OpsDesk、Denmark Flex Planner、Afgang、Nimbus 与 DTU × Mover 硕士论文（thesis）是最好的了解起点；Cargo Guard 则作为数据质量思维（data-quality thinking）的佐证。

这个作品集（portfolio）本身也是一个基于 Next.js 静态导出（static export）的内容与部署实践项目。欢迎通过 [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com)、[LinkedIn](https://www.linkedin.com/in/jiajia-zhang-0a8a40289) 或 [GitHub](https://github.com/isjiajia01) 与我联系。
  `,
};

export default dictionary;
