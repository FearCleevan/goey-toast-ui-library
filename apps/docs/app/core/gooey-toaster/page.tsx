import Link from "next/link";
import { Zap, Palette, Layers } from "lucide-react";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";
import styles from "../../site.module.css";

export const metadata = {
  title: "GooeyToaster — gooey-toast",
  description: "The morphing blob toast overlay. Mount once at your app root.",
};

export default function GooeyToasterPage() {
  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <SiteNav />

      <main className={styles.pageMain}>
        <div className={styles.breadcrumb}>
          <Link href="/core" className={styles.breadcrumbLink}>Components</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>GooeyToaster</span>
        </div>

        <div className={styles.pageHero}>
          <div className={styles.pageBadge}>@gooey/core</div>
          <h1 className={styles.pageTitle}>
            <span className={styles.pageTitleGradient}>GooeyToaster</span>
          </h1>
          <p className={styles.pageDesc}>
            Renders the morphing blob toast overlay. It manages the toast queue,
            stack position, auto-dismiss timers, and the pill-to-card animation.
            Place it <strong className={styles.textWhite}>once</strong> near the
            root of your app, inside{" "}
            <code className={styles.inlineCode}>ThemeProvider</code>.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Setup</h2>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>app/_layout.tsx</span>
            </div>
            <pre className={styles.codePre}><code>{SETUP_CODE}</code></pre>
          </div>
          <div className={styles.calloutError}>
            <span className={styles.calloutIcon}>⚠</span>
            <div>
              Mount <strong>only one</strong>{" "}
              <code className={styles.inlineCode}>GooeyToaster</code> per app.
              Multiple instances will produce duplicate toasts.
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Props</h2>
          <div className={styles.propsTable}>
            <div className={styles.propsHeader}>
              <span>Prop</span>
              <span>Type</span>
              <span>Default</span>
              <span>Description</span>
            </div>
            {PROPS.map((p) => (
              <div key={p.name} className={styles.propsRow}>
                <code className={styles.propName}>{p.name}</code>
                <code className={styles.propType}>{p.type}</code>
                <code className={styles.propDefault}>{p.default}</code>
                <span className={styles.propDesc}>{p.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Position values</h2>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>type</span>
            </div>
            <pre className={styles.codePre}><code>{POSITION_TYPE}</code></pre>
          </div>
          <div className={styles.positionGrid}>
            {POSITIONS.map((p) => (
              <div key={p.value} className={`${styles.positionPill} ${p.isDefault ? styles.positionPillActive : ""}`}>
                <code>{p.value}</code>
                {p.isDefault && <span className={styles.positionDefault}>default</span>}
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Examples</h2>

          <h3 className={styles.subHeading}>Position</h3>
          <div className={styles.variantTabs}>
            {POSITION_EXAMPLES.map((ex) => (
              <div key={ex.label} className={styles.variantBlock}>
                <div className={`${styles.variantBadge} ${styles.variantBadgePurple}`}>
                  {ex.label}
                </div>
                <div className={styles.codeBlock}>
                  <pre className={styles.codePre}><code>{ex.code}</code></pre>
                </div>
              </div>
            ))}
          </div>

          <h3 className={styles.subHeading}>Stack limit &amp; duration</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>example</span>
            </div>
            <pre className={styles.codePre}><code>{STACK_CODE}</code></pre>
          </div>

          <h3 className={styles.subHeading}>Persistent toasts (no auto-dismiss)</h3>
          <p className={styles.sectionSubDesc}>
            Set <code className={styles.inlineCode}>defaultDuration={"{Infinity}"}</code> globally.
            Individual toasts can still override with their own{" "}
            <code className={styles.inlineCode}>duration</code> option.
          </p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>example</span>
            </div>
            <pre className={styles.codePre}><code>{PERSISTENT_CODE}</code></pre>
          </div>

          <h3 className={styles.subHeading}>Toast-only theme override</h3>
          <p className={styles.sectionSubDesc}>
            Style toasts independently from the rest of your app by passing a custom theme
            directly to <code className={styles.inlineCode}>GooeyToaster</code>.
          </p>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>example</span>
            </div>
            <pre className={styles.codePre}><code>{THEME_CODE}</code></pre>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>See also</h2>
          <div className={styles.cardGrid}>
            {SEE_ALSO.map((c) => (
              <Link key={c.title} href={c.href} className={styles.card}>
                <div className={styles.cardIcon}><c.Icon size={28} strokeWidth={1.6} /></div>
                <div className={styles.cardTitle}>{c.title}</div>
                <div className={styles.cardDesc}>{c.desc}</div>
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

const SETUP_CODE = `import { ThemeProvider, GooeyToaster } from "@gooey/core";

export default function RootLayout({ children }) {
  return (
    <ThemeProvider>
      {children}
      <GooeyToaster />
    </ThemeProvider>
  );
}`;

const PROPS = [
  { name: "position",             type: "TGooeyToastPosition", default: '"bottom-center"', desc: "Where toasts appear on screen." },
  { name: "maxToasts",            type: "number",              default: "3",               desc: "Maximum visible toasts in the stack at once." },
  { name: "defaultDuration",      type: "number",              default: "4000",            desc: "Auto-dismiss time in milliseconds." },
  { name: "defaultShowTimestamp", type: "boolean",             default: "false",           desc: "Show elapsed time label on each toast." },
  { name: "theme",                type: "ITheme",              default: "inherited",       desc: "Override the theme for toasts only — independent of ThemeProvider." },
];

const POSITION_TYPE = `type TGooeyToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"   // default
  | "bottom-right";`;

const POSITIONS = [
  { value: "top-left" },
  { value: "top-center" },
  { value: "top-right" },
  { value: "bottom-left" },
  { value: "bottom-center", isDefault: true },
  { value: "bottom-right" },
];

const POSITION_EXAMPLES = [
  { label: "bottom-center", code: `<GooeyToaster position="bottom-center" />` },
  { label: "top-right",     code: `<GooeyToaster position="top-right" />` },
  { label: "top-center",    code: `<GooeyToaster position="top-center" />` },
];

const STACK_CODE = `// Show up to 5 toasts, dismiss after 3 seconds
<GooeyToaster maxToasts={5} defaultDuration={3000} />`;

const PERSISTENT_CODE = `<GooeyToaster defaultDuration={Infinity} />

// This specific toast will still auto-dismiss after 4s:
gooeyToast.success("Saved!", { duration: 4000 });`;

const THEME_CODE = `import { GooeyToaster, createTheme } from "@gooey/core";

const darkToastTheme = createTheme({
  colors: { background: "#09090B", foreground: "#FAFAFA" },
});

<GooeyToaster theme={darkToastTheme} />`;

const SEE_ALSO = [
  { Icon: Zap,    title: "gooeyToast API", desc: "All toast methods — success, error, promise, update, dismiss.", href: "/core/gooey-toast" },
  { Icon: Palette,title: "Theming",        desc: "How to pass custom themes and use design tokens.",             href: "/core/theming" },
  { Icon: Layers, title: "All Components", desc: "Browse the full component library.",                           href: "/core" },
];
