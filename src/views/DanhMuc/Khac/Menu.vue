<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import MucThuChiActions from "./MucThuChi/MenuActions";
import LoaiTienActions from "./LoaiTien/MenuActions";
import LoaiChungTuActions from "./LoaiChungTu/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/danh-muc/khac/muc-thu-chi",
          active: false,
          name: "Mục thu chi",
          actions: MucThuChiActions,
        },
        {
          to: "/danh-muc/khac/loai-tien",
          active: false,
          name: "Loại tiền",
          actions: LoaiTienActions,
        },
        {
          to: "/danh-muc/khac/loai-chung-tu",
          active: false,
          name: "Loại chứng từ",
          actions: LoaiChungTuActions,
        },
      ],
    };
  },
};
</script>
