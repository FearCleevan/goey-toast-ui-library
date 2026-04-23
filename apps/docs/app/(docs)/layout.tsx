import { Footer, Layout, Navbar } from "nextra-theme-docs";
import "nextra-theme-docs/style.css";
import "./docs.css";
import { getPageMap } from "nextra/page-map";
import type { ReactNode } from "react";

export default async function DocsLayout({ children }: { children: ReactNode }) {
  const pageMap = await getPageMap();

  const navbar = (
    <Navbar
      logo={
        <span className="docs-nav-logo">
          🍞 gooey-toast
        </span>
      }
      projectLink="https://github.com/FearCleevan/goey-toast-ui-library"
    />
  );

  const footer = (
    <Footer>MIT {new Date().getFullYear()} © gooey-toast</Footer>
  );

  return (
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
  );
}
