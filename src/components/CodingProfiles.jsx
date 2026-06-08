import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function Counter({ target, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (ts) => {
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

function ContributionGrid() {
  const weeks = 26,
    days = 7;
  const grid = Array.from({ length: weeks }, () =>
    Array.from({ length: days }, () => Math.random()),
  );
  const getColor = (v) => {
    if (v < 0.2) return "rgba(0,245,255,0.05)";
    if (v < 0.4) return "rgba(0,245,255,0.2)";
    if (v < 0.6) return "rgba(0,245,255,0.45)";
    if (v < 0.8) return "rgba(0,245,255,0.7)";
    return "#00f5ff";
  };
  return (
    <div
      className="flex gap-1 overflow-x-auto pb-1"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {grid.map((week, wi) => (
        <div key={wi} className="flex flex-col gap-1 flex-shrink-0">
          {week.map((val, di) => (
            <motion.div
              key={di}
              className="rounded-sm"
              style={{ width: 10, height: 10, background: getColor(val) }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: wi * 0.015 + di * 0.008, duration: 0.25 }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

const CPP_SVG = (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 28, height: 28 }}
  >
    <path d="M16 2L2 9.5v13L16 30l14-7.5v-13L16 2z" fill="#00599c" />
    <text
      x="16"
      y="21"
      textAnchor="middle"
      fill="white"
      fontSize="10"
      fontWeight="bold"
      fontFamily="monospace"
    >
      C++
    </text>
  </svg>
);
const C_SVG = (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 28, height: 28 }}
  >
    <path d="M16 2L2 9.5v13L16 30l14-7.5v-13L16 2z" fill="#555" />
    <text
      x="16"
      y="21"
      textAnchor="middle"
      fill="#a8b9cc"
      fontSize="13"
      fontWeight="bold"
      fontFamily="monospace"
    >
      C
    </text>
  </svg>
);
const PY_SVG = (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 28, height: 28 }}
  >
    <path
  d="M16 3c-3.5 0-5.8 1.5-5.8 1.5L10 8h6v1H7.5S5 9.2 5 13.5c0 4.4 2.4 4.2 2.4 4.2H9.5V15.5s-.1-2.4 2.4-2.4h4.1s2.3.04 2.3-2.2V5.3S18.1 3 16 3zm-1.5 1.5a.9.9 0 110 1.8.9.9 0 010-1.8z"
  fill="#3776ab"
  transform="translate(0,2)"
/>

<path
  d="M16 29c3.5 0 5.8-1.5 5.8-1.5L22 24h-6v-1h8.5s2.5-.2 2.5-4.5c0-4.4-2.4-4.2-2.4-4.2H22.5V16.5s.1 2.4-2.4 2.4h-4.1s-2.3-.04-2.3 2.2v4.6S13.9 29 16 29zm1.5-1.5a.9.9 0 110-1.8.9.9 0 010 1.8z"
  fill="#ffd43b"
  transform="translate(0,-2)"
/>
  </svg>
);
const JAVA_SVG = (
  <svg
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 28, height: 28 }}
  >
    <path
      d="M12.2 22.5s-1.1.6.8.8c2.3.3 3.5.2 6-.2 0 0 .7.4 1.6.8-5.6 2.4-12.7-.1-8.4-1.4z"
      fill="#f89820"
    />
    <path
      d="M11.5 19.5s-1.2.9.7 1.1c2.5.3 4.5.3 7.9-.4 0 0 .5.5 1.2.8-7 2-14.7.2-9.8-1.5z"
      fill="#f89820"
    />
    <path
      d="M17.3 13.5c1.4 1.6-.4 3.1-.4 3.1s3.6-1.9 1.9-4.2c-1.5-2.1-2.7-3.2 3.7-6.8 0 0-10 2.5-5.2 7.9z"
      fill="#f89820"
    />
    <path
      d="M23.8 24.8s.8.7-.9 1.2c-3.3 1-13.6 1.3-16.5.04-1-.4.9-1 1.5-1.1.6-.1 1-.1 1-.1-1.2-.8-7.6 1.6-3.3 2.3 11.8 1.9 21.5-.9 18.2-2.3z"
      fill="#f89820"
    />
    <path
      d="M12.8 16.4s-5.5 1.3-1.9 1.8c1.5.2 4.4.1 7.2-.1 2.2-.2 4.5-.5 4.5-.5s-.8.3-1.4.7c-5.5 1.4-16.1.8-13.1-.7 2.6-1.3 4.7-1.2 4.7-1.2z"
      fill="#f89820"
    />
    <path
      d="M19 3s3.1 3.1-3 7.9c-5 3.9-1.1 6.2 0 8.7-2.9-2.6-5-4.9-3.6-7C14.2 9.6 20.5 8 19 3z"
      fill="#f89820"
    />
  </svg>
);
const SQL_SVG = (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 28, height: 28 }}
  >
    <ellipse cx="16" cy="9" rx="11" ry="4" fill="#e38c00" opacity="0.9" />
    <path
      d="M5 9v5c0 2.2 4.9 4 11 4s11-1.8 11-4V9"
      fill="#e38c00"
      opacity="0.7"
    />
    <path
      d="M5 14v5c0 2.2 4.9 4 11 4s11-1.8 11-4v-5"
      fill="#e38c00"
      opacity="0.5"
    />
    <path
      d="M5 19v4c0 2.2 4.9 4 11 4s11-1.8 11-4v-4"
      fill="#e38c00"
      opacity="0.35"
    />
  </svg>
);
const PS_SVG = (
  <svg
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: 28, height: 28 }}
  >
    <circle
      cx="16"
      cy="16"
      r="13"
      stroke="#10b981"
      strokeWidth="2"
      fill="#10b98118"
    />
    <path
      d="M11 16l3.5 3.5L21 11"
      stroke="#10b981"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LANG_BADGES = [
  { lang: "C++", stars: 5, color: "#00599c", svg: CPP_SVG },
  { lang: "C", stars: 3, color: "#a8b9cc", svg: C_SVG },
  { lang: "Python", stars: 3, color: "#3776ab", svg: PY_SVG },
  { lang: "Java", stars: 3, color: "#f89820", svg: JAVA_SVG },
  { lang: "SQL", stars: 3, color: "#e38c00", svg: SQL_SVG },
  { lang: "Prob.Sol", stars: 2, color: "#10b981", svg: PS_SVG },
];

