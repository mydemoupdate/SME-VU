<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import NhapKhoActions from "./NhapKho/MenuActions";
import XuatKhoActions from "./XuatKho/MenuActions";
import ChuyenKhoActions from "./ChuyenKho/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/phan-he/kho/ct-nhap-kho",
          active: false,
          name: "Chứng từ nhập kho",
          actions: NhapKhoActions,
        },
        {
          to: "/phan-he/kho/ct-xuat-kho",
          active: false,
          name: "Chứng từ xuất kho",
          actions: XuatKhoActions,
        },
        {
          to: "/phan-he/kho/ct-chuyen-kho",
          active: false,
          name: "Chứng từ chuyển kho",
          actions: ChuyenKhoActions,
        },
      ],
    };
  },
};
</script>
