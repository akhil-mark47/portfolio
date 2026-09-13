'use client';

import { motion, Variants } from 'framer-motion';

type Item = {
  num: string;
  degree: string;
  detail: string;
  metric: string;
  years: string;
  present?: boolean;
};

const ITEMS: Item[] = [
  {
    num: '01',
    degree: 'B.Tech · Computer Science Engineering (Data Science)',
    detail: 'VNR Vignana Jyothi Institute of Engineering and Technology',
    metric: 'CGPA 8.62',
    years: "'24 – '27",
    present: true,
  },
  {
    num: '02',
    degree: 'Diploma · Cloud Computing & Big Data',
    detail: 'Government Institute of Electronics',
    metric: 'CGPA 9.53',
    years: "'21 – '24",
  },
  {
    num: '03',
    degree: 'Matriculation',
    detail: "St. Mary's Bethany Convent Vidyalaya",
    metric: 'GPA 10/10',
    years: '2021',
  },
];

// each card orchestrates its own children so number → title → detail → meta
// cascade in one-by-one as the card scrolls into view
const card: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.11, delayChildren: 0.04 },
  },
};

const line: Variants = {
  hidden: { opacity: 0, y: 26, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const EducationRoadmapMobile: React.FC = () => {
  return (
    <div className="mx-auto max-w-md px-4 py-2">
      <div className="rounded-2xl border border-[rgba(147,51,234,0.32)] bg-[rgba(12,9,26,0.82)] backdrop-blur-md px-5 shadow-[0_22px_55px_-22px_rgba(45,0,247,0.55)]">
      {ITEMS.map((it, i) => (
        <motion.article
          key={it.num}
          variants={card}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.55 }}
          className={
            'py-6 ' +
            (i !== ITEMS.length - 1 ? 'border-b border-[rgba(147,51,234,0.16)]' : '')
          }
        >
          {/* phase number + shimmering trail */}
          <motion.div variants={line} className="flex items-center gap-3">
            <span className="ql-num font-[JetBrains_Mono] text-[13px] tracking-[0.3em]">
              {it.num}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-[rgba(147,51,234,0.5)] via-[rgba(59,130,246,0.25)] to-transparent" />
            {it.present && (
              <span className="font-[JetBrains_Mono] text-[9px] tracking-[0.16em] text-cyan-300 border border-cyan-400/40 rounded-full px-2 py-[2px]">
                PRESENT
              </span>
            )}
          </motion.div>

          {/* degree */}
          <motion.h3
            variants={line}
            className="mt-4 text-[19px] font-semibold leading-tight text-[var(--starry-white)] tracking-[-0.01em]"
          >
            {it.degree}
          </motion.h3>

          {/* detail */}
          <motion.p variants={line} className="mt-1 text-[13px] text-gray-400">
            {it.detail}
          </motion.p>

          {/* meta */}
          <motion.div
            variants={line}
            className="mt-4 flex items-center justify-between font-[JetBrains_Mono] text-[11px]"
          >
            <span className="text-blue-300">{it.metric}</span>
            <span className="text-gray-500">{it.years}</span>
          </motion.div>
        </motion.article>
      ))}
      </div>
    </div>
  );
};

export default EducationRoadmapMobile;
