import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>
      🍞 goey-toast
    </span>
  ),
  project: {
    link: "https://github.com/your-org/goey-toast",
  },
  docsRepositoryBase: "https://github.com/your-org/goey-toast/tree/main/apps/docs",
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{" "}
        <a href="https://github.com/your-org/goey-toast" target="_blank" rel="noreferrer">
          goey-toast
        </a>
      </span>
    ),
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Morphing blob toast & UI library for React Native" />
      <title>goey-toast</title>
    </>
  ),
  primaryHue: 262,
  primarySaturation: 70,
  sidebar: {
    titleComponent({ title }) {
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  useNextSeoProps() {
    return {
      titleTemplate: "%s – goey-toast",
    };
  },
};

export default config;
