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
          to: "/danh-muc/loai-tscd",
          active: false,
          name: "Loại TSCD",
          actions: Actions,
        },
      ],
    };
  },
};
</script>
