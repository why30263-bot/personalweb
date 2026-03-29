export type Locale = "en" | "zh";

export type LocalizedText = {
  en: string;
  zh: string;
};

export type NavItem = {
  id: string;
  label: LocalizedText;
};

export type LocalizedCard = {
  title: LocalizedText;
  subtitle: LocalizedText;
  badge?: LocalizedText;
};

export type LocalizedLinkedCard = LocalizedCard & {
  url: string;
};

export const identity = {
  name: {
    en: "Hubery Wu",
    zh: "吴浩毅"
  },
  university: {
    en: "Anhui University",
    zh: "安徽大学"
  },
  major: {
    en: "Digital Media Technology",
    zh: "数字媒体技术"
  }
};

export const navItems: NavItem[] = [
  { id: "hero", label: { en: "Home", zh: "首页" } },
  { id: "focus", label: { en: "Focus", zh: "研究聚焦" } },
  { id: "about", label: { en: "About", zh: "关于" } },
  { id: "research", label: { en: "Research", zh: "研究" } },
  { id: "resume", label: { en: "Resume", zh: "履历" } },
  { id: "awards", label: { en: "Awards", zh: "奖项" } },
  { id: "leadership", label: { en: "Leadership", zh: "领导力" } },
  { id: "volunteer", label: { en: "Volunteer", zh: "志愿服务" } },
  { id: "papers", label: { en: "Papers", zh: "论文" } },
  { id: "blog", label: { en: "Blog", zh: "博客" } },
  { id: "github", label: { en: "GitHub", zh: "GitHub" } },
  { id: "contact", label: { en: "Contact", zh: "联系" } }
];

export const focusTags: LocalizedText[] = [
  { en: "Computer Science", zh: "计算机科学" },
  { en: "Information Hiding", zh: "信息隐藏" },
  { en: "Atmospheric Environment", zh: "大气环境" },
  { en: "Digital Media Technology", zh: "数字媒体技术" },
  { en: "Research", zh: "科研" },
  { en: "Papers", zh: "论文" },
  { en: "Blog", zh: "博客" },
  { en: "GitHub", zh: "GitHub" },
  { en: "Projects", zh: "项目" },
  { en: "Academic Portfolio", zh: "学术主页" }
];

