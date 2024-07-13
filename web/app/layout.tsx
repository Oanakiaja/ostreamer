import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/client/ThemeProvider";

export const metadata: Metadata = {
  title: "ostreamer",
  description: "A webapp for live streaming streamer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
