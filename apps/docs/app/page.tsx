import Link from "next/link";
import { Bell, Palette, BarChart2, Terminal, Package, LayoutGrid, Wrench } from "lucide-react";
import { SiteNav } from "./components/SiteNav";
import { SiteFooter } from "./components/SiteFooter";
import { ShowcaseSection } from "./components/ShowcaseSection";
import styles from "./page.module.css";

export const metadata = {
  title: "gooey-toast — React Native UI Library",
  description:
    "Morphing blob toasts and a full React Native UI library — batteries included.",
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      <SiteNav />

      {/* ── Hero ── */}
      <section className={styles.hero}>
        <div className={styles.heroBlob1} />
        <div className={styles.heroBlob2} />
        <div className={styles.heroBlob3} />

        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <span className={styles.heroBadgeDot} />
            React Native &amp; Expo UI Library
          </div>

          <h1 className={styles.heroTitle}>
            Animated toasts.
            <br />
            <span className={styles.heroTitleGradient}>
              Complete UI ecosystem.
            </span>
          </h1>

          <p className={styles.heroDesc}>
            Morphing blob toasts, 20+ animated components, themed charts,
            pre-built screen blocks, and a CLI installer — all for React Native
            &amp; Expo. Batteries included.
          </p>

          <div className={styles.heroCtas}>
            <Link href="/getting-started" className={styles.ctaPrimary}>
              Get Started →
            </Link>
            <Link href="/core" className={styles.ctaSecondary}>
              Components
            </Link>
            <a
              href="https://github.com/FearCleevan/goey-toast-ui-library"
              className={styles.ctaGhost}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>

          <div className={styles.heroInstall}>
            <span className={styles.installPrompt}>$</span>
            <span className={styles.installCmd}>pnpm add @gooey/core</span>
          </div>
        </div>

        {/* Phone mockup */}
        <div className={styles.heroVisual}>
          <div className={styles.phone}>
            <div className={styles.phoneScreen}>
              <div className={styles.phoneStatusBar}>
                <span>9:41</span>
                <span>● ● ●</span>
              </div>
              <div className={styles.phoneContent}>
                <div className={`${styles.toast} ${styles.toastSuccess}`}>
                  <div className={styles.toastIconWrap}>✓</div>
                  <div>
                    <div className={styles.toastTitle}>Changes saved!</div>
                    <div className={styles.toastDesc}>Your project was saved successfully.</div>
                  </div>
                </div>
                <div className={`${styles.toast} ${styles.toastError}`}>
                  <div className={styles.toastIconWrap}>✕</div>
                  <div>
                    <div className={styles.toastTitle}>Upload failed</div>
                    <div className={styles.toastDesc}>Please try again later.</div>
                  </div>
                </div>
                <div className={`${styles.toast} ${styles.toastInfo}`}>
                  <div className={styles.toastIconWrap}>i</div>
                  <div>
                    <div className={styles.toastTitle}>New version available</div>
                    <div className={styles.toastDesc}>Update to v1.2.0 now.</div>
                  </div>
                </div>
                <div className={`${styles.toast} ${styles.toastWarning}`}>
                  <div className={styles.toastIconWrap}>!</div>
                  <div>
                    <div className={styles.toastTitle}>Low storage</div>
                    <div className={styles.toastDesc}>Only 2 GB remaining.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className={styles.statsBar}>
        <div className={styles.statsInner}>
          {[
            { num: "20+", label: "Components" },
            { num: "5", label: "Chart Types" },
            { num: "5", label: "Screen Blocks" },
            { num: "100%", label: "TypeScript" },
            { num: "MIT", label: "License" },
          ].map((s) => (
            <div key={s.label} className={styles.statItem}>
              <span className={styles.statNum}>{s.num}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Features ── */}
      <section>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Everything you need</h2>
            <p className={styles.sectionDesc}>
              A complete UI ecosystem built from the ground up for React Native
              performance and developer experience.
            </p>
          </div>
          <div className={styles.featureGrid}>
            {FEATURES.map((f) => (
              <Link key={f.title} href={f.href} className={styles.featureCard}>
                <div className={styles.featureIcon}><f.Icon size={28} strokeWidth={1.6} /></div>
                <h3 className={styles.featureTitle}>{f.title}</h3>
                <p className={styles.featureDesc}>{f.desc}</p>
                <span className={styles.featureLink}>Learn more →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Interactive Component Showcase ── */}
      <section className={styles.showcase}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Beautiful by default</h2>
            <p className={styles.sectionDesc}>
              Every component ships with smooth animations, full theming
              support, and dark mode out of the box. Try them live.
            </p>
          </div>
          <ShowcaseSection />
        </div>
      </section>

      {/* ── Quick Start ── */}
      <section>
        <div className={styles.sectionInner}>
          <div className={styles.quickstartGrid}>
            <div className={styles.quickstartText}>
              <h2 className={styles.sectionTitle}>
                Up and running
                <br />
                in minutes
              </h2>
              <p className={styles.sectionDesc}>
                Install the package, wrap your app with{" "}
                <code>ThemeProvider</code> and <code>GooeyToaster</code>, and
                start triggering beautiful toasts from anywhere in your app.
              </p>
              <div className={styles.quickstartLinks}>
                <Link href="/getting-started" className={styles.ctaPrimary}>
                  Read the Guide →
                </Link>
                <Link href="/core/gooey-toast" className={styles.ctaSecondary}>
                  Toast API
                </Link>
              </div>
            </div>

            <div className={styles.codeBlock}>
              <div className={styles.codeHeader}>
                <div className={styles.codeDots}>
                  <span className={styles.codeDotRed} />
                  <span className={styles.codeDotYellow} />
                  <span className={styles.codeDotGreen} />
                </div>
                <span className={styles.codeFilename}>app/_layout.tsx</span>
              </div>
              <pre className={styles.codePre}>
                <code>{CODE_EXAMPLE}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Package Ecosystem ── */}
      <section className={styles.packages}>
        <div className={styles.sectionInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>The ecosystem</h2>
            <p className={styles.sectionDesc}>
              Four focused packages, one cohesive system. Install only what you need.
            </p>
          </div>
          <div className={styles.packageGrid}>
            {PACKAGES.map((pkg) => (
              <Link key={pkg.name} href={pkg.href} className={styles.packageCard}>
                <div className={styles.packageIcon}><pkg.Icon size={24} strokeWidth={1.6} /></div>
                <div className={styles.packageName}>{pkg.name}</div>
                <div className={styles.packageDesc}>{pkg.desc}</div>
                <div className={styles.packageItems}>
                  {pkg.items.map((item) => (
                    <span key={item} className={styles.packageItem}>{item}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaBanner}>
        <div className={styles.ctaBannerInner}>
          <h2 className={styles.ctaBannerTitle}>
            Ready to build something beautiful?
          </h2>
          <p className={styles.ctaBannerDesc}>
            Join developers building stunning React Native apps with gooey-toast.
          </p>
          <div className={styles.ctaBannerActions}>
            <Link href="/getting-started" className={styles.ctaPrimary}>
              Get Started →
            </Link>
            <a
              href="https://github.com/FearCleevan/goey-toast-ui-library"
              className={styles.ctaSecondary}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

/* ── Data ─────────────────────────────────────────────────────────────────── */

const FEATURES = [
  {
    Icon: Bell,
    title: "Morphing Toast System",
    desc: "Watch toasts transform with a physics-based blob animation. Pill to card and back — buttery smooth on every frame.",
    href: "/core/gooey-toaster",
  },
  {
    Icon: Palette,
    title: "Full Design System",
    desc: "Design tokens for colors, spacing, typography, and motion. Light and dark themes, plus createTheme() for your brand.",
    href: "/core/theming",
  },
  {
    Icon: BarChart2,
    title: "Native Charts",
    desc: "Bar, Line, Area, Pie, and Donut charts powered by Victory Native — all auto-themed to your design system.",
    href: "/charts",
  },
  {
    Icon: Terminal,
    title: "CLI Installer",
    desc: "shadcn-style component installer. Run gooey add button and the component source lives in your project.",
    href: "/cli",
  },
];

const PACKAGES = [
  {
    Icon: Package,
    name: "@gooey/core",
    desc: "Toast system, theming engine, and 20+ animated components.",
    href: "/core",
    items: ["GooeyToaster", "ThemeProvider", "Button", "Input", "Modal"],
  },
  {
    Icon: BarChart2,
    name: "@gooey/charts",
    desc: "Native chart components, all themed to your design system.",
    href: "/charts",
    items: ["BarChart", "LineChart", "AreaChart", "PieChart", "DonutChart"],
  },
  {
    Icon: LayoutGrid,
    name: "@gooey/blocks",
    desc: "Pre-built screen compositions for common app flows.",
    href: "/blocks",
    items: ["SignInBlock", "OnboardingFlow", "StatsCard", "ProductCard"],
  },
  {
    Icon: Wrench,
    name: "@gooey/cli",
    desc: "shadcn-style component installer. Copy, don't install.",
    href: "/cli",
    items: ["gooey init", "gooey add", "gooey list", "gooey diff"],
  },
];

const CODE_EXAMPLE = `import { ThemeProvider, GooeyToaster } from "@gooey/core";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
      <GooeyToaster position="bottom-center" />
    </ThemeProvider>
  );
}

// Trigger from anywhere in your app:
import { gooeyToast } from "@gooey/core";

gooeyToast.success("Saved!", {
  description: "Your changes have been saved.",
});

gooeyToast.error("Upload failed", {
  description: "Please check your connection.",
});`;
