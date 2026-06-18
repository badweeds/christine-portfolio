import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  MessageSquare,
  Users,
  Zap,
  Shield,
  BarChart2,
  RefreshCw,
  Smile,
  Star,
  ArrowRight,
  ChevronDown,
  Award,
  TrendingUp,
  Heart,
  CheckCircle,
  Download,
} from "lucide-react";

/* ─── CONSTANTS ─────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const;

const PALETTE = {
  ivory: "#F7F4EF",
  navy: "#1E293B",
  terra: "#D97757",
  taupe: "#B8A38F",
  white: "#FFFFFF",
  stone: "#F0EBE3",
  navyDeep: "#0F172A",
  terraDark: "#C06645",
  ink: "#4B5668",
  muted: "#7C6B58",
};

/* ─── HELPERS ────────────────────────────────────────────────── */
function useCountUp(target: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const totalFrames = 80;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (frame >= totalFrames) {
        setCount(target);
        clearInterval(timer);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [active, target]);
  return count;
}

function Reveal({
  children,
  delay = 0,
  className = "",
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ScaleIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── DATA ───────────────────────────────────────────────────── */
const experiences = [
  {
    role: "Customer Service Representative",
    company: "Full Potential Solutions Inc.",
    period: "Jun 2025 – Jun 2026",
    tag: "BPO",
    color: PALETTE.terra,
    achievements: [
      "Handled 30+ inbound inquiries daily with a 96% satisfaction score",
      "Reduced average resolution time by 22% through process refinement",
      "Recognized as Top Performer for 3 consecutive quarters",
    ],
  },
  {
    role: "Customer Service Associate",
    company: "VXI Global Holdings B.V.",
    period: "Jun 2023 – Jun 2025",
    tag: "BPO",
    color: PALETTE.taupe,
    achievements: [
      "Managed escalated account disputes, resolving 96% within SLA",
      "Trained 5 new associates on customer interaction best practices",
      "Maintained a CSAT rating of 4.5 / 5.0 throughout entire tenure",
    ],
  },
];

const skills = [
  {
    icon: MessageSquare,
    title: "Customer Support",
    desc: "Resolving inquiries with clarity and genuine care at every touchpoint",
    size: "col-span-2 row-span-1",
    variant: "accent",
  },
  {
    icon: Users,
    title: "Communication",
    desc: "Articulate across written, verbal, and digital channels",
    size: "col-span-1 row-span-1",
    variant: "default",
  },
  {
    icon: BarChart2,
    title: "Microsoft Office",
    desc: "Excel, Word, Outlook — full suite proficiency",
    size: "col-span-1 row-span-1",
    variant: "default",
  },
  {
    icon: Zap,
    title: "Problem Solving",
    desc: "Turning complex customer issues into elegant, lasting solutions",
    size: "col-span-1 row-span-2",
    variant: "dark",
  },
  {
    icon: RefreshCw,
    title: "Multitasking",
    desc: "Managing competing priorities with consistent quality and poise",
    size: "col-span-1 row-span-1",
    variant: "default",
  },
  {
    icon: Shield,
    title: "Adaptability",
    desc: "Thriving in fast-changing environments with calm confidence",
    size: "col-span-1 row-span-1",
    variant: "default",
  },
  {
    icon: Star,
    title: "Conflict Resolution",
    desc: "De-escalating tense situations with empathy and professionalism",
    size: "col-span-1 row-span-1",
    variant: "warm",
  },
  {
    icon: Smile,
    title: "Customer Satisfaction",
    desc: "Consistently exceeding expectations and building lasting loyalty",
    size: "col-span-1 row-span-1",
    variant: "default",
  },
];

const references = [
  {
    name: "Tom Rapliza",
    role: "General Admin VA | Theft Investigator",
    company: "Panoptyc Inc.",
    contact: "(+63) 991 895 5546",
    initials: "TR",
    hue: PALETTE.terra,
  },
  {
    name: "Rhea Mae Camuta",
    role: "Customer Service Associate",
    company: "VXI Global Holdings B.V",
    contact: "(+63) 936 902 7030",
    initials: "RC",
    hue: PALETTE.taupe,
  },
  {
    name: "Christcel Jean Hilig",
    role: "Customer Service Associate",
    company: "VXI Global Holdings B.V",
    contact: "(+63) 993 460 7810",
    initials: "CH",
    hue: "#9B8B7A",
  },
];

/* ─── SKILL CARD VARIANTS ────────────────────────────────────── */
function skillStyle(variant: string) {
  switch (variant) {
    case "accent":
      return {
        bg: `linear-gradient(135deg, ${PALETTE.terra} 0%, ${PALETTE.terraDark} 100%)`,
        text: "#FFFFFF",
        sub: "rgba(255,255,255,0.72)",
        iconBg: "rgba(255,255,255,0.18)",
        iconColor: "#FFFFFF",
        border: "none",
        shadow: `0 16px 48px rgba(217,119,87,0.3)`,
      };
    case "dark":
      return {
        bg: PALETTE.navy,
        text: "#FFFFFF",
        sub: "rgba(255,255,255,0.6)",
        iconBg: "rgba(255,255,255,0.1)",
        iconColor: PALETTE.terra,
        border: "none",
        shadow: `0 16px 48px rgba(30,41,59,0.2)`,
      };
    case "warm":
      return {
        bg: "#EDE0D4",
        text: PALETTE.navy,
        sub: PALETTE.muted,
        iconBg: "rgba(217,119,87,0.15)",
        iconColor: PALETTE.terra,
        border: `1px solid rgba(184,163,143,0.3)`,
        shadow: "0 4px 20px rgba(0,0,0,0.04)",
      };
    default:
      return {
        bg: PALETTE.white,
        text: PALETTE.navy,
        sub: PALETTE.muted,
        iconBg: "rgba(217,119,87,0.08)",
        iconColor: PALETTE.terra,
        border: `1px solid rgba(184,163,143,0.2)`,
        shadow: "0 4px 20px rgba(0,0,0,0.04)",
      };
  }
}

/* ─── SECTION LABEL ──────────────────────────────────────────── */
function Label({ children }: { children: string }) {
  return (
    <p
      className="text-xs font-semibold tracking-[0.18em] uppercase mb-3"
      style={{ color: PALETTE.terra }}
    >
      {children}
    </p>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────────────── */
export default function App() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 }
    );
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  const yoe = useCountUp(3, statsVisible);
  const csat = useCountUp(96, statsVisible);
  const cases = useCountUp(30, statsVisible);
  const quarters = useCountUp(3, statsVisible);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  /* NAV */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
        background: PALETTE.ivory,
        color: PALETTE.navy,
        overflowX: "hidden",
      }}
    >
      {/* ════════════════════════════════════════
          NAV
      ════════════════════════════════════════ */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "rgba(247,244,239,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(184,163,143,0.2)" : "none",
          padding: scrolled ? "14px 40px" : "22px 40px",
        }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="font-extrabold tracking-[0.22em] uppercase text-sm"
            style={{ color: PALETTE.terra }}
          >
            CDA
          </motion.span>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
            className="hidden md:flex items-center gap-8"
          >
            {["about", "experience", "skills", "contact"].map((s) => (
              <button
                key={s}
                onClick={() => scrollTo(s)}
                className="text-sm font-medium capitalize transition-colors duration-200"
                style={{ color: PALETTE.navy, opacity: 0.6 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = PALETTE.terra;
                  (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.color = PALETTE.navy;
                  (e.currentTarget as HTMLButtonElement).style.opacity = "0.6";
                }}
              >
                {s}
              </button>
            ))}
          </motion.div>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            onClick={() => scrollTo("contact")}
            className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
            style={{ background: PALETTE.terra, color: "#fff" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = PALETTE.navyDeep)
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = PALETTE.terra)
            }
          >
            Hire Me
          </motion.button>
        </div>
      </nav>

      {/* ════════════════════════════════════════
          HERO
      ════════════════════════════════════════ */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center px-8 md:px-16 lg:px-24 pt-28 pb-20 overflow-hidden"
      >
        {/* Ambient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 65% 55% at 75% 35%, rgba(217,119,87,0.13) 0%, transparent 68%),
              radial-gradient(ellipse 45% 45% at 15% 75%, rgba(184,163,143,0.18) 0%, transparent 60%),
              radial-gradient(ellipse 35% 35% at 90% 90%, rgba(30,41,59,0.04) 0%, transparent 50%)
            `,
          }}
        />

        <div className="relative w-full max-w-7xl mx-auto grid lg:grid-cols-[1.1fr_1fr] gap-12 xl:gap-20 items-center">
          {/* ── LEFT ── */}
          <div className="flex flex-col gap-7 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full w-fit text-xs font-bold tracking-[0.12em] uppercase"
              style={{
                background: "rgba(217,119,87,0.09)",
                color: PALETTE.terra,
                border: "1px solid rgba(217,119,87,0.22)",
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: PALETTE.terra,
                  boxShadow: `0 0 0 3px rgba(217,119,87,0.25)`,
                }}
              />
              Available for New Opportunities
            </motion.div>

            <div className="overflow-hidden">
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
                style={{
                  fontSize: "clamp(2.8rem, 5.5vw, 5rem)",
                  fontWeight: 900,
                  lineHeight: 1.02,
                  letterSpacing: "-0.02em",
                  color: PALETTE.navy,
                }}
              >
                Christine D.
                <br />
                <span style={{ color: PALETTE.terra }}>Abenoja</span>
              </motion.h1>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.45 }}
              className="flex flex-col gap-1"
            >
              <p className="font-semibold text-xl" style={{ color: PALETTE.muted }}>
                Customer Service Professional
              </p>
              <p className="font-medium text-base" style={{ color: PALETTE.taupe }}>
                Customer Experience Specialist
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
              className="text-[1.05rem] leading-[1.75] max-w-[480px]"
              style={{ color: PALETTE.ink, fontWeight: 400 }}
            >
              I bring warmth, precision, and genuine care to every customer interaction.
              With 3+ years of hands-on experience, I transform complex problems into
              seamless resolutions — building lasting trust one conversation at a time.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => scrollTo("experience")}
                className="group flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300"
                style={{
                  background: PALETTE.navy,
                  color: "#fff",
                  boxShadow: `0 8px 32px rgba(30,41,59,0.2)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = PALETTE.navyDeep;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 40px rgba(30,41,59,0.28)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = PALETTE.navy;
                  (e.currentTarget as HTMLButtonElement).style.transform = "";
                  (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(30,41,59,0.2)";
                }}
              >
                View Experience
                <ArrowRight size={15} strokeWidth={2.5} />
              </button>
              <button
                onClick={() => scrollTo("contact")}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300"
                style={{
                  background: "transparent",
                  color: PALETTE.navy,
                  border: `1.5px solid rgba(30,41,59,0.22)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.terra;
                  (e.currentTarget as HTMLButtonElement).style.color = PALETTE.terra;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(30,41,59,0.22)";
                  (e.currentTarget as HTMLButtonElement).style.color = PALETTE.navy;
                  (e.currentTarget as HTMLButtonElement).style.transform = "";
                }}
              >
                Contact Me
              </button>
              <button
                onClick={() => {
                  window.open('/Christine Resume.pdf', '_blank');
                }}
                className="flex items-center gap-2.5 px-8 py-4 rounded-full font-bold text-sm transition-all duration-300"
                style={{
                  background: "transparent",
                  color: PALETTE.navy,
                  border: `1.5px solid rgba(30,41,59,0.22)`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = PALETTE.terra;
                  (e.currentTarget as HTMLButtonElement).style.color = PALETTE.terra;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(30,41,59,0.22)";
                  (e.currentTarget as HTMLButtonElement).style.color = PALETTE.navy;
                  (e.currentTarget as HTMLButtonElement).style.transform = "";
                }}
              >
                Download Resume
                <Download size={15} strokeWidth={2.5} />
              </button>
            </motion.div>

            {/* micro-proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.7 }}
              className="flex items-center gap-5 pt-3"
            >
              <div className="flex -space-x-2">
                {["#D97757", "#B8A38F", "#9B8B7A"].map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-[#F7F4EF] flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: c, zIndex: 3 - i }}
                  >
                    {["TR", "RC", "CH"][i]}
                  </div>
                ))}
              </div>
              <p className="text-sm" style={{ color: PALETTE.muted }}>
                <span className="font-semibold" style={{ color: PALETTE.navy }}>3 professional</span> references available
              </p>
            </motion.div>
          </div>

          {/* ── RIGHT — enhanced hero portrait ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.25 }}
            style={{ y: heroY }}
            className="relative flex items-center justify-center order-1 lg:order-2"
          >
            {/* Background glow layer */}
            <div className="absolute -top-16 -left-16 w-[380px] h-[380px] rounded-full"
              style={{
                background: `radial-gradient(circle at center, ${PALETTE.terra}22 0%, transparent 60%)`,
                filter: 'blur(80px)',
                zIndex: 0
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full rounded-full"
                  style={{
                    background: `radial-gradient(circle at center, ${PALETTE.terra}15 0%, transparent 70%)`,
                    filter: 'blur(60px)',
                  }}
                />
              </motion.div>
            </div>

            {/* Decorative gradient ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute w-[320px] h-[320px] rounded-full -top-8 -left-8"
              style={{
                background: `conic-gradient(from 0deg, ${PALETTE.terra}00, ${PALETTE.terra}30, transparent 70%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <div className="absolute inset-0 rounded-full"
                style={{
                  border: `1px solid rgba(217,119,87,0.15)`,
                  background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                }}
              />
            </motion.div>

            {/* Floating abstract shapes */}
            <motion.div
              animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute w-16 h-16 rounded-full"
              style={{
                background: PALETTE.taupe,
                top: "14%",
                left: "8%",
                opacity: 0.7,
                filter: 'blur(10px)',
                zIndex: 1
              }}
            />
            <motion.div
              animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute w-10 h-10 rounded-full"
              style={{
                background: PALETTE.navy,
                bottom: "22%",
                right: "10%",
                opacity: 0.85,
                filter: 'blur(8px)',
                zIndex: 1
              }}
            />
            <motion.div
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-5 h-5 rounded-full"
              style={{
                background: PALETTE.terra,
                top: "60%",
                left: "14%",
                filter: 'blur(4px)',
                zIndex: 1
              }}
            />

            {/* Main portrait with enhanced styling */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[300px] h-[300px] rounded-2xl flex items-center justify-center"
              style={{
                background: `radial-gradient(circle at 30% 30%, #fff0, rgba(217,119,87,0.03))`,
                boxShadow: `0 20px 60px rgba(0,0,0,0.15), inset 0 0 0 rgba(217,119,87,0.05)`,
                border: `1px solid rgba(217,119,87,0.18)`,
                overflow: 'hidden'
              }}
            >
              {/* Inner glow */}
              <div className="absolute inset-0 rounded-2xl"
                style={{
                  background: `radial-gradient(circle at 38% 32%, rgba(255,255,255,0.25) 0%, transparent 45%)`,
                  pointerEvents: 'none'
                }}
              />
              <motion.img
                src="/christine-id.png"
                alt="Christine Abenoja"
                className="w-full h-full object-cover"
                style={{
                  transform: 'scale(1.02)',
                  transition: 'transform 0.3s ease'
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              />
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 w-10 h-10 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${PALETTE.terra}, ${PALETTE.terraDark})`,
                opacity: 0.7,
                filter: 'blur(4px)'
              }}
            />
            <motion.div
              animate={{ rotate: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute -bottom-4 -right-4 w-8 h-8 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${PALETTE.navy}, ${PALETTE.terra})`,
                opacity: 0.6,
                filter: 'blur(3px)'
              }}
            />
          </motion.div>
        </div>

        {/* scroll cue */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={() => scrollTo("stats")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1"
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase" style={{ color: PALETTE.taupe }}>
              Scroll
            </span>
            <ChevronDown size={14} style={{ color: PALETTE.taupe }} />
          </motion.div>
        </motion.button>
      </section>

      {/* ════════════════════════════════════════
          STATS
      ════════════════════════════════════════ */}
      <section id="stats" style={{ background: PALETTE.stone }}>
        <div
          ref={statsRef}
          className="max-w-7xl mx-auto px-8 md:px-16 lg:px-24 py-16"
        >
          <div
            className="grid grid-cols-2 md:grid-cols-4 rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(184,163,143,0.22)",
              boxShadow: "0 4px 32px rgba(0,0,0,0.04)",
            }}
          >
            {[
              { val: yoe, suffix: "+", label: "Years Experience", icon: TrendingUp },
              { val: csat, suffix: "%", label: "CSAT Score", icon: Smile },
              { val: cases, suffix: "+", label: "Daily Interactions", icon: MessageSquare },
              { val: quarters, suffix: "×", label: "Top Performer Award", icon: Award },
            ].map(({ val, suffix, label, icon: Icon }, i) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center py-10 px-6 text-center relative"
                style={{
                  background: PALETTE.white,
                  borderRight: i < 3 ? "1px solid rgba(184,163,143,0.15)" : "none",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: "rgba(217,119,87,0.09)" }}
                >
                  <Icon size={18} style={{ color: PALETTE.terra }} />
                </div>
                <p
                  className="font-black leading-none mb-2"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 2.75rem)", color: PALETTE.terra }}
                >
                  {val}
                  {suffix}
                </p>
                <p className="text-xs font-semibold" style={{ color: PALETTE.muted }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          ABOUT
      ════════════════════════════════════════ */}
      <section id="about" className="py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[360px_1fr] gap-16 xl:gap-24 items-start">
            {/* sticky title */}
            <Reveal>
              <div className="lg:sticky lg:top-32">
                <Label>About Me</Label>
                <h2
                  className="font-black leading-[1.06]"
                  style={{
                    fontSize: "clamp(2.2rem, 3.8vw, 3.25rem)",
                    color: PALETTE.navy,
                    letterSpacing: "-0.02em",
                  }}
                >
                  More than a{" "}
                  <em
                    style={{
                      fontStyle: "italic",
                      color: PALETTE.terra,
                      fontWeight: 800,
                    }}
                  >
                    voice
                  </em>
                  {" "}on
                  <br />the phone.
                </h2>
                <div
                  className="mt-8 w-12 h-1 rounded-full"
                  style={{ background: PALETTE.terra }}
                />
              </div>
            </Reveal>

            {/* content */}
            <div className="flex flex-col gap-8">
              <Reveal delay={0.1}>
                <p className="text-lg leading-[1.8]" style={{ color: PALETTE.ink, fontWeight: 400 }}>
                  Hi, I'm Christine — a dedicated Customer Service Professional with a
                  genuine passion for people and problem-solving. I believe every
                  interaction is an opportunity to make someone's day a little easier,
                  and I bring that philosophy to every role I take on.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-lg leading-[1.8]" style={{ color: PALETTE.ink, fontWeight: 400 }}>
                  With a BS in Business Administration from St. John Paul II College of
                  Davao, I blend academic grounding with real-world empathy. I'm equally
                  at home handling high-volume support queues, de-escalating difficult
                  situations, or mentoring peers — always with calm, confident professionalism.
                </p>
              </Reveal>

              {/* quote */}
              <Reveal delay={0.28}>
                <div
                  className="relative px-10 py-8 rounded-3xl overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${PALETTE.terra} 0%, ${PALETTE.terraDark} 100%)`,
                    boxShadow: "0 20px 60px rgba(217,119,87,0.28)",
                  }}
                >
                  <div
                    className="absolute -top-2 -left-1 font-serif leading-none select-none"
                    style={{ fontSize: 100, color: "rgba(255,255,255,0.12)" }}
                  >
                    "
                  </div>
                  <p
                    className="relative text-xl font-semibold leading-[1.6]"
                    style={{ color: "#fff", maxWidth: 480 }}
                  >
                    Creating positive customer experiences through empathy,
                    communication, and problem solving.
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="w-10 h-px" style={{ background: "rgba(255,255,255,0.35)" }} />
                    <span
                      className="text-xs font-bold tracking-[0.16em] uppercase"
                      style={{ color: "rgba(255,255,255,0.65)" }}
                    >
                      Christine D. Abenoja
                    </span>
                  </div>
                </div>
              </Reveal>

              {/* value pillars */}
              <Reveal delay={0.35}>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: "Empathy First", icon: Heart },
                    { label: "Solution-Focused", icon: Zap },
                    { label: "Always Reliable", icon: CheckCircle },
                  ].map(({ label, icon: Icon }) => (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 py-5 rounded-2xl text-center"
                      style={{
                        background: PALETTE.stone,
                        border: "1px solid rgba(184,163,143,0.18)",
                      }}
                    >
                      <Icon size={20} style={{ color: PALETTE.terra }} />
                      <span className="text-xs font-bold" style={{ color: PALETTE.navy }}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          EXPERIENCE
      ════════════════════════════════════════ */}
      <section
        id="experience"
        className="py-28 px-8 md:px-16 lg:px-24"
        style={{ background: PALETTE.stone }}
      >
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <Label>Work History</Label>
              <h2
                className="font-black"
                style={{
                  fontSize: "clamp(2.2rem, 3.8vw, 3.25rem)",
                  color: PALETTE.navy,
                  letterSpacing: "-0.02em",
                }}
              >
                Experience
              </h2>
            </div>
          </Reveal>

          <div className="relative">
            {/* vertical line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px hidden lg:block"
              style={{
                background: `linear-gradient(to bottom, transparent, rgba(217,119,87,0.3) 15%, rgba(217,119,87,0.3) 85%, transparent)`,
                transform: "translateX(-50%)",
              }}
            />

            <div className="flex flex-col gap-10">
              {experiences.map((exp, i) => (
                <Reveal key={exp.role} delay={i * 0.12}>
                  <div
                    className={`relative flex flex-col lg:flex-row gap-6 items-start ${
                      i % 2 !== 0 ? "lg:flex-row-reverse" : ""
                    }`}
                  >
                    {/* card */}
                    <div
                      className="flex-1 p-8 lg:p-10 rounded-3xl transition-all duration-400"
                      style={{
                        background: PALETTE.white,
                        border: "1px solid rgba(184,163,143,0.18)",
                        boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                      }}
                      onMouseEnter={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.boxShadow = "0 16px 56px rgba(217,119,87,0.13)";
                        el.style.transform = "translateY(-4px)";
                        el.style.borderColor = "rgba(217,119,87,0.22)";
                      }}
                      onMouseLeave={(e) => {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.04)";
                        el.style.transform = "";
                        el.style.borderColor = "rgba(184,163,143,0.18)";
                      }}
                    >
                      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
                        <div>
                          <span
                            className="text-[10px] font-bold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-3 inline-block"
                            style={{
                              background: `${exp.color}18`,
                              color: exp.color,
                              border: `1px solid ${exp.color}30`,
                            }}
                          >
                            {exp.tag}
                          </span>
                          <h3
                            className="font-black text-xl block"
                            style={{ color: PALETTE.navy, letterSpacing: "-0.01em" }}
                          >
                            {exp.role}
                          </h3>
                          <p className="font-semibold text-sm mt-1" style={{ color: exp.color }}>
                            {exp.company}
                          </p>
                        </div>
                        <span
                          className="px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap"
                          style={{
                            background: PALETTE.stone,
                            color: PALETTE.muted,
                            border: "1px solid rgba(184,163,143,0.2)",
                          }}
                        >
                          {exp.period}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-3">
                        {exp.achievements.map((a) => (
                          <li
                            key={a}
                            className="flex items-start gap-3 text-[0.9rem] leading-[1.6]"
                            style={{ color: PALETTE.ink }}
                          >
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: `${PALETTE.terra}15` }}
                            >
                              <span
                                className="w-1.5 h-1.5 rounded-full"
                                style={{ background: PALETTE.terra }}
                              />
                            </div>
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* timeline node */}
                    <div className="hidden lg:flex items-start justify-center w-12 pt-10 shrink-0">
                      <div
                        className="w-4 h-4 rounded-full border-[3px]"
                        style={{
                          background: PALETTE.ivory,
                          borderColor: PALETTE.terra,
                          boxShadow: `0 0 0 5px rgba(217,119,87,0.14)`,
                        }}
                      />
                    </div>

                    <div className="hidden lg:block flex-1" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          SKILLS
      ════════════════════════════════════════ */}
      <section id="skills" className="py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <Label>Capabilities</Label>
              <h2
                className="font-black"
                style={{
                  fontSize: "clamp(2.2rem, 3.8vw, 3.25rem)",
                  color: PALETTE.navy,
                  letterSpacing: "-0.02em",
                }}
              >
                Core Skills
              </h2>
            </div>
          </Reveal>

          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            style={{ gridAutoRows: "168px" }}
          >
            {skills.map((skill, i) => {
              const st = skillStyle(skill.variant);
              const Icon = skill.icon;
              return (
                <ScaleIn key={skill.title} delay={i * 0.06} className={skill.size}>
                  <div
                    className="h-full p-6 lg:p-7 rounded-3xl flex flex-col justify-between transition-all duration-300 cursor-default"
                    style={{
                      background: st.bg,
                      border: st.border || "none",
                      boxShadow: st.shadow,
                    }}
                    onMouseEnter={(e) => {
                      if (skill.variant === "default" || skill.variant === "warm") {
                        const el = e.currentTarget as HTMLDivElement;
                        el.style.transform = "translateY(-4px) scale(1.01)";
                        el.style.boxShadow = "0 16px 48px rgba(217,119,87,0.14)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLDivElement;
                      el.style.transform = "";
                      el.style.boxShadow = st.shadow;
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center"
                      style={{ background: st.iconBg }}
                    >
                      <Icon size={20} style={{ color: st.iconColor }} />
                    </div>
                    <div>
                      <h4
                        className="font-black text-sm mb-1.5 leading-tight"
                        style={{ color: st.text }}
                      >
                        {skill.title}
                      </h4>
                      <p
                        className="text-xs leading-[1.55]"
                        style={{ color: st.sub }}
                      >
                        {skill.desc}
                      </p>
                    </div>
                  </div>
                </ScaleIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          EDUCATION
      ════════════════════════════════════════ */}
      <section
        className="py-28 px-8 md:px-16 lg:px-24"
        style={{ background: PALETTE.stone }}
      >
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <Label>Academic Background</Label>
              <h2
                className="font-black"
                style={{
                  fontSize: "clamp(2.2rem, 3.8vw, 3.25rem)",
                  color: PALETTE.navy,
                  letterSpacing: "-0.02em",
                }}
              >
                Education
              </h2>
            </div>
          </Reveal>

          <ScaleIn delay={0.1}>
            <div
              className="relative max-w-3xl mx-auto p-10 lg:p-14 rounded-[2rem] overflow-hidden"
              style={{
                background: PALETTE.white,
                border: "1px solid rgba(184,163,143,0.2)",
                boxShadow: "0 12px 60px rgba(0,0,0,0.07)",
              }}
            >
              {/* decorative corner */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(217,119,87,0.12) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute -bottom-12 -left-12 w-44 h-44 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(184,163,143,0.12) 0%, transparent 70%)",
                }}
              />

              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-8">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `linear-gradient(135deg, rgba(217,119,87,0.12) 0%, rgba(217,119,87,0.05) 100%)`,
                    border: "1px solid rgba(217,119,87,0.18)",
                  }}
                >
                  <GraduationCap size={34} style={{ color: PALETTE.terra }} />
                </div>
                <div className="flex-1">
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase block mb-3"
                    style={{ color: PALETTE.taupe }}
                  >
                    2021 – 2025
                  </span>
                  <h3
                    className="font-black mb-2 leading-tight"
                    style={{
                      fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
                      color: PALETTE.navy,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Bachelor of Science in Business Administration
                  </h3>
                  <p className="font-bold text-base" style={{ color: PALETTE.terra }}>
                    St. John Paul II College of Davao
                  </p>
                  <p className="text-sm mt-2" style={{ color: PALETTE.muted }}>
                    Major in Business Management · Dean's List Honoree
                  </p>
                </div>
              </div>
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* ════════════════════════════════════════
          REFERENCES
      ════════════════════════════════════════ */}
      <section className="py-28 px-8 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="text-center mb-20">
              <Label>Professional Network</Label>
              <h2
                className="font-black"
                style={{
                  fontSize: "clamp(2.2rem, 3.8vw, 3.25rem)",
                  color: PALETTE.navy,
                  letterSpacing: "-0.02em",
                }}
              >
                References
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {references.map((ref, i) => (
              <Reveal key={ref.name} delay={i * 0.1}>
                <div
                  className="p-8 rounded-3xl flex flex-col gap-6 transition-all duration-350"
                  style={{
                    background: PALETTE.white,
                    border: "1px solid rgba(184,163,143,0.2)",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "0 16px 56px rgba(217,119,87,0.11)";
                    el.style.transform = "translateY(-5px)";
                    el.style.borderColor = "rgba(217,119,87,0.22)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLDivElement;
                    el.style.boxShadow = "0 4px 24px rgba(0,0,0,0.04)";
                    el.style.transform = "";
                    el.style.borderColor = "rgba(184,163,143,0.2)";
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shrink-0"
                      style={{
                        background: `linear-gradient(135deg, ${ref.hue} 0%, ${ref.hue}CC 100%)`,
                        color: "#fff",
                        boxShadow: `0 8px 24px ${ref.hue}40`,
                      }}
                    >
                      {ref.initials}
                    </div>
                    <div>
                      <h4 className="font-black text-base" style={{ color: PALETTE.navy }}>
                        {ref.name}
                      </h4>
                      <p className="text-xs font-semibold mt-0.5" style={{ color: ref.hue }}>
                        {ref.role}
                      </p>
                      <p className="text-xs" style={{ color: PALETTE.muted }}>
                        {ref.company}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: PALETTE.stone, border: "1px solid rgba(184,163,143,0.15)" }}
                  >
                    <Phone size={13} style={{ color: PALETTE.terra }} />
                    <span className="text-sm font-medium" style={{ color: PALETTE.ink }}>
                      {ref.contact}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          CONTACT
      ════════════════════════════════════════ */}
      <section
        id="contact"
        className="py-28 px-8 md:px-16 lg:px-24 relative overflow-hidden"
        style={{ background: PALETTE.terra }}
      >
        {/* decorative blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 55% 65% at 85% 15%, rgba(255,255,255,0.09) 0%, transparent 60%),
              radial-gradient(ellipse 40% 50% at 5% 85%, rgba(0,0,0,0.1) 0%, transparent 55%)
            `,
          }}
        />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute -right-32 -top-32 w-96 h-96 rounded-full pointer-events-none"
          style={{ border: "1px dashed rgba(255,255,255,0.12)" }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
          className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full pointer-events-none"
          style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div>
                <p
                  className="text-[10px] font-bold tracking-[0.2em] uppercase mb-4 block"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  Get In Touch
                </p>
                <h2
                  className="font-black leading-[1.04] text-white mb-7"
                  style={{
                    fontSize: "clamp(3rem, 6vw, 5rem)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Let's
                  <br />
                  Connect.
                </h2>
                <p
                  className="text-[1.05rem] leading-[1.75] mb-10 max-w-md"
                  style={{ color: "rgba(255,255,255,0.78)" }}
                >
                  Ready to bring exceptional service to your team. I'd love to hear about
                  how we might work together toward something meaningful.
                </p>
                <a
                  href="mailto:abenojachrist@gmail.com"
                  className="inline-flex items-center gap-3 px-9 py-4 rounded-full font-bold text-sm transition-all duration-300"
                  style={{
                    background: PALETTE.white,
                    color: PALETTE.terra,
                    boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = PALETTE.navy;
                    el.style.color = PALETTE.white;
                    el.style.transform = "translateY(-2px)";
                    el.style.boxShadow = "0 16px 48px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLAnchorElement;
                    el.style.background = PALETTE.white;
                    el.style.color = PALETTE.terra;
                    el.style.transform = "";
                    el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
                  }}
                >
                  Send a Message
                  <ArrowRight size={15} strokeWidth={2.5} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Mail, label: "Email", value: "abenojachrist@gmail.com" },
                  { icon: Phone, label: "Phone", value: "+63 993 649 4358" },
                  { icon: MapPin, label: "Location", value: "Davao City, Philippines" },
                  { icon: Briefcase, label: "Availability", value: "Open to full-time roles" },
                ].map(({ icon: Icon, label, value }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-5 px-6 py-5 rounded-2xl transition-all duration-300"
                    style={{
                      background: "rgba(255,255,255,0.11)",
                      border: "1px solid rgba(255,255,255,0.14)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background =
                        "rgba(255,255,255,0.17)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.background =
                        "rgba(255,255,255,0.11)";
                    }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(255,255,255,0.15)" }}
                    >
                      <Icon size={17} className="text-white" />
                    </div>
                    <div>
                      <p
                        className="text-[10px] font-bold tracking-[0.16em] uppercase mb-0.5"
                        style={{ color: "rgba(255,255,255,0.5)" }}
                      >
                        {label}
                      </p>
                      <p className="text-sm font-semibold text-white">{value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════ */}
      <footer
        className="py-8 px-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ background: PALETTE.navyDeep }}
      >
        <span
          className="text-sm font-black tracking-[0.22em] uppercase"
          style={{ color: PALETTE.terra }}
        >
          CDA
        </span>
        <p className="text-sm" style={{ color: "rgba(184,163,143,0.45)" }}>
          © 2025 Christine D. Abenoja · Crafted with care
        </p>
        <div className="flex items-center gap-1">
          {[PALETTE.terra, PALETTE.taupe, PALETTE.navy].map((c) => (
            <div key={c} className="w-2 h-2 rounded-full" style={{ background: c, opacity: 0.7 }} />
          ))}
        </div>
      </footer>
    </div>
  );
}
