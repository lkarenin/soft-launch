// Placeholder data for Foretold prototype

// Resolve any /public asset path so it works whether the app is served from
// the domain root (Vercel, Netlify, local dev) or a subpath (GitHub Pages).
const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\//, '')}`;

export const COVER_IMAGES = [
  asset('covers/cover-1.png'),
  asset('covers/cover-2.png'),
  asset('covers/cover-3.png'),
  asset('covers/cover-4.png'),
  asset('covers/cover-5.png'),
  asset('covers/cover-6.png'),
  asset('covers/cover-7.png'),
];

export const INTERESTS = [
  { id: 'food', label: 'Food & Drink' },
  { id: 'tech', label: 'Tech' },
  { id: 'design', label: 'Design' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'fashion', label: 'Fashion' },
  { id: 'art', label: 'Art' },
  { id: 'education', label: 'Education' },
  { id: 'climate', label: 'Climate' },
  { id: 'media', label: 'Media' },
  { id: 'finance', label: 'Finance' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'community', label: 'Community' },
  { id: 'music', label: 'Music' },
  { id: 'health', label: 'Health' },
  { id: 'travel', label: 'Travel' },
  { id: 'kids', label: 'Kids' },
];

export const BACKGROUNDS = [
  'Student',
  'Working a 9–5',
  'Freelancer',
  'Stay-at-home parent',
  'Between jobs',
  'Retired / changing careers',
  'Already side-projecting',
];

// Questions reviewers rank 1–5 on the feedback form. The final project
// rating is a weighted average — weights sum to 1.
export const RATING_QUESTIONS = [
  { key: 'success',     label: 'Success potential', help: 'Could this realistically win in its market?',     weight: 0.35 },
  { key: 'uniqueness',  label: 'Uniqueness',        help: 'Is the angle fresh vs. what exists today?',       weight: 0.25 },
  { key: 'feasibility', label: 'Feasibility',       help: 'Can the team plausibly build and ship this?',     weight: 0.25 },
  { key: 'clarity',     label: 'Clarity of idea',   help: 'Is the problem and solution well articulated?',   weight: 0.15 },
];

// Editorial / community badges. At most one applies to a project at a time.
export const PROJECT_BADGES = {
  'users-favorite': { label: "Users' Favorite", tone: 'rose' },
  'popular-week':   { label: 'Popular this Week', tone: 'amber' },
  'staff-pick':     { label: 'Foretold Staff Pick', tone: 'plum' },
};