const PLATFORM_CARDS = [
  {
    platform: "LeetCode",
    icon: "🧩",
    color: "#ffa116",
    stats: [{ label: "Problems Solved", value: 200, suffix: "+" }],
    bars: [
      ["Arrays & Strings", 80],
      ["Dynamic Programming", 60],
      ["Trees & Graphs", 65],
    ],
  },
  {
    platform: "CodeChef",
    icon: "👨‍🍳",
    color: "#8b5cf6",
    stats: [{ label: "Problems Solved", value: 1200, suffix: "+" }],
    bars: [
      ["Basic Programming", 95],
      ["Data Structures", 80],
      ["Algorithms", 75],
    ],
  },
  {
    platform: "SkillRack",
    icon: "🏆",
    color: "#00f5ff",
    stats: [
      { label: "Problems Solved", value: 1200, suffix: "+" },
      { label: "Certificates", value: 15, suffix: "+" },
    ],
    bars: [
      ["C Programming", 90],
      ["Java", 80],
      ["Python", 78],
    ],
  },
  {
    platform: "HackerRank",
    icon: "⭐",
    color: "#10b981",
    stats: [],
    bars: [],
    langBadges: true,
  },
];

const QUICK_STATS = [
  { label: "LeetCode", value: 200, icon: "🧩", color: "#ffa116", suffix: "+" },
  { label: "CodeChef", value: 1200, icon: "👨‍🍳", color: "#8b5cf6", suffix: "+" },
  {
    label: "SkillRack",
    value: 1200,
    icon: "🏆",
    color: "#00f5ff",
    suffix: "+",
  },
  {
    label: "SkillRack Rank",
    value: 14849,
    icon: "📊",
    color: "#ec4899",
    prefix: "#",
  },
];

