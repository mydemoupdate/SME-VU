<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="(value) => $store.commit('set', ['sidebarShow', value])"
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <CIcon
        class="c-sidebar-brand-full"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 556 134"
      />
      <CIcon
        class="c-sidebar-brand-minimized"
        name="logo"
        size="custom-size"
        :height="35"
        viewBox="0 0 110 134"
      />
    </CSidebarBrand>

    <CRenderFunction flat :content-to-render="navItems" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="$store.commit('set', ['sidebarMinimize', !minimize])"
    />
  </CSidebar>
</template>

<script>
// import defaultItems from "./_items";
import { ITEMS as NAV_ITEMS, PUSH_ITEMS, FRESH_ITEMS } from "@/core/services/store/nav.module";
import items from "@/config/nav";

export default {
  name: "TheSidebar",
  created() {
    this.$store.dispatch(FRESH_ITEMS);
    this.$store.dispatch(PUSH_ITEMS, items);
    // this.$store.dispatch(PUSH_ITEMS, defaultItems);
  },
  computed: {
    show() {
      return this.$store.state.sidebar.sidebarShow;
    },
    minimize() {
      return this.$store.state.sidebar.sidebarMinimize;
    },
    navItems() {
      return this.$store.getters[NAV_ITEMS];
    },
  },
};
</script>
