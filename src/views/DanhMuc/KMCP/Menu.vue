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
          to: "/danh-muc/kmcp",
          active: false,
          name: "Khoản mục chi phí",
          actions: Actions,
        },
      ],
    };
  },
};
</script>
