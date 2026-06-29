import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLang } from "@/contexts/LanguageContext";
import FadeIn, { StaggerContainer, StaggerItem } from "@/components/FadeIn";
import InnerBanner from "@/components/InnerBanner";
import SectionHeading from "@/components/SectionHeading";

const imageUrl = (fileName: string) =>
  new URL(`../assets/images/${fileName}`, import.meta.url).href;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

export default function Contact() {
  const { toast } = useToast();
  const { t } = useLang();

  useEffect(() => {
    document.title = "Contact Us | Shri K. P. Tiwari Shanti Sevadharm Public Charitable Trust";

    const handleScroll = () => {
      if (window.location.hash === "#support") {
        setTimeout(() => {
          const element = document.getElementById("support");
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 150);
      }
    };

    handleScroll();
    window.addEventListener("hashchange", handleScroll);
    return () => window.removeEventListener("hashchange", handleScroll);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({ title: t("contact.toast.title"), description: t("contact.toast.desc") });
    form.reset();
  }

  const details = [
    {
      icon: MapPin,
      labelKey: "contact.address",
      value: (
        <span className="whitespace-pre-line">{t("contact.address.value")}</span>
      ),
    },
    {
      icon: Phone,
      labelKey: "contact.phone",
      value: <>+91 98765 43210 <span className="text-sm italic"></span></>,
    },
    {
      icon: Mail,
      labelKey: "contact.email",
      value: <>contact@pskpttrust.org <span className="text-sm italic"></span></>,
    },
    {
      icon: Clock,
      labelKey: "contact.hours",
      value: <>{t("contact.hours.value")} <span className="text-sm italic"></span></>,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <InnerBanner title={t("contact.title")} subtitle={t("contact.sub")} />

      <section className="py-20">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — contact details & donation */}
            <FadeIn direction="right">
              <SectionHeading className="mb-8">{t("contact.getintouch")}</SectionHeading>

              <StaggerContainer className="space-y-6 mb-12">
                {details.map(({ icon: Icon, labelKey, value }) => (
                  <StaggerItem key={labelKey}>
                    <motion.div
                      className="flex items-start gap-4"
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-3 bg-primary/10 rounded-full shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground">{t(labelKey)}</h3>
                        <p className="text-muted-foreground leading-relaxed mt-1">{value}</p>
                      </div>
                    </motion.div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              {/* Basera House Office Photo Card */}
              <motion.div
                className="mb-12 overflow-hidden rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow group relative cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                  <img
                    src={imageUrl("basera-house-mahewa-khurd.jpeg")}
                    alt="Basera House - Mahewa Khurd Office"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-navy/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-0.5">Registered Office</p>
                    <h4 className="text-lg font-bold">Basera House, Mahewa Khurd</h4>
                  </div>
                </div>
              </motion.div>


            </FadeIn>

            {/* Right — enquiry form */}
            <FadeIn direction="left" delay={0.15}>
              <div className="bg-white rounded-lg border border-border shadow-sm p-8 h-fit">
                <SectionHeading size="sm" className="mb-6">{t("contact.enquiry")}</SectionHeading>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {[
                      { name: "name" as const, labelKey: "contact.form.name", phKey: "contact.form.name.ph", type: "text" },
                      { name: "email" as const, labelKey: "contact.form.email", phKey: null, type: "email" },
                      { name: "phone" as const, labelKey: "contact.form.phone", phKey: null, type: "text" },
                    ].map(({ name, labelKey, phKey, type }, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: i * 0.08 }}
                      >
                        <FormField
                          control={form.control}
                          name={name}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{t(labelKey)}</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={phKey ? t(phKey) : name === "email" ? "email@example.com" : "+91 90000 00000"}
                                  type={type}
                                  {...field}
                                  data-testid={`input-${name}`}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </motion.div>
                    ))}

                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.24 }}
                    >
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{t("contact.form.message")}</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder={t("contact.form.message.ph")}
                                className="min-h-[150px] resize-y"
                                {...field}
                                data-testid="input-message"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                        size="lg"
                        data-testid="button-submit-enquiry"
                      >
                        {t("contact.form.send")}
                      </Button>
                    </motion.div>
                  </form>
                </Form>
              </div>
            </FadeIn>

          </div>

          {/* Full-width Support the Trust Section */}
          <FadeIn direction="up" delay={0.2} className="mt-20">
            <div id="support" className="scroll-mt-28 bg-muted p-8 md:p-12 rounded-3xl border border-border shadow-sm">
              <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                
                {/* Left Side: QR Code and Description */}
                <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
                  <h3 className="text-3xl font-bold text-navy mb-4">{t("contact.support")}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base mb-8 max-w-md">
                    {t("contact.donate.desc")}
                  </p>
                  
                  {/* QR Code container */}
                  <div className="w-48 h-48 bg-white border border-border rounded-2xl overflow-hidden p-3 shadow-md hover:shadow-lg transition-shadow flex items-center justify-center">
                    <img
                      src={imageUrl("qr-code.png")}
                      alt="Donation QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                {/* Right Side: Bank and UPI Details */}
                <div className="w-full lg:w-1/2 space-y-6">
                  <div>
                    <p className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
                      {t("contact.bank")}
                    </p>
                    <div className="text-base text-muted-foreground font-mono space-y-1.5 bg-white p-6 rounded-2xl border border-border shadow-sm">
                      <p><span className="font-semibold text-navy">Name:</span> PSKPT Trust</p>
                      <p><span className="font-semibold text-navy">Account No:</span> 1234567890123</p>
                      <p><span className="font-semibold text-navy">IFSC Code:</span> ABCD0123456</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm uppercase tracking-wider mb-3">
                      UPI Transfer
                    </p>
                    <div className="text-base text-muted-foreground font-mono bg-white p-6 rounded-2xl border border-border shadow-sm">
                      <p><span className="font-semibold text-navy">UPI ID:</span> pskpt@bankname</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
