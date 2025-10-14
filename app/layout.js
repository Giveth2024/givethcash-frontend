import "./globals.css";
import GlobalClientWrapper from "./GlobalClientWrapper";
import Footer from "./components/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata = {
  title: "Giveth₵₳$H",
  description: "Personal Finance Tracker",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="bg-stone-900">
          <GlobalClientWrapper>
            {children}
          </GlobalClientWrapper>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
