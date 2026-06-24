import { Switch, Route, Router as WouterRouter } from "wouter";
import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Activities from "@/pages/activities";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollProgressBar from "@/components/ScrollProgressBar";

const queryClient = new QueryClient();

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--accent))_0%,transparent_42%),linear-gradient(135deg,hsl(var(--secondary))_0%,white_48%,hsl(var(--accent))_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-[min(78vw,420px)] w-[min(78vw,420px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/15" />
      <div className="absolute left-1/2 top-1/2 h-[min(64vw,340px)] w-[min(64vw,340px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-navy/10" />

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <div className="trust-loader-mark relative flex h-48 w-48 items-center justify-center sm:h-56 sm:w-56">
          <div className="trust-loader-ring absolute inset-0 rounded-full" />
          <div className="trust-loader-glow absolute inset-5 rounded-full bg-white shadow-2xl shadow-primary/20" />
          <img
            src="/logo.png"
            alt="Pandit Shri Kashi Prasad Tiwari Trust logo"
            className="trust-loader-logo relative h-36 w-36 object-contain sm:h-44 sm:w-44"
          />
        </div>

        <div className="mt-6 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-primary">
            Shri Kashi Prasad Tiwari
          </p>
          <p className="text-base font-bold text-navy sm:text-lg">
            Shanti Sevadharm Charitable Trust
          </p>
        </div>

        <div className="mt-6 h-1 w-52 overflow-hidden rounded-full bg-navy/10">
          <div className="trust-loader-progress h-full rounded-full bg-primary" />
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollProgressBar />
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/activities" component={Activities} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 1600);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          {isLoading && <LoadingScreen />}
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <Router />
          </WouterRouter>
          <Toaster />
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
