import Vue from "vue";
import VueI18n from "vue-i18n";

// Localisation language list
import { locale as en } from "@/core/config/i18n/en";
import { locale as ja } from "@/core/config/i18n/ja";
import { locale as vi } from "@/core/config/i18n/vi";

// Custom languages
import { locale as enMessages } from "@/config/i18n/en";
import { locale as jaMessages } from "@/config/i18n/ja";
import { locale as viMessages } from "@/config/i18n/vi";

Vue.use(VueI18n);

let messages = {
  en: { ...en, ...enMessages },
  vi: { ...vi, ...viMessages },
  ja: { ...ja, ...jaMessages }
};

// get current selected language
const lang = localStorage.getItem("language") || "vi";

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: lang, // set locale
  messages // set locale messages
});

export default i18n;
