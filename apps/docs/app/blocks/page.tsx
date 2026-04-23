import Link from "next/link";
import { FolderOpen, Palette, Bell, Code2 } from "lucide-react";
import { SiteNav } from "../components/SiteNav";
import { SiteFooter } from "../components/SiteFooter";
import styles from "../site.module.css";

export const metadata = {
  title: "Blocks — gooey-toast",
  description: "Pre-built screen compositions for React Native — auth, onboarding, dashboards, and more.",
};

export default function BlocksPage() {
  return (
    <div className={styles.page}>
      <div className={styles.blob1} />
      <div className={styles.blob2} />
      <div className={styles.blob3} />

      <SiteNav />

      <main className={styles.pageMain}>
        {/* Hero */}
        <div className={styles.pageHero}>
          <div className={styles.pageBadge}>@gooey/blocks</div>
          <h1 className={styles.pageTitle}>
            Production screens,{" "}
            <span className={styles.pageTitleGradient}>ready to ship</span>
          </h1>
          <p className={styles.pageDesc}>
            Pre-built, fully themed screen compositions — auth flows, onboarding, dashboards,
            e-commerce, and settings. Copy the source into your project and customize freely.
          </p>
          <div className={styles.heroActions}>
            <Link href="/getting-started" className={styles.ctaPrimary}>Install →</Link>
            <Link href="/cli" className={styles.ctaSecondary}>Use the CLI</Link>
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
            <pre className={styles.codePre}><code>{`pnpm add @gooey/blocks\n# or add a single block via CLI:\ngooey add sign-in-block`}</code></pre>
          </div>
        </section>

        {/* Auth */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Authentication</h2>
          <div className={styles.blockGrid}>
            {AUTH_BLOCKS.map((b) => (
              <Link key={b.title} href={b.href} className={styles.blockCard}>
                <div className={styles.blockMockup}>{b.mockup}</div>
                <div className={styles.blockCardBody}>
                  <div className={styles.blockTitle}>{b.title}</div>
                  <div className={styles.blockDesc}>{b.desc}</div>
                  <span className={styles.cardArrow}>View block →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Onboarding */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Onboarding</h2>
          <div className={styles.blockGrid}>
            {ONBOARDING_BLOCKS.map((b) => (
              <Link key={b.title} href={b.href} className={styles.blockCard}>
                <div className={styles.blockMockup}>{b.mockup}</div>
                <div className={styles.blockCardBody}>
                  <div className={styles.blockTitle}>{b.title}</div>
                  <div className={styles.blockDesc}>{b.desc}</div>
                  <span className={styles.cardArrow}>View block →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Dashboard */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Dashboard</h2>
          <div className={styles.blockGrid}>
            {DASHBOARD_BLOCKS.map((b) => (
              <Link key={b.title} href={b.href} className={styles.blockCard}>
                <div className={styles.blockMockup}>{b.mockup}</div>
                <div className={styles.blockCardBody}>
                  <div className={styles.blockTitle}>{b.title}</div>
                  <div className={styles.blockDesc}>{b.desc}</div>
                  <span className={styles.cardArrow}>View block →</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Philosophy */}
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Copy, don&apos;t install</h2>
          <div className={styles.cardGrid}>
            {PHILOSOPHY.map((f) => (
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

function SignInMockup() {
  return (
    <svg viewBox="0 0 100 160" width="100" height="160" aria-hidden="true">
      <rect width="100" height="160" rx="12" fill="#18181b" />
      <rect x="30" y="18" width="40" height="40" rx="20" fill="#7c3aed" opacity="0.8" />
      <rect x="12" y="72" width="76" height="10" rx="5" fill="#27272a" />
      <rect x="12" y="88" width="76" height="10" rx="5" fill="#27272a" />
      <rect x="22" y="108" width="56" height="12" rx="6" fill="#7c3aed" />
      <rect x="32" y="130" width="36" height="6" rx="3" fill="#3f3f46" />
    </svg>
  );
}

function RegisterMockup() {
  return (
    <svg viewBox="0 0 100 160" width="100" height="160" aria-hidden="true">
      <rect width="100" height="160" rx="12" fill="#18181b" />
      <rect x="12" y="20" width="76" height="8" rx="4" fill="#3f3f46" />
      <rect x="12" y="36" width="76" height="10" rx="5" fill="#27272a" />
      <rect x="12" y="52" width="76" height="10" rx="5" fill="#27272a" />
      <rect x="12" y="68" width="76" height="10" rx="5" fill="#27272a" />
      <rect x="12" y="84" width="76" height="10" rx="5" fill="#27272a" />
      <rect x="22" y="104" width="56" height="12" rx="6" fill="#7c3aed" />
      <rect x="12" y="128" width="36" height="6" rx="3" fill="#3f3f46" />
      <rect x="52" y="128" width="36" height="6" rx="3" fill="#3f3f46" />
    </svg>
  );
}

function OnboardMockup() {
  return (
    <svg viewBox="0 0 100 160" width="100" height="160" aria-hidden="true">
      <rect width="100" height="160" rx="12" fill="#18181b" />
      <rect x="15" y="15" width="70" height="70" rx="10" fill="#1e1e24" />
      <rect x="35" y="35" width="30" height="30" rx="15" fill="#8b5cf6" opacity="0.7" />
      <rect x="25" y="96" width="50" height="8" rx="4" fill="#d4d4d8" />
      <rect x="18" y="110" width="64" height="6" rx="3" fill="#52525b" />
      <rect x="18" y="120" width="64" height="6" rx="3" fill="#52525b" />
      <rect x="22" y="138" width="56" height="12" rx="6" fill="#7c3aed" />
    </svg>
  );
}

function StatsMockup() {
  return (
    <svg viewBox="0 0 100 160" width="100" height="160" aria-hidden="true">
      <rect width="100" height="160" rx="12" fill="#18181b" />
      <rect x="8" y="12" width="40" height="32" rx="6" fill="#27272a" />
      <rect x="52" y="12" width="40" height="32" rx="6" fill="#27272a" />
      <rect x="8" y="50" width="84" height="50" rx="6" fill="#1e1e24" />
      {[10, 22, 34, 46, 58, 70, 82].map((x, i) => {
        const hs = [30, 45, 20, 55, 38, 48, 25];
        return <rect key={i} x={x + 6} y={90 - hs[i]} width="8" height={hs[i]} rx="2" fill="#8b5cf6" opacity="0.8" />;
      })}
      <rect x="8" y="108" width="84" height="8" rx="4" fill="#27272a" />
      <rect x="8" y="122" width="84" height="8" rx="4" fill="#27272a" />
      <rect x="8" y="136" width="84" height="8" rx="4" fill="#27272a" />
    </svg>
  );
}

function ProductMockup() {
  return (
    <svg viewBox="0 0 100 160" width="100" height="160" aria-hidden="true">
      <rect width="100" height="160" rx="12" fill="#18181b" />
      <rect x="8" y="8" width="84" height="72" rx="8" fill="#27272a" />
      <rect x="28" y="20" width="44" height="44" rx="8" fill="#3f3f46" />
      <rect x="8" y="88" width="55" height="8" rx="4" fill="#d4d4d8" />
      <rect x="8" y="102" width="40" height="6" rx="3" fill="#52525b" />
      <rect x="8" y="114" width="30" height="8" rx="4" fill="#22c55e" />
      <rect x="22" y="134" width="56" height="14" rx="7" fill="#7c3aed" />
    </svg>
  );
}

const AUTH_BLOCKS = [
  { title: "SignInBlock",    desc: "Email + password sign-in with social login buttons.", href: "/blocks/sign-in",  mockup: <SignInMockup /> },
  { title: "RegisterBlock",  desc: "Full registration form with inline validation.",       href: "/blocks/register", mockup: <RegisterMockup /> },
];

const ONBOARDING_BLOCKS = [
  { title: "OnboardingFlow", desc: "3-step animated onboarding with skip and progress dots.", href: "/blocks/onboarding", mockup: <OnboardMockup /> },
];

const DASHBOARD_BLOCKS = [
  { title: "StatsCard",    desc: "Analytics dashboard with chart and KPI cards.",  href: "/blocks/stats-card",    mockup: <StatsMockup /> },
  { title: "ProductCard",  desc: "E-commerce product listing with add-to-cart.",   href: "/blocks/product-card",  mockup: <ProductMockup /> },
];

const PHILOSOPHY = [
  { Icon: FolderOpen, title: "Source in your repo",  desc: "Blocks are copied into your project — you own the code and can change anything." },
  { Icon: Palette,    title: "Fully themed",         desc: "All blocks read from ThemeProvider — your brand colors apply automatically." },
  { Icon: Bell,       title: "Toast-connected",      desc: "Form submissions, API errors, and success states all fire gooeyToast automatically." },
  { Icon: Code2,      title: "TypeScript props",     desc: "Every block exports a typed props interface so your IDE autocompletes everything." },
];
