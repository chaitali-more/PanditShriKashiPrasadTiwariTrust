import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLang } from "@/contexts/LanguageContext";
import FadeIn, { StaggerContainer, StaggerItem, HoverCard } from "@/components/FadeIn";
import InnerBanner from "@/components/InnerBanner";
import SectionHeading from "@/components/SectionHeading";

export default function Activities() {
  const { t } = useLang();

  useEffect(() => {
    document.title = "Activities | Shri K. P. Tiwari Shanti Sevadharm Public Charitable Trust";
  }, []);

  const initiatives = [
    { title: "Annual Scholarship Drive", category: "Education", desc: "Providing financial aid to meritorious students from underprivileged backgrounds." },
    { title: "Medical Relief Camps", category: "Health", desc: "Organizing free health checkups and distributing medicines in rural areas." },
    { title: "Winter Blanket Distribution", category: "Social Aid", desc: "Protecting the vulnerable homeless population during harsh winter months." },
  ];

  const events = Array(6).fill(null).map((_, i) => ({
    title: `Community Event ${i + 1}`,
    date: `October ${10 + i}, 2024`,
    description: "A placeholder description for the community event detailing the impact and the participants involved in the program."
  }));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <InnerBanner title={t("act.page.title")} subtitle={t("act.page.sub")} />

      {/* Initiatives */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn direction="up" className="mb-10">
            <SectionHeading>{t("act.initiatives")}</SectionHeading>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {initiatives.map((init, i) => (
              <StaggerItem key={i}>
                <HoverCard className="h-full">
                  <Card className="h-full border-border shadow-sm">
                    <CardHeader>
                      <Badge variant="outline" className="w-fit mb-2 text-primary border-primary/30">{init.category}</Badge>
                      <CardTitle className="text-xl">{init.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{init.desc}</p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn direction="up" className="mb-10">
            <SectionHeading>{t("act.events")}</SectionHeading>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <StaggerItem key={i}>
                <HoverCard className="h-full">
                  <Card className="overflow-hidden border-border shadow-sm h-full">
                    <div className="aspect-video bg-muted flex items-center justify-center border-b border-border">
                      <span className="text-muted-foreground text-sm font-medium">Image Placeholder</span>
                    </div>
                    <CardHeader>
                      <CardDescription className="text-primary font-medium">{event.date}</CardDescription>
                      <CardTitle className="text-xl mt-1">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm line-clamp-3">{event.description}</p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

    </div>
  );
}
