import type { ReactNode } from "react";

export type NolaLink = {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  domain: string;
  icon: ReactNode;
};

const iconProps = {
  viewBox: "0 0 24 24",
  className: "h-6 w-6",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const links: NolaLink[] = [
  {
    title: "Videos",
    subtitle: "The screening room",
    description:
      "Sit back on the balcony and roll the reel — clips, edits, and the good stuff worth watching.",
    href: "https://videos.corneliuses.com",
    domain: "videos.corneliuses.com",
    icon: (
      <svg {...iconProps}>
        <rect x="2.5" y="5" width="14" height="14" rx="2" />
        <path d="M16.5 9.5 21.5 6v12l-5-3.5" />
      </svg>
    ),
  },
  {
    title: "Family Room",
    subtitle: "Pull up a stoop",
    description:
      "The family's private front porch — video calls for the four of us and a group chat that keeps the conversation going.",
    href: "https://chat.brcornelius.com",
    domain: "chat.brcornelius.com",
    icon: (
      <svg {...iconProps}>
        <path d="M4 5.5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3.5v-3.5H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2Z" />
        <path d="M17 9.5h3a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-1v3l-3.5-3H12" />
      </svg>
    ),
  },
  {
    title: "Brian",
    subtitle: "Your host on Bourbon Street",
    description:
      "The man behind the mask — personal projects, notes, and whatever Brian's stirring up.",
    href: "https://brian.corneliuses.com",
    domain: "brian.corneliuses.com",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M4.5 20c1.2-4 4-6 7.5-6s6.3 2 7.5 6" />
      </svg>
    ),
  },
  {
    title: "Dinnerocracy",
    subtitle: "Where the table votes",
    description:
      "Democracy is best served hot — recipes, gatherings, and the case for dinner as civic duty.",
    href: "https://dinnerocracy.com",
    domain: "dinnerocracy.com",
    icon: (
      <svg {...iconProps}>
        <path d="M7 2.5v7a2.5 2.5 0 0 0 5 0v-7" />
        <path d="M9.5 2.5v19" />
        <path d="M17 2.5c-1.7 0-3 2-3 4.5s1.3 4.5 3 4.5v9" />
      </svg>
    ),
  },
];