export default function CodingProfiles() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="profiles" className="relative py-16 md:py-24 px-4 z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          className="text-center mb-10 md:mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="font-mono text-yellow-400 text-sm tracking-widest mb-3">
            // CHAPTER 04
          </div>
          <h2 className="font-orbitron font-black text-3xl md:text-6xl glow-gold text-yellow-400 mb-4 md:mb-6">
            STATS DASHBOARD
          </h2>
          <p className="text-gray-300 text-sm md:text-base">
            Quantified progress — every commit, every solve, every streak.
          </p>
        </motion.div>

        {/* Quick stat badges — 2 col mobile, 4 col desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          {QUICK_STATS.map((b, i) => (
            <motion.div
              key={i}
              className="glass gradient-border p-4 md:p-5 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="text-2xl md:text-3xl mb-1 md:mb-2">{b.icon}</div>
              <div
                className="font-orbitron text-xl md:text-2xl font-black"
                style={{ color: b.color }}
              >
                {b.prefix || ""}
                <Counter target={b.value} suffix={b.suffix || ""} />
              </div>
              <div
                className="font-mono text-gray-400 mt-1"
                style={{ fontSize: "0.65rem" }}
              >
                {b.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Platform cards — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12">
          {PLATFORM_CARDS.map((platform, pi) => (
            <motion.div
              key={pi}
              className="glass gradient-border p-4 md:p-6"
              initial={{ opacity: 0, x: pi % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2 + pi * 0.1, duration: 0.7 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl md:text-2xl">{platform.icon}</span>
                <h3
                  className="font-orbitron font-bold text-base md:text-xl"
                  style={{ color: platform.color }}
                >
                  {platform.platform}
                </h3>
              </div>

              {platform.stats.length > 0 && (
                <div className="flex gap-6 mb-4 flex-wrap">
                  {platform.stats.map((s, i) => (
                    <div key={i}>
                      <div
                        className="font-orbitron text-xl md:text-2xl font-black"
                        style={{ color: platform.color }}
                      >
                        <Counter target={s.value} suffix={s.suffix} />
                      </div>
                      <div
                        className="font-mono text-gray-500 mt-0.5"
                        style={{ fontSize: "0.65rem" }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* HackerRank language badges */}
              {platform.langBadges && (
                <div className="grid grid-cols-3 gap-2">
                  {LANG_BADGES.map(({ lang, stars, color, svg }) => (
                    <div
                      key={lang}
                      className="flex flex-col items-center gap-1.5 p-2 rounded-xl"
                      style={{
                        background: `${color}0d`,
                        border: `1px solid ${color}28`,
                      }}
                    >
                      {svg}
                      <span
                        className="font-mono font-bold text-center"
                        style={{ color, fontSize: "0.6rem" }}
                      >
                        {lang}
                      </span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, si) => (
                          <span
                            key={si}
                            style={{
                              color:
                                si < stars
                                  ? "#fbbf24"
                                  : "rgba(255,255,255,0.12)",
                              fontSize: 9,
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {platform.bars.length > 0 && (
                <div className="space-y-2 mt-2">
                  {platform.bars.map(([name, pct]) => (
                    <div key={name}>
                      <div
                        className="flex justify-between font-mono text-gray-400 mb-1"
                        style={{ fontSize: "0.65rem" }}
                      >
                        <span>{name}</span>
                        <span style={{ color: platform.color }}>{pct}%</span>
                      </div>
                      <div
                        className="h-1.5 rounded-full"
                        style={{ background: "rgba(255,255,255,0.06)" }}
                      >
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${platform.color}, ${platform.color}88)`,
                          }}
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${pct}%` } : {}}
                          transition={{ duration: 1.2, delay: 0.4 + pi * 0.1 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contribution graph */}
        {/* <motion.div className="glass gradient-border p-4 md:p-6"
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-orbitron text-cyan-400 font-bold text-sm md:text-base">CONTRIBUTION GRAPH</h3>
            <span className="font-mono text-gray-500" style={{ fontSize: '0.65rem' }}>Last 6 months</span>
          </div>
          <ContributionGrid />
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span className="font-mono text-gray-500" style={{ fontSize: '0.65rem' }}>Less</span>
            {[0.05, 0.25, 0.5, 0.75, 1].map((v, i) => (
              <div key={i} className="rounded-sm" style={{ width: 10, height: 10, background: `rgba(0,245,255,${v})` }} />
            ))}
            <span className="font-mono text-gray-500" style={{ fontSize: '0.65rem' }}>More</span>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
