import {
  RiCameraLine as CameraIcon,
  RiGamepadLine as GamepadIcon,
  RiMailLine as EnvelopeIcon,
  RiSendPlaneLine as PaperAirplaneIcon,
} from "@remixicon/react";
import {
  SiBlender,
  SiGithub,
  SiSketch,
  SiSwift,
  SiTypescript,
  SiX,
} from "@icons-pack/react-simple-icons";

import AssisChat from "../public/static/assischat.webp";
import lofyee from "../public/static/lofyee.webp";
import subnooc from "../public/static/subnooc.webp";
import youminco from "../public/static/youminco.webp";
import SparkMemosLogo from "../public/static/sparkmemos.webp";
import CassetteOneLogo from "../public/static/cassette-one.webp";
import echobellLogo from "../public/static/echobell.webp";
import dippodLogo from "../public/static/dippod.webp";
import raycast from "../public/images/tools/raycast.webp";
import cleanshot from "../public/images/tools/cleanshot.webp";
import orbstack from "../public/images/tools/orbstack.webp";
import tableplus from "../public/images/tools/tableplus.webp";
import httpie from "../public/images/tools/httpie.webp";
import shots from "../public/images/tools/shots.webp";
import astro from "../public/images/tools/astro.webp";
import wise from "../public/images/tools/wise.webp";
import { title } from "process";

