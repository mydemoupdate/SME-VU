<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import PhongBanActions from "./PhongBan/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/danh-muc/cctc/phong-ban",
          active: false,
          name: "Phòng ban",
          actions: PhongBanActions,
        },
      ],
    };
  },
};
</script>
