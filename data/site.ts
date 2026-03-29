export type NavItem = {
  id: string;
  label: string;
};

export type PlaceholderCard = {
  title: string;
  subtitle: string;
  badge?: string;
};

export const identity = {
  name: "Hubery Wu",
  university: "Anhui University",
  major: "Digital Media Technology"
};

export const navItems: NavItem[] = [
  { id: "hero", label: "Home" },
  { id: "focus", label: "Focus" },
  { id: "about", label: "About" },
  { id: "research", label: "Research" },
  { id: "resume", label: "Resume" },
  { id: "awards", label: "Awards" },
  { id: "leadership", label: "Leadership" },
  { id: "volunteer", label: "Volunteer" },
  { id: "papers", label: "Papers" },
  { id: "blog", label: "Blog" },
  { id: "github", label: "GitHub" },
  { id: "contact", label: "Contact" }
];

export const focusTags = [
  "Computer Science",
  "Information Hiding",
  "Atmospheric Environment",
  "Digital Media Technology",
  "Research",
  "Papers",
  "Blog",
  "GitHub",
  "Projects",
  "Academic Portfolio"
];

export const researchCards: PlaceholderCard[] = [
  {
    title: "Information Hiding",
    subtitle: "Placeholder summary for research direction and methods.",
    badge: "Placeholder"
  },
  {
    title: "Atmospheric Environment",
    subtitle: "Placeholder summary for research direction and methods.",
    badge: "Placeholder"
  },
  {
    title: "Computer Science",
    subtitle: "Placeholder summary for research direction and methods.",
    badge: "Placeholder"
  },
  {
    title: "Interdisciplinary Research",
    subtitle: "Placeholder summary for research direction and methods.",
    badge: "Placeholder"
  }
];

export const resumeCards: PlaceholderCard[] = [
  {
    title: "Education Snapshot",
    subtitle: "Placeholder timeline and academic progress blocks.",
    badge: "Resume"
  },
  {
    title: "Academic Training",
    subtitle: "Placeholder curriculum and capability highlights.",
    badge: "Resume"
  },
  {
    title: "Technical Stack",
    subtitle: "Placeholder tools and workflow overview.",
    badge: "Resume"
  }
];

export const awardsCards: PlaceholderCard[] = [
  { title: "Award Placeholder 01", subtitle: "Placeholder recognition content.", badge: "Award" },
  { title: "Award Placeholder 02", subtitle: "Placeholder recognition content.", badge: "Award" },
  { title: "Honor Placeholder 03", subtitle: "Placeholder recognition content.", badge: "Honor" }
];

export const leadershipCards: PlaceholderCard[] = [
  { title: "Leadership Placeholder 01", subtitle: "Placeholder leadership narrative.", badge: "Leadership" },
  { title: "Leadership Placeholder 02", subtitle: "Placeholder leadership narrative.", badge: "Leadership" },
  { title: "Leadership Placeholder 03", subtitle: "Placeholder leadership narrative.", badge: "Leadership" }
];

export const volunteerCards: PlaceholderCard[] = [
  { title: "Service Placeholder 01", subtitle: "Placeholder contribution summary.", badge: "Service" },
  { title: "Service Placeholder 02", subtitle: "Placeholder contribution summary.", badge: "Service" }
];

export const papersCards: PlaceholderCard[] = [
  { title: "Paper Placeholder 01", subtitle: "Placeholder publication abstract and metadata.", badge: "Paper" },
  { title: "Paper Placeholder 02", subtitle: "Placeholder publication abstract and metadata.", badge: "Paper" },
  { title: "Paper Placeholder 03", subtitle: "Placeholder publication abstract and metadata.", badge: "Paper" },
  { title: "Paper Placeholder 04", subtitle: "Placeholder publication abstract and metadata.", badge: "Paper" }
];

export const blogCards: PlaceholderCard[] = [
  { title: "Blog Placeholder 01", subtitle: "Placeholder note for writing direction.", badge: "Blog" },
  { title: "Blog Placeholder 02", subtitle: "Placeholder note for writing direction.", badge: "Blog" },
  { title: "Blog Placeholder 03", subtitle: "Placeholder note for writing direction.", badge: "Blog" }
];

export const githubProjectCards: PlaceholderCard[] = [
  { title: "Project Placeholder 01", subtitle: "Placeholder repository and project brief.", badge: "Project" },
  { title: "Project Placeholder 02", subtitle: "Placeholder repository and project brief.", badge: "Project" },
  { title: "Project Placeholder 03", subtitle: "Placeholder repository and project brief.", badge: "Project" },
  { title: "Project Placeholder 04", subtitle: "Placeholder repository and project brief.", badge: "Project" }
];
