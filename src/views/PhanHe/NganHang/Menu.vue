<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import ThuTienGuiActions from "./ThuTienGui/MenuActions";
import ChiTienGuiActions from "./ChiTienGui/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/phan-he/ngan-hang/thu-tien-gui",
          active: false,
          name: "Thu tiền gửi",
          actions: ThuTienGuiActions,
        },
        {
          to: "/phan-he/ngan-hang/chi-tien-gui",
          active: false,
          name: "Chi tiền gửi",
          actions: ChiTienGuiActions,
        },
      ],
    };
  },
};
</script>
