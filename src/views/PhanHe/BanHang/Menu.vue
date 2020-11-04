<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import BanHangActions from "./BanHang/MenuActions";
import GiamGiaHangBanActions from "./GiamGiaHangBan/MenuActions";
import TraLaiHangBanActions from "./TraLaiHangBan/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/phan-he/ban-hang/ct-ban-hang",
          active: false,
          name: "Chứng từ bán hàng",
          actions: BanHangActions,
        },
        {
          to: "/phan-he/ban-hang/giam-gia-hang-ban",
          active: false,
          name: "Giảm giá hàng bán",
          actions: GiamGiaHangBanActions,
        },
        {
          to: "/phan-he/ban-hang/tra-lai-hang-ban",
          active: false,
          name: "Trả lại hàng bán",
          actions: TraLaiHangBanActions,
        },
      ],
    };
  },
};
</script>
