import FadeIn from "./FadeIn";

interface InnerBannerProps {
  title: string;
  subtitle: string;
}

export default function InnerBanner({ title, subtitle }: InnerBannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-secondary/40 via-muted/50 to-white dark:from-secondary/10 dark:via-muted/20 dark:to-background py-20 border-b border-border">
      {/* 1. Professional Trust Security Lattice Pattern (representing official standing & trust) */}
      <svg 
        className="absolute inset-0 w-full h-full stroke-primary/10 dark:stroke-primary/5 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" 
        aria-hidden="true"
      >
        <defs>
          <pattern id="trust-lattice" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 0 20 L 20 0 L 40 20 L 20 40 Z" fill="none" strokeWidth="0.5" />
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#trust-lattice)" strokeWidth="0" />
      </svg>

      {/* 2. Glowing background blobs */}
      <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 right-1/4 w-96 h-96 rounded-full bg-navy/10 dark:bg-navy/5 blur-3xl pointer-events-none" />
      
      {/* 3. Trust Logo Watermark on the Right */}
      <div className="absolute top-1/2 right-16 -translate-y-1/2 w-64 h-64 pointer-events-none hidden md:block select-none z-10">
        {/* White/Dark background circular mask to hide background pattern lines directly behind the logo */}
        <div className="absolute inset-0 bg-white dark:bg-background rounded-full opacity-[0.9] blur-md" />
        <img 
          src="/logo.png" 
          alt="Watermark Logo" 
          className="absolute inset-0 w-full h-full object-contain filter grayscale dark:invert opacity-[0.18] dark:opacity-[0.1] z-10" 
        />
      </div>
      
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <FadeIn direction="up">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {subtitle}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
