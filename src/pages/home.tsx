import { useEffect } from "react";
import { Link } from "wouter";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users, BookOpen, ShieldAlert } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import FadeIn, { StaggerContainer, StaggerItem, HoverCard } from "@/components/FadeIn";
import SectionHeading from "@/components/SectionHeading";

export default function Home() {
  const { t } = useLang();

  useEffect(() => {
    document.title = "Home | Pandit Shri Kashi Prasad Tiwari Trust";
  }, []);

  const activities = [
    { titleKey: "act.social", descKey: "act.social.desc", icon: Users },
    { titleKey: "act.charity", descKey: "act.charity.desc", icon: Heart },
    { titleKey: "act.edu", descKey: "act.edu.desc", icon: BookOpen },
    { titleKey: "act.disaster", descKey: "act.disaster.desc", icon: ShieldAlert },
  ];

  // Motion values for mouse tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for buttery movement
  const springX = useSpring(x, { stiffness: 150, damping: 25 });
  const springY = useSpring(y, { stiffness: 150, damping: 25 });

  // Map position to tilt rotations
  const rotateX = useTransform(springY, [-300, 300], [12, -12]);
  const rotateY = useTransform(springX, [-300, 300], [-12, 12]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;
    x.set(mouseX);
    y.set(mouseY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-b from-white via-secondary/10 to-white border-b border-border overflow-hidden" style={{ overflowX: "clip" }}>
        {/* Ambient background glowing blobs */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 40, -20, 0],
              y: [0, -30, 20, 0],
              scale: [1, 1.15, 0.9, 1],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[500px] rounded-full bg-primary/8 blur-[80px]"
          />
          <motion.div
            animate={{
              x: [0, -50, 30, 0],
              y: [0, 40, -30, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] max-w-[600px] rounded-full bg-navy/8 blur-[100px]"
          />
        </div>

        <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-secondary/25 to-transparent hidden min-[1000px]:block" />
        
        <div className="container mx-auto px-6 md:px-12 lg:px-20 max-w-full min-[1000px]:max-w-[960px] lg:max-w-[1024px] xl:max-w-[1280px] 2xl:max-w-[1400px] relative z-10">
          <div className="grid grid-cols-1 min-[1000px]:grid-cols-2 gap-12 min-[1000px]:gap-16 items-center min-[1000px]:items-start py-16 md:py-24 min-[1000px]:pt-16 min-[1000px]:pb-20 min-[1000px]:min-h-[calc(100vh-6rem)]">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col justify-center text-center min-[1000px]:text-left items-center min-[1000px]:items-start"
            >
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="inline-block text-xs md:text-sm font-bold tracking-widest uppercase text-primary bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
              >
                {t("hero.badge")}
              </motion.span>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.65 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-6 max-w-2xl"
              >
                {t("hero.headline1")}{" "}
                <span className=" text-primary">{t("hero.headline2")}</span>{" "}
                {t("hero.headline3")}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
                className="text-base md:text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl"
              >
                {t("hero.sub")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center min-[1000px]:justify-start"
              >
                <Link href="/contact" className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" className="w-full sm:w-auto min-w-[160px] bg-primary hover:bg-primary/90 text-white shadow-md font-semibold cursor-pointer" data-testid="button-hero-contact">
                      {t("hero.contact")}
                    </Button>
                  </motion.div>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto min-w-[160px] border-navy text-navy hover:bg-secondary/50 font-semibold cursor-pointer" data-testid="button-hero-support">
                      {t("hero.support")}
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs md:text-sm text-muted-foreground justify-center min-[1000px]:justify-start"
              >
                {[t("hero.cred1"), t("hero.cred2"), t("hero.cred3")].map((cred) => (
                  <div key={cred} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 animate-pulse" />
                    <span>{cred}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Image Composite Parallax Container */}
        {/* Image Composite Parallax Container */}
<div
  className="relative min-[1000px]:py-16 flex justify-center items-center cursor-pointer select-none lg:-mt-[90px]"
  onMouseMove={handleMouse}
  onMouseLeave={handleMouseLeave}
  style={{ perspective: 1000 }}
>
  <motion.div
    style={{
      rotateX,
      rotateY,
      transformStyle: "preserve-3d",
    }}
className="relative w-full max-w-sm aspect-[3/4] sm:aspect-[3/4] min-[1000px]:aspect-[3/4]"  >
    {/* Decorative rotated background cards */}
    <div
      className="absolute inset-0 bg-primary/15 rounded-3xl shadow-lg transition-transform duration-500 ease-out -z-10"
      style={{ transform: "translateZ(-10px) rotate(2.5deg) scale(1.03)" }}
    />
    <div
      className="absolute inset-0 bg-primary/5 rounded-3xl shadow-sm transition-transform duration-500 ease-out -z-20"
      style={{ transform: "translateZ(-20px) rotate(-2deg) scale(1.06)" }}
    />

    {/* Main image container */}
    <div
      className="relative w-full h-full rounded-3xl overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25)] ring-1 ring-white/10 bg-muted"
      style={{ transform: "translateZ(0px)" }}
    >
      <img
        src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=900&q=80"
        alt="Volunteers coming together for community service"
        className="w-full h-full object-cover scale-[1.02] hover:scale-105 transition-transform duration-700 ease-out"
        data-testid="img-hero"
      />
      {/* Richer gradient: dark bottom, subtle color wash */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-primary/5" />
      {/* Subtle vignette ring */}
      <div className="absolute inset-0 rounded-3xl ring-inset ring-1 ring-white/10 pointer-events-none" />
    </div>

    {/* Floating Heart Card */}
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
      className="absolute bottom-4 left-4 sm:-bottom-5 sm:-left-5 min-[1000px]:-left-10 min-[1000px]:-bottom-7 z-20
                 bg-white/90 backdrop-blur-md border border-white/60
                 rounded-2xl shadow-xl shadow-black/10
                 px-4 py-3.5 flex items-center gap-3
                 hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300"
      style={{ transform: "translateZ(45px)" }}
    >
      <div className="w-10 h-10 rounded-full bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center shrink-0">
        <Heart className="w-5 h-5 text-primary animate-pulse" />
      </div>
      <div className="text-left">
        <p className="text-[11px] font-medium text-muted-foreground/80 leading-none mb-1 tracking-wide uppercase">
          {t("hero.purposeLabel")}
        </p>
        <p className="text-sm font-semibold text-foreground leading-snug">
          {t("hero.purpose")}
        </p>
      </div>
    </motion.div>

    {/* Top-right accent circle */}
    <div
      className="absolute -top-8 -right-8 w-28 h-28 rounded-full
                 border-4 border-primary/25
                 hidden sm:block -z-30 pointer-events-none
                 after:absolute after:inset-3 after:rounded-full after:border-2 after:border-primary/10"
      style={{ transform: "translateZ(-30px)" }}
    />

    {/* NEW: Bottom-left soft glow blob — adds depth without distraction */}
    <div
      className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-primary/10 blur-3xl -z-30 pointer-events-none"
      style={{ transform: "translateZ(-40px)" }}
    />
  </motion.div>
</div>

          </div>
        </div>
      </section>

      {/* ── Brief Introduction ── */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn direction="none" duration={0.8} className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-foreground font-medium">
              {t("intro.quote")}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Founder's Legacy ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <FadeIn direction="right" className="w-full lg:w-1/2">
              <div className="aspect-[3/4] max-w-md mx-auto bg-muted rounded-lg flex items-center justify-center overflow-hidden border border-border shadow-sm">
                <p className="text-muted-foreground font-medium">{t("about.portrait")}</p>
              </div>
            </FadeIn>
            <FadeIn direction="left" delay={0.1} className="w-full lg:w-1/2">
              <SectionHeading className="mb-8">{t("founder.heading")}</SectionHeading>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{t("founder.p1")}</p>
              <p className="text-lg text-muted-foreground leading-relaxed">{t("founder.p2")}</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="py-20 bg-muted border-y border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn direction="up" className="max-w-3xl mx-auto text-center">
            <SectionHeading align="center" className="mb-8">{t("vision.heading")}</SectionHeading>
            <p className="text-xl text-muted-foreground leading-relaxed">{t("vision.text")}</p>
          </FadeIn>
        </div>
      </section>

      {/* ── Activities Overview ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn direction="up" className="text-center mb-16">
            <SectionHeading align="center" className="mb-4">{t("activities.heading")}</SectionHeading>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t("activities.sub")}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, i) => (
              <StaggerItem key={i}>
                <Link href="/activities">
                  <HoverCard>
                    <Card className="h-full border-border cursor-pointer group">
                      <CardContent className="p-6 flex flex-col items-center text-center pt-8">
                        <motion.div
                          className="p-4 bg-muted rounded-full mb-6 group-hover:bg-primary/10 transition-colors"
                          whileHover={{ rotate: [0, -8, 8, 0] }}
                          transition={{ duration: 0.4 }}
                        >
                          <activity.icon className="w-8 h-8 text-primary" />
                        </motion.div>
                        <h3 className="text-xl font-semibold mb-3 text-foreground">{t(activity.titleKey)}</h3>
                        <p className="text-muted-foreground">{t(activity.descKey)}</p>
                      </CardContent>
                    </Card>
                  </HoverCard>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

{/* ── Call to Action ── */}
<section className="relative py-28 bg-[#eb820a] text-white overflow-hidden">

  {/* SVG dot-grid pattern overlay */}
  <svg
    className="absolute inset-0 w-full h-full opacity-[0.2] pointer-events-none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern id="dot-grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
        <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dot-grid)" />
  </svg>

  {/* Ambient glow blobs — navy/blue to contrast orange bg */}
  <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#fff]/40 rounded-full blur-[100px] pointer-events-none" />
  <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#fff]/30 rounded-full blur-[120px] pointer-events-none" />

  {/* Top decorative rule */}
  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
  {/* Bottom decorative rule */}
  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

  <div className="relative container mx-auto px-6 md:px-12 lg:px-20 text-center">
    <FadeIn direction="up">

      {/* Eyebrow badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/40 bg-white/15 mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span className="text-xs font-semibold tracking-widest uppercase text-white">
          Make an Impact
        </span>
      </div>

      <SectionHeading align="center" tone="light" size="lg" className="mb-5">
        {t("cta.heading")}
      </SectionHeading>

      <p className="text-base md:text-lg text-white/80 mb-10 max-w-xl mx-auto leading-relaxed">
        {t("cta.sub")}
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link href="/contact">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              className="bg-[#1a2236] text-white hover:bg-[#1a2236]/90 shadow-lg shadow-black/30 w-full sm:w-auto border-none px-8"
            >
              {t("cta.donate")}
            </Button>
          </motion.div>
        </Link>
        <Link href="/about">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-white bg-transparent hover:bg-white/15 border border-white/50 px-8"
            >
              {t("cta.learn")}
            </Button>
          </motion.div>
        </Link>
      </div>

    </FadeIn>
  </div>
</section>
    </div>
  );
}
