import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/FadeIn";
import InnerBanner from "@/components/InnerBanner";
import SectionHeading from "@/components/SectionHeading";

const imageUrl = (fileName: string) =>
  new URL(`../assets/images/${fileName}`, import.meta.url).href;

const galleryImages = [

  {
    title: "Procession Welcome",
    category: "Community",
    src: imageUrl("648639253_939737782093266_8898264903553191099_n.jpg"),
    alt: "Trust members wearing orange ceremonial turbans during a community procession",
  },
  {
    title: "Decorated Procession Vehicle",
    category: "Procession",
    src: imageUrl("648780194_939738132093231_3785529933990670617_n.jpg"),
    alt: "A decorated procession vehicle with marigold garlands and saffron flags",
  },
  {
    title: "Procession Route",
    category: "Procession",
    src: imageUrl("649089749_939738342093210_3575669925550344983_n.jpg"),
    alt: "Community procession moving along the street with decorated carriers",
  },
  {
    title: "Flag March",
    category: "Community",
    src: imageUrl("649115569_939738002093244_4200841716497612424_n.jpg"),
    alt: "Participants walking together with saffron flags during the procession",
  },
  {
    title: "Ceremonial Kalash Setup",
    category: "Ceremony",
    src: imageUrl("649125309_939737712093273_3036027994561823754_n.jpg"),
    alt: "Ceremonial kalash arrangements decorated with marigold flowers",
  },
  {
    title: "Trust Members",
    category: "Community",
    src: imageUrl("649181429_939738055426572_9035843706388449251_n.jpg"),
    alt: "Trust members posing during the procession with saffron flags",
  },
  {
    title: "Procession Convoy",
    category: "Procession",
    src: imageUrl("649197778_939737828759928_3692152408830586900_n.jpg"),
    alt: "Procession convoy moving through the street with decorated vehicles",
  },
  {
    title: "Blessing Ride",
    category: "Ceremony",
    src: imageUrl("649202412_939737892093255_2025688866555681361_n.jpg"),
    alt: "Trust supporters smiling during a ceremonial ride",
  },
  {
    title: "Community Participation",
    category: "Community",
    src: imageUrl("649334397_939738458759865_8734534771500105987_n.jpg"),
    alt: "Community members participating in the event with flags and turbans",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const { t } = useLang();

  useEffect(() => {
    document.title = "Gallery | Pandit Shri Kashi Prasad Tiwari Trust";
  }, []);

  const activeImage = selectedImage === null ? null : galleryImages[selectedImage];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <InnerBanner title={t("gallery.page.title")} subtitle={t("gallery.page.sub")} />

      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <FadeIn direction="up" className="mb-10 max-w-3xl">
            <SectionHeading>{t("gallery.section.title")}</SectionHeading>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {t("gallery.section.sub")}
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, i) => (
              <StaggerItem key={image.title}>
                <motion.button
                  type="button"
                  className="group block w-full overflow-hidden rounded-lg border border-border bg-white text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  data-testid={`gallery-image-${i}`}
                  onClick={() => setSelectedImage(i)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-90" />
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-foreground shadow-sm">
                      {image.category}
                    </span>
                    <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm opacity-0 transition-opacity group-hover:opacity-100">
                      <ZoomIn className="h-4 w-4" />
                    </span>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-lg font-semibold text-white">{image.title}</h3>
                    </div>
                  </div>
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              type="button"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white/85 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Close gallery image"
              onClick={() => setSelectedImage(null)}
            >
              <X className="h-7 w-7" />
            </motion.button>
            <motion.figure
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={activeImage.src}
                alt={activeImage.alt}
                className="max-h-[78vh] w-full bg-black object-contain"
              />
              <figcaption className="flex flex-col gap-1 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-lg font-semibold text-foreground">{activeImage.title}</span>
                <span className="text-sm font-medium text-primary">{activeImage.category}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
