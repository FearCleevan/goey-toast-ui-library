import Link from "next/link";
import { Unlock, Pencil, RefreshCw, Palette } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import styles from "../site.module.css";

export const metadata = {
  title: "CLI — gooey-toast",
  description: "shadcn-style CLI installer for gooey-toast components.",
};

export default function CliPage() {
  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <SiteNav />

      <main className={styles.pageMain}>
        {/* Hero */}
        <div className={styles.pageHero}>
          <div className={styles.pageBadge}>@gooey/cli</div>
          <h1 className={styles.pageTitle}>
            Copy components,{" "}
            <span className={styles.pageTitleGradient}>not packages</span>
          </h1>
          <p className={styles.pageDesc}>
            A shadcn-style CLI that copies component source directly into your project.
            You own the code — no locked-in abstractions, no update headaches. Just clean,
            typed TypeScript that you can modify freely.
          </p>
          <div className={styles.heroActions}>
            <Link href="/getting-started" className={styles.ctaPrimary}>Get Started →</Link>
          </div>
        </div>

        {/* Quick start terminal */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Quick start</h2>
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={styles.termDotRed} />
                <span className={styles.termDotYellow} />
                <span className={styles.termDotGreen} />
              </div>
              <span className={styles.terminalTitle}>Terminal</span>
            </div>
            <div className={styles.terminalBody}>
              {TERMINAL_LINES.map((line, i) => (
                <div key={i} className={`${styles.termLine} ${styles[`term_${line.type}`]}`}>
                  {line.type === "cmd" && <span className={styles.termPrompt}>$</span>}
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Commands */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Commands</h2>
          <div className={styles.cardGrid}>
            {COMMANDS.map((cmd) => (
              <div key={cmd.cmd} className={styles.card}>
                <code className={styles.cmdCode}>{cmd.cmd}</code>
                <div className={styles.cardTitle}>{cmd.title}</div>
                <div className={styles.cardDesc}>{cmd.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* gooey.config.json */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>gooey.config.json</h2>
          <p className={styles.sectionSubDesc}>
            Run <code className={styles.inlineCode}>gooey init</code> to generate
            the config file in your project root.
          </p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>gooey.config.json</span>
            </div>
            <pre className={styles.codePre}><code>{CONFIG_JSON}</code></pre>
          </div>
          <div className={styles.configTable}>
            {CONFIG_FIELDS.map((f) => (
              <div key={f.key} className={styles.configRow}>
                <code className={styles.configKey}>{f.key}</code>
                <span className={styles.configType}>{f.type}</span>
                <span className={styles.configDesc}>{f.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Add components */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Adding components</h2>
          <div className={styles.terminal}>
            <div className={styles.terminalHeader}>
              <div className={styles.terminalDots}>
                <span className={styles.termDotRed} />
                <span className={styles.termDotYellow} />
                <span className={styles.termDotGreen} />
              </div>
              <span className={styles.terminalTitle}>Terminal</span>
            </div>
            <div className={styles.terminalBody}>
              {ADD_LINES.map((line, i) => (
                <div key={i} className={`${styles.termLine} ${styles[`term_${line.type}`]}`}>
                  {line.type === "cmd" && <span className={styles.termPrompt}>$</span>}
                  <span>{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Why a CLI?</h2>
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

const TERMINAL_LINES = [
  { type: "cmd",     text: "npx @gooey/cli init" },
  { type: "output",  text: "✓ Detected Expo project" },
  { type: "output",  text: "✓ Created gooey.config.json" },
  { type: "output",  text: "✓ ThemeProvider added to app/_layout.tsx" },
  { type: "success", text: "Ready! Run gooey add <component> to get started." },
];

const ADD_LINES = [
  { type: "cmd",     text: "gooey add button input badge" },
  { type: "output",  text: "Fetching components..." },
  { type: "output",  text: "✓ Button → components/ui/Button.tsx" },
  { type: "output",  text: "✓ Input  → components/ui/Input.tsx" },
  { type: "output",  text: "✓ Badge  → components/ui/Badge.tsx" },
  { type: "success", text: "3 components added. Happy building!" },
];

const COMMANDS = [
  { cmd: "gooey init",          title: "Initialize project",  desc: "Creates gooey.config.json, detects your framework, and wires up ThemeProvider." },
  { cmd: "gooey add [component]",title: "Add a component",    desc: "Copies a typed component source file into your project. Multiple names supported." },
  { cmd: "gooey list",          title: "List components",     desc: "Shows all available components grouped by category with install status." },
  { cmd: "gooey diff [component]",title: "Diff updates",      desc: "Preview what changed in a component since you last installed it." },
];

const CONFIG_JSON = `{
  "style": "default",
  "tsx": true,
  "componentDir": "components/ui",
  "blockDir": "components/blocks",
  "theme": {
    "primary": "#7c3aed"
  }
}`;

const CONFIG_FIELDS = [
  { key: "style",         type: "string",  desc: '"default" or "minimal" — controls how much boilerplate is included.' },
  { key: "tsx",           type: "boolean", desc: "Output .tsx files (true) or .jsx files (false)." },
  { key: "componentDir",  type: "string",  desc: "Path where component files will be written." },
  { key: "blockDir",      type: "string",  desc: "Path where block screen files will be written." },
  { key: "theme.primary", type: "string",  desc: "Primary brand color applied to all components." },
];

const FEATURES = [
  { Icon: Unlock,    title: "No lock-in",          desc: "The code lives in your repo. Delete the CLI and you still own the components." },
  { Icon: Pencil,    title: "Fully editable",       desc: "Every file is plain TypeScript. Change anything — animations, styles, logic." },
  { Icon: RefreshCw, title: "Update on your terms", desc: "Use gooey diff to preview upstream changes before pulling them in." },
  { Icon: Palette,   title: "Brand-ready",          desc: "Components read your gooey.config.json theme and apply your primary color automatically." },
];
