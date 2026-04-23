import Link from "next/link";
import { Palette, Smartphone, MessageSquare, Code2, Moon, Zap } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import styles from "../site.module.css";

export const metadata = {
  title: "Charts — gooey-toast",
  description: "Native chart components for React Native — auto-themed to your design system.",
};

export default function ChartsPage() {
  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <SiteNav />

      <main className={styles.pageMain}>
        {/* Hero */}
        <div className={styles.pageHero}>
          <div className={styles.pageBadge}>@gooey/charts</div>
          <h1 className={styles.pageTitle}>
            Native charts,{" "}
            <span className={styles.pageTitleGradient}>zero config</span>
          </h1>
          <p className={styles.pageDesc}>
            Bar, Line, Area, Pie, and Donut charts powered by Victory Native XL.
            Every chart reads from your design system tokens automatically — change your
            theme, all charts update instantly.
          </p>
          <div className={styles.heroActions}>
            <Link href="/getting-started" className={styles.ctaPrimary}>Install →</Link>
          </div>
        </div>

        {/* Install */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Installation</h2>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>terminal</span>
            </div>
            <pre className={styles.codePre}><code>pnpm add @gooey/charts</code></pre>
          </div>
        </section>

        {/* Chart previews */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Chart types</h2>
          <div className={styles.chartGrid}>
            {CHARTS.map((chart) => (
              <Link key={chart.title} href={chart.href} className={styles.chartCard}>
                <div className={styles.chartPreview} aria-hidden="true">
                  {chart.preview}
                </div>
                <div className={styles.chartCardBody}>
                  <div className={styles.chartTitle}>{chart.title}</div>
                  <div className={styles.chartDesc}>{chart.desc}</div>
                  <span className={styles.cardArrow}>View docs →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Toast integration */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Toast integration</h2>
          <p className={styles.sectionSubDesc}>
            Charts work seamlessly with the toast system — fire a toast when data refreshes,
            a threshold is crossed, or a slice is tapped.
          </p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>screens/Dashboard.tsx</span>
            </div>
            <pre className={styles.codePre}><code>{TOAST_CODE}</code></pre>
          </div>
        </section>

        {/* Feature cards */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Features</h2>
          <div className={styles.cardGrid}>
            {FEATURES.map((f) => (
              <div key={f.title} className={styles.card}>
                <div className={styles.cardIcon}><f.Icon size={28} strokeWidth={1.6} /></div>
                <div className={styles.cardTitle}>{f.title}</div>
                <div className={styles.cardDesc}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

const BAR_PREVIEW = (
  <svg viewBox="0 0 160 80" width="100%" height="80">
    {[
      { x: 10, h: 45, c: "#7c3aed" },
      { x: 34, h: 62, c: "#8b5cf6" },
      { x: 58, h: 38, c: "#7c3aed" },
      { x: 82, h: 70, c: "#a855f7" },
      { x: 106, h: 52, c: "#7c3aed" },
      { x: 130, h: 58, c: "#8b5cf6" },
    ].map((b, i) => (
      <rect key={i} x={b.x} y={80 - b.h} width="18" height={b.h} rx="3" fill={b.c} opacity="0.85" />
    ))}
  </svg>
);

const LINE_PREVIEW = (
  <svg viewBox="0 0 160 80" width="100%" height="80">
    <polyline
      points="10,65 35,42 60,55 85,20 110,35 135,15 155,28"
      fill="none" stroke="#8b5cf6" strokeWidth="2.5"
      strokeLinecap="round" strokeLinejoin="round"
    />
    {[10, 35, 60, 85, 110, 135, 155].map((x, i) => {
      const ys = [65, 42, 55, 20, 35, 15, 28];
      return <circle key={i} cx={x} cy={ys[i]} r="3.5" fill="#a855f7" />;
    })}
  </svg>
);

const AREA_PREVIEW = (
  <svg viewBox="0 0 160 80" width="100%" height="80">
    <defs>
      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path d="M10,60 L35,38 L60,48 L85,18 L110,32 L135,12 L155,25 L155,80 L10,80 Z" fill="url(#areaGrad)" />
    <polyline points="10,60 35,38 60,48 85,18 110,32 135,12 155,25" fill="none" stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const PIE_PREVIEW = (
  <svg viewBox="0 0 80 80" width="80" height="80">
    <circle cx="40" cy="40" r="30" fill="none" stroke="#7c3aed" strokeWidth="20" strokeDasharray="75 125" strokeDashoffset="0" />
    <circle cx="40" cy="40" r="30" fill="none" stroke="#a855f7" strokeWidth="20" strokeDasharray="45 155" strokeDashoffset="-75" />
    <circle cx="40" cy="40" r="30" fill="none" stroke="#6366f1" strokeWidth="20" strokeDasharray="30 170" strokeDashoffset="-120" />
    <circle cx="40" cy="40" r="20" fill="#111113" />
  </svg>
);

const DONUT_PREVIEW = (
  <svg viewBox="0 0 80 80" width="80" height="80">
    <circle cx="40" cy="40" r="28" fill="none" stroke="#27272a" strokeWidth="14" />
    <circle cx="40" cy="40" r="28" fill="none" stroke="#7c3aed" strokeWidth="14" strokeDasharray="88 88" strokeDashoffset="22" />
    <circle cx="40" cy="40" r="28" fill="none" stroke="#a855f7" strokeWidth="14" strokeDasharray="44 132" strokeDashoffset="-66" />
    <text x="40" y="44" textAnchor="middle" fill="#fafafa" fontSize="10" fontWeight="700">70%</text>
  </svg>
);

const CHARTS = [
  { title: "BarChart",   desc: "Grouped and stacked bars with animated entry.",           href: "/charts/bar",   preview: BAR_PREVIEW },
  { title: "LineChart",  desc: "Smooth bezier lines with interactive tooltips.",          href: "/charts/line",  preview: LINE_PREVIEW },
  { title: "AreaChart",  desc: "Gradient-filled area with multi-series support.",         href: "/charts/area",  preview: AREA_PREVIEW },
  { title: "PieChart",   desc: "Radial slices with tap-to-explode interaction.",          href: "/charts/pie",   preview: PIE_PREVIEW },
  { title: "DonutChart", desc: "Donut variant with center label slot.",                   href: "/charts/donut", preview: DONUT_PREVIEW },
];

const FEATURES = [
  { Icon: Palette,      title: "Auto-themed",          desc: "Reads from ThemeProvider — your brand colors apply automatically." },
  { Icon: Smartphone,   title: "Native performance",   desc: "Built on Victory Native XL with Reanimated 3 worklets." },
  { Icon: MessageSquare,title: "Interactive tooltips",  desc: "Tap or pan to reveal data points with smooth spring animations." },
  { Icon: Code2,        title: "TypeScript",           desc: "Full type safety for data, axis, and style props." },
  { Icon: Moon,         title: "Dark mode",            desc: "All charts switch with useTheme() — no extra config." },
  { Icon: Zap,          title: "Tree-shakeable",       desc: "Import only the charts you use — zero unused bytes." },
];

const TOAST_CODE = `import { BarChart } from "@gooey/charts";
import { gooeyToast } from "@gooey/core";

const data = [
  { month: "Jan", revenue: 12400 },
  { month: "Feb", revenue: 18200 },
  { month: "Mar", revenue: 15800 },
];

export function Dashboard() {
  return (
    <BarChart
      data={data}
      xKey="month"
      yKey="revenue"
      onBarPress={(item) =>
        gooeyToast.info(\`\${item.month}: $\${item.revenue.toLocaleString()}\`)
      }
    />
  );
}`;
