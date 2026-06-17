// client/src/components/Navbar.jsx
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { RiLeafLine, RiMenuLine, RiCloseLine } from "react-icons/ri";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi2";
import { useTheme } from "../hooks/useTheme";

const Navbar = () => {
  const { pathname } = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add a slight shadow when scrolling for a premium feel
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Reports", path: "/reports" },
    { label: "How does it work?", path: "/how-it-works" },
    { label: "FAQ", path: "/faq" },
    { label: "Consultancy", path: "/consultancy" },
  ];

  return (
    <div className="sticky top-0 z-50 w-full px-0 sm:px-4 sm:pt-4 pointer-events-none transition-all duration-300">
      <nav 
        className={`pointer-events-auto mx-auto w-full sm:max-w-7xl sm:rounded-2xl transition-all duration-300 border-b sm:border ${
          scrolled ? 'shadow-lg py-2' : 'shadow-sm py-3'
        } ${
          isDark 
            ? 'bg-[#111c16] border-[#1d3328] shadow-black/40 text-gray-100' 
            : 'bg-white border-gray-200 shadow-gray-200/50 text-gray-900'
        }`}
      >
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-12">
            {/* Logo Section */}
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="flex items-center gap-2.5 group outline-none focus-visible:ring-2 focus-visible:ring-[#66cc8a] rounded-lg p-1"
              >
                <div className="bg-[#66cc8a]/10 p-2 rounded-xl group-hover:bg-[#66cc8a]/20 transition-colors duration-300">
                  <RiLeafLine
                    size={22}
                    className="text-[#66cc8a] transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110"
                  />
                </div>
                <span className="font-extrabold text-xl tracking-tight">
                  Eco<span className="text-[#66cc8a]">Check</span>
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`relative px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#66cc8a] ${
                      isActive 
                        ? 'text-[#66cc8a] bg-[#66cc8a]/10' 
                        : isDark 
                          ? 'text-gray-400 hover:text-white hover:bg-white/5' 
                          : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions Menu */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className={`p-2.5 rounded-full transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-[#66cc8a] ${
                  isDark 
                    ? 'bg-gray-800 text-gray-400 hover:text-yellow-400 hover:bg-gray-700' 
                    : 'bg-gray-100 text-gray-500 hover:text-blue-600 hover:bg-gray-200'
                }`}
              >
                {isDark ? <HiOutlineSun size={20} /> : <HiOutlineMoon size={20} />}
              </button>
            </div>

            {/* Mobile Menu Actions */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className={`p-2 rounded-full transition-colors ${
                  isDark 
                    ? 'text-gray-400 hover:text-yellow-400 bg-gray-800' 
                    : 'text-gray-500 hover:text-blue-600 bg-gray-100'
                }`}
              >
                {isDark ? <HiOutlineSun size={18} /> : <HiOutlineMoon size={18} />}
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 rounded-xl transition-colors ${
                  isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                }`}
                aria-expanded={isMobileMenuOpen}
              >
                {isMobileMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-80 opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className={`px-4 pb-4 space-y-1 mx-4 rounded-2xl p-2 ${
            isDark ? 'bg-gray-800/50' : 'bg-gray-50'
          }`}>
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors ${
                    isActive
                      ? 'bg-[#66cc8a]/10 text-[#66cc8a]'
                      : isDark
                        ? 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white shadow-sm'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
