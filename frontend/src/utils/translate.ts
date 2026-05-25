export type Language = "en" | "od" | "hi";

const dictionary: Record<string, Record<Language, string>> = {
  whyQuit: {
    en: "Why Quit Smokeless Tobacco?",
    od: "ଧୂମପାନ ମୁକ୍ତ ତମାଖୁ କାହିଁକି ଛାଡିବେ?",
    hi: "धुआंरहित तंबाकू क्यों छोड़ें?"
  },
  startSession: {
    en: "Start Your Session",
    od: "ସେସନ୍ ଆରମ୍ଭ କରନ୍ତୁ",
    hi: "अपना सत्र शुरू करें"
  },
  haveCraving: {
    en: "I HAVE A CRAVING NOW",
    od: "ମୋର ଏବେ ଇଚ୍ଛା ହେଉଛି",
    hi: "मुझे अभी तलब लगी है"
  },
  moneySaved: {
    en: "Money Saved",
    od: "ସଞ୍ଚିତ ଅର୍ଥ",
    hi: "बचाए गए पैसे"
  },
  urgesDefeated: {
    en: "Urges Defeated",
    od: "ଦମନ ହୋଇଥିବା ଇଚ୍ଛା",
    hi: "रोकी गई तलब"
  },
  oralHealthTimeline: {
    en: "Oral Health Timeline",
    od: "ମୁଖ ସ୍ୱାସ୍ଥ୍ୟ ସମୟ ସୀମା",
    hi: "ओरल हेल्थ टाइमलाइन"
  },
  runScreening: {
    en: "Run Guided Oral Cancer Screening",
    od: "ମୁଖ କର୍କଟ ରୋଗ ପରୀକ୍ଷା କରନ୍ତୁ",
    hi: "ओरल कैंसर स्क्रीनिंग शुरू करें"
  },
  daysTobaccoFree: {
    en: "Days Tobacco-Free",
    od: "ତମାଖୁ ବିନା ଦିନ",
    hi: "तंबाकू मुक्त दिन"
  },
  quitProgress: {
    en: "Quit Progress",
    od: "ଛାଡିବାର ଅଗ୍ରଗତି",
    hi: "छोड़ने की प्रगति"
  },
  smokelessPrevention: {
    en: "Smokeless Prevention Insights",
    od: "ତମାଖୁ ପ୍ରତିରୋଧ ଜ୍ଞାନ",
    hi: "तंबाकू रोकथाम अंतर्दृष्टि"
  },
  cravingsAvoided: {
    en: "Cravings",
    od: "ଇଚ୍ଛା ଏଡ଼ାଗଲା",
    hi: "तलब टाली"
  }
};

export function translate(key: string, lang: Language): string {
  if (dictionary[key] && dictionary[key][lang]) {
    return dictionary[key][lang];
  }
  return key;
}

export function getSelectedLanguage(): Language {
  return (localStorage.getItem("app_language") as Language) || "en";
}

export function setSelectedLanguage(lang: Language) {
  localStorage.setItem("app_language", lang);
}
