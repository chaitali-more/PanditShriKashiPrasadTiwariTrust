import { createContext, useContext, useState } from "react";

type Lang = "en" | "hi";

interface LanguageContextType {
  lang: Lang;
  toggle: () => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Lang, string>> = {
  // Nav
  "nav.home": { en: "Home", hi: "होम" },
  "nav.about": { en: "About Us", hi: "हमारे बारे में" },
  "nav.activities": { en: "Activities", hi: "गतिविधियाँ" },
  "nav.gallery": { en: "Gallery", hi: "गैलरी" },
  "nav.contact": { en: "Contact Us", hi: "संपर्क करें" },
  "nav.support": { en: "Support the Trust", hi: "ट्रस्ट का समर्थन करें" },

  // Hero
  "hero.badge": { en: "Public Charitable Trust", hi: "सार्वजनिक धर्मार्थ ट्रस्ट" },
  "hero.headline1": { en: "A Legacy of", hi: "एक विरासत" },
  "hero.headline2": { en: "Service", hi: "सेवा" },
  "hero.headline3": { en: "and Compassion", hi: "और करुणा की" },
  "hero.sub": {
    en: "Dedicated to the noble philosophy of Pandit Shri Kashi Prasad Tiwari Ji — helping others, standing by people in every circumstance, and bringing positive change to society.",
    hi: "पं॰ श्री काशी प्रसाद तिवारी जी के महान दर्शन को समर्पित — दूसरों की मदद करना, हर परिस्थिति में लोगों के साथ खड़े रहना और समाज में सकारात्मक बदलाव लाना।"
  },
  "hero.contact": { en: "Contact Us", hi: "संपर्क करें" },
  "hero.support": { en: "Support the Trust", hi: "ट्रस्ट का समर्थन करें" },
  "hero.cred1": { en: "Registered Public Charitable Trust", hi: "पंजीकृत सार्वजनिक धर्मार्थ ट्रस्ट" },
  "hero.cred2": { en: "Community-driven social work", hi: "समुदाय-संचालित सामाजिक कार्य" },
  "hero.cred3": { en: "Founded in memory of a philanthropist", hi: "एक परोपकारी की स्मृति में स्थापित" },
  "hero.purpose": { en: "Serving those in need", hi: "जरूरतमंदों की सेवा" },
  "hero.purposeLabel": { en: "Our purpose", hi: "हमारा उद्देश्य" },
  "hero.stat1.val": { en: "15+", hi: "15+" },
  "hero.stat1.lbl": { en: "Years Legacy", hi: "वर्षों की विरासत" },
  "hero.stat2.val": { en: "10,000+", hi: "10,000+" },
  "hero.stat2.lbl": { en: "People Helped", hi: "सहायता प्राप्त लोग" },
  "hero.stat3.val": { en: "100%", hi: "100%" },
  "hero.stat3.lbl": { en: "Charitable Trust", hi: "धर्मार्थ ट्रस्ट" },

  // Intro quote
  "intro.quote": {
    en: "\"Our trust was established in the memory of, and dedicated to the great ideals of, our revered father Pandit Shri Kashi Prasad Tiwari. Our aim is to uphold and propagate his noble philosophy for future generations.\"",
    hi: "\"हमारे ट्रस्ट की स्थापना हमारे पूज्य पिताजी पं॰ श्री काशी प्रसाद तिवारी की स्मृति और उनके महान आदर्शों को समर्पित है। हमारा उद्देश्य उनके नाम और उनकी प्रेरणादायक सोच को सदा के लिए जीवित रखना है, ताकि उनकी विरासत आने वाली पीढ़ियों को भी प्रेरित करती रहे।\""
  },

  // Founder's Legacy
  "founder.heading": { en: "Founder's Legacy", hi: "संस्थापक की विरासत" },
  "founder.p1": {
    en: "Pandit Shri Kashi Prasad Tiwari was a person whose thinking always centered on helping others, engaging in charitable work, and treating everyone with equal respect. His life was a testament to the power of quiet, consistent service.",
    hi: "पं॰ श्री काशी प्रसाद तिवारी एक ऐसे व्यक्ति थे जिनकी सोच हमेशा दूसरों की मदद करने, धर्मार्थ कार्यों में संलग्न रहने और सभी को समान भाव से देखने पर केंद्रित थी।"
  },
  "founder.p2": {
    en: "He believed that we should always encourage people, stand by them in every circumstance, and bring positive change to society through various philanthropic efforts, including financial assistance, social aid, and humanitarian service.",
    hi: "उनका मानना था कि हमें हमेशा लोगों को प्रोत्साहित करना चाहिए, किसी भी परिस्थिति में उनके साथ खड़ा रहना चाहिए और आर्थिक सहायता सहित विभिन्न परोपकारी कार्यों के माध्यम से समाज में सकारात्मक बदलाव लाना चाहिए।"
  },

  // Vision & Mission
  "vision.heading": { en: "Vision & Mission", hi: "दृष्टि और मिशन" },
  "vision.text": {
    en: "The primary objective of our trust is to realize the philanthropic philosophy of Pandit Shri Kashi Prasad Tiwari Ji. We are committed to providing social support, carrying out charitable work, promoting equality and encouragement, undertaking humanitarian service, and improving access to education and health.",
    hi: "हमारे ट्रस्ट का मुख्य उद्देश्य पं॰ श्री काशी प्रसाद तिवारी जी के परोपकारी दर्शन को साकार करना है। हम सामाजिक सहायता प्रदान करने, धर्मार्थ कार्य करने, समानता और प्रोत्साहन को बढ़ावा देने, मानवीय सेवा करने और शिक्षा व स्वास्थ्य तक पहुंच सुधारने के लिए प्रतिबद्ध हैं।"
  },

  // Activities Overview
  "activities.heading": { en: "Our Activities", hi: "हमारी गतिविधियाँ" },
  "activities.sub": {
    en: "Discover the various areas where we are actively working to make a positive impact in our community.",
    hi: "उन विभिन्न क्षेत्रों की खोज करें जहाँ हम अपने समुदाय में सकारात्मक प्रभाव डालने के लिए सक्रिय रूप से कार्य कर रहे हैं।"
  },
  "act.social": { en: "Social Aid", hi: "सामाजिक सहायता" },
  "act.social.desc": { en: "Financial and moral assistance to those in need.", hi: "जरूरतमंदों को आर्थिक और नैतिक सहायता।" },
  "act.charity": { en: "Charitable Work", hi: "धर्मार्थ कार्य" },
  "act.charity.desc": { en: "Community development and welfare projects.", hi: "सामुदायिक विकास और कल्याण परियोजनाएं।" },
  "act.edu": { en: "Education & Health", hi: "शिक्षा और स्वास्थ्य" },
  "act.edu.desc": { en: "Improving access to basic necessities.", hi: "बुनियादी आवश्यकताओं तक पहुंच में सुधार।" },
  "act.disaster": { en: "Disaster Relief", hi: "आपदा राहत" },
  "act.disaster.desc": { en: "Standing by people in times of crisis.", hi: "संकट के समय लोगों के साथ खड़े रहना।" },

  // CTA
  "cta.heading": { en: "Join Us in Our Mission", hi: "हमारे मिशन में शामिल हों" },
  "cta.sub": {
    en: "Your support helps us continue the legacy of service. Whether through volunteering or donations, every contribution makes a difference.",
    hi: "आपका सहयोग हमें सेवा की विरासत को जारी रखने में मदद करता है। स्वयंसेवा हो या दान — हर योगदान महत्वपूर्ण है।"
  },
  "cta.donate": { en: "Make a Donation", hi: "दान करें" },
  "cta.learn": { en: "Learn More", hi: "और जानें" },

  // About page
  "about.title": { en: "About Us", hi: "हमारे बारे में" },
  "about.subtitle": {
    en: "Continuing a legacy of service, compassion, and unwavering support for the community.",
    hi: "सेवा, करुणा और समुदाय के प्रति अटूट समर्थन की विरासत को आगे बढ़ाना।"
  },
  "about.bio.heading": { en: "His Character & Philosophy", hi: "उनका चरित्र और दर्शन" },
  "about.bio.p1": {
    en: "Pandit Shri Kashi Prasad Tiwari was a person whose thinking always centered on helping others, engaging in charitable work, and treating everyone with equal respect. His life was a testament to the power of quiet, consistent service.",
    hi: "पं॰ श्री काशी प्रसाद तिवारी एक ऐसे व्यक्ति थे जिनकी सोच हमेशा दूसरों की मदद करने, धर्मार्थ कार्यों में संलग्न रहने और सभी को समान भाव से देखने पर केंद्रित थी।"
  },
  "about.bio.p2": {
    en: "He believed that true wealth lies in what we give to others. Whether it was standing by a neighbor in times of financial distress, providing moral support during personal crises, or advocating for those without a voice, he was always present.",
    hi: "उनका मानना था कि सच्चा धन वही है जो हम दूसरों को देते हैं। चाहे आर्थिक संकट में पड़ोसी के साथ खड़े रहना हो, व्यक्तिगत संकट में नैतिक समर्थन देना हो या बिना आवाज़ वालों की वकालत करना हो — वे हमेशा उपस्थित रहते थे।"
  },
  "about.why.heading": { en: "Why the Trust Was Established", hi: "ट्रस्ट की स्थापना क्यों हुई" },
  "about.why.p": {
    en: "The trust was founded by his family to ensure that his legacy of compassion does not fade. Our founding motivation is simple: to continue his work and inspire future generations to adopt a life of service. By institutionalizing his philosophy, we aim to reach more people and create sustainable, long-term impact.",
    hi: "ट्रस्ट की स्थापना उनके परिवार ने इसलिए की ताकि उनकी करुणा की विरासत फीकी न पड़े। हमारी स्थापना का उद्देश्य सरल है: उनके कार्य को आगे बढ़ाना और आने वाली पीढ़ियों को सेवा के जीवन के लिए प्रेरित करना।"
  },
  "about.founder.label": { en: "Founder & Inspiration", hi: "संस्थापक और प्रेरणास्रोत" },
  "about.photo": { en: "Photo Placeholder", hi: "फोटो स्थान" },
  "about.portrait": { en: "Portrait Placeholder", hi: "चित्र स्थान" },

  // Objectives
  "obj.heading": { en: "Trust Objectives", hi: "ट्रस्ट के उद्देश्य" },
  "obj.sub": {
    en: "We are committed to translating philosophy into action through these five core pillars.",
    hi: "हम इन पाँच मूल स्तंभों के माध्यम से दर्शन को कार्रवाई में बदलने के लिए प्रतिबद्ध हैं।"
  },
  "obj.1.title": { en: "Social Support", hi: "सामाजिक सहायता" },
  "obj.1.desc": {
    en: "Providing financial and moral assistance to the needy in our society.",
    hi: "जरूरतमंदों और वंचितों को आर्थिक और नैतिक सहायता प्रदान करना।"
  },
  "obj.2.title": { en: "Charitable Work", hi: "धर्मार्थ कार्य" },
  "obj.2.desc": {
    en: "Executing community development projects for collective welfare.",
    hi: "विभिन्न धर्मार्थ और सामुदायिक विकास परियोजनाओं में सक्रिय रूप से भाग लेना।"
  },
  "obj.3.title": { en: "Equality & Encouragement", hi: "समानता और प्रोत्साहन" },
  "obj.3.desc": {
    en: "Promoting equality, brotherhood, and uplifting marginalized voices.",
    hi: "समाज में समानता और भाईचारे की भावना को बढ़ावा देना और व्यक्तियों को उनके लक्ष्यों के लिए प्रोत्साहित करना।"
  },
  "obj.4.title": { en: "Humanitarian Service", hi: "मानवीय सेवा" },
  "obj.4.desc": {
    en: "Standing by people during disasters, crises, and unforeseen emergencies.",
    hi: "किसी भी आपदा या संकट की स्थिति में लोगों के साथ खड़े रहना और उनकी हर संभव मदद करना।"
  },
  "obj.5.title": { en: "Education & Health", hi: "शिक्षा और स्वास्थ्य" },
  "obj.5.desc": {
    en: "Ensuring access to quality education, healthcare, and basic necessities.",
    hi: "शिक्षा, स्वास्थ्य और अन्य मूलभूत आवश्यकताओं तक पहुंच में सुधार के लिए पहल करना।"
  },

  // Trustees
  "trustees.heading": { en: "Board of Trustees", hi: "न्यासी मंडल" },

  // Activities page
  "act.page.title": { en: "Activities", hi: "गतिविधियाँ" },
  "act.page.sub": {
    en: "A glimpse into our ongoing efforts to serve the community and uphold our founder's values.",
    hi: "समुदाय की सेवा और संस्थापक के मूल्यों को बनाए रखने के हमारे निरंतर प्रयासों की एक झलक।"
  },
  "act.initiatives": { en: "Key Initiatives", hi: "प्रमुख पहलें" },
  "act.events": { en: "Recent Events", hi: "हाल के कार्यक्रम" },
  "act.gallery": { en: "Photo Gallery", hi: "फोटो गैलरी" },

  // Gallery page
  "gallery.page.title": { en: "Gallery", hi: "गैलरी" },
  "gallery.page.sub": {
    en: "Moments from community gatherings, ceremonies, and trust-led participation.",
    hi: "सामुदायिक आयोजनों, समारोहों और ट्रस्ट की सहभागिता की झलकियाँ।"
  },
  "gallery.section.title": { en: "Photo Gallery", hi: "फोटो गैलरी" },
  "gallery.section.sub": {
    en: "Browse images from recent trust activities, each named clearly for easier recognition.",
    hi: "हाल की ट्रस्ट गतिविधियों की तस्वीरें देखें, जिन्हें पहचानने में आसानी के लिए स्पष्ट नाम दिए गए हैं।"
  },

  // Footer
  "footer.tagline": {
    en: "A charitable trust rooted in Indian values of service and compassion, dedicated to the noble philosophy of helping others and bringing positive change to society.",
    hi: "सेवा और करुणा के भारतीय मूल्यों में निहित एक धर्मार्थ ट्रस्ट, जो दूसरों की मदद करने और समाज में सकारात्मक बदलाव लाने के महान दर्शन को समर्पित है।"
  },
  "footer.quicklinks": { en: "Quick Links", hi: "त्वरित लिंक" },
  "footer.contact": { en: "Contact", hi: "संपर्क" },
  "footer.copyright": { en: "Pandit Shri Kashi Prasad Tiwari Trust. All rights reserved.", hi: "पं॰ श्री काशी प्रसाद तिवारी ट्रस्ट। सर्वाधिकार सुरक्षित।" },

  // Contact page
  "contact.title": { en: "Contact Us", hi: "संपर्क करें" },
  "contact.sub": {
    en: "We welcome your inquiries, feedback, and support. Get in touch with us to learn more.",
    hi: "हम आपकी पूछताछ, प्रतिक्रिया और समर्थन का स्वागत करते हैं। अधिक जानने के लिए हमसे संपर्क करें।"
  },
  "contact.getintouch": { en: "Get in Touch", hi: "संपर्क करें" },
  "contact.address": { en: "Address", hi: "पता" },
  "contact.phone": { en: "Phone", hi: "फ़ोन" },
  "contact.email": { en: "Email", hi: "ईमेल" },
  "contact.hours": { en: "Office Hours", hi: "कार्यालय समय" },
  "contact.hours.value": { en: "Mon - Sat: 10:00 AM - 5:00 PM", hi: "सोम - शनि: सुबह 10:00 - शाम 5:00" },
  "contact.support": { en: "Support the Trust", hi: "ट्रस्ट का समर्थन करें" },
  "contact.donate.desc": {
    en: "Your donations help us provide education, health care, and social support to those in need. Every contribution counts.",
    hi: "आपके दान से हम जरूरतमंदों को शिक्षा, स्वास्थ्य सेवा और सामाजिक सहायता प्रदान करते हैं। हर योगदान महत्वपूर्ण है।"
  },
  "contact.bank": { en: "Bank Transfer", hi: "बैंक ट्रांसफर" },
  "contact.enquiry": { en: "Send an Enquiry", hi: "पूछताछ भेजें" },
  "contact.form.name": { en: "Full Name", hi: "पूरा नाम" },
  "contact.form.name.ph": { en: "Your full name", hi: "आपका पूरा नाम" },
  "contact.form.email": { en: "Email Address", hi: "ईमेल पता" },
  "contact.form.phone": { en: "Phone Number", hi: "फ़ोन नंबर" },
  "contact.form.message": { en: "Message", hi: "संदेश" },
  "contact.form.message.ph": { en: "How can we help you?", hi: "हम आपकी कैसे मदद कर सकते हैं?" },
  "contact.form.send": { en: "Send Message", hi: "संदेश भेजें" },
  "contact.toast.title": { en: "Message Sent", hi: "संदेश भेजा गया" },
  "contact.toast.desc": { en: "Thank you for reaching out. We will get back to you soon.", hi: "संपर्क करने के लिए धन्यवाद। हम जल्द ही आपसे संपर्क करेंगे।" },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  toggle: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const toggle = () => setLang((prev) => (prev === "en" ? "hi" : "en"));

  const t = (key: string): string => {
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] ?? entry["en"] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