export const PROJECTS = [
  {
    id: 'p1',
    author: 'Maya Chen',
    location: 'Brooklyn, NY',
    avatarSeed: 'maya',
    title: 'Sprout',
    tagline: 'A neighborhood plant-swap app for people who keep accidentally turning their windowsills into jungles.',
    cover: '#131F11',
    coverImage: asset('covers/cover-2.png'),
    karma: 312,
    feedbackCount: 47,
    rating: 4.6, ratingCount: 38, badge: 'users-favorite',
    interest: 'wellness',
    sections: [
      { label: 'The idea', body: 'A super lightweight app for trading plant cuttings with neighbors. Post what you have, what you want, meet up at a coffee shop, swap. No money, just trust and shared dirt.' },
      { label: 'Who it\'s for', body: 'Apartment plant people in their 20s–30s who don\'t want to spend $40 at a plant store every time they see something new on TikTok.' },
      { label: 'How it works', body: 'You list cuttings you can offer. Browse cuttings nearby. Send a swap request, agree on a meetup, trade. Both rate each other after.' },
      { label: 'Where I\'m stuck', body: 'I can\'t tell if people will actually meet strangers for this, or if it stays a "would be nice" idea. Need to know if the trust thing breaks it.' },
    ],
  },
  {
    id: 'p2',
    author: 'Theo Adebayo',
    location: 'Oakland, CA',
    avatarSeed: 'theo',
    title: 'Slow Sundays',
    tagline: 'A weekly newsletter that helps you plan a low-effort, joyful Sunday - like a friend who already did the research.',
    cover: '#211908',
    coverImage: asset('covers/cover-3.png'),
    karma: 198,
    feedbackCount: 31,
    rating: 4.1, ratingCount: 24,
    interest: 'media',
    sections: [
      { label: 'The idea', body: 'A short Sunday-morning email. Three things to do, eat, or watch - chosen to feel restful, not productive. Pay what you want.' },
      { label: 'Why now', body: 'Everyone\'s anti-hustle but the actual "rest" feeds are still kind of stressful (perfect picnics, choreographed mornings). I want a smaller voice.' },
      { label: 'What I\'ve done', body: 'Wrote three issues, sent to 12 friends. 9 forwarded it. The forward rate is what made me think there\'s something here.' },
    ],
  },
  {
    id: 'p3',
    author: 'Priya Raman',
    location: 'Austin, TX',
    avatarSeed: 'priya',
    title: 'Quietly',
    tagline: 'A library of "first day on the job" guides written by the people who actually started.',
    cover: '#0D1821',
    coverImage: asset('covers/cover-4.png'),
    karma: 421,
    feedbackCount: 62,
    rating: 4.8, ratingCount: 51, badge: 'staff-pick',
    interest: 'education',
    sections: [
      { label: 'The idea', body: 'Short, honest guides for the first 30 days in a new role - written by someone who just lived through it. Like Glassdoor reviews, but useful.' },
      { label: 'Where I am', body: 'I have 14 guides written. Trying to figure out if this should be free, ad-supported, or paid by employers who want a softer landing for new hires.' },
    ],
  },
  {
    id: 'p4',
    author: 'Sam Whitford',
    location: 'Portland, OR',
    avatarSeed: 'sam',
    title: 'Rivet',
    tagline: 'A tiny tool that makes it dead simple to repair small things at home - repair guides, parts, and a person on chat if you get stuck.',
    cover: '#1E1008',
    coverImage: asset('covers/cover-5.png'),
    karma: 144,
    feedbackCount: 19,
    rating: 3.7, ratingCount: 15,
    interest: 'hardware',
    sections: [
      { label: 'The idea', body: 'You photograph the broken thing, we identify it, ship the part, and walk you through fixing it. Step one is just zippers, lamps, and chair legs.' },
      { label: 'The big bet', body: 'People want to fix more things, but the friction is "I don\'t know what it\'s called." Solve that and a lot more gets repaired.' },
    ],
  },
  {
    id: 'p5',
    author: 'Lila Romero',
    location: 'Chicago, IL',
    avatarSeed: 'lila',
    title: 'Kindred Kitchens',
    tagline: 'Pop-up dinners hosted by home cooks from immigrant families - share a meal, share a story.',
    cover: '#1B0F20',
    coverImage: asset('covers/cover-6.png'),
    karma: 268,
    feedbackCount: 38,
    rating: 4.4, ratingCount: 30, badge: 'popular-week',
    interest: 'food',
    sections: [
      { label: 'The idea', body: 'A monthly dinner in someone\'s home. The cook gets paid, the guests get a meal and a story they couldn\'t have anywhere else.' },
    ],
  },
  {
    id: 'p6',
    author: 'Owen Tanaka',
    location: 'Seattle, WA',
    avatarSeed: 'owen',
    title: 'Threadwell',
    tagline: 'Repair-first clothing brand - every piece comes with a free lifetime repair credit.',
    cover: '#1F120D',
    coverImage: asset('covers/cover-7.png'),
    karma: 89,
    feedbackCount: 12,
    rating: 3.4, ratingCount: 9,
    interest: 'fashion',
    sections: [
      { label: 'The idea', body: 'Two basics to start: a chore coat and a tee. Each one ships with a repair credit so you bring it back instead of throwing it away.' },
    ],
  },
];

export const EVENT_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'social', label: 'Social' },
  { id: 'talk', label: 'Talk' },
  { id: 'hands-on', label: 'Hands-on' },
];

