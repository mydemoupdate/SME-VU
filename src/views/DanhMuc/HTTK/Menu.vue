<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import Actions from "./MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/danh-muc/httk",
          active: false,
          name: "HTTK",
          actions: Actions,
        },
      ],
    };
  },
};
</script>
