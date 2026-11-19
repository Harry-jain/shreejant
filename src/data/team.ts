export type Member = {
  id: 'ankit' | 'harsh' | 'akshay';
  name: string;                       // never translated
  initials: string;                   // 'AV', 'HJ', 'AJ'
  roleKey: string;                    // existing role title
  bioKey: string;                     // existing bio text
  skills: string[];                   // Latin-script tech names, never translated
  photo: null | { src: string; width: number; height: number };
  linkedin: null | string;            // keep the URLs that exist today
  github: null | string;
  featured?: boolean;
  character: 'architect' | 'robot' | 'designer';
  panelColor: 'slate' | 'brightGold' | 'goldTint';
  askMe: string | null;      // owner-written; null = use first skill
  sideQuest: string | null;  // owner-written, for example a hobby; null = hidden. NEVER invent.
};

// Photos: put square 800x800 portraits in /public/team/<id>.jpg (same crop and lighting, plain background), then set photo. Until then a playful character is shown.
// TODO(owner): write a short, true side quest for each person (a hobby or a funny habit).
export const MEMBERS: Member[] = [
  {
    id: 'akshay',
    name: 'Akshay Jankar',
    initials: 'AJ',
    roleKey: 'Founder & AI/Web Developer',
    bioKey: 'Electronics & Computer Science graduate turning ambitious ideas into actual digital products. From building AI-powered applications to high-performance websites and intelligent automations, he makes technology solve real business problems.',
    skills: ['AI Development', 'Next.js 15', 'Python', 'Automation', 'Three.js'],
    photo: null,
    linkedin: 'https://linkedin.com',
    github: 'https://github.com/Akshayjankar',
    featured: true,
    character: 'designer',
    panelColor: 'goldTint',
    askMe: 'Turning caffeine-free ideas into caffeine-worthy code',
    sideQuest: '"I have one more feature idea."',
  },
  {
    id: 'ankit',
    name: 'Ankit Vishwakarma',
    initials: 'AV',
    roleKey: 'Founder & Security Architect',
    bioKey: 'Resident security enthusiast and vulnerability hunter. Poking around websites with Burp Suite and hardened testing tools to make sure digital doors are never accidentally left wide open.',
    skills: ['Cybersecurity', 'Burp Suite', 'Web Penetration Testing', 'Security Architecture'],
    photo: null,
    linkedin: 'https://linkedin.com',
    github: 'https://github.com',
    character: 'architect',
    panelColor: 'slate',
    askMe: 'Finding problems before they find you',
    sideQuest: 'Probably a website that says "Access Denied."',
  },
  {
    id: 'harsh',
    name: 'Harsh Jain',
    initials: 'HJ',
    roleKey: 'Co-Founder & Head of AI Systems',
    bioKey: 'Software engineer building local-first AI, browser-native LLMs, WebGPU inference, and real-time voice translation. Helping keep exchange-grade systems running at NSE by day; shipping side projects and hackathon wins by night.',
    skills: ['WebGPU & WebLLM', 'Rust', 'TypeScript', 'Vector DBs', 'Low-Latency Systems'],
    photo: null,
    linkedin: 'https://linkedin.com',
    github: 'https://github.com/Harry-jain',
    character: 'robot',
    panelColor: 'brightGold',
    askMe: 'Making AI work without asking the cloud for permission',
    sideQuest: 'One more side project. Just one. (Probably not.)',
  },
];

// Alias for backwards compatibility if needed
export type TeamMember = Member;
export const TEAM_MEMBERS = MEMBERS;
