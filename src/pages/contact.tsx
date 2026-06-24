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
    document.title = "Contact Us | Pandit Shri Kashi Prasad Tiwari Trust";
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
        <>123 Trust Bhavan, Main Road,<br />City Name, State 123456, India<br /><span className="text-sm italic"></span></>
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

              <motion.div
                className="bg-muted p-8 rounded-lg border border-border"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3 className="text-2xl font-bold text-foreground mb-4">{t("contact.support")}</h3>
                <p className="text-muted-foreground mb-6">{t("contact.donate.desc")}</p>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-foreground">
                      {t("contact.bank")} <span className="font-normal text-sm italic text-muted-foreground"></span>
                    </p>
                    <p className="text-sm text-muted-foreground font-mono mt-1">A/C Name: PSKPT Trust</p>
                    <p className="text-sm text-muted-foreground font-mono">A/C No: 1234567890123</p>
                    <p className="text-sm text-muted-foreground font-mono">IFSC: ABCD0123456</p>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <p className="font-medium text-foreground">
                      UPI <span className="font-normal text-sm italic text-muted-foreground"></span>
                    </p>
                    <p className="text-sm text-muted-foreground font-mono mt-1">pskpt@bankname</p>
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
        </div>
      </section>
    </div>
  );
}
