// Shared portfolio data — admin overrides read from localStorage first

function getOverride() {
  try {
    const raw = localStorage.getItem('adminPortfolioData')
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

const _ov = getOverride()
const _o = k => (_ov && _ov[k]) ? _ov[k] : null

// ── Defaults ──────────────────────────────────────────────────────────────────

const _PERSONAL = {
  name: 'Sentamilselvan',
  shortName: 'STS',
  title: 'Full Stack Developer',
  subtitle: 'COMPUTER SCIENCE ENGINEERING STUDENT',
  location: 'Dharmapuri, Tamil Nadu, India',
  email: 'sentamilselvan001@gmail.com',
  phone: '+91 XXXXXXXXXX',
  bio: 'Passionate CSE student at Sri Eshwar College of Engineering, focused on Full Stack Development, DSA, and Software Engineering — transforming ideas into real-world applications.',
  tagline: 'Building scalable web applications, solving coding challenges, and continuously learning modern technologies to create impactful digital experiences.',
  available: true,
  resumePath: '/Documents/SENTAMILSELVAN A Resume.pdf',
}

const _SOCIAL_LINKS = [
  { icon: '🐙', label: 'GitHub',     href: 'https://github.com/SentamilselvanA',                              color: '#ffffff' },
  { icon: '💼', label: 'LinkedIn',   href: 'https://www.linkedin.com/in/sentamil-selvan-736760327/',          color: '#0077b5' },
  { icon: '📧', label: 'Email',      href: 'mailto:sentamilselvan001@gmail.com',                               color: '#00f5ff' },
  { icon: '🧩', label: 'LeetCode',   href: 'https://leetcode.com/u/sentamilselvan001/',                       color: '#ffa116' },
  { icon: '👨‍🍳', label: 'CodeChef',  href: 'https://www.codechef.com/users/sentamilselvan',                   color: '#8b5cf6' },
  { icon: '⭐', label: 'HackerRank', href: 'https://www.hackerrank.com/profile/sentamilselvan_2',             color: '#10b981' },
  { icon: '🏆', label: 'SkillRack',  href: 'https://www.skillrack.com/faces/resume.xhtml?id=515071',         color: '#00f5ff' },
]

const _ROLES = [
  'Full Stack Developer',
  'MERN Stack Developer',
  'Problem Solver',
  'Computer Science Student',
  'Tech Enthusiast',
]

const _MILESTONES = [
  { year: '2021–2022', title: 'SSLC — 84.6%',                   desc: 'Completed secondary education at Government High School, Muthanoor with 84.6%, building a strong foundation for higher studies.',                                               icon: '📚', color: '#00f5ff', side: 'left'  },
  { year: '2023–2024', title: 'HSC — 87.6%',                    desc: 'Achieved 87.6% in Higher Secondary Certificate at Government Model School, Dharmapuri, excelling in Science stream.',                                                           icon: '🏫', color: '#8b5cf6', side: 'right' },
  { year: '2024',      title: 'B.E CSE @ Sri Eshwar',           desc: 'Joined Sri Eshwar College of Engineering for B.E Computer Science and Engineering. Currently maintaining a CGPA of 7.83 (till 3rd semester).',                                 icon: '🎓', color: '#ec4899', side: 'left'  },
  { year: '2024',      title: 'Full Stack Development',         desc: 'Mastered the MERN stack — React, Node.js, Express, MongoDB. Built real-world projects including a Skill Gap Analyzer and AlgoVision.',                                         icon: '⚡', color: '#fbbf24', side: 'right' },
  { year: '2024',      title: '200+ LeetCode & 1200+ CodeChef', desc: 'Solved 200+ LeetCode problems and 1200+ CodeChef & SkillRack problems, earning a Diamond Badge and ranking 14849 on SkillRack.',                                              icon: '🧩', color: '#10b981', side: 'left'  },
  { year: 'NOW',       title: 'Preparing For Career',           desc: 'Building impactful products, earning certifications, and seeking opportunities to grow as a software engineer at scale.',                                                        icon: '🎯', color: '#00f5ff', side: 'right' },
]

const _SKILLS = {
  Programming: [
    { name: 'C',          level: 80, icon: '🔵', color: '#a8b9cc', projects: ['DSA Practice', 'Competitive Coding'] },
    { name: 'C++',        level: 82, icon: '➕', color: '#00599c', projects: ['DSA Practice', 'SkillRack'] },
    { name: 'Python',     level: 78, icon: '🐍', color: '#3776ab', projects: ['Battery Fault Prediction', 'Udemy'] },
    { name: 'Java',       level: 80, icon: '☕', color: '#f89820', projects: ['OOP Projects', 'HackerRank'] },
    { name: 'JavaScript', level: 85, icon: '⚡', color: '#f7df1e', projects: ['AlgoVision', 'Skill Gap Analyzer'] },
  ],
  Frontend: [
    { name: 'React.js', level: 85, icon: '⚛️', color: '#61dafb', projects: ['AlgoVision', 'Skill Gap Analyzer'] },
    { name: 'HTML',     level: 95, icon: '🌐', color: '#e34f26', projects: ['All Projects'] },
    { name: 'CSS',      level: 90, icon: '🎨', color: '#1572b6', projects: ['All Projects'] },
    { name: 'Tailwind', level: 85, icon: '💨', color: '#38bdf8', projects: ['Skill Gap Analyzer', 'Portfolio'] },
  ],
  Backend: [
    { name: 'Node.js',    level: 82, icon: '🟩', color: '#339933', projects: ['Skill Gap Analyzer'] },
    { name: 'Express.js', level: 80, icon: '🛤️', color: '#888888', projects: ['REST APIs', 'Skill Gap Analyzer'] },
  ],
  Database: [
    { name: 'MongoDB', level: 78, icon: '🍃', color: '#47a248', projects: ['Skill Gap Analyzer'] },
    { name: 'MySQL',   level: 75, icon: '🐬', color: '#00758f', projects: ['HackerRank SQL', 'Projects'] },
  ],
  Tools: [
    { name: 'Git',     level: 85, icon: '🔀', color: '#f05032', projects: ['All Projects'] },
    { name: 'GitHub',  level: 88, icon: '🐙', color: '#888888', projects: ['All Projects'] },
    { name: 'VS Code', level: 95, icon: '💻', color: '#007acc', projects: ['Daily Driver'] },
    { name: 'Vite',    level: 80, icon: '⚡', color: '#646cff', projects: ['Portfolio', 'React Apps'] },
    { name: 'Canva',   level: 75, icon: '🖌️', color: '#00c4cc', projects: ['Design Work'] },
  ],
}

const _PROJECTS = [
  {
    id: 0, name: 'Battery Fault Prediction', subtitle: 'ML-Powered Predictive System',
    icon: '🔋', color: '#00f5ff', size: 120,
    desc: 'Developed a machine learning-based battery fault prediction system capable of analyzing battery parameters and identifying potential faults before failure. Integrated predictive analytics models with Flask for a user-friendly interface.',
    features: ['Battery parameter analysis', 'Fault prediction before failure', 'Flask web interface', 'ML model integration', 'Real-time analytics'],
    tech: ['Machine Learning', 'Python', 'Flask'],
    challenge: 'Training an accurate predictive model on imbalanced fault data while keeping the Flask API response time under 200ms.',
    github: 'https://github.com/SentamilselvanA', live: '#',
  },
  {
    id: 1, name: 'AlgoVision', subtitle: 'Algorithm Visualizer Platform',
    icon: '📈', color: '#8b5cf6', size: 110,
    desc: 'Built an interactive educational platform to visualize data structures and algorithms through real-time animations and step-by-step execution. Implemented sorting and searching visualizations with dynamic code highlighting for better learning.',
    features: ['Sorting algorithm visualizations', 'Searching algorithm animations', 'Step-by-step execution', 'Dynamic code highlighting', 'Speed control'],
    tech: ['React.js', 'JavaScript', 'CSS3'],
    challenge: 'Synchronizing animation frames with algorithm state transitions to ensure visualizations remain accurate at all speeds.',
    github: 'https://github.com/SentamilselvanA', live: '#',
  },
  {
    id: 2, name: 'Skill Gap Analyzer', subtitle: 'MERN Stack Career Tool',
    icon: '🧭', color: '#ec4899', size: 115,
    desc: "Developed a MERN stack application that analyzes users' technical skills and recommends personalized learning paths. Implemented authentication, dashboards, responsive UI, and REST APIs.",
    features: ['Skill gap analysis', 'Personalized learning paths', 'JWT authentication', 'Interactive dashboard', 'REST APIs', 'Responsive UI'],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js'],
    challenge: 'Designing a recommendation algorithm that maps user skill levels to relevant learning resources with meaningful gap analysis.',
    github: 'https://github.com/SentamilselvanA', live: '#',
  },
]

const _CODING_STATS = {
  quick: [
    { label: 'LeetCode',       value: 200,   icon: '🧩', color: '#ffa116', suffix: '+' },
    { label: 'CodeChef',       value: 1200,  icon: '👨‍🍳', color: '#8b5cf6', suffix: '+' },
    { label: 'SkillRack',      value: 1200,  icon: '🏆', color: '#00f5ff', suffix: '+' },
    { label: 'SkillRack Rank', value: 14849, icon: '📊', color: '#ec4899', prefix: '#' },
  ],
  platforms: [
    {
      platform: 'LeetCode', icon: '🧩', color: '#ffa116',
      stats: [{ label: 'Problems Solved', value: 200, suffix: '+' }],
      bars: [['Arrays & Strings', 80], ['Dynamic Programming', 60], ['Trees & Graphs', 65]],
      link: 'https://leetcode.com/u/sentamilselvan001/',
    },
    {
      platform: 'CodeChef', icon: '👨‍🍳', color: '#8b5cf6',
      stats: [{ label: 'Problems Solved', value: 1200, suffix: '+' }],
      bars: [['Basic Programming', 95], ['Data Structures', 80], ['Algorithms', 75]],
      link: 'https://www.codechef.com/users/sentamilselvan',
    },
    {
      platform: 'SkillRack', icon: '🏆', color: '#00f5ff',
      stats: [{ label: 'Problems Solved', value: 1200, suffix: '+' }, { label: 'Certificates', value: 15, suffix: '+' }],
      bars: [['C Programming', 90], ['Java', 80], ['Python', 78]],
      link: 'https://www.skillrack.com/faces/resume.xhtml?id=515071',
    },
    {
      platform: 'HackerRank', icon: '⭐', color: '#10b981',
      stats: [], bars: [], langBadges: true,
      link: 'https://www.hackerrank.com/profile/sentamilselvan_2',
    },
    {
      platform: 'GitHub', icon: '🐙', color: '#6e40c9',
      stats: [{ label: 'Repositories', value: 10, suffix: '+' }],
      bars: [['JavaScript', 70], ['Python', 20], ['Other', 10]],
      link: 'https://github.com/SentamilselvanA',
    },
  ],
}

const _ACHIEVEMENTS = [
  { icon: '🥇', title: 'SQL Basic Certification',        org: 'HackerRank', year: '2024', color: '#10b981', type: 'cert',        link: '#' },
  { icon: '🥈', title: 'SQL Intermediate Certification', org: 'HackerRank', year: '2024', color: '#10b981', type: 'cert',        link: '#' },
  { icon: '🥉', title: 'SQL Advanced Certification',     org: 'HackerRank', year: '2024', color: '#10b981', type: 'cert',        link: '#' },
  { icon: '📚', title: 'Mastering DSA with C & C++',     org: 'Udemy',      year: '2024', color: '#fbbf24', type: 'cert',        link: '#' },
  { icon: '🐍', title: 'Python for Complete Beginners',  org: 'Udemy',      year: '2024', color: '#3776ab', type: 'cert',        link: '#' },
  { icon: '☕', title: 'Java for Beginners',             org: 'Udemy',      year: '2024', color: '#f89820', type: 'cert',        link: '#' },
  { icon: '🧩', title: '200+ LeetCode Solved',           org: 'LeetCode',   year: '2024', color: '#ffa116', type: 'achievement', link: 'https://leetcode.com/u/sentamilselvan001/' },
  { icon: '🏆', title: '1200+ SkillRack Problems',       org: 'SkillRack',  year: '2024', color: '#00f5ff', type: 'achievement', link: 'https://www.skillrack.com/faces/resume.xhtml?id=515071' },
]

const _INTERNSHIP = {
  role: 'Full Stack Development Intern',
  company: 'MERN Stack Technologies',
  period: '2024',
  description: 'Completed an intensive full-stack development internship focused on building production-ready web applications using the MERN stack. Gained hands-on experience in frontend architecture, backend development, database design, and cloud deployment.',
  learningAreas: [
    { title: 'Frontend Architecture', desc: 'React.js component design, state management, responsive UI with Tailwind CSS', icon: '⚛️' },
    { title: 'Backend & Security',    desc: 'Node.js, Express.js REST APIs, JWT authentication, middleware patterns',        icon: '🔒' },
    { title: 'Database & REST APIs',  desc: 'MongoDB schema design, Mongoose ODM, RESTful API best practices',              icon: '🗄️' },
    { title: 'Cloud & DevOps',        desc: 'Git version control, GitHub workflows, deployment strategies',                  icon: '☁️' },
  ],
  certificateLink: '#',
}

// ── Exports (admin override → default) ───────────────────────────────────────

export const PERSONAL     = _o('personal')     || _PERSONAL
export const SOCIAL_LINKS = _o('social')       || _SOCIAL_LINKS
export const ROLES        = _o('roles')        || _ROLES
export const MILESTONES   = _o('milestones')   || _MILESTONES
export const SKILLS       = _o('skills')       || _SKILLS
export const PROJECTS     = _o('projects')     || _PROJECTS
export const CODING_STATS = _o('coding')       || _CODING_STATS
export const ACHIEVEMENTS = _o('achievements') || _ACHIEVEMENTS
export const INTERNSHIP   = _o('internship')   || _INTERNSHIP
