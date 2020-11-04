<template>
  <MenuHeader :tabs="tabs" />
</template>

<script>
import VTHHActions from "./VTHH/MenuActions";
import KhoActions from "./Kho/MenuActions";
import NhomVTHHActions from "./Nhom/MenuActions";
import DonViActions from "./DonVi/MenuActions";

export default {
  name: "Menu",
  data() {
    return {
      tabs: [
        {
          to: "/danh-muc/vthh/vthh",
          active: false,
          name: "Vật tư hàng hóa",
          actions: VTHHActions,
        },
        {
          to: "/danh-muc/vthh/kho",
          active: false,
          name: "Kho",
          actions: KhoActions,
        },
        {
          to: "/danh-muc/vthh/nhom",
          active: false,
          name: "Nhóm VTHH",
          actions: NhomVTHHActions,
        },
        {
          to: "/danh-muc/vthh/don-vi",
          active: false,
          name: "Đơn vị",
          actions: DonViActions,
        },
      ],
    };
  },
};
</script>
