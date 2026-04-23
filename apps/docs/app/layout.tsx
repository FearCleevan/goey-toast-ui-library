import { Head } from "nextra/components";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: {
    template: "%s – gooey-toast",
    default: "gooey-toast – React Native UI Library",
  },
  description:
    "Morphing blob toasts and a full React Native UI library — batteries included.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍞</text></svg>",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>{children}</body>
    </html>
  );
}
