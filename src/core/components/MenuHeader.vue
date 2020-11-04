<template>
  <CSubheader class="px-0 menu">
    <Splitpanes class="default-theme">
      <Pane :size="50">
        <CNav variant="tabs" style="border-bottom: 0">
          <CNavItem
            v-for="(tab, i) in tabs"
            :key="i"
            :to="tab.to"
            :active="tab.active"
          >
            {{ $t(tab.name) }}
          </CNavItem>
        </CNav>
      </Pane>
      <Pane :size="50" v-if="!!tabActive">
        <component :is="tabActive.actions" />
      </Pane>
    </Splitpanes>
  </CSubheader>
</template>

<script>
export default {
  name: "MenuHeader",
  props: {
    tabs: {
      type: Array,
      required: true,
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.lodash.each(this.tabs, (tab) => {
          this.$set(tab, "active", tab.to == route.path);
        });
      },
    },
  },
  computed: {
    tabActive() {
      return this.tabs.find((tab) => tab.active);
    },
  },
};
</script>
