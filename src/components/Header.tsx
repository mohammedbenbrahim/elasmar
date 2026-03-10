import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { label: "Accueil", to: "/" },
    { label: "Formules", to: "/formules" },
    { label: "Contactez Nous", to: "/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-warm-white/95 backdrop-blur-md shadow-card"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <Link to="/" className="font-serif text-xl lg:text-2xl font-bold text-gold tracking-wide">
          Elasmar Fouad
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:text-gold ${
                scrolled ? "text-foreground" : "text-warm-white"
              } ${location.pathname === link.to ? "text-gold" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Button variant="gold" size="sm" onClick={() => navigate("/reserve")}>
            Réserver Maintenant
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gold"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-warm-white/98 backdrop-blur-md border-t border-border animate-fade-in">
          <nav className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-medium tracking-wide uppercase text-foreground hover:text-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Button variant="gold" size="sm" onClick={() => { navigate("/reserve"); setMobileOpen(false); }}>
              Réserver Maintenant
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
