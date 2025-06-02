import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import BottomNav from "@/components/BottomNav/BottomNav";
import NextThemeProvider from "./NextThemeProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import { Book, BookOpenCheck, House, Info } from "lucide-react";
import Chatbot from "@/components/chatbot/chatbot";
import AudioDescription from "@/components/AudioDescription/AudioDescription";
import VoiceRecognition from "@/components/VoiceRecognition/VoiceRecognition";
import Script from "next/script";
import { AuthProvider } from "@/contexts/AuthContext";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});


const NavItems = [
  { icon: <House size={20} />, label: "Home", link: "/" },
  { icon: <BookOpenCheck size={20} />, label: "Courses", link: "/courses" },
  { icon: <Book size={20} />, label: "Subjects", link: "/subjects" },
  { icon: <Info size={20} />, label: "About us", link: "/about" },
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
      <head>
        <Script id="voice-command-setup" strategy="beforeInteractive">
          {`
          window.tibaVoiceActions = {
            readPageContent: function() {
              console.log("Global: Triggering read page content");
              const event = new CustomEvent('readPageContent');
              document.dispatchEvent(event);
              return true;
            },
            navigateTo: function(path) {
              console.log("Global: Navigating to", path);
              window.location.href = path;
              return true;
            },
            setDarkMode: function(isDark) {
              console.log("Global: Setting dark mode to", isDark);
              if (isDark) {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
              return true;
            }
          };
          document.addEventListener('readPageContent', function() {
            console.log("Global: readPageContent event received");
          });
          `}
        </Script>
      </head>
      <body style={{ fontFamily: poppins.style.fontFamily }}>
        <ReduxProvider>
          <NextThemeProvider>
            <AuthProvider>
              <Navbar />
              <Chatbot />
              {/* <AudioDescription /> */}
              <VoiceRecognition />
              <main>{children}</main>
              <Footer />
              <BottomNav
                items={NavItems}
                panelHeight={68}
                baseItemSize={50}
                magnification={70}
              />
            </AuthProvider>
          </NextThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
