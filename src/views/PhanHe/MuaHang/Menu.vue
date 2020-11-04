<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import MuaHangActions from "./MuaHang/MenuActions";
import GiamGiaHangMuaActions from "./GiamGiaHangMua/MenuActions";
import TraLaiHangMuaActions from "./TraLaiHangMua/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/phan-he/mua-hang/ct-mua-hang",
          active: false,
          name: "Chứng từ mua hàng",
          actions: MuaHangActions,
        },
        {
          to: "/phan-he/mua-hang/giam-gia-hang-mua",
          active: false,
          name: "Giảm giá hàng mua",
          actions: GiamGiaHangMuaActions,
        },
        {
          to: "/phan-he/mua-hang/tra-lai-hang-mua",
          active: false,
          name: "Trả lại hàng mua",
          actions: TraLaiHangMuaActions,
        },
      ],
    };
  },
};
</script>
