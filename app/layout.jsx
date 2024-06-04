import MainHeader from "@/components/headers/MainHeader";
import GradientBackground from "@/components/gradient-background/GradientBackground";
import "./globals.css";

export const metadata = {
  title: "Art Gallery",
  description:
    "An Art Gallery application showcasing diverse artworks from various artists, offering users a platform to explore, appreciate, and engage with art.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white">
        <MainHeader />
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <GradientBackground>{children}</GradientBackground>
        </div>
      </body>
    </html>
  );
}
