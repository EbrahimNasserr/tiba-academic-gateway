import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BottomNav from "@/components/BottomNav/BottomNav";
import { VscHome, VscArchive, VscAccount, VscSettingsGear } from 'react-icons/vsc';
import NextThemeProvider from "./NextThemeProvider";
import ReduxProvider from "@/redux/ReduxProvider";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});



const NavItems = [
  { icon: <VscHome size={18} />, label: "Home" },
  { icon: <VscArchive size={18} />, label: "Archive" },
  { icon: <VscAccount size={18} />, label: "Profile" },
  { icon: <VscSettingsGear size={18} />, label: "Settings" },
];

export const metadata = {
  title: "Tiba Academic Gateway - Connect, Learn, and Grow Together",
  description: "Tiba Academic Gateway is a vibrant social learning platform designed for students, educators, and lifelong learners. Collaborate, share knowledge, and achieve academic success in a supportive community.",
  keywords: [
    "social learning platform",
    "online education community",
    "academic collaboration",
    "student social network",
    "learning resources",
    "study groups",
    "educational tools",
    "knowledge sharing",
    "online learning platform",
    "academic success",
    "lifelong learning",
    "educator community",
    "student engagement",
    "collaborative learning",
    "Tiba Academic Gateway",
  ],
  openGraph: {
    title: "Tiba Academic Gateway - Connect, Learn, and Grow Together",
    description: "Join Tiba Academic Gateway, the ultimate social learning platform for students and educators. Collaborate, share knowledge, and achieve academic success.",
    url: "https://www.tibaacademicgateway.com",
    siteName: "Tiba Academic Gateway",
    images: [
      {
        url: "https://www.tibaacademicgateway.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tiba Academic Gateway - Social Learning Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tiba Academic Gateway - Connect, Learn, and Grow Together",
    description: "Join Tiba Academic Gateway, the ultimate social learning platform for students and educators. Collaborate, share knowledge, and achieve academic success.",
    images: ["https://www.tibaacademicgateway.com/twitter-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: poppins.style.fontFamily }}>
        <ReduxProvider>
          <NextThemeProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <BottomNav
              items={NavItems}
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
            />
          </NextThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
