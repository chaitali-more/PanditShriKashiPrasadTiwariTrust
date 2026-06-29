import { useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeartHandshake, Users, Scale, ShieldAlert, GraduationCap } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import FadeIn, { StaggerContainer, StaggerItem, HoverCard } from "@/components/FadeIn";
import InnerBanner from "@/components/InnerBanner";
import SectionHeading from "@/components/SectionHeading";

const imageUrl = (fileName: string) =>
  new URL(`../assets/images/${fileName}`, import.meta.url).href;

export default function About() {
  const { t } = useLang();

  useEffect(() => {
    document.title = "About Us | Shri K. P. Tiwari Shanti Sevadharm Public Charitable Trust";
  }, []);

  const objectives = [
    { titleKey: "obj.1.title", descKey: "obj.1.desc", icon: HeartHandshake },
    { titleKey: "obj.2.title", descKey: "obj.2.desc", icon: Users },
    { titleKey: "obj.3.title", descKey: "obj.3.desc", icon: Scale },
    { titleKey: "obj.4.title", descKey: "obj.4.desc", icon: ShieldAlert },
    { titleKey: "obj.5.title", descKey: "obj.5.desc", icon: GraduationCap },
  ];

  const trustees = [
    {
      nameKey: "trustees.chairman.name",
      designationKey: "trustees.chairman.role",
      image: "sachchida-nand-tiwari.jpeg",
    },
    {
      nameKey: "trustees.secretary.name",
      designationKey: "trustees.secretary.role",
      image: "ghanshyam-chandra-tiwari.jpeg",
    },
    {
      nameKey: "trustees.member1.name",
      designationKey: "trustees.member1.role",
      image: "neelam-krishna-nand-tiwari.jpeg",
    },
    {
      nameKey: "trustees.member2.name",
      designationKey: "trustees.member2.role",
      image: "krishna-nand-tiwari.jpeg",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <InnerBanner title={t("about.title")} subtitle={t("about.subtitle")} />

      {/* Biography */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <FadeIn direction="right" className="w-full lg:w-1/3">
              <div className="relative aspect-[3/4] bg-muted rounded-2xl overflow-hidden border border-border shadow-md group">
                <img
                  src={imageUrl("shri-kashi-prasad-tiwari-ji.jpeg")}
                  alt="Late Pandit Shri Kashi Prasad Tiwari Ji"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent pointer-events-none" />
              </div>
              <div className="text-center mt-6">
                <h3 className="text-xl font-bold text-foreground">{t("about.founder.name")}</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wider mt-1">{t("about.founder.label")}</p>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.15} className="w-full lg:w-2/3">
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <SectionHeading className="mb-8 not-prose">{t("about.bio.heading")}</SectionHeading>
                <p>{t("about.bio.p1")}</p>
                <p>{t("about.bio.p2")}</p>
                <SectionHeading className="mt-12 mb-8 not-prose">{t("about.why.heading")}</SectionHeading>
                <p>{t("about.why.p")}</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-20 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn direction="up" className="text-center mb-16">
            <SectionHeading align="center" className="mb-4">{t("obj.heading")}</SectionHeading>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t("obj.sub")}</p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {objectives.map((obj, i) => (
              <StaggerItem
                key={i}
                className={i === 3 ? "lg:col-start-1 lg:ml-auto" : i === 4 ? "lg:col-start-2 lg:mr-auto" : ""}
              >
                <HoverCard className="h-full">
                  <Card className="h-full border-border bg-white shadow-sm">
                    <CardHeader>
                      <motion.div
                        className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4"
                        whileHover={{ scale: 1.15, backgroundColor: "hsl(32 92% 48% / 0.2)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <obj.icon className="w-6 h-6 text-primary" />
                      </motion.div>
                      <CardTitle className="text-xl">{t(obj.titleKey)}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground leading-relaxed">{t(obj.descKey)}</p>
                    </CardContent>
                  </Card>
                </HoverCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Trustees */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn direction="up" className="text-center mb-12">
            <SectionHeading align="center">{t("trustees.heading")}</SectionHeading>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustees.map((trustee, i) => (
              <StaggerItem key={i}>
                <div className="flex flex-col items-center text-center">
                  <motion.div
                    className="w-48 h-48 rounded-full bg-muted flex items-center justify-center mb-6 border border-border overflow-hidden shadow-md group relative"
                    whileHover={{ scale: 1.05, borderColor: "hsl(32 92% 48%)" }}
                    transition={{ duration: 0.2 }}
                  >
                    <img
                      src={imageUrl(trustee.image)}
                      alt={t(trustee.nameKey)}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <h4 className="text-lg font-bold text-foreground">{t(trustee.nameKey)}</h4>
                  <p className="text-primary text-sm font-semibold mt-1 uppercase tracking-wider">{t(trustee.designationKey)}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
