const i18nService = {
  defaultLanguage: "vi",

  languages: [
    {
      lang: "vi",
      name: "Vietnamese",
      flag: "cif-vn",
    },
    {
      lang: "ja",
      name: "Japanese",
      flag: "cif-jp",
    },
  ],

  /**
   * Keep the active language in the localStorage
   * @param lang
   */
  setActiveLanguage(lang) {
    localStorage.setItem("language", lang);
  },

  /**
   * Get the current active language
   * @returns {string | string}
   */
  getActiveLanguage() {
    return localStorage.getItem("language") || this.defaultLanguage;
  }
};

export default i18nService;
