import Link from "next/link";
import styles from "../site.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLogo}>
          <span>🍞</span>
          <span>gooey-toast</span>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/getting-started">Guides</Link>
          <Link href="/core">Components</Link>
          <Link href="/charts">Charts</Link>
          <Link href="/blocks">Blocks</Link>
          <Link href="/cli">CLI</Link>
          <a
            href="https://github.com/FearCleevan/goey-toast-ui-library"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
        <div className={styles.footerCopy}>
          MIT {new Date().getFullYear()} © gooey-toast
        </div>
      </div>
    </footer>
  );
}