const dictionary = {
  meta: {
    baseUrl: "https://me.zhangjiajia.me",
    websiteName: "Jiajia Zhang 的主页",
    motto: "Systems, AI workflows, and internal products.",
    mottos: [
      "把复杂工作变成可运行的系统。",
      "产品系统、AI 工作流和决策工具。",
    ],
    bio: `
一个在哥本哈根做系统和产品的人。

关注 internal tools、
AI workflow control plane、
iOS 产品界面、
以及优化驱动的决策支持。

喜欢有证据、有边界、
界面安静的小系统。
    `,
    fillKeywords(keywords?: string[]): string[] {
      return [
        "Jiajia Zhang",
        "AI workflows",
        "internal tools",
        "product systems",
        "decision support",
        "个人主页",
        "个人网站",
        ...(keywords ?? []),
      ];
    },
  },
  urls: {
    home: "/zh",
    works: "/zh/works",
    posts: "/zh/posts",
    life: "/zh/life",
    about: "/zh/about",

    shareToX(title: string, postLink: string) {
      return `https://twitter.com/share?text=${encodeURIComponent(
        `我正在看「${title}」 @isjiajia01`,
      )}&url=${encodeURIComponent(`https://me.zhangjiajia.me${postLink}`)}`;
    },
  },
  labels: {
    home: "主页",
    works: "作品",
    posts: "技术",
    life: "生活",
    about: "关于",
    latestPosts: "最新",
    latestTech: "技术",
    latestLife: "生活",
    noocWorks: "Jiajia 的作品",
    recommended: "推荐",
    activity: "活动",
    doing: "在做什么",
    playing: "在玩什么",
    contactMe: "联系我",
    toc: "目录",
    categories: "分类",
    featured: "精选",
    archive: "归档",
    shareTo: "分享到：",
    subnooc: "笔记",
    brandName: "JIAJIA",
    brandTagline: "Jiajia Zhang",
    notFoundStatus: "\u7eb8\u7a7a\u4e86",
    notFoundTitle: "\u6258\u76d8\u5df2\u7a7a",
    notFoundSubtitle:
      "\u8bf7\u6b63\u786e\u653e\u5165\u7eb8\u5f20\u4ee5\u6253\u5370\u5185\u5bb9\u3002",
    notFoundButton: "\u2190 \u6253\u5370\u4e3b\u9875",
    notFoundError: "ERR 404 \u00b7 PAPER_NOT_FOUND",
    printedOn: "\u6253\u5370\u4e8e",
    reading: "最近阅读",
    films: "最近观影",
    music: "最近聆听",
    suggestions: "推荐",
    aboutTitle: "关于",
    aboutSubtitle: "",
    entries(count: number) {
      return `${count} 条`;
    },
    icon(label: string) {
      return `${label}的图标`;
    },
  },
  tools: [
    {
      name: "Raycast",
      summary: "Raycast 是一款功能丰富、扩展性强的 macOS 启动器。",
      link: "https://raycast.com/?via=nooc",
      image: AssisChat,
      color: "orange",
      icon: raycast,
      rating: 5,
      platform: "macOS",
      pricing: "免费增值",
    },
    {
      name: "OrbStack",
      summary: "OrbStack 是一个简单轻便的运行 Docker 容器和 Linux 的工具。",
      link: "https://orbstack.dev",
      image: SparkMemosLogo,
      color: "indigo",
      icon: orbstack,
      rating: 5,
      platform: "macOS",
      pricing: "免费增值",
    },
    {
      name: "CleanShot",
      summary:
        "CleanShot X 提供了从截图到录屏的大部分功能，且拥有简洁美观的界面。",
      link: "https://cleanshot.sjv.io/9LxN54",
      color: "blue",
      icon: cleanshot,
      rating: 4.5,
      platform: "macOS",
      pricing: "付费",
    },
    {
      name: "Wise",
      summary:
        "Wise 是一个跨境收款/转账/支付工具，汇率比较划算且 App 界面友好。",
      link: "https://wise.com/invite/ihpc/1q2ntua",
      color: "green",
      icon: wise,
      rating: 5,
      platform: "Web, iOS, Android",
      pricing: "免费",
    },
    {
      name: "HTTPie",
      summary: "HTTPie 是一个简单直观的 HTTP 客户端。",
      link: "https://httpie.io",
      image: CassetteOneLogo,
      color: "green",
      icon: httpie,
      rating: 4.5,
      platform: "Desktop, Web",
      pricing: "免费",
    },
    {
      name: "Shots",
      summary: "Shots 帮助您从屏幕截图中创建精美的社交分享图。",
      link: "https://shots.so",
      image: echobellLogo,
      color: "pink",
      icon: shots,
      rating: 4.5,
      platform: "Web",
      pricing: "免费",
    },
    {
      name: "TablePlus",
      summary: "TablePlus 是一个强大的数据库管理图形用户界面工具。",
      link: "https://tableplus.com",
      image: dippodLogo,
      color: "yellow",
      icon: tableplus,
      rating: 4,
      platform: "Desktop, iOS",
      pricing: "免费增值",
    },
    {
      name: "Astro",
      summary: "Astro 是一款用于 App Store 优化的 ASO 关键词工具。",
      link: "https://tryastro.app?aff=kMo5R",
      image: youminco,
      color: "purple",
      icon: astro,
      rating: 3.5,
      platform: "macOS",
      pricing: "付费",
    },
  ],
  playingItems: [
    {
      name: "TypeScript",
      icon: SiTypescript,
      summary:
        "最常使用的编程语言, 常搭配使用的有 Node / React / Tailwind 等。",
      color: "blue",
    },
    {
      name: "Swift",
      icon: SiSwift,
      summary:
        "最近在学习苹果生态的程序设计, 常搭配使用的有 SwiftUI / Combine 。",
      color: "amber",
    },
    {
      name: "Sketch",
      icon: SiSketch,
      summary: "偶尔也弄弄设计, 但不太熟。现在用 Figma 比较多。",
      color: "yellow",
    },
    {
      name: "Blender",
      icon: SiBlender,
      summary: "尝试学习过很多次, 每次都是照着教程弄一遍就放弃了。",
      color: "orange",
    },
    {
      name: "Switch",
      icon: GamepadIcon,
      summary: "有一台 Switch, 但上面很多灰, 还有一台灰更多的 PS4 。",
      color: "rose",
    },
    {
      name: "摄影",
      icon: CameraIcon,
      summary: "有一台 Sony a7c, 但不知道电池还有没有电。",
      color: "cyan",
    },
  ],
  works: [
    {
      name: "OpsDesk",
      summary: "面向支持、财务、审批、审计复盘和反馈记忆的 AI 工作流控制台。",
      link: "https://jobops.zhangjiajia.me/opsdesk",
      image: AssisChat,
      color: "blue",
      primary: true,
    },
    {
      name: "Nimbus",
      summary: "覆盖 SwiftUI、后端聚合、雷达和 fallback 行为的天气产品。",
      link: "https://github.com/isjiajia01/10.01_Nimbus",
      image: SparkMemosLogo,
      color: "cyan",
      primary: true,
    },
    {
      name: "Mover Thesis",
      summary: "面向多日末端配送规划的 depot-aware rolling decomposition 和 guarded search。",
      link: "#",
      image: CassetteOneLogo,
      color: "orange",
      primary: true,
    },
    {
      name: "Life OS",
      summary: "围绕记忆、工作流、项目跟踪和自动化组织的个人操作系统。",
      link: "#",
      image: echobellLogo,
      color: "green",
      primary: true,
    },
    {
      name: "Cargo Guard",
      summary: "面向物流事件、数据契约、质量检查和责任人路由的数据质量 cockpit。",
      link: "#",
      image: dippodLogo,
      color: "yellow",
      primary: false,
    },
    {
      name: "Personal Website",
      summary: "这个打印纸风格的个人索引，基于 nooc.me 代码授权改造。",
      link: "https://me.zhangjiajia.me",
      image: youminco,
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
  postAdvertisements: [
    {
      title: "OpsDesk",
      description: "带证据、审批门、审计复盘和反馈记忆的 AI 工作流控制台。",
      icon: echobellLogo,
      link: "https://jobops.zhangjiajia.me/opsdesk",
    },
    {
      title: "Nimbus",
      description: "覆盖 SwiftUI、后端聚合、雷达和 fallback 行为的天气产品。",
      icon: SparkMemosLogo,
      link: "https://github.com/isjiajia01/10.01_Nimbus",
    },
  ],
  archive: {
    reading: [
      {
        title: "不能承受的生命之轻",
        summary: "当存在是轻的，我们该如何面对？",
      },
      {
        title: "大师和玛格丽特",
        summary: "什么是善，什么又是恶？",
      },
      { title: "生活在别处", summary: "当诗意成为一种危险。" },
      {
        title: "那不勒斯四部曲",
        summary: "细腻、真实地描绘了两个女性朋友从小孩到老年的爱恨纠葛。",
      },
      {
        title: "卡拉马佐夫兄弟",
        summary: "如果我们用恶的方式去结束了恶，那我们还是善良的吗？",
      },
      {
        title: "涅朵奇卡",
        summary: "有的人在幻想中越走越远，最终成了幻想家。",
      },
      { title: "窄门", summary: "当信仰与世俗发生冲突。" },
      { title: "伊凡·伊利奇之死", summary: "托尔斯泰后期的一篇中篇小说。" },
      { title: "孤筏重洋", summary: "一场为了证明自己的狂野旅程。" },
      { title: "夜晚的潜水艇", summary: "一本有点博尔赫斯风格的短篇小说集。" },
      {
        title: "Make Something Wonderful",
        summary: "这本书集合了很多乔布斯生前的演讲和书信。",
      },
    ],
    films: [
      {
        title: "苦尽柑来遇见你",
        summary: "很不错的一部韩剧。",
      },
      { title: "探险活宝", summary: "看剧学英语的不二之选。" },
      { title: "宇宙探索编辑部", summary: "长路漫漫地奔赴西方取经。" },
      { title: "怪物", summary: "我最喜欢的导演之一是枝裕和的作品。" },
      { title: "辛普森一家", summary: "重新开始看这部比我还老的动画。" },
      { title: "漫长的季节", summary: "近几年看过最喜欢的国产剧。" },
      {
        title: "深海",
        summary: "童心未泯的我，真的是喜欢这种花花绿绿的画风。",
      },
    ],
    music: [
      {
        title: "落日飞车",
        summary: "Vibe 感十足的微醺乐队，vibe coding 最佳伴侣。",
      },
      {
        title: "陈婧霏",
        summary: "复古的曲调和嗓音搭配并不单调的编曲。",
      },
      {
        title: "Low Roar",
        summary: "来自冰岛的空灵孤寂的声音。",
      },
      {
        title: "刺猬乐队",
        summary: "莫名其妙地能打动我。",
      },
      {
        title: "Sufjan Stevens",
        summary: "温柔且充满故事。",
      },
      {
        title: "椅子乐团",
        summary: "柔情似水的嗓音和歌词。",
      },
    ],
    suggest: [
      {
        title: "Jiajia Zhang",
        link: "https://nooc.me",
        summary: "这是我的个人网站。",
        advertisement: true,
      },
      {
        title: "游民CO",
        link: "https://youmin.co",
        summary: "我做的一个数字游民社区。",
        advertisement: true,
      },
      {
        title: "OneiAI",
        link: "https://onei.ai",
        summary: "我做的一个 AI 导航网站。",
        advertisement: true,
      },
      {
        title: "CassetteOne",
        link: "https://cassette.one",
        summary: "我做的一个复古磁带设计的音乐播放器。",
        advertisement: true,
      },
      {
        title: "星火记",
        link: "https://sparkmemos.com",
        summary: "我做的一个短笔记 App。",
        advertisement: true,
      },
      {
        title: "Echobell",
        link: "https://echobell.one",
        summary: "我做的一个通知类 App。",
        advertisement: true,
      },
      {
        title: "Dippod",
        link: "https://dippod.com",
        summary: "我正在做的一个使用播客学英语的 App。",
        advertisement: false,
      },
    ],
  },
  aboutContent: `
这里是 [Jiajia Zhang](https://me.zhangjiajia.me) 的个人索引。

主要记录系统、产品、AI 工作流、决策支持，以及让复杂工作更容易运行的小工具。

### 关于我

我在哥本哈根，工作兴趣在产品判断和系统深度之间。

目前最能代表我的项目包括：作为 AI workflow control plane 的 OpsDesk，作为天气产品界面的 Nimbus，作为物流数据质量 cockpit 的 Cargo Guard，以及 DTU/Mover 优化规划 thesis。

我喜欢从真实 operating problem 出发，把证据、边界和 tradeoff 做清楚，然后留下一个更安静、更可靠的工具或流程。

可以通过 [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com) 或 [GitHub](https://github.com/isjiajia01) 联系我。
  `,

};

export default dictionary;
