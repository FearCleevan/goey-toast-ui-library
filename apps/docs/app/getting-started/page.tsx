import Link from "next/link";
import { Smartphone, Package, Code2, Server, Bell, Palette, Layers, Terminal } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import styles from "../site.module.css";

export const metadata = {
  title: "Getting Started — gooey-toast",
  description: "Install gooey-toast and build your first toast in minutes.",
};

export default function GettingStartedPage() {
  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <SiteNav />

      <main className={styles.pageMain}>
        {/* Hero */}
        <div className={styles.pageHero}>
          <div className={styles.pageBadge}>Quick Start</div>
          <h1 className={styles.pageTitle}>
            Get up and running{" "}
            <span className={styles.pageTitleGradient}>in minutes</span>
          </h1>
          <p className={styles.pageDesc}>
            Install the package, wrap your app with{" "}
            <code className={styles.inlineCode}>ThemeProvider</code> and{" "}
            <code className={styles.inlineCode}>GooeyToaster</code>, and
            start triggering beautiful toasts from anywhere in your app.
          </p>
        </div>

        {/* Requirements */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Requirements</h2>
          <div className={styles.reqGrid}>
            {REQUIREMENTS.map((r) => (
              <div key={r.label} className={styles.reqCard}>
                <r.Icon size={22} strokeWidth={1.6} color="#a78bfa" />
                <div>
                  <div className={styles.reqLabel}>{r.label}</div>
                  <div className={styles.reqValue}>{r.value}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Installation</h2>
          <div className={styles.stepList}>
            {STEPS.map((step, i) => (
              <div key={step.title} className={styles.step}>
                <div className={styles.stepNum}>{i + 1}</div>
                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  {step.code && (
                    <div className={styles.codeBlock}>
                      <div className={styles.codeHeader}>
                        <div className={styles.codeDots}>
                          <span className={styles.codeDotRed} />
                          <span className={styles.codeDotYellow} />
                          <span className={styles.codeDotGreen} />
                        </div>
                        <span className={styles.codeFilename}>{step.file ?? "terminal"}</span>
                      </div>
                      <pre className={styles.codePre}><code>{step.code}</code></pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Package managers */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Package managers</h2>
          <p className={styles.sectionSubDesc}>Choose your preferred package manager:</p>
          <div className={styles.tabCodeGroup}>
            {PKG_MANAGERS.map((pm) => (
              <div key={pm.label} className={styles.tabCodeItem}>
                <div className={styles.tabCodeLabel}>{pm.label}</div>
                <div className={styles.codeBlock}>
                  <pre className={styles.codePre}><code>{pm.cmd}</code></pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's next */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>What&apos;s next?</h2>
          <div className={styles.cardGrid}>
            {NEXT_CARDS.map((card) => (
              <Link key={card.title} href={card.href} className={styles.card}>
                <div className={styles.cardIcon}><card.Icon size={28} strokeWidth={1.6} /></div>
                <div className={styles.cardTitle}>{card.title}</div>
                <div className={styles.cardDesc}>{card.desc}</div>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

const REQUIREMENTS = [
  { Icon: Smartphone, label: "React Native", value: "≥ 0.73" },
  { Icon: Package,    label: "Expo SDK",     value: "≥ 50 (optional)" },
  { Icon: Code2,      label: "TypeScript",   value: "≥ 5.0" },
  { Icon: Server,     label: "Node.js",      value: "≥ 18" },
];

const STEPS = [
  {
    title: "Install the package",
    desc: "Add @gooey/core to your React Native or Expo project.",
    code: "pnpm add @gooey/core\n# or\nnpx expo install @gooey/core",
    file: "terminal",
  },
  {
    title: "Wrap your app",
    desc: "Add ThemeProvider and GooeyToaster to your root layout. Place GooeyToaster as a sibling to your app content, not a parent.",
    code: `import { ThemeProvider, GooeyToaster } from "@gooey/core";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
      <GooeyToaster position="bottom-center" />
    </ThemeProvider>
  );
}`,
    file: "app/_layout.tsx",
  },
  {
    title: "Trigger your first toast",
    desc: "Import gooeyToast and call it from anywhere — a button press, an API response, or a form submission.",
    code: `import { gooeyToast } from "@gooey/core";

// Success
gooeyToast.success("Profile saved!", {
  description: "Your changes have been applied.",
});

// Error
gooeyToast.error("Something went wrong", {
  description: "Please try again.",
});`,
    file: "screens/Profile.tsx",
  },
  {
    title: "Customize the theme",
    desc: "Pass a custom theme to ThemeProvider to match your brand colors, fonts, and motion preferences.",
    code: `import { ThemeProvider, createTheme } from "@gooey/core";

const theme = createTheme({
  colors: { primary: "#7c3aed" },
  borderRadius: { toast: 16 },
});

export default function App() {
  return <ThemeProvider theme={theme}>{/* ... */}</ThemeProvider>;
}`,
    file: "app/_layout.tsx",
  },
];

const PKG_MANAGERS = [
  { label: "pnpm", cmd: "pnpm add @gooey/core" },
  { label: "npm",  cmd: "npm install @gooey/core" },
  { label: "yarn", cmd: "yarn add @gooey/core" },
  { label: "bun",  cmd: "bun add @gooey/core" },
  { label: "expo", cmd: "npx expo install @gooey/core" },
];

const NEXT_CARDS = [
  { Icon: Bell,     title: "Toast System",    desc: "Explore all toast variants, positions, and custom render options.", href: "/core/gooey-toaster" },
  { Icon: Palette,  title: "Theming",         desc: "Learn how to customize colors, spacing, and motion tokens.",       href: "/core/theming" },
  { Icon: Layers,   title: "All Components",  desc: "Browse the full component library — buttons, inputs, modals, and more.", href: "/core" },
  { Icon: Terminal, title: "CLI Tools",       desc: "Use the CLI to add components directly to your source tree.",      href: "/cli" },
];
