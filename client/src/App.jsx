// client/src/App.jsx — Root layout with routing
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Reports from "./pages/Reports";
import HowItWorks from "./pages/HowItWorks";
import FAQ from "./pages/FAQ";
import Consultancy from "./pages/Consultancy";
import "./App.css";

// Resets scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />
      <div className="flex flex-col flex-1 w-full bg-base-100 transition-colors duration-300 min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/consultancy" element={<Consultancy />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