export const EVENTS = [
  {
    id: 'e1',
    title: 'Brooklyn Maker Mixer',
    date: 'Fri, May 23',
    day: 23,
    month: 'May',
    weekday: 'Fri',
    time: '6:00 PM',
    host: 'Hatch House',
    hostSeeds: ['ada', 'theo'],
    location: 'Williamsburg, NY',
    category: 'social',
    cover: '#1F120D',
    coverImage: asset('covers/event-1.png'),
    going: 84,
    blurb: 'A loose, low-pressure evening for people building something small. Snacks, name tags optional, no pitching allowed.',
    questions: [
      'What are you working on right now?',
      'What do you hope to get out of this event?',
    ],
  },
  {
    id: 'e2',
    title: 'First Customer Workshop',
    date: 'Sat, May 24',
    day: 24,
    month: 'May',
    weekday: 'Sat',
    time: '10:00 AM',
    host: 'Foretold x Common Room',
    hostSeeds: ['maya', 'jules'],
    location: 'Online',
    category: 'workshop',
    cover: '#131F11',
    coverImage: asset('covers/event-2.png'),
    going: 212,
    blurb: 'Three hours, three exercises. You leave with a plan for finding your first ten customers.',
    questions: [
      'What are you planning to make?',
      'What\'s been the hardest part so far?',
    ],
  },
  {
    id: 'e3',
    title: 'Clay-making for Beginners',
    date: 'Sun, May 25',
    day: 25,
    month: 'May',
    weekday: 'Sun',
    time: '11:00 AM',
    host: 'Slow Sundays',
    hostSeeds: ['noor'],
    location: 'Prospect Park, NY',
    category: 'hands-on',
    cover: '#211908',
    coverImage: asset('covers/event-3.png'),
    going: 23,
    blurb: 'Get your hands dirty. We\'ll provide the clay, tools, and a two-hour guided session for total beginners.',
    questions: [
      'Have you worked with clay before?',
      'What interests you about making things by hand?',
    ],
  },
  {
    id: 'e4',
    title: 'Design Thinking Talk',
    date: 'Wed, May 28',
    day: 28,
    month: 'May',
    weekday: 'Wed',
    time: '5:00 PM',
    host: 'Quietly',
    hostSeeds: ['priya', 'owen'],
    location: 'Williamsburg, NY',
    category: 'talk',
    cover: '#0D1821',
    coverImage: asset('covers/event-4.png'),
    going: 56,
    blurb: 'A one-hour talk on how to think through problems like a designer. Open Q&A after.',
    questions: [
      'What interests you about design thinking?',
      'What problem are you trying to solve right now?',
    ],
  },
  {
    id: 'e5',
    title: 'Pitch Practice (Soft Mode)',
    date: 'Thu, May 29',
    day: 29,
    month: 'May',
    weekday: 'Thu',
    time: '7:00 PM',
    host: 'Quietly',
    hostSeeds: ['priya'],
    location: 'Online',
    category: 'workshop',
    cover: '#1B0F20',
    coverImage: asset('covers/event-1.png'),
    going: 41,
    blurb: 'Tell five strangers what you\'re working on. They\'ll listen, nod, and ask one good question each.',
    questions: [
      'What will you be pitching?',
    ],
  },
];

export const FEEDBACK_RECEIVED = [
  {
    id: 'fr1',
    from: 'R.J. Carter',
    avatarSeed: 'rj',
    project: 'Sprout',
    excerpt: 'The trust piece is huge - what if you required a buddy-introduction for the first swap? Like a referral chain instead of strangers cold.',
    quality: 'helpful',
    rating: null,
    timeAgo: '2d',
    karmaAwarded: null,
  },
  {
    id: 'fr2',
    from: 'Yuki Kobayashi',
    avatarSeed: 'yuki',
    project: 'Sprout',
    excerpt: 'I\'d use this. But I\'d only use it if I could see the other person\'s past swaps. Reputation > trust.',
    quality: 'helpful',
    rating: 5,
    timeAgo: '5d',
    karmaAwarded: 8,
  },
  {
    id: 'fr3',
    from: 'Dana Liu',
    avatarSeed: 'dana',
    project: 'Sprout',
    excerpt: 'Cool idea! Looks great!',
    quality: 'thin',
    rating: 2,
    timeAgo: '1w',
    karmaAwarded: 1,
  },
];

export const FEEDBACK_GIVEN = [
  {
    id: 'fg1',
    to: 'Theo Adebayo',
    avatarSeed: 'theo',
    project: 'Slow Sundays',
    excerpt: 'The forward rate is a real signal. Before pay-what-you-want, I\'d try a $3 paid tier and see what people pick - it tells you something different.',
    karmaEarned: 12,
    timeAgo: '3d',
  },
  {
    id: 'fg2',
    to: 'Priya Raman',
    avatarSeed: 'priya',
    project: 'Quietly',
    excerpt: 'I\'d split the audience first. New hires pay nothing. Employers pay. The product looks different for each - don\'t try to be both at once.',
    karmaEarned: 18,
    timeAgo: '1w',
  },
  {
    id: 'fg3',
    to: 'Sam Whitford',
    avatarSeed: 'sam',
    project: 'Rivet',
    excerpt: '"I don\'t know what it\'s called" is such a sharp insight. Start there - a photo-identifier alone might be the whole MVP.',
    karmaEarned: 22,
    timeAgo: '2w',
  },
];

export const SAVED = ['p3', 'p4', 'p5'];

