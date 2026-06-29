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

  // Trust Name
  "trust.name.part1": { en: "Shri K. P. Tiwari", hi: "श्री के. पी. तिवारी" },
  "trust.name.part2": { en: "Shanti Sevadharm Public Charitable Trust", hi: "शांति सेवाधर्म सार्वजनिक धर्मार्थ ट्रस्ट" },
  "trust.name.full": { en: "Shri K. P. Tiwari Shanti Sevadharm Public Charitable Trust", hi: "श्री के. पी. तिवारी शांति सेवाधर्म सार्वजनिक धर्मार्थ ट्रस्ट" },

  // Hero
  "hero.badge": { en: "Public Charitable Trust", hi: "सार्वजनिक धर्मार्थ ट्रस्ट" },
  "hero.headline1": { en: "A Legacy of", hi: "एक विरासत" },
  "hero.headline2": { en: "Service", hi: "सेवा" },
  "hero.headline3": { en: "and Compassion", hi: "और करुणा की" },
  "hero.sub": {
    en: "Your support can bring smiles, education, healthcare, religious service, and dignity into someone's life. Every contribution is precious.",
    hi: "आपका सहयोग किसी के जीवन में मुस्कान, शिक्षा, स्वास्थ्य , धार्मिक सेवा और सम्मान का कारण बन सकता है। हर सहयोग अनमोल है।"
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

  // Intro quote (About the Trust - Short description on home page)
  "intro.quote": {
    en: "Our trust has been established in loving memory of our revered father, Late Pandit Shri Kashi Prasad Tiwari Ji, and is dedicated to preserving his ideals and values. Our mission is to keep his inspiring vision alive forever so that his legacy continues to motivate future generations.",
    hi: "हमारे ट्रस्ट की स्थापना हमारे पूज्य पिताजी पं॰ श्री काशी प्रसाद तिवारी की स्मृति और उनके आदर्शों को समर्पित है। हमारा उद्देश्य उनके नाम और उनकी प्रेरणादायक सोच को सदा के लिए जीवित रखना है, ताकि उनकी विरासत आने वाली पीढ़ियों को भी प्रेरित करती रहे।"
  },

  // Founder's Legacy / Life & Philosophy
  "founder.heading": { en: "Life & Philosophy", hi: "व्यक्तित्व एवं जीवन दर्शन" },
  "founder.p1": {
    en: "Late Pandit Shri Kashi Prasad Tiwari Ji embodied compassion, selfless service, and social harmony. His entire life was devoted to the welfare of others, charitable activities, and treating every individual with equality and respect.",
    hi: "पंडित श्री काशी प्रसाद तिवारी जी का जीवन परोपकार, करुणा और समरसता की एक प्रतिमूर्ति था। उनका संपूर्ण जीवन दूसरों के कल्याण, धर्मार्थ कार्यों के प्रति समर्पण और समाज के हर व्यक्ति को समान दृष्टिकोण से देखने की सोच से प्रेरित था।"
  },
  "founder.p2": {
    en: "He firmly believed that, \"True wealth is what we dedicate to the well-being of others.\" Whether it was supporting a neighbor during financial hardship, offering emotional strength in times of personal crisis, or standing up for the most vulnerable and voiceless members of society, he was always among the first to help.",
    hi: "उनका दृढ़ विश्वास था कि 'सच्चा धन वही है जो हम दूसरों की भलाई में लगा देते हैं।' चाहे आर्थिक तंगी में किसी पड़ोसी का संबल बनना हो, व्यक्तिगत संकट में किसी को नैतिक ढांढस बंधाना हो, या समाज के सबसे कमजोर और मूक वर्ग की आवाज बनना हो—वे हमेशा अग्रिम पंक्ति में खड़े मिलते थे।"
  },

  // Vision & Mission
  "vision.heading": { en: "Our Vision & Mission", hi: "लक्ष्य और ध्येय" },
  "vision.title": { en: "Our Vision", hi: "हमारा दृष्टिकोण (Vision)" },
  "vision.desc": {
    en: "To build an inclusive, educated, and healthy society inspired by the humanitarian ideals of Late Pandit Shri Kashi Prasad Tiwari Ji.",
    hi: "पंडित श्री काशी प्रसाद तिवारी जी के परोपकारी आदर्शों के अनुरूप एक समान, शिक्षित और स्वस्थ समाज का निर्माण करना।"
  },
  "vision.mission.title": { en: "Our Mission", hi: "हमारा लक्ष्य (Mission)" },
  "vision.mission.desc": {
    en: "To uplift every section of society through continuous social welfare initiatives, charitable services, and improved access to quality education and healthcare.",
    hi: "निरंतर सामाजिक सहायता, धर्मार्थ कार्यों के संचालन और स्वास्थ्य-शिक्षा की सुगम पहुंच के माध्यम से हर वर्ग का उत्थान करना।"
  },
  "vision.objective.title": { en: "Primary Objective", hi: "मुख्य उद्देश्य" },
  "vision.objective.desc": {
    en: "Our primary objective is to transform the philanthropic vision of Late Pandit Shri Kashi Prasad Tiwari Ji into meaningful action. We are committed to providing social assistance, carrying out charitable and religious activities, promoting equality and empowerment, serving humanity, and ensuring accessible education and healthcare for all.",
    hi: "हमारे ट्रस्ट का मुख्य उद्देश्य पंडित श्री काशी प्रसाद तिवारी जी के परोपकारी सोच को साकार करना है। हम सामाजिक सहायता प्रदान करने, धर्मार्थ कार्यों के संचालन, समानता एवं प्रोत्साहन को बढ़ावा देने, मानव सेवा करने तथा शिक्षा व स्वास्थ्य तक पहुंच को सुगम बनाने के लिए पूर्णतः प्रतिबद्ध हैं।"
  },

  // Activities Overview / Our Services
  "activities.heading": { en: "Our Services", hi: "हमारे सेवा कार्य" },
  "activities.sub": {
    en: "Explore the key areas where we continuously work to create a positive and lasting impact on society.",
    hi: "जानिए उन प्रमुख क्षेत्रों के बारे में, जहाँ हम समाज में सकारात्मक बदलाव लाने के लिए लगातार काम कर रहे हैं।"
  },
  "act.social": { en: "Social Aid", hi: "सामाजिक सहायता" },
  "act.social.desc": { en: "Financial and moral assistance to those in need.", hi: "जरूरतमंदों को आर्थिक और नैतिक सहायता।" },
  "act.charity": { en: "Charitable Work", hi: "धर्मार्थ कार्य" },
  "act.charity.desc": { en: "Community development and welfare projects.", hi: "सामुदायिक विकास और कल्याण परियोजनाएं।" },
  "act.edu": { en: "Education & Health", hi: "शिक्षा और स्वास्थ्य" },
  "act.edu.desc": { en: "Improving access to basic necessities.", hi: "बुनियादी आवश्यकताओं तक पहुंच में सुधार।" },
  "act.disaster": { en: "Disaster Relief", hi: "आपदा राहत" },
  "act.disaster.desc": { en: "Standing by people in times of crisis.", hi: "संकट के समय लोगों के साथ खड़े रहना।" },

  // CTA / Join Our Mission
  "cta.heading": { en: "Join Our Mission", hi: "जुड़ें हमारे अभियान से" },
  "cta.sub": {
    en: "Even the smallest act of kindness empowers us to carry forward this invaluable legacy of service. Whether through volunteering your time or making a financial contribution, every helping hand makes a meaningful difference.",
    hi: "आपका एक छोटा सा सहयोग भी हमें सेवा की इस अनमोल विरासत को आगे बढ़ाने की शक्ति देता है। चाहे समयदान (स्वयंसेवा) हो या आर्थिक योगदान — आपका हर हाथ हमारे लिए महत्वपूर्ण है।"
  },
  "cta.donate": { en: "Make a Donation", hi: "दान करें" },
  "cta.learn": { en: "Learn More", hi: "और जानें" },

  // Home Registered Office Section
  "home.office.heading": { en: "Registered Office", hi: "पंजीकृत कार्यालय" },
  "home.office.title": { en: "Basera House", hi: "बसेरा हाउस" },
  "home.office.sub": { en: "The central hub of our trust's welfare activities and operations.", hi: "हमारे ट्रस्ट की कल्याणकारी गतिविधियों और संचालन का केंद्रीय केंद्र।" },
  "home.office.desc": {
    en: "Located in Prayagraj, Basera House is the registered headquarters of the Shri K. P. Tiwari Shanti Sevadharm Public Charitable Trust. It is here that we coordinate our community outreach, scholarship programs, and service initiatives to carry forward the legacy of compassion.",
    hi: "प्रयागराज में स्थित, बसेरा हाउस श्री के. पी. तिवारी शांति सेवाधर्म सार्वजनिक धर्मार्थ ट्रस्ट का पंजीकृत मुख्यालय है। यह वह स्थान है जहां से हम करुणा की विरासत को आगे बढ़ाने के लिए अपने सामाजिक कार्यक्रमों, छात्रवृत्ति वितरण और सेवा पहलों का समन्वय करते हैं।"
  },

  // About page
  "about.title": { en: "About Us", hi: "हमारे बारे में" },
  "about.subtitle": {
    en: "Continuing a legacy of service, compassion, and unwavering support for the community.",
    hi: "सेवा, करुणा और समुदाय के प्रति अटूट समर्थन की विरासत को आगे बढ़ाना।"
  },
  "about.bio.heading": { en: "Life & Philosophy", hi: "व्यक्तित्व एवं जीवन दर्शन" },
  "about.bio.p1": {
    en: "Late Pandit Shri Kashi Prasad Tiwari Ji embodied compassion, selfless service, and social harmony. His entire life was devoted to the welfare of others, charitable activities, and treating every individual with equality and respect.",
    hi: "पंडित श्री काशी प्रसाद तिवारी जी का जीवन परोपकार, करुणा और समरसता की एक प्रतिमूर्ति था। उनका संपूर्ण जीवन दूसरों के कल्याण, धर्मार्थ कार्यों के प्रति समर्पण और समाज के हर व्यक्ति को समान दृष्टिकोण से देखने की सोच से प्रेरित था।"
  },
  "about.bio.p2": {
    en: "He firmly believed that, \"True wealth is what we dedicate to the well-being of others.\" Whether it was supporting a neighbor during financial hardship, offering emotional strength in times of personal crisis, or standing up for the most vulnerable and voiceless members of society, he was always among the first to help.",
    hi: "उनका दृढ़ विश्वास था कि 'सच्चा धन वही है जो हम दूसरों की भलाई में लगा देते हैं।' चाहे आर्थिक तंगी में किसी पड़ोसी का संबल बनना हो, व्यक्तिगत संकट में किसी को नैतिक ढांढस बंधाना हो, या समाज के सबसे कमजोर और मूक वर्ग की आवाज बनना हो—वे हमेशा अग्रिम पंक्ति में खड़े मिलते थे।"
  },
  "about.why.heading": { en: "Purpose of Establishing the Trust", hi: "ट्रस्ट की स्थापना का उद्देश्य" },
  "about.why.p": {
    en: "This trust was founded by the family of Late Pandit Shri Kashi Prasad Tiwari Ji to ensure that his legacy of compassion, selfless service, and kindness continues to inspire generations to come. Our goal is simple—to carry forward the welfare initiatives he began and to inspire young people to embrace the spirit of community service.",
    hi: "पंडित जी की सेवा भावना और करुणा की विरासत कभी फीकी न पड़े, इसी पावन उद्देश्य के साथ उनके परिवार द्वारा इस ट्रस्ट की स्थापना की गई है। हमारा लक्ष्य बहुत सरल है—उनके द्वारा शुरू किए गए कल्याणकारी कार्यों को निरंतर आगे बढ़ना और युवा पीढ़ी में समाज सेवा के प्रति एक नई अलख जगाना।"
  },
  "about.founder.name": { en: "Late. Pt. Shri Kashi Prasad Tiwari Ji", hi: "Late. Pt. Shri Kashi Prasad Tiwari Ji" },
  "about.founder.label": { en: "Our Guiding Inspiration", hi: "प्रेरणास्रोत" },
  "about.photo": { en: "Photo Placeholder", hi: "फोटो स्थान" },
  "about.portrait": { en: "Portrait Placeholder", hi: "चित्र स्थान" },

  // Objectives
  "obj.heading": { en: "Core Objectives of the Trust", hi: "ट्रस्ट के मुख्य उद्देश्य" },
  "obj.sub": {
    en: "Inspired by the humanitarian ideals and principles of Late Pandit Shri Kashi Prasad Tiwari Ji, we are committed to working through five fundamental pillars to create lasting social impact.",
    hi: "पंडित जी के परोपकारी विचारों और सिद्धांतों को धरातल पर उतारने के लिए हम इन पाँच मूल स्तंभों (लक्ष्यों) के माध्यम से कार्य करने के लिए पूर्णतः संकल्पित हैं।"
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

  // Trustees / Leadership
  "trustees.heading": { en: "Leadership", hi: "नेतृत्व" },
  "trustees.chairman.name": { en: "Mr. Sachchida Nand Tiwari", hi: "Mr. Sachchida Nand Tiwari" },
  "trustees.chairman.role": { en: "Chairman", hi: "Chairman" },
  "trustees.secretary.name": { en: "Mr. Gyan Chandra Dubey", hi: "Mr. Gyan Chandra Dubey" },
  "trustees.secretary.role": { en: "Secretary", hi: "Secretary" },
  "trustees.member1.name": { en: "Mrs. Neelam Krishna Nand Tiwari", hi: "Mrs. Neelam Krishna Nand Tiwari" },
  "trustees.member1.role": { en: "Member", hi: "Member" },
  "trustees.member2.name": { en: "Mr. Krishna Nand Tiwari", hi: "Mr. Krishna Nand Tiwari" },
  "trustees.member2.role": { en: "Member", hi: "Member" },

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
    en: "A charitable trust founded on the values of compassion, humanity, and the rich Indian tradition of selfless service, dedicated to promoting public welfare and creating positive social change.",
    hi: "मानवीय संवेदनाओं और भारतीय सेवा संस्कारों पर आधारित एक धर्मार्थ ट्रस्ट, जो लोक-कल्याण के आदर्शों को साकार करने तथा समाज में सकारात्मक परिवर्तन लाने के लिए पूर्णतः समर्पित है।"
  },
  "footer.quicklinks": { en: "Quick Links", hi: "त्वरित लिंक" },
  "footer.contact": { en: "Contact", hi: "संपर्क" },
  "footer.copyright": {
    en: "Shri K. P. Tiwari Shanti Sevadharm Public Charitable Trust. All rights reserved.",
    hi: "श्री के. पी. तिवारी शांति सेवाधर्म सार्वजनिक धर्मार्थ ट्रस्ट। सर्वाधिकार सुरक्षित।"
  },

  // Contact page
  "contact.title": { en: "Contact Us", hi: "संपर्क करें" },
  "contact.sub": {
    en: "We welcome your inquiries, feedback, and support. Get in touch with us to learn more.",
    hi: "हम आपकी पूछताछ, प्रतिक्रिया और समर्थन का स्वागत करते हैं। अधिक जानने के लिए हमसे संपर्क करें।"
  },
  "contact.getintouch": { en: "Get in Touch", hi: "संपर्क करें" },
  "contact.address": { en: "Address", hi: "पता" },
  "contact.address.value": {
    en: "Basera House\nVillage: Mahewa Khurd\nPost: Nahwai\nDistrict: Prayagraj, Uttar Pradesh - 212104\nIndia",
    hi: "बसेरा हाउस\nग्राम: महेवा खुर्द\nपोस्ट: नहवाई\nजिला: प्रयागराज, उत्तर प्रदेश - 212104\nभारत"
  },
  "contact.phone": { en: "Phone", hi: "फ़ोन" },
  "contact.email": { en: "Email", hi: "ईमेल" },
  "contact.hours": { en: "Office Hours", hi: "कार्यालय समय" },
  "contact.hours.value": { en: "Mon - Sat: 10:00 AM - 5:00 PM", hi: "सोम - शनि: सुबह 10:00 - शाम 5:00" },
  "contact.support": { en: "Support the Trust", hi: "ट्रस्ट का समर्थन करें" },
  "contact.donate.desc": {
    en: "Your contribution strengthens our journey of service. Support our mission to promote education, healthcare, and social welfare by making your valuable donation.",
    hi: "आपका सहयोग हमारी सेवा यात्रा को आगे बढ़ाता है। शिक्षा, स्वास्थ्य एवं सामाजिक सहायता के इस अभियान में अपना अमूल्य योगदान दें।"
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
