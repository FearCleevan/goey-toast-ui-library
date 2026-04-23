import Link from "next/link";
import { Bell, BarChart2, Palette } from "lucide-react";
import { SiteNav } from "../../components/SiteNav";
import { SiteFooter } from "../../components/SiteFooter";
import styles from "../../site.module.css";

export const metadata = {
  title: "gooeyToast — gooey-toast",
  description: "Imperative API for firing toasts from anywhere — no hooks, no context required.",
};

export default function GooeyToastPage() {
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
          <span className={styles.breadcrumbCurrent}>gooeyToast</span>
        </div>

        <div className={styles.pageHero}>
          <div className={styles.pageBadge}>@gooey/core</div>
          <h1 className={styles.pageTitle}>
            <span className={styles.pageTitleGradient}>gooeyToast</span>
          </h1>
          <p className={styles.pageDesc}>
            Imperative API for firing toasts from anywhere in your app — no hooks,
            no context, no component wiring required. Each call returns the toast{" "}
            <code className={styles.inlineCode}>id</code> you can use to update or
            dismiss it later.
          </p>
        </div>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Import</h2>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>any file in your app</span>
            </div>
            <pre className={styles.codePre}><code>{`import { gooeyToast } from "@gooey/core";`}</code></pre>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Methods</h2>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>API signature</span>
            </div>
            <pre className={styles.codePre}><code>{METHODS_CODE}</code></pre>
          </div>
          <div className={styles.apiTable}>
            {METHODS.map((m) => (
              <div key={m.name} className={styles.apiRow}>
                <code className={styles.apiName}>{m.name}</code>
                <span className={styles.apiDesc}>{m.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Options</h2>
          <div className={styles.propsTable}>
            <div className={styles.propsHeader}>
              <span>Option</span>
              <span>Type</span>
              <span>Default</span>
              <span>Description</span>
            </div>
            {OPTIONS.map((o) => (
              <div key={o.name} className={styles.propsRow}>
                <code className={styles.propName}>{o.name}</code>
                <code className={styles.propType}>{o.type}</code>
                <code className={styles.propDefault}>{o.default}</code>
                <span className={styles.propDesc}>{o.desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>Examples</h2>

          <h3 className={styles.subHeading}>Basic variants</h3>
          <div className={styles.variantTabs}>
            {VARIANTS.map((v) => (
              <div key={v.label} className={styles.variantBlock}>
                <div className={`${styles.variantBadge} ${styles[`variant_${v.type}`]}`}>{v.label}</div>
                <div className={styles.codeBlock}>
                  <pre className={styles.codePre}><code>{v.code}</code></pre>
                </div>
              </div>
            ))}
          </div>

          <h3 className={styles.subHeading}>With action button</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>example</span>
            </div>
            <pre className={styles.codePre}><code>{ACTION_CODE}</code></pre>
          </div>

          <h3 className={styles.subHeading}>Promise toast</h3>
          <p className={styles.sectionSubDesc}>
            Automatically transitions through{" "}
            <code className={styles.inlineCode}>loading → success | error</code> states.
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
            <pre className={styles.codePre}><code>{PROMISE_CODE}</code></pre>
          </div>

          <h3 className={styles.subHeading}>Update an existing toast</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>example</span>
            </div>
            <pre className={styles.codePre}><code>{UPDATE_CODE}</code></pre>
          </div>

          <h3 className={styles.subHeading}>Deduplication with fixed id</h3>
          <p className={styles.sectionSubDesc}>
            Calling with the same <code className={styles.inlineCode}>id</code> updates
            the existing toast in place — useful for debounced or polling events.
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
            <pre className={styles.codePre}><code>{DEDUP_CODE}</code></pre>
          </div>

          <h3 className={styles.subHeading}>Dismiss</h3>
          <div className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <div className={styles.codeDots}>
                <span className={styles.codeDotRed} />
                <span className={styles.codeDotYellow} />
                <span className={styles.codeDotGreen} />
              </div>
              <span className={styles.codeFilename}>example</span>
            </div>
            <pre className={styles.codePre}><code>{DISMISS_CODE}</code></pre>
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

const METHODS_CODE = `gooeyToast(title, options?)           // default (info) variant
gooeyToast.success(title, options?)
gooeyToast.error(title, options?)
gooeyToast.warning(title, options?)
gooeyToast.info(title, options?)
gooeyToast.promise(promise, messages)
gooeyToast.update(id, options)
gooeyToast.dismiss(id?)              // omit id to dismiss all`;

const METHODS = [
  { name: "gooeyToast(title, options?)",    desc: "Fire a default (info) toast." },
  { name: "gooeyToast.success()",           desc: "Green success toast." },
  { name: "gooeyToast.error()",             desc: "Red error toast." },
  { name: "gooeyToast.warning()",           desc: "Amber warning toast." },
  { name: "gooeyToast.info()",              desc: "Indigo info toast." },
  { name: "gooeyToast.promise()",           desc: "Async toast that tracks loading → success | error." },
  { name: "gooeyToast.update(id, opts)",    desc: "Mutate a live toast in place." },
  { name: "gooeyToast.dismiss(id?)",        desc: "Dismiss one toast by id, or all if id omitted." },
];

const OPTIONS = [
  { name: "description",     type: "string",          default: "—",        desc: "Secondary text rendered below the title." },
  { name: "duration",        type: "number",          default: "4000",     desc: "Auto-dismiss in ms. Pass Infinity to persist." },
  { name: "icon",            type: "ReactNode",       default: "—",        desc: "Custom icon that replaces the type icon." },
  { name: "action",          type: "{ label; onPress }", default: "—",     desc: "Action button shown on the toast." },
  { name: "dismissible",     type: "boolean",         default: "true",     desc: "Whether the user can swipe to dismiss." },
  { name: "showTimestamp",   type: "boolean",         default: "false",    desc: "Show elapsed time label." },
  { name: "id",              type: "string",          default: "auto",     desc: "Fixed ID for deduplication." },
];

const VARIANTS = [
  { label: "success", type: "success", code: `gooeyToast.success("Saved!", {\n  description: "Your changes have been saved.",\n});` },
  { label: "error",   type: "error",   code: `gooeyToast.error("Upload failed", {\n  description: "Check your connection and try again.",\n});` },
  { label: "warning", type: "warning", code: `gooeyToast.warning("Low storage", {\n  description: "Only 2 GB remaining.",\n  duration: 6000,\n});` },
  { label: "info",    type: "info",    code: `gooeyToast.info("New version available", {\n  description: "Update to v1.2.0 for the latest features.",\n});` },
];

const ACTION_CODE = `gooeyToast("File deleted", {
  description: "invoice.pdf",
  action: {
    label: "Undo",
    onPress: () => restoreFile(),
  },
  duration: 6000,
});`;

const PROMISE_CODE = `gooeyToast.promise(uploadFile(), {
  loading: "Uploading…",
  success: (data) => \`Uploaded \${data.name}\`,
  error: (err) => err.message,
});`;

const UPDATE_CODE = `const id = gooeyToast("Processing…", { duration: Infinity });

gooeyToast.update(id, {
  title: "Done!",
  type: "success",
  duration: 3000,
});`;

const DEDUP_CODE = `gooeyToast.error("Network error", {
  id: "network-error",
  description: "Retrying…",
  duration: Infinity,
});

// Same id → updates existing toast, no duplicate
gooeyToast.error("Network error", { id: "network-error" });`;

const DISMISS_CODE = `const id = gooeyToast.info("Running…", { duration: Infinity });

gooeyToast.dismiss(id);  // dismiss one toast
gooeyToast.dismiss();    // dismiss all toasts`;

const SEE_ALSO = [
  { Icon: Bell,      title: "GooeyToaster",  desc: "Mount the overlay, configure position, stack size, and default duration.", href: "/core/gooey-toaster" },
  { Icon: BarChart2, title: "ChartTooltip",  desc: "Using gooeyToast with chart data-point interactions.",                    href: "/charts" },
  { Icon: Palette,   title: "Theming",       desc: "Customize toast colors, radius, and motion tokens.",                      href: "/core/theming" },
];
