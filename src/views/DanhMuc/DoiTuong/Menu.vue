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
          to: "/danh-muc/doi-tuong",
          active: false,
          name: "Đối tượng",
          actions: Actions,
        },
      ],
    };
  },
};
</script>
