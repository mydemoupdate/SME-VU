<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <CIcon name="logo" height="48" alt="Logo" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/dashboard">
          {{ $t("Dashboard") }}
        </CHeaderNavLink>
      </CHeaderNavItem>
      <!-- <CHeaderNavItem class="px-1">
        <CHeaderNavLink>
          <CIcon name="cil-cloud-download" v-c-tooltip="'Download'" />
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink>
          <CIcon name="cil-search" v-c-tooltip="'Search'" />
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="px-1">
        <CHeaderNavLink>
          <CIcon name="cil-filter" v-c-tooltip="'Filter'" />
        </CHeaderNavLink>
      </CHeaderNavItem> -->
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <TheHeaderDropdownLanguage />
      <TheHeaderDropdownAccount />
    </CHeaderNav>
    <component v-if="!!menu" v-bind:is="menu"></component>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccount from "./TheHeaderDropdownAccount";
import TheHeaderDropdownLanguage from "./TheHeaderDropdownLanguage";
import { MENU, SELECT_ITEM } from "../services/store/nav.module";
import { mapGetters } from "vuex";

export default {
  name: "TheHeader",
  components: {
    TheHeaderDropdownAccount,
    TheHeaderDropdownLanguage,
  },
  computed: {
    ...mapGetters({
      menu: MENU,
    }),
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.$store.dispatch(SELECT_ITEM, route.path);
      },
    },
  },
};
</script>