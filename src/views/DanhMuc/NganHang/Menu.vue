<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import NganHangActions from "./NganHang/MenuActions";
import TKNganHangActions from "./TKNganHang/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/danh-muc/ngan-hang/ngan-hang",
          active: false,
          name: "Ngân hàng",
          actions: NganHangActions,
        },
        {
          to: "/danh-muc/ngan-hang/tk-ngan-hang",
          active: false,
          name: "Tài khoản ngân hàng",
          actions: TKNganHangActions,
        },
      ],
    };
  },
};
</script>
