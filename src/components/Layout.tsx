import { ReactNode, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import WhatsAppButton from "./WhatsAppButton";
import EventsTicker from "./EventsTicker";

const Layout = ({ children }: { children: ReactNode }) => {
  const [tickerHeight, setTickerHeight] = useState(0);
  return (
    <div className="min-h-screen flex flex-col">
      <EventsTicker onHeightChange={setTickerHeight} />
      <div style={{ paddingTop: tickerHeight }}>
        <Navbar />
      </div>
      <main className="flex-1" style={{ paddingTop: 64 + tickerHeight }}>
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Layout;
