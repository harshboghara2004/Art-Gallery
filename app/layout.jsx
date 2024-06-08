import MainHeader from "@/components/headers/MainHeader";
import GradientBackground from "@/components/gradient-background/GradientBackground";
import "./globals.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const metadata = {
  title: "Art Gallery",
  description:
    "An Art Gallery application showcasing diverse artworks from various artists, offering users a platform to explore, appreciate, and engage with art.",
};

export default function RootLayout({ children }) {
  // const firebaseConfig = {
  //   apiKey: "AIzaSyBcijG-CDMK_KcyobEXz40yjyTjAwTJ49Y",
  //   authDomain: "art-gallery-756b2.firebaseapp.com",
  //   projectId: "art-gallery-756b2",
  //   storageBucket: "art-gallery-756b2.appspot.com",
  //   messagingSenderId: "547589464052",
  //   appId: "1:547589464052:web:8b0b2938a93fc5424ee3a1",
  //   measurementId: "G-EZL4BSHVF8",
  // };

  // // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const analytics = getAnalytics(app);
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