export const uiText = {
  heroEyebrow: {
    en: "Research-Oriented Portfolio",
    zh: "科研导向个人主页"
  },
  heroPitch: {
    en: "A modern academic single-page interface designed for computer science and research expression.",
    zh: "一个面向计算机与科研表达的现代化单页学术界面。"
  },
  explore: {
    en: "Explore",
    zh: "探索"
  },
  contact: {
    en: "Contact",
    zh: "联系"
  },
  dragHint: {
    en: "Drag to explore",
    zh: "拖动探索"
  },
  currentIdentity: {
    en: "Current Identity",
    zh: "当前身份"
  },
  identityPreview: {
    en: "Identity Preview",
    zh: "身份预览"
  },
  placeholderAction: {
    en: "Placeholder action",
    zh: "占位操作"
  },
  view: {
    en: "View",
    zh: "查看"
  },
  section: {
    focus: {
      eyebrow: { en: "Selected Focus", zh: "研究聚焦" },
      title: { en: "Selected Focus", zh: "研究聚焦" },
      subtitle: {
        en: "Interactive tags with draggable behavior. Hover and drag to explore direction clusters.",
        zh: "可交互标签区域，支持拖动。悬停与拖动可探索不同方向集群。"
      }
    },
    about: {
      eyebrow: { en: "About", zh: "关于" },
      title: { en: "About", zh: "关于" },
      subtitle: {
        en: "A restrained block for personal introduction and future narrative.",
        zh: "一个克制的介绍模块，用于后续填充个人叙事与研究路径。"
      }
    },
    research: {
      eyebrow: { en: "Research", zh: "研究" },
      title: { en: "Research", zh: "研究" },
      subtitle: {
        en: "Core research directions presented as high-interaction cards with reserved links for future detail pages.",
        zh: "核心研究方向以高交互卡片呈现，并预留后续详情页入口。"
      }
    },
    resume: {
      eyebrow: { en: "Resume", zh: "履历" },
      title: { en: "Resume", zh: "履历" },
      subtitle: {
        en: "Placeholder resume architecture with list-oriented cards for timeline and capability sections.",
        zh: "履历结构占位，采用列表化卡片组织时间线与能力模块。"
      }
    },
    awards: {
      eyebrow: { en: "Awards & Honors", zh: "奖项与荣誉" },
      title: { en: "Awards & Honors", zh: "奖项与荣誉" },
      subtitle: {
        en: "Bento-style placeholders for future honors, recognitions, and distinctions.",
        zh: "Bento 风格占位区，用于后续填充奖项与荣誉信息。"
      }
    },
    leadership: {
      eyebrow: { en: "Leadership", zh: "领导力" },
      title: { en: "Leadership", zh: "领导力" },
      subtitle: {
        en: "Structured placeholders prepared for leadership experiences and team-oriented contributions.",
        zh: "结构化占位区，用于后续展示团队组织与领导经历。"
      }
    },
    volunteer: {
      eyebrow: { en: "Volunteer Service", zh: "志愿服务" },
      title: { en: "Volunteer Service", zh: "志愿服务" },
      subtitle: {
        en: "Future-facing service records and outreach activities presented in a balanced split layout.",
        zh: "采用分栏布局的占位区，用于后续填充志愿服务与社会参与。"
      }
    },
    papers: {
      eyebrow: { en: "Papers", zh: "论文" },
      title: { en: "Papers", zh: "论文" },
      subtitle: {
        en: "A full-bleed horizontal band prepared for publication cards and manuscript previews.",
        zh: "全宽横向展示带，用于后续填充论文与稿件预览。"
      }
    },
    blog: {
      eyebrow: { en: "Blog", zh: "博客" },
      title: { en: "Blog", zh: "博客" },
      subtitle: {
        en: "Placeholder editorial cards for future articles and research notes.",
        zh: "编辑感占位卡片，用于后续填充文章与研究笔记。"
      }
    },
    github: {
      eyebrow: { en: "GitHub & Projects", zh: "GitHub 与项目" },
      title: { en: "GitHub & Projects", zh: "GitHub 与项目" },
      subtitle: {
        en: "Placeholder project matrix prepared for repositories, demos, and engineering showcases.",
        zh: "项目矩阵占位区，用于后续填充仓库、演示与工程展示。"
      }
    },
    contact: {
      eyebrow: { en: "Contact", zh: "联系" },
      title: { en: "Contact", zh: "联系" },
      subtitle: {
        en: "A clean endpoint with placeholders for email, GitHub, and academic contact channels.",
        zh: "简洁收尾模块，预留邮件、GitHub 与学校相关联系方式。"
      }
    }
  }
};

export const researchCards: LocalizedCard[] = [
  {
    title: { en: "Information Hiding", zh: "信息隐藏" },
    subtitle: {
      en: "Placeholder summary for research direction and methods.",
      zh: "研究方向与方法概述占位文本。"
    },
    badge: { en: "Placeholder", zh: "占位" }
  },
  {
    title: { en: "Atmospheric Environment", zh: "大气环境" },
    subtitle: {
      en: "Placeholder summary for research direction and methods.",
      zh: "研究方向与方法概述占位文本。"
    },
    badge: { en: "Placeholder", zh: "占位" }
  },
  {
    title: { en: "Computer Science", zh: "计算机科学" },
    subtitle: {
      en: "Placeholder summary for research direction and methods.",
      zh: "研究方向与方法概述占位文本。"
    },
    badge: { en: "Placeholder", zh: "占位" }
  },
  {
    title: { en: "Interdisciplinary Research", zh: "交叉研究" },
    subtitle: {
      en: "Placeholder summary for research direction and methods.",
      zh: "研究方向与方法概述占位文本。"
    },
    badge: { en: "Placeholder", zh: "占位" }
  }
];

