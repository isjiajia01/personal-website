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
import orbstack from "../public/images/tools/orbstack.webp";
import cleanshot from "../public/images/tools/cleanshot.webp";
import tableplus from "../public/images/tools/tableplus.webp";
import httpie from "../public/images/tools/httpie.webp";
import shots from "../public/images/tools/shots.webp";
import astro from "../public/images/tools/astro.webp";
import wise from "../public/images/tools/wise.webp";

const dictionary = {
  meta: {
    baseUrl: "https://me.zhangjiajia.me",
    websiteName: "Jiajia Zhang",
    motto: "Systems, AI workflows, and internal products.",
    mottos: [
      "I build the operating layer for complex work.",
      "Product systems, AI workflows, and decision tools that make ambiguity easier to act on.",
    ],
    bio: `
A systems-minded product builder based in Copenhagen.

I work across internal tools,
AI workflow control planes,
iOS product surfaces,
and optimization-backed decision support.

I like small systems with visible evidence,
safety gates, and calm interfaces.
    `,
    fillKeywords(keywords?: string[]): string[] {
      return [
        "Jiajia Zhang",
        "AI workflows",
        "internal tools",
        "product systems",
        "decision support",
        "portfolio",
        "personal website",
        ...(keywords ?? []),
      ];
    },
  },
  urls: {
    home: "/en",
    works: "/en/works",
    posts: "/en/posts",
    life: "/en/life",
    about: "/en/about",

    shareToX(title: string, postLink: string) {
      return `https://twitter.com/share?text=${encodeURIComponent(
        `I am reading ${title.toLocaleUpperCase()} @isjiajia01`,
      )}&url=${encodeURIComponent(`https://me.zhangjiajia.me${postLink}`)}`;
    },
  },
  labels: {
    home: "Home",
    works: "Works",
    posts: "Tech",
    life: "Life",
    about: "About",
    latestPosts: "Latest",
    latestTech: "Tech",
    latestLife: "Life",
    noocWorks: "Jiajia's Works",
    recommended: "Recommended",
    activity: "Activity",
    doing: "Doing",
    playing: "Playing",
    contactMe: "Contact Me",
    toc: "Table of Contents",
    categories: "Categories",
    featured: "Featured",
    archive: "Archive",
    shareTo: "Share to: ",
    subnooc: "Notes",
    brandName: "JIAJIA",
    brandTagline: "Jiajia Zhang",
    notFoundStatus: "Paper Tray Empty",
    notFoundTitle: "Out of Paper",
    notFoundSubtitle: "Please insert paper correctly to print content.",
    notFoundButton: "\u2190 Print Home",
    notFoundError: "ERR 404 \u00b7 PAPER_NOT_FOUND",
    printedOn: "Printed on",
    reading: "Recent Reading",
    films: "Recent Films",
    music: "Recent Listening",
    suggestions: "Suggestions",
    aboutTitle: "About",
    aboutSubtitle: "Systems, AI workflows, and internal products",
    entries(count: number) {
      return `${count} ${count === 1 ? "entry" : "entries"}`;
    },
    icon(label: string) {
      return `Icon for ${label}`;
    },
  },
  tools: [
    {
      name: "Raycast",
      summary:
        "Raycast is a blazingly fast, totally extendable launcher for macOS.",
      link: "https://raycast.com/?via=nooc",
      color: "orange",
      icon: raycast,
      rating: 5,
      platform: "macOS",
      pricing: "freemium",
    },
    {
      name: "OrbStack",
      summary:
        "OrbStack is the fast, light, and easy way to run Docker containers and Linux.",
      link: "https://orbstack.dev",
      color: "indigo",
      icon: orbstack,
      rating: 5,
      platform: "macOS",
      pricing: "freemium",
    },
    {
      name: "CleanShot",
      summary:
        "CleanShot X provides over 50 features making it the ultimate screen capturing tool.",
      link: "https://cleanshot.sjv.io/9LxN54",
      color: "blue",
      icon: cleanshot,
      rating: 4.5,
      platform: "macOS",
      pricing: "paid",
    },
    {
      name: "Wise",
      summary:
        "Wise is a cross-border payment/transfer tool with favorable exchange rates and a user-friendly app interface.",
      link: "https://wise.com/invite/ihpc/1q2ntua",
      color: "green",
      icon: wise,
      rating: 5,
      platform: "Web, iOS, Android",
      pricing: "free",
    },
    {
      name: "HTTPie",
      summary:
        "HTTPie is a command-line HTTP client that makes APIs simple and intuitive.",
      link: "https://httpie.io",
      color: "green",
      icon: httpie,
      rating: 4.5,
      platform: "Desktop, Web",
      pricing: "free",
    },
    {
      name: "Shots",
      summary:
        "Shots helps you create beautiful presentations from screen captures.",
      link: "https://shots.so",
      color: "pink",
      icon: shots,
      rating: 4.5,
      platform: "Web",
      pricing: "free",
    },
    {
      name: "TablePlus",
      summary: "TablePlus is a powerful GUI tool for database management.",
      link: "https://tableplus.com",
      image: AssisChat,
      color: "yellow",
      icon: tableplus,
      rating: 4,
      platform: "Desktop, iOS",
      pricing: "freemium",
    },
    {
      name: "Astro",
      summary: "Astro is an ASO keywords tool for App Store optimization.",
      link: "https://tryastro.app?aff=kMo5R",
      image: SparkMemosLogo,
      color: "purple",
      icon: astro,
      rating: 3.5,
      platform: "macOS",
      pricing: "paid",
    },
  ],
  playingItems: [
    {
      name: "TypeScript",
      icon: SiTypescript,
      summary:
        "My most commonly used programming language, often used with Node / React / Tailwind, etc.",
      color: "blue",
    },
    {
      name: "Swift",
      icon: SiSwift,
      summary:
        "Recently learning Apple's ecosystem programming, commonly used with SwiftUI.",
      color: "amber",
    },
    {
      name: "Sketch",
      icon: SiSketch,
      summary:
        "Occasionally dabble in design, but not very proficient. Now using Figma more often.",
      color: "yellow",
    },
    {
      name: "Blender",
      icon: SiBlender,
      summary:
        "Tried learning many times, but always gave up after following tutorials.",
      color: "orange",
    },
    {
      name: "Switch",
      icon: GamepadIcon,
      summary:
        "I have a Switch, but it has a lot of dust on it, and I also have a PS4 with even more dust.",
      color: "rose",
    },
    {
      name: "Photography",
      icon: CameraIcon,
      summary:
        "I have a Sony a7c, but I don't know if the battery still has power.",
      color: "cyan",
    },
  ],
  works: [
    {
      name: "OpsDesk",
      summary: "AI workflow control plane for support, finance, approvals, audit replay, and feedback memory.",
      link: "https://jobops.zhangjiajia.me/opsdesk",
      image: CassetteOneLogo,
      color: "blue",
      primary: true,
    },
    {
      name: "Nimbus",
      summary: "Weather journal product across SwiftUI, backend aggregation, radar, and fallback behavior.",
      link: "https://github.com/isjiajia01/10.01_Nimbus",
      image: echobellLogo,
      color: "cyan",
      primary: true,
    },
    {
      name: "Mover Thesis",
      summary: "Depot-aware rolling decomposition and guarded search for multi-day last-mile planning.",
      link: "#",
      image: dippodLogo,
      color: "orange",
      primary: true,
    },
    {
      name: "Life OS",
      summary: "Personal operating system for memory, workflows, project tracking, and automation.",
      link: "#",
      image: youminco,
      color: "green",
      primary: true,
    },
    {
      name: "Cargo Guard",
      summary: "Data quality cockpit for logistics events, contracts, checks, and owner routing.",
      link: "#",
      image: AssisChat,
      color: "yellow",
      primary: false,
    },
    {
      name: "Personal Website",
      summary: "This printed personal index, rebuilt from the nooc.me codebase with permission.",
      link: "https://me.zhangjiajia.me",
      image: SparkMemosLogo,
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
      label: "Email",
      name: "isjiajiazhang@gmail.com",
      link: "mailto:isjiajiazhang@gmail.com",
      icon: EnvelopeIcon,
    },
    {
      label: "Website",
      name: "me.zhangjiajia.me",
      link: "https://me.zhangjiajia.me",
      icon: PaperAirplaneIcon,
    },
  ],
  postAdvertisements: [
    {
      title: "OpsDesk",
      description: "AI workflow control plane with evidence, approval gates, audit replay, and feedback memory.",
      icon: echobellLogo,
      link: "https://jobops.zhangjiajia.me/opsdesk",
    },
    {
      title: "Nimbus",
      description: "Weather journal product built across SwiftUI, backend aggregation, radar, and fallback behavior.",
      icon: SparkMemosLogo,
      link: "https://github.com/isjiajia01/10.01_Nimbus",
    },
  ],
  archive: {
    reading: [
      {
        title: "The Unbearable Lightness of Being",
        summary: "When existence is light, how should we face it?",
      },
      {
        title: "The Master and Margarita",
        summary: "What is good, and what is evil?",
      },
      { title: "Life is Elsewhere", summary: "When poetry becomes a danger." },
      {
        title: "The Neapolitan Novels",
        summary: "An epic novel about growth, friendship and love.",
      },
      {
        title: "The Brothers Karamazov",
        summary: "If we end evil by evil means, are we still good?",
      },
      {
        title: "Netochka Nezvanova",
        summary: "Some people drift further into fantasy, becoming dreamers.",
      },
      {
        title: "Strait Is the Gate",
        summary: "When faith collides with the secular world.",
      },
      {
        title: "The Death of Ivan Ilyich",
        summary: "A Tolstoy novella from his later years.",
      },
      { title: "Kon-Tiki", summary: "A wild journey to prove oneself." },
      {
        title: "The Submarine at Night",
        summary: "A short story collection in a Borges-like style.",
      },
      {
        title: "Make Something Wonderful",
        summary: "A collection of Steve Jobs\' speeches and letters.",
      },
    ],
    films: [
      {
        title: "When Life Gives You Tangerines",
        summary: "A very good Korean drama.",
      },
      {
        title: "Adventure Time",
        summary: "The best way to learn English through a show.",
      },
      {
        title: "Art of the Cosmos",
        summary: "A long journey to the West seeking truth.",
      },
      {
        title: "Monster",
        summary: "A work by one of my favorite directors, Hirokazu Kore-eda.",
      },
      {
        title: "The Simpsons",
        summary: "Re-watching this animation that\'s older than me.",
      },
      {
        title: "The Long Season",
        summary: "My favorite Chinese drama in recent years.",
      },
      {
        title: "Deep Sea",
        summary: "Childlike wonder — I love this colorful art style.",
      },
    ],
    music: [
      {
        title: "Sunset Rollercoaster",
        summary: "A band with a strong vibe, perfect for vibe coding.",
      },
      {
        title: "Chen Jingfei",
        summary:
          "Retro tunes and vocals paired with not monotonous arrangements.",
      },
      {
        title: "Low Roar",
        summary: "Ethereal and lonely sounds from Iceland.",
      },
      {
        title: "Hedgehog",
        summary: "Somehow manages to move me.",
      },
      {
        title: "Sufjan Stevens",
        summary: "Gentle and full of stories.",
      },
      {
        title: "The Chairs",
        summary: "Soft and flowing vocals and lyrics.",
      },
    ],
    suggest: [
      {
        title: "Jiajia Zhang",
        link: "https://nooc.me",
        summary: "My personal website.",
        advertisement: true,
      },
      {
        title: "YouminCO",
        link: "https://youmin.co",
        summary: "A digital nomad community I built.",
        advertisement: true,
      },
      {
        title: "OneiAI",
        link: "https://onei.ai",
        summary: "An AI navigation site I built.",
        advertisement: true,
      },
      {
        title: "CassetteOne",
        link: "https://cassette.one",
        summary: "A retro cassette player I built.",
        advertisement: true,
      },
      {
        title: "Spark Memos",
        link: "https://sparkmemos.com",
        summary: "A short-note-taking app I built.",
        advertisement: true,
      },
      {
        title: "Echobell",
        link: "https://echobell.one",
        summary: "A notification app I built.",
        advertisement: true,
      },
      {
        title: "Dippod",
        link: "https://dippod.com",
        summary: "A podcast English-learning app I\'m building.",
        advertisement: false,
      },
    ],
  },
  aboutContent: `
This is [Jiajia Zhang](https://me.zhangjiajia.me)'s personal index.

Updated around systems, products, AI workflows, decision support, and small tools that make work easier to operate.

### About Me

I am based in Copenhagen and work between product judgment and system depth.

My strongest projects are practical systems: OpsDesk as an AI workflow control plane, Nimbus as a weather product surface, Cargo Guard as a data-quality cockpit, and my DTU/Mover thesis as optimization-backed decision support.

I like work that starts from an operating problem, exposes evidence and tradeoffs, and leaves behind a calmer tool or workflow.

You can reach me at [isjiajiazhang@gmail.com](mailto:isjiajiazhang@gmail.com) or on [GitHub](https://github.com/isjiajia01).
  `,

};

export default dictionary;
