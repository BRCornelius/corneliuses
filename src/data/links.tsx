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
      // The Family Room app's own favicon, so the card matches the PWA.
      <svg viewBox="0 0 64 64" className="h-full w-full" aria-hidden>
        <defs>
          <pattern id="family-room-kernels" width="3.27" height="2.59" patternUnits="userSpaceOnUse">
            <rect x="0.33" y="0.23" width="2.62" height="2.12" rx="0.67" fill="#fef3a5" />
          </pattern>
        </defs>
        <rect width="64" height="64" rx="14" fill="#111833" />
        <path d="M 20.42 26.21 Q 25.22 16.64 35.83 18.01 Q 31.03 27.58 20.42 26.21 Z" fill="#34d399" />
        <path d="M 23.87 14.32 Q 32.01 14.09 33.19 22.14 Q 25.06 22.37 23.87 14.32 Z" fill="#0da074" />
        <g fill="#e2b026" stroke="#e2b026">
          <path d="M 37.25 25.54 A 12.11 12.11 0 0 1 37.25 44.09" fill="none" strokeWidth="7.44" />
          <path d="M 37.24 30.46 Q 35.43 32.62 33 31.19 L 28.21 28.37 Q 25.78 26.94 27.59 24.79 L 34.83 16.16 Q 36.64 14 38.47 16.14 L 42.07 20.38 Q 43.9 22.52 42.09 24.68 Z" stroke="none" />
          <path d="M 37.24 39.17 Q 35.43 37.02 33 38.44 L 28.21 41.26 Q 25.78 42.69 27.59 44.85 L 34.83 53.47 Q 36.64 55.63 38.47 53.49 L 42.07 49.26 Q 43.9 47.11 42.09 44.96 Z" stroke="none" />
        </g>
        <g fill="url(#family-room-kernels)" stroke="url(#family-room-kernels)">
          <path d="M 37.25 25.54 A 12.11 12.11 0 0 1 37.25 44.09" fill="none" strokeWidth="7.44" />
          <path d="M 37.24 30.46 Q 35.43 32.62 33 31.19 L 28.21 28.37 Q 25.78 26.94 27.59 24.79 L 34.83 16.16 Q 36.64 14 38.47 16.14 L 42.07 20.38 Q 43.9 22.52 42.09 24.68 Z" stroke="none" />
          <path d="M 37.24 39.17 Q 35.43 37.02 33 38.44 L 28.21 41.26 Q 25.78 42.69 27.59 44.85 L 34.83 53.47 Q 36.64 55.63 38.47 53.49 L 42.07 49.26 Q 43.9 47.11 42.09 44.96 Z" stroke="none" />
        </g>
      </svg>
    ),
  },
  {
    title: "Road Trip Games",
    subtitle: "Are we there yet?",
    description:
      "The back-seat game hub — bingo, Uno, chess, trivia and more for the whole car, and it keeps playing when the signal drops.",
    href: "https://games.brcornelius.com",
    domain: "games.brcornelius.com",
    icon: (
      // The Road Trip Games app's own favicon, so the card matches the PWA.
      <svg viewBox="0 0 512 512" className="h-full w-full" aria-hidden>
        <defs>
          <linearGradient id="road-trip-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8b5cf6" />
            <stop offset="1" stopColor="#141a3a" />
          </linearGradient>
        </defs>
        <rect width="512" height="512" rx="112" fill="url(#road-trip-bg)" />
        <path d="M96 300c0-14 10-26 24-30l38-72c6-12 18-20 32-20h132c14 0 26 8 32 20l38 72c14 4 24 16 24 30v44c0 10-8 18-18 18h-18a40 40 0 0 1-80 0H212a40 40 0 0 1-80 0h-18c-10 0-18-8-18-18z" fill="#ffcf3d" />
        <path d="M172 200l18-34h132l18 34z" fill="#38bdf8" />
        <circle cx="172" cy="344" r="28" fill="#1a1a2e" />
        <circle cx="340" cy="344" r="28" fill="#1a1a2e" />
        <circle cx="172" cy="344" r="12" fill="#f4f1ff" />
        <circle cx="340" cy="344" r="12" fill="#f4f1ff" />
        <circle cx="392" cy="122" r="26" fill="#ff4d8d" />
        <circle cx="110" cy="120" r="16" fill="#a3e635" />
        <circle cx="150" cy="92" r="10" fill="#38bdf8" />
      </svg>
    ),
  },
  {
    title: "Code Buddy",
    subtitle: "One puzzle at a time",
    description:
      "A coding game for the kids — JavaScript, git, HTML and CSS in bite-size puzzles, with stars, streaks and Byte the corn kid cheering them on.",
    href: "https://coder.corneliuses.com",
    domain: "coder.corneliuses.com",
    icon: (
      // The Code Buddy app's own favicon, so the card matches the PWA.
      <svg viewBox="0 0 128 128" className="h-full w-full" aria-hidden>
        <rect width="128" height="128" rx="28" fill="#1f1645" />
        <g transform="translate(9 9) scale(0.86)"><path d="M46 40 C36 30 33 17 37 7 C47 15 54 26 57 37 Z" fill="#2bb673" stroke="#1f8f5a" strokeWidth="2" /><path d="M82 40 C92 30 95 17 91 7 C81 15 74 26 71 37 Z" fill="#2bb673" stroke="#1f8f5a" strokeWidth="2" /><path d="M57 36 C53 22 58 10 65 2 C70 12 73 24 71 36 Z" fill="#3ddc84" stroke="#1f8f5a" strokeWidth="2" /><path d="M63 7 C62 12 62 16 63 20" stroke="#23e5ff" strokeWidth="2.5" strokeLinecap="round" fill="none" /><ellipse cx="64" cy="72" rx="36" ry="44" fill="#ffd23f" stroke="#6c4cff" strokeWidth="5" /><g fill="#f2b705"><rect x="56.5" y="31" width="7" height="6" rx="3" /><rect x="66.5" y="31" width="7" height="6" rx="3" /><rect x="41.5" y="40.5" width="7" height="6" rx="3" /><rect x="51.5" y="40.5" width="7" height="6" rx="3" /><rect x="61.5" y="40.5" width="7" height="6" rx="3" /><rect x="71.5" y="40.5" width="7" height="6" rx="3" /><rect x="81.5" y="40.5" width="7" height="6" rx="3" /><rect x="41.5" y="97.5" width="7" height="6" rx="3" /><rect x="51.5" y="97.5" width="7" height="6" rx="3" /><rect x="61.5" y="97.5" width="7" height="6" rx="3" /><rect x="71.5" y="97.5" width="7" height="6" rx="3" /><rect x="81.5" y="97.5" width="7" height="6" rx="3" /><rect x="56.5" y="107" width="7" height="6" rx="3" /><rect x="66.5" y="107" width="7" height="6" rx="3" /></g><line x1="104" y1="64" x2="112" y2="44" stroke="#6c4cff" strokeWidth="4" strokeLinecap="round" /><circle cx="112" cy="42" r="6" fill="#ff5dd8" /><rect x="98" y="60" width="9" height="16" rx="4" fill="#6c4cff" /><rect x="22" y="54" width="84" height="26" rx="13" fill="#1f1645" stroke="#23e5ff" strokeWidth="3" /><path d="M32 59 h14" stroke="#fff" strokeOpacity="0.35" strokeWidth="3" strokeLinecap="round" /><g><path d="M40 71 q8 -11 16 0 M72 71 q8 -11 16 0" fill="none" stroke="#23e5ff" strokeWidth="4.5" strokeLinecap="round" /></g><path d="M50 91 q14 12 28 0" fill="none" stroke="#ff5d8f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /><path d="M30 100 C34 113 46 121 60 125 C51 117 44 108 40 96 Z" fill="#3ddc84" stroke="#1f8f5a" strokeWidth="2" /><path d="M98 100 C94 113 82 121 68 125 C77 117 84 108 88 96 Z" fill="#3ddc84" stroke="#1f8f5a" strokeWidth="2" /><path d="M37 105 l5 6 h6" stroke="#23e5ff" strokeWidth="2" fill="none" strokeLinecap="round" /><circle cx="49" cy="111" r="2" fill="#23e5ff" /><path d="M91 105 l-5 6 h-6" stroke="#ff5dd8" strokeWidth="2" fill="none" strokeLinecap="round" /><circle cx="79" cy="111" r="2" fill="#ff5dd8" /></g>
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
