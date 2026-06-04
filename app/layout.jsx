import "../src/index.css";
import { Patrick_Hand, Architects_Daughter } from "next/font/google";

const patrickHand = Patrick_Hand({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-cursive",
  display: "swap",
});

const architectsDaughter = Architects_Daughter({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  title: "Ritesh Portfolio",
  description: "Personal portfolio website built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${patrickHand.variable} ${architectsDaughter.variable} light`}
    >
      <body className="font-body bg-background text-text">
        {children}
      </body>
    </html>
  );
}

