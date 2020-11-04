<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import PhieuThuActions from "./PhieuThu/MenuActions";
import PhieuChiActions from "./PhieuChi/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/phan-he/quy/phieu-thu",
          active: false,
          name: "Thu tiền",
          actions: PhieuThuActions,
        },
        {
          to: "/phan-he/quy/phieu-chi",
          active: false,
          name: "Chi tiền",
          actions: PhieuChiActions,
        },
      ],
    };
  },
};
</script>