export const CHATS = [
  {
    id: 'c1',
    name: 'Jules Park',
    avatarSeed: 'jules',
    matchPercent: 92,
    eventTitle: 'Brooklyn Maker Mixer',
    preview: 'Sounds good - I\'ll bring the deck. See you at 6?',
    timeAgo: '2m',
    unread: true,
    messages: [
      { from: 'them', body: 'Hey! Excited to meet at the mixer on Friday 👋', time: 'Wed 4:21 PM' },
      { from: 'me', body: 'Same! Where do you want to meet up?', time: 'Wed 4:34 PM' },
      { from: 'them', body: 'I was thinking the coffee place across the street like 15 min before? Could help with deck-jitters lol', time: 'Wed 4:36 PM' },
      { from: 'me', body: 'Yes please. I get there early and just spiral otherwise', time: 'Wed 4:40 PM' },
      { from: 'them', body: 'Sounds good - I\'ll bring the deck. See you at 6?', time: '2m' },
    ],
  },
  {
    id: 'c2',
    name: 'Maya Chen',
    avatarSeed: 'maya',
    matchPercent: null,
    eventTitle: null,
    preview: 'Thank you for the feedback on Sprout - totally changed how I\'m thinking about onboarding.',
    timeAgo: '1h',
    unread: false,
    messages: [
      { from: 'them', body: 'Hey - saw your note on the trust thing. That referral-chain idea is really good.', time: 'Yesterday' },
      { from: 'me', body: 'Glad! I think it solves the cold-start without making it feel gated.', time: 'Yesterday' },
      { from: 'them', body: 'Thank you for the feedback on Sprout - totally changed how I\'m thinking about onboarding.', time: '1h' },
    ],
  },
  {
    id: 'c3',
    name: 'Workshop crew',
    avatarSeed: 'group',
    matchPercent: null,
    eventTitle: 'First Customer Workshop',
    preview: 'Casey: did anyone take notes from the second exercise?',
    timeAgo: '3h',
    unread: false,
    messages: [
      { from: 'them', body: 'Casey: did anyone take notes from the second exercise?', time: '3h' },
    ],
  },
];

export const PERSONALITY_QUESTIONS = [
  {
    q: 'At an event with strangers, you usually:',
    options: [
      'Find one person and have a real conversation',
      'Float around, meet a lot of people lightly',
      'Hang back, observe, then warm up',
      'Bring a friend so I\'m never alone in it',
    ],
  },
  {
    q: 'Your ideal Saturday includes:',
    options: [
      'A long walk and an unfinished book',
      'A small group dinner with friends',
      'A workshop or class - learning something with my hands',
      'A market, a cafe, and zero plans',
    ],
  },
  {
    q: 'When someone shares an idea with you, you tend to:',
    options: [
      'Ask the obvious "wait, but who is this for?" question',
      'Get excited and start brainstorming with them',
      'Quietly take notes and follow up later',
      'Connect them to three other people I know',
    ],
  },
  {
    q: 'Your biggest "before I commit" worry is usually:',
    options: [
      'I\'ll waste time on the wrong thing',
      'No one will actually want it',
      'I\'ll have to do it alone',
      'I\'ll start and not finish',
    ],
  },
];

export const POTENTIAL_BUDDIES = [
  { id: 'b1', name: 'Jules Park', avatarSeed: 'jules', percent: 92, bio: '27 · entrepreneur · loves trains, running, and AI tech!', shared: ['Hardware', 'First time at an event'] },
  { id: 'b2', name: 'Noor Haddad', avatarSeed: 'noor', percent: 85, bio: '31 · designer turning a side project into a thing.', shared: ['Design', 'Brooklyn'] },
  { id: 'b3', name: 'Ren Ito', avatarSeed: 'ren', percent: 61, bio: '24 · student · here to see what this is even about.', shared: ['First time at an event'] },
];

