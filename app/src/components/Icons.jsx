import React from 'react';
import {
  ForkKnife, Cpu, PaintBrush, Leaf, Scissors, Palette,
  BookOpen, Plant, FilmSlate, CurrencyDollar, Wrench,
  UsersThree, MusicNote, Heartbeat, Airplane, Baby,
} from '@phosphor-icons/react';

const INTEREST_ICONS = {
  food: ForkKnife,
  tech: Cpu,
  design: PaintBrush,
  wellness: Leaf,
  fashion: Scissors,
  art: Palette,
  education: BookOpen,
  climate: Plant,
  media: FilmSlate,
  finance: CurrencyDollar,
  hardware: Wrench,
  community: UsersThree,
  music: MusicNote,
  health: Heartbeat,
  travel: Airplane,
  kids: Baby,
};

export const InterestIcon = ({ id, size = 16 }) => {
  const Icon = INTEREST_ICONS[id] || Palette;
  return <Icon size={size} weight="regular" />;
};

const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const HomeIcon = ({ size = 24, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M3.5 11 12 4l8.5 7" />
    <path d="M5 10.5V20h14v-9.5" fill={filled ? 'currentColor' : 'none'} />
  </svg>
);

export const CalendarIcon = ({ size = 24, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <rect x="3.5" y="5" width="17" height="15" rx="2.5" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" />
    <path d="M3.5 9.5h17" />
    <path d="M8 3v4M16 3v4" />
  </svg>
);

export const PlusIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const ChatIcon = ({ size = 24, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M4 6.5C4 5.7 4.7 5 5.5 5h13c.8 0 1.5.7 1.5 1.5v8c0 .8-.7 1.5-1.5 1.5H10l-4 4v-4H5.5C4.7 16 4 15.3 4 14.5v-8Z" fill={filled ? 'currentColor' : 'none'} />
  </svg>
);

export const UserIcon = ({ size = 24, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="8.5" r="3.5" fill={filled ? 'currentColor' : 'none'} />
    <path d="M5 19c.8-3.5 3.7-5.5 7-5.5s6.2 2 7 5.5" />
  </svg>
);

export const ChevronLeft = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M14 6l-6 6 6 6" />
  </svg>
);

export const ChevronRight = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M10 6l6 6-6 6" />
  </svg>
);

export const X = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const BookmarkIcon = ({ size = 22, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M6.5 4h11v17l-5.5-3.5L6.5 21V4Z" fill={filled ? 'currentColor' : 'none'} />
  </svg>
);

export const SparkIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8" />
  </svg>
);

export const HeartIcon = ({ size = 18, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M12 20s-7-4.3-7-9.5C5 8 7 6 9.5 6c1.5 0 2.7.8 3.5 2 .8-1.2 2-2 3.5-2C19 6 21 8 21 10.5 21 15.7 14 20 14 20l-1 1-1-1Z" fill={filled ? 'currentColor' : 'none'} />
  </svg>
);

export const StarIcon = ({ size = 18, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="m12 4 2.4 5 5.6.8-4 4 1 5.6L12 16.8 6.9 19.4l1-5.6-4-4L9.6 9 12 4Z" fill={filled ? 'currentColor' : 'none'} />
  </svg>
);

export const CheckIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="m5 12 4.5 4.5L19 7" />
  </svg>
);

export const SendIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M4 12 20 4l-3 16-4-7-7-1Z" />
  </svg>
);

export const SearchIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <circle cx="11" cy="11" r="6" />
    <path d="m20 20-4.3-4.3" />
  </svg>
);

export const PinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M12 22c5-5.5 7-9 7-12a7 7 0 1 0-14 0c0 3 2 6.5 7 12Z" />
    <circle cx="12" cy="10" r="2.4" />
  </svg>
);

export const ClockIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v4l3 2" />
  </svg>
);

export const GridIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <rect x="4" y="4" width="7" height="7" rx="1.5" />
    <rect x="13" y="4" width="7" height="7" rx="1.5" />
    <rect x="4" y="13" width="7" height="7" rx="1.5" />
    <rect x="13" y="13" width="7" height="7" rx="1.5" />
  </svg>
);

export const FeedIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <rect x="4" y="5" width="16" height="6" rx="1.5" />
    <rect x="4" y="13" width="16" height="6" rx="1.5" />
  </svg>
);

export const SeedIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M12 22c0-5 3-9 8-10-1 5-4 9-8 10Z" />
    <path d="M12 22c0-5-3-9-8-10 1 5 4 9 8 10Z" />
    <path d="M12 22V12" />
  </svg>
);

export const BellIcon = ({ size = 20, filled = false }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <path d="M5.5 10.5a6.5 6.5 0 0 1 13 0v3l2 3H3.5l2-3v-3Z" fill={filled ? 'currentColor' : 'none'} />
    <path d="M10 19.5c.5 1.5 3.5 1.5 4 0" />
  </svg>
);

export const UserPlusIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <circle cx="10" cy="8.5" r="3.5" />
    <path d="M3 19c.8-3.5 3.7-5.5 7-5.5 1.8 0 3.5.6 4.8 1.6" />
    <path d="M19 9v6M16 12h6" />
  </svg>
);

export const UsersIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...stroke}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2 19c.8-3.5 3.5-5.5 7-5.5s6.2 2 7 5.5" />
    <path d="M15.5 5.5a3.5 3.5 0 0 1 0 5" />
    <path d="M18.5 19c-.3-1.5-1-3-2.3-4" />
  </svg>
);

export const SlidersIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h4M10 6h10M4 12h10M16 12h4M4 18h4M10 18h10" />
    <circle cx="8" cy="6" r="2" />
    <circle cx="14" cy="12" r="2" />
    <circle cx="8" cy="18" r="2" />
  </svg>
);

export const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="4" />
    <path fill="var(--bg-elev,#fff)" d="M7 9.5h2.5v8H7zM8.25 8.3a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zM11 9.5h2.4v1.1h.03c.33-.63 1.14-1.3 2.35-1.3 2.52 0 2.98 1.66 2.98 3.81v4.38H16.3v-3.89c0-.93-.02-2.12-1.29-2.12-1.3 0-1.5 1.01-1.5 2.06v3.95H11V9.5z" />
  </svg>
);

export const GitHubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export const BehanceIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <rect x="2" y="2" width="20" height="20" rx="4" />
    <path fill="var(--bg-elev,#fff)" d="M9.3 11.3c.8-.4 1.2-1 1.2-1.9 0-1.7-1.3-2.4-2.8-2.4H4v9h3.9c1.7 0 3.1-.8 3.1-2.7 0-1.1-.6-1.8-1.7-2zm-3.5-2.7h1.6c.6 0 1.1.3 1.1.9 0 .7-.4 1-1.1 1H5.8V8.6zm1.8 5.8H5.8v-2.1h1.9c.8 0 1.3.3 1.3 1.1 0 .7-.6 1-1.4 1zM15.1 9c-2.2 0-3.6 1.5-3.6 3.7 0 2.3 1.3 3.7 3.6 3.7 1.7 0 2.8-.8 3.3-2.4h-1.6c-.2.6-.8.9-1.6.9-1 0-1.7-.6-1.8-1.7h5.1c.1-2.5-1.1-4.2-3.4-4.2zm-1.7 3c.2-.9.7-1.5 1.7-1.5.9 0 1.5.6 1.6 1.5h-3.3zM14.1 7h3.6v1H14.1z" />
  </svg>
);

export const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
  </svg>
);

export const TwitterXIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L2.25 2.25h6.961l4.265 5.633zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const GlobeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);
