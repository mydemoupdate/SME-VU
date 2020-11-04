<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import BangCDKTActions from "./BangCDKT/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/phan-he/tong-hop/bctc/bang-cdkt",
          active: false,
          name: "Bản cân đối kế toán",
          actions: BangCDKTActions,
        },
      ],
    };
  },
};
</script>
