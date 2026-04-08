import { Footer, Layout, Navbar } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { ReactNode } from "react";

export const metadata = {
  title: {
    template: "%s – goey-toast",
    default: "goey-toast",
  },
  description: "Morphing blob toast & UI library for React Native",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍞</text></svg>",
  },
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap();

  const navbar = (
    <Navbar
      logo={
        <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>
          🍞 goey-toast
        </span>
      }
      projectLink="https://github.com/FearCleevan/goey-toast-ui-library"
    />
  );

  const footer = (
    <Footer>
      MIT {new Date().getFullYear()} © goey-toast
    </Footer>
  );

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          footer={footer}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/FearCleevan/goey-toast-ui-library/tree/main/apps/docs"
          sidebar={{ defaultMenuCollapseLevel: 1, toggleButton: true }}
          toc={{ backToTop: "Scroll to top" }}
          darkMode
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