export const resumeCards: LocalizedCard[] = [
  {
    title: { en: "Education Snapshot", zh: "教育概览占位" },
    subtitle: {
      en: "Placeholder timeline and academic progress blocks.",
      zh: "时间线与学业进展模块占位文本。"
    },
    badge: { en: "Resume", zh: "履历" }
  },
  {
    title: { en: "Academic Training", zh: "学术训练占位" },
    subtitle: {
      en: "Placeholder curriculum and capability highlights.",
      zh: "课程与能力亮点占位文本。"
    },
    badge: { en: "Resume", zh: "履历" }
  },
  {
    title: { en: "Technical Stack", zh: "技术栈占位" },
    subtitle: {
      en: "Placeholder tools and workflow overview.",
      zh: "工具链与工作流概述占位文本。"
    },
    badge: { en: "Resume", zh: "履历" }
  }
];

export const awardsCards: LocalizedCard[] = [
  { title: { en: "Award Placeholder 01", zh: "奖项占位 01" }, subtitle: { en: "Placeholder recognition content.", zh: "奖项内容占位文本。" }, badge: { en: "Award", zh: "奖项" } },
  { title: { en: "Award Placeholder 02", zh: "奖项占位 02" }, subtitle: { en: "Placeholder recognition content.", zh: "奖项内容占位文本。" }, badge: { en: "Award", zh: "奖项" } },
  { title: { en: "Honor Placeholder 03", zh: "荣誉占位 03" }, subtitle: { en: "Placeholder recognition content.", zh: "奖项内容占位文本。" }, badge: { en: "Honor", zh: "荣誉" } }
];

export const leadershipCards: LocalizedCard[] = [
  { title: { en: "Leadership Placeholder 01", zh: "领导经历占位 01" }, subtitle: { en: "Placeholder leadership narrative.", zh: "领导经历叙述占位文本。" }, badge: { en: "Leadership", zh: "领导力" } },
  { title: { en: "Leadership Placeholder 02", zh: "领导经历占位 02" }, subtitle: { en: "Placeholder leadership narrative.", zh: "领导经历叙述占位文本。" }, badge: { en: "Leadership", zh: "领导力" } },
  { title: { en: "Leadership Placeholder 03", zh: "领导经历占位 03" }, subtitle: { en: "Placeholder leadership narrative.", zh: "领导经历叙述占位文本。" }, badge: { en: "Leadership", zh: "领导力" } }
];

export const volunteerCards: LocalizedCard[] = [
  { title: { en: "Service Placeholder 01", zh: "服务占位 01" }, subtitle: { en: "Placeholder contribution summary.", zh: "志愿贡献概述占位文本。" }, badge: { en: "Service", zh: "服务" } },
  { title: { en: "Service Placeholder 02", zh: "服务占位 02" }, subtitle: { en: "Placeholder contribution summary.", zh: "志愿贡献概述占位文本。" }, badge: { en: "Service", zh: "服务" } }
];

export const papersCards: LocalizedCard[] = [
  { title: { en: "Paper Placeholder 01", zh: "论文占位 01" }, subtitle: { en: "Placeholder publication abstract and metadata.", zh: "论文摘要与元信息占位文本。" }, badge: { en: "Paper", zh: "论文" } },
  { title: { en: "Paper Placeholder 02", zh: "论文占位 02" }, subtitle: { en: "Placeholder publication abstract and metadata.", zh: "论文摘要与元信息占位文本。" }, badge: { en: "Paper", zh: "论文" } },
  { title: { en: "Paper Placeholder 03", zh: "论文占位 03" }, subtitle: { en: "Placeholder publication abstract and metadata.", zh: "论文摘要与元信息占位文本。" }, badge: { en: "Paper", zh: "论文" } },
  { title: { en: "Paper Placeholder 04", zh: "论文占位 04" }, subtitle: { en: "Placeholder publication abstract and metadata.", zh: "论文摘要与元信息占位文本。" }, badge: { en: "Paper", zh: "论文" } }
];

