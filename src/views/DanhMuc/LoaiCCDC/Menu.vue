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
          to: "/danh-muc/loai-ccdc",
          active: false,
          name: "Loại CCDC",
          actions: Actions,
        },
      ],
    };
  },
};
</script>
