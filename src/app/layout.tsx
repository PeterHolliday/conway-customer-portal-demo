// app/layout.tsx
import "./globals.css";
import Header from "@/components/site/Header";

export const metadata = {
  title: "FM Conway Portal",
  description: "Internal portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header /> {/* 👈 Always visible header */}
        {children}
      </body>
    </html>
  );
}