export const blogCards: LocalizedCard[] = [
  { title: { en: "Blog Placeholder 01", zh: "博客占位 01" }, subtitle: { en: "Placeholder note for writing direction.", zh: "写作方向占位文本。" }, badge: { en: "Blog", zh: "博客" } },
  { title: { en: "Blog Placeholder 02", zh: "博客占位 02" }, subtitle: { en: "Placeholder note for writing direction.", zh: "写作方向占位文本。" }, badge: { en: "Blog", zh: "博客" } },
  { title: { en: "Blog Placeholder 03", zh: "博客占位 03" }, subtitle: { en: "Placeholder note for writing direction.", zh: "写作方向占位文本。" }, badge: { en: "Blog", zh: "博客" } }
];

export const githubProjectCards: LocalizedCard[] = [
  { title: { en: "Project Placeholder 01", zh: "项目占位 01" }, subtitle: { en: "Placeholder repository and project brief.", zh: "仓库与项目简介占位文本。" }, badge: { en: "Project", zh: "项目" } },
  { title: { en: "Project Placeholder 02", zh: "项目占位 02" }, subtitle: { en: "Placeholder repository and project brief.", zh: "仓库与项目简介占位文本。" }, badge: { en: "Project", zh: "项目" } },
  { title: { en: "Project Placeholder 03", zh: "项目占位 03" }, subtitle: { en: "Placeholder repository and project brief.", zh: "仓库与项目简介占位文本。" }, badge: { en: "Project", zh: "项目" } },
  { title: { en: "Project Placeholder 04", zh: "项目占位 04" }, subtitle: { en: "Placeholder repository and project brief.", zh: "仓库与项目简介占位文本。" }, badge: { en: "Project", zh: "项目" } }
];

export const syncedBlogCards: LocalizedLinkedCard[] = [
  {
    title: { en: "CSDN Profile · why30263-bot", zh: "CSDN 主页 · why30263-bot" },
    subtitle: {
      en: "Official technical blog profile synchronized to this portfolio.",
      zh: "已同步到主页的官方技术博客账号入口。"
    },
    badge: { en: "CSDN", zh: "博客" },
    url: "https://blog.csdn.net/why30263-bot"
  },
  {
    title: {
      en: "Research Note Publishing Channel",
      zh: "科研笔记发布通道"
    },
    subtitle: {
      en: "Use this entry to access your latest CSDN research posts.",
      zh: "通过该入口访问你最新发布的 CSDN 科研文章。"
    },
    badge: { en: "Article", zh: "文章" },
    url: "https://blog.csdn.net/why30263-bot"
  }
];

export const syncedGithubCards: LocalizedLinkedCard[] = [
  {
    title: { en: "GitHub Profile · why30263-bot", zh: "GitHub 主页 · why30263-bot" },
    subtitle: {
      en: "Official GitHub account synchronized to portfolio.",
      zh: "已同步到主页的官方 GitHub 账号入口。"
    },
    badge: { en: "GitHub", zh: "账号" },
    url: "https://github.com/why30263-bot"
  },
  {
    title: { en: "Portfolio Repository", zh: "主页仓库" },
    subtitle: {
      en: "Source code repository for this academic portfolio website.",
      zh: "当前学术主页网站的源码仓库。"
    },
    badge: { en: "Repository", zh: "仓库" },
    url: "https://github.com/why30263-bot/personalweb"
  }
];

export const syncedPaperCards: LocalizedLinkedCard[] = [
  {
    title: {
      en: "Machine Learning-based Downscaling of Sentinel-5P CO over Beijing",
      zh: "基于机器学习的北京 Sentinel-5P CO 降尺度研究"
    },
    subtitle: {
      en: "LightGBM/CatBoost/Ridge comparison with rolling monthly validation; 3 km daily CO mapping over Beijing.",
      zh: "采用 LightGBM/CatBoost/Ridge 与滚动月度验证，在北京实现 3 km 日尺度近地面 CO 估计。"
    },
    badge: { en: "Paper", zh: "论文" },
    url: "https://blog.csdn.net/why30263-bot"
  },
  {
    title: { en: "Paper Archive Entry", zh: "论文归档入口" },
    subtitle: {
      en: "This slot is prepared for DOI / journal / PDF public link updates.",
      zh: "该位置预留用于后续 DOI、期刊页面或公开 PDF 链接。"
    },
    badge: { en: "Archive", zh: "归档" },
    url: "https://github.com/why30263-bot"
  }
];
