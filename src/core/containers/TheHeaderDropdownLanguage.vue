<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0 mt-1">
    <template #toggler>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon :name="activeLanguage.flag" />
        </CHeaderNavLink>
      </CHeaderNavItem>
    </template>
    <CDropdownItem
      v-for="(language, i) in languages"
      :key="i"
      @click="selectedLanguage(language.lang)"
    >
      <CIcon :name="language.flag" class="mr-1" />
      {{language.name}}
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import i18nService from "@/core/services/i18n.service.js";

export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      languages: i18nService.languages,
    };
  },
  methods: {
    selectedLanguage(lang) {
      i18nService.setActiveLanguage(lang);
      this.$emit(
        "language-changed",
        this.languages.find((val) => {
          return val.lang === lang;
        })
      );
      window.location.reload();
    },
  },
  computed: {
    activeLanguage() {
      return this.languages.find((val) => {
        return val.lang === i18nService.getActiveLanguage();
      });
    },
  },
};
</script>
