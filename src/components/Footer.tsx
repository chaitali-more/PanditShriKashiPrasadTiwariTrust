import { Link } from "wouter";
import { useLang } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLang();

  const navLinks = [
    { href: "/",           labelKey: "nav.home" },
    { href: "/about",      labelKey: "nav.about" },
    { href: "/activities", labelKey: "nav.activities" },
    { href: "/gallery",    labelKey: "nav.gallery" },
    { href: "/contact",    labelKey: "nav.contact" },
  ];

  const sitemap = [
    { href: "/",           label: "Home" },
    { href: "/about",      label: "About Us" },
    { href: "/activities", label: "Activities" },
    { href: "/gallery",    label: "Gallery" },
    { href: "/contact",    label: "Contact Us" },
    { href: "/contact",    label: "Donate / Support" },
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main footer grid */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <img src="/logo.png" alt="Trust logo" className="h-12 w-12 object-contain" />
              <div className="leading-tight">
                <p className="font-bold text-sm text-white">Shri Kashi Prasad Tiwari</p>
                <p className="text-xs text-primary">Shanti Sevadharm Charitable Trust</p>
              </div>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {t("footer.tagline")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-5">
              {t("footer.quicklinks")}
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-white/70 hover:text-primary transition-colors cursor-pointer">
                      {t(link.labelKey)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-widest text-white/50 mb-5">
              {t("footer.contact")}
            </h3>
            <address className="not-italic text-sm text-white/70 space-y-2.5 leading-relaxed">
              <p>contact@pskpttrust.org <span className="text-white/30 italic text-xs"></span></p>
              <p>+91 98765 43210 <span className="text-white/30 italic text-xs"></span></p>
              <p>123 Trust Bhavan, Main Road,<br />City, State 123456, India <span className="text-white/30 italic text-xs"></span></p>
            </address>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-6 md:px-12 lg:px-20 py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

          {/* Copyright + sitemap links inline */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-2 gap-y-1 text-sm text-white/40">
            <span>
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
         Sitemap
          </div>

          {/* Design credit */}
          <p className="text-sm text-white/40 shrink-0">
            Website designed by{" "}
            <span className="text-primary font-semibold tracking-wide">Studio Varn</span>
          </p>

        </div>
      </div>
    </footer>
  );
}
