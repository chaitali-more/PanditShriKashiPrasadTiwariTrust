import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Home, Info, CalendarDays, Images, Phone, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLang } from "@/contexts/LanguageContext";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { lang, toggle, t } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const close = () => setIsOpen(false);

  const navLinks = [
    { href: "/",           labelKey: "nav.home",       Icon: Home },
    { href: "/about",      labelKey: "nav.about",      Icon: Info },
    { href: "/activities", labelKey: "nav.activities", Icon: CalendarDays },
    { href: "/gallery",    labelKey: "nav.gallery",    Icon: Images },
    { href: "/contact",    labelKey: "nav.contact",    Icon: Phone },
  ];

  return (
    <>
      <header className={`sticky top-0 z-50 w-full bg-white border-b border-border transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-none"}`}>
        <div className={`container mx-auto px-4 flex items-center justify-between transition-[height] duration-300 ${scrolled ? "h-20" : "h-24"}`}>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={close}>
            <img
              src="/logo.png"
              alt="Pandit Shri Kashi Prasad Tiwari Trust logo"
              className={`object-contain transition-[width,height] duration-300 ${scrolled ? "h-14 w-14" : "h-20 w-20"}`}
              data-testid="img-logo"
            />
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-bold text-base text-navy" data-testid="text-logo-name">
                Shri K. P. Tiwari
              </span>
              <span className="text-xs font-medium text-primary tracking-wide">
                Shanti Sevadharm Public Charitable Trust
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span
                  className={`text-sm font-medium transition-colors hover:text-primary cursor-pointer ${
                    location === link.href ? "text-primary font-semibold" : "text-foreground"
                  }`}
                  data-testid={`link-${link.labelKey}`}
                >
                  {t(link.labelKey)}
                </span>
              </Link>
            ))}
            <button
              onClick={toggle}
              data-testid="button-lang-toggle"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
              title={lang === "en" ? "Switch to Hindi" : "Switch to English"}
            >
              <span className={lang === "en" ? "text-primary" : "text-muted-foreground"}>EN</span>
              <span className="text-muted-foreground/50">|</span>
              <span className={lang === "hi" ? "text-primary" : "text-muted-foreground"}>हि</span>
            </button>
            <Link href="/contact#support">
              <Button size="sm" className="ml-1 bg-primary hover:bg-primary/90 text-white" data-testid="button-nav-support">
                {t("nav.support")}
              </Button>
            </Link>
          </nav>

          {/* Mobile: lang pill + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggle}
              data-testid="button-lang-toggle-mobile"
              className="px-2.5 py-1 rounded-full border border-border text-xs font-semibold text-foreground hover:border-primary hover:text-primary transition-colors"
            >
              {lang === "en" ? "हि" : "EN"}
            </button>
            <motion.button
              className="p-2 rounded-md text-navy hover:bg-muted transition-colors"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
              data-testid="button-mobile-menu"
              whileTap={{ scale: 0.9 }}
            >
              <Menu size={24} />
            </motion.button>
          </div>

        </div>
      </header>

      {/* ── Off-canvas drawer (mobile only) ── */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={close}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.aside
              key="drawer"
              className="fixed top-0 right-0 z-[70] h-full w-[min(320px,85vw)] bg-white shadow-2xl flex flex-col lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              data-testid="mobile-menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-20 border-b border-border shrink-0">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="Trust logo" className="h-10 w-10 object-contain" />
                  <span className="font-bold text-sm text-navy leading-tight">
                    Shri K. P. Tiwari<br />Trust
                  </span>
                </div>
                <motion.button
                  className="p-2 rounded-md text-navy hover:bg-muted transition-colors"
                  onClick={close}
                  aria-label="Close menu"
                  whileTap={{ scale: 0.88 }}
                >
                  <X size={22} />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 overflow-y-auto py-4 px-3">
                {navLinks.map(({ href, labelKey, Icon }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.06, duration: 0.28 }}
                  >
                    <Link href={href}>
                      <span
                        className={`flex items-center gap-3 px-4 py-3.5 rounded-lg text-base font-medium cursor-pointer transition-colors mb-1 ${
                          location === href
                            ? "bg-primary/10 text-primary font-semibold"
                            : "text-foreground hover:bg-muted"
                        }`}
                        onClick={close}
                      >
                        <Icon size={18} className={location === href ? "text-primary" : "text-muted-foreground"} />
                        {t(labelKey)}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <motion.div
                className="px-5 pb-8 pt-4 border-t border-border space-y-3 shrink-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.28 }}
              >
                <Link href="/contact#support">
                  <Button
                    className="w-full bg-primary hover:bg-primary/90 text-white gap-2"
                    size="lg"
                    onClick={close}
                    data-testid="button-drawer-support"
                  >
                    <Heart size={16} />
                    {t("nav.support")}
                  </Button>
                </Link>
                <p className="text-center text-xs text-muted-foreground">
                  Pandit Shri Kashi Prasad Tiwari Trust
                </p>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