export const USERS = [
  {
    seed: 'maya', name: 'Maya Chen', handle: '@mayachen',
    location: 'Brooklyn, NY', joinedAgo: '3 months ago',
    bio: 'Building Sprout — a neighborhood plant-swap app. Former UX designer gone full founder.',
    interests: ['wellness', 'community'], karma: 312,
    socials: { linkedin: 'mayachen', instagram: 'mayachen.makes', behance: 'mayachen' },
  },
  {
    seed: 'theo', name: 'Theo Adebayo', handle: '@theoa',
    location: 'Oakland, CA', joinedAgo: '5 months ago',
    bio: 'Writing Slow Sundays. Believer in rest as a creative act.',
    interests: ['media'], karma: 198,
    socials: { twitter: 'theoadebayo', instagram: 'slowsundaysbytheo' },
  },
  {
    seed: 'priya', name: 'Priya Raman', handle: '@priyar',
    location: 'Austin, TX', joinedAgo: '4 months ago',
    bio: 'Documenting the first 30 days at every new job. Building Quietly.',
    interests: ['education'], karma: 421,
    socials: { linkedin: 'priyaraman', twitter: 'priyar', website: 'priyaraman.com' },
  },
  {
    seed: 'sam', name: 'Sam Whitford', handle: '@samwhit',
    location: 'Portland, OR', joinedAgo: '2 months ago',
    bio: 'Hardware tinkerer. Convinced people want to fix more things if you remove the friction.',
    interests: ['hardware'], karma: 144,
    socials: { github: 'samwhit', twitter: 'samwhitford' },
  },
  {
    seed: 'lila', name: 'Lila Romero', handle: '@lilaromero',
    location: 'Chicago, IL', joinedAgo: '6 months ago',
    bio: 'Home cook and community builder. Running Kindred Kitchens pop-ups.',
    interests: ['food', 'community'], karma: 268,
    socials: { instagram: 'kindredkitchens', linkedin: 'lilaromero' },
  },
  {
    seed: 'owen', name: 'Owen Tanaka', handle: '@owent',
    location: 'Seattle, WA', joinedAgo: '1 month ago',
    bio: 'Making clothes that last. Threadwell is a repair-first brand in progress.',
    interests: ['fashion'], karma: 89,
    socials: { instagram: 'threadwell.co', behance: 'owentanaka' },
  },
  {
    seed: 'jules', name: 'Jules Park', handle: '@julesp',
    location: 'New York, NY', joinedAgo: '7 months ago',
    bio: '27 · Entrepreneur exploring AI + hardware. Train enthusiast.',
    interests: ['tech', 'hardware'], karma: 445,
    socials: { twitter: 'julespark', github: 'julesp', linkedin: 'julespark', website: 'julespark.io' },
  },
  {
    seed: 'noor', name: 'Noor Haddad', handle: '@noorh',
    location: 'Brooklyn, NY', joinedAgo: '4 months ago',
    bio: 'Designer turning a side project into something real. Love functional beauty.',
    interests: ['design'], karma: 289,
    socials: { behance: 'noorhaddad', instagram: 'noor.designs', linkedin: 'noorhaddad' },
  },
  {
    seed: 'ren', name: 'Ren Ito', handle: '@renito',
    location: 'New York, NY', joinedAgo: '2 weeks ago',
    bio: 'Student. Here to figure out what I actually want to build.',
    interests: ['tech'], karma: 52,
    socials: { github: 'renito' },
  },
  {
    seed: 'rj', name: 'R.J. Carter', handle: '@rjcarter',
    location: 'Chicago, IL', joinedAgo: '3 months ago',
    bio: 'Product thinker. Good at spotting trust problems before they become user problems.',
    interests: ['tech', 'community'], karma: 187,
    socials: { linkedin: 'rjcarter', twitter: 'rjcarter' },
  },
  {
    seed: 'yuki', name: 'Yuki Kobayashi', handle: '@yukik',
    location: 'San Francisco, CA', joinedAgo: '5 months ago',
    bio: 'Ex-PM. Building in public. Reputation systems nerd.',
    interests: ['tech'], karma: 302,
    socials: { twitter: 'yukikob', linkedin: 'yukikobayashi', website: 'yuki.build' },
  },
  {
    seed: 'dana', name: 'Dana Liu', handle: '@danaliu',
    location: 'New York, NY', joinedAgo: '2 months ago',
    bio: 'Visual storyteller. Always trying new tools.',
    interests: ['design', 'media'], karma: 96,
    socials: { instagram: 'danaliu.vis', behance: 'danaliu' },
  },
];

export const INITIAL_FRIEND_REQUESTS = [
  { seed: 'noor', name: 'Noor Haddad', timeAgo: '2h', message: 'Loved your feedback on Sprout — would love to connect!' },
  { seed: 'rj', name: 'R.J. Carter', timeAgo: '1d', message: null },
];

// Karma starting state for the prototype user
export const INITIAL_USER = {
  name: 'You',
  avatarSeed: 'you',
  karma: 1247,
  // Reach & engagement stats shown on the profile card.
  // - views: total unique users who opened any of the user's projects
  // - impressions: times the user's projects appeared in someone's feed
  // - feedbackReceived: total feedback comments left across all of the user's projects
  views: 1842,
  impressions: 12480,
  feedbackReceived: 9,
  socials: { linkedin: '', github: '', behance: '', instagram: '', twitter: '', website: '' },
};
