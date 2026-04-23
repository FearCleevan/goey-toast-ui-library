import Link from "next/link";
import {
  Bell, Zap, MousePointerClick, TextCursorInput, CheckSquare, ToggleLeft,
  ChevronDown, Star, Square, Tag, CircleUser, PanelBottomOpen, Activity,
  LoaderCircle, Palette, Moon, Settings,
} from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import styles from "../site.module.css";

export const metadata = {
  title: "Components — gooey-toast",
  description: "20+ animated React Native components. Themed, accessible, TypeScript-first.",
};

export default function CorePage() {
  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <SiteNav />

      <main className={styles.pageMain}>
        {/* Hero */}
        <div className={styles.pageHero}>
          <div className={styles.pageBadge}>@gooey/core</div>
          <h1 className={styles.pageTitle}>
            20+ animated{" "}
            <span className={styles.pageTitleGradient}>components</span>
          </h1>
          <p className={styles.pageDesc}>
            Every component is TypeScript-first, fully themed, accessible, and ships with
            smooth animations out of the box. From toasts to modals — it all fits together.
          </p>
          <div className={styles.heroActions}>
            <Link href="/getting-started" className={styles.ctaPrimary}>Install →</Link>
            <Link href="/core/gooey-toaster" className={styles.ctaSecondary}>Toast Docs</Link>
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
            <pre className={styles.codePre}><code>pnpm add @gooey/core</code></pre>
          </div>
        </section>

        {/* Toast system */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Toast System</h2>
          <p className={styles.sectionSubDesc}>The flagship feature — morphing blob notifications with physics-based animations.</p>
          <div className={styles.cardGrid}>
            {TOAST_CARDS.map((c) => (
              <Link key={c.title} href={c.href} className={styles.card}>
                <div className={styles.cardIcon}><c.Icon size={28} strokeWidth={1.6} /></div>
                <div className={styles.cardTitle}>{c.title}</div>
                <div className={styles.cardDesc}>{c.desc}</div>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Inputs */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Inputs &amp; Forms</h2>
          <div className={styles.cardGrid}>
            {INPUT_CARDS.map((c) => (
              <Link key={c.title} href={c.href} className={styles.card}>
                <div className={styles.cardIcon}><c.Icon size={28} strokeWidth={1.6} /></div>
                <div className={styles.cardTitle}>{c.title}</div>
                <div className={styles.cardDesc}>{c.desc}</div>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Display */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Display &amp; Layout</h2>
          <div className={styles.cardGrid}>
            {DISPLAY_CARDS.map((c) => (
              <Link key={c.title} href={c.href} className={styles.card}>
                <div className={styles.cardIcon}><c.Icon size={28} strokeWidth={1.6} /></div>
                <div className={styles.cardTitle}>{c.title}</div>
                <div className={styles.cardDesc}>{c.desc}</div>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Theming */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Theming &amp; Design Tokens</h2>
          <div className={styles.cardGrid}>
            {THEME_CARDS.map((c) => (
              <Link key={c.title} href={c.href} className={styles.card}>
                <div className={styles.cardIcon}><c.Icon size={28} strokeWidth={1.6} /></div>
                <div className={styles.cardTitle}>{c.title}</div>
                <div className={styles.cardDesc}>{c.desc}</div>
                <span className={styles.cardArrow}>→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* All exports table */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Full export list</h2>
          <div className={styles.exportTable}>
            {EXPORTS.map((row) => (
              <div key={row.name} className={styles.exportRow}>
                <code className={styles.exportName}>{row.name}</code>
                <span className={styles.exportKind}>{row.kind}</span>
                <span className={styles.exportDesc}>{row.desc}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

const TOAST_CARDS = [
  { Icon: Bell, title: "GooeyToaster", desc: "The toast container. Place once at the root of your app.", href: "/core/gooey-toaster" },
  { Icon: Zap,  title: "gooeyToast",  desc: "Imperative API to fire toasts — success, error, warning, info.", href: "/core/gooey-toast" },
];

const INPUT_CARDS = [
  { Icon: MousePointerClick, title: "Button",   desc: "Solid, outline, and ghost variants with loading and disabled states.", href: "/core/button" },
  { Icon: TextCursorInput,   title: "Input",    desc: "Animated floating-label text field with validation states.",          href: "/core/input" },
  { Icon: CheckSquare,       title: "Checkbox", desc: "Animated checkmark with indeterminate support.",                     href: "/core/checkbox" },
  { Icon: ToggleLeft,        title: "Switch",   desc: "iOS-style toggle switch with spring animation.",                     href: "/core/switch" },
  { Icon: ChevronDown,       title: "Select",   desc: "Native picker wrapper with themed styling.",                         href: "/core/select" },
  { Icon: Star,              title: "Rating",   desc: "Star rating input with half-star support.",                          href: "/core/rating" },
];

const DISPLAY_CARDS = [
  { Icon: Square,          title: "Card",     desc: "Composable surface with header, body, and footer slots.", href: "/core/card" },
  { Icon: Tag,             title: "Badge",    desc: "Status badges in 5 semantic variants.",                   href: "/core/badge" },
  { Icon: CircleUser,      title: "Avatar",   desc: "Image avatar with initials fallback and status dot.",     href: "/core/avatar" },
  { Icon: PanelBottomOpen, title: "Modal",    desc: "Animated bottom sheet and center modal.",                 href: "/core/modal" },
  { Icon: Activity,        title: "Progress", desc: "Linear and circular progress indicators.",                href: "/core/progress" },
  { Icon: LoaderCircle,    title: "Skeleton", desc: "Shimmer placeholder for loading states.",                 href: "/core/skeleton" },
];

const THEME_CARDS = [
  { Icon: Palette,  title: "ThemeProvider", desc: "Wrap your app to inject the design token context.", href: "/core/theming" },
  { Icon: Moon,     title: "useTheme",      desc: "Access and switch themes from any component.",      href: "/core/theming" },
  { Icon: Settings, title: "createTheme",   desc: "Extend the default theme with your brand tokens.",  href: "/core/theming" },
];

const EXPORTS = [
  { name: "GooeyToaster",  kind: "component", desc: "Toast container — place once at app root" },
  { name: "gooeyToast",    kind: "function",  desc: "Imperative toast API (success / error / warning / info)" },
  { name: "ThemeProvider", kind: "component", desc: "Design token provider" },
  { name: "createTheme",   kind: "function",  desc: "Merge custom tokens into default theme" },
  { name: "useTheme",      kind: "hook",      desc: "Access current theme and toggle dark mode" },
  { name: "Button",        kind: "component", desc: "Pressable button with solid / outline / ghost variants" },
  { name: "Input",         kind: "component", desc: "Floating-label text field" },
  { name: "Checkbox",      kind: "component", desc: "Animated checkbox" },
  { name: "Switch",        kind: "component", desc: "Toggle switch" },
  { name: "Select",        kind: "component", desc: "Native picker" },
  { name: "Rating",        kind: "component", desc: "Star rating" },
  { name: "Card",          kind: "component", desc: "Surface container" },
  { name: "Badge",         kind: "component", desc: "Status label" },
  { name: "Avatar",        kind: "component", desc: "User avatar" },
  { name: "Modal",         kind: "component", desc: "Bottom sheet / dialog" },
  { name: "Progress",      kind: "component", desc: "Linear + circular progress" },
  { name: "Skeleton",      kind: "component", desc: "Loading placeholder" },
];
