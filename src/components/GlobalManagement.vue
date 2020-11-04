<template>
  <div></div>
</template>

<script>
export default {
  name: "GlobalManagement",
  created() {
    this.$store.dispatch("tinhchat.bind");
    this.$store.dispatch("httk.bind");
    this.$store.dispatch("phongban.bind");
    this.$store.dispatch("loaiccdc.bind");
    this.$store.dispatch("loaitscd.bind");
    this.$store.dispatch("vthh.bind");
    this.$store.dispatch("kho.bind");
    this.$store.dispatch("nhomvthh.bind");
    this.$store.dispatch("donvi.bind");
    this.$store.dispatch("kmcp.bind");
    this.$store.dispatch("nganhang.bind");
    this.$store.dispatch("taikhoannganhang.bind");
    this.$store.dispatch("loaichungtu.bind");
    this.$store.dispatch("loaitien.bind");
    this.$store.dispatch("mucthuchi.bind");
    this.$store.dispatch("loaidoituong.bind");
    this.$store.dispatch("doituong.bind");
    this.$store.dispatch("hachtoan.bind");
    this.$store.dispatch("chungtu.phieuthu.bind");
    this.$store.dispatch("chungtu.phieuchi.bind");
    this.$store.dispatch("chungtu.giamgiahangmua.bind");
    this.$store.dispatch("chungtu.tralaihangmua.bind");
    this.$store.dispatch("chungtu.muahang.bind");
    this.$store.dispatch("chungtu.banhang.bind");
    this.$store.dispatch("chungtu.thutiengui.bind");
    this.$store.dispatch("chungtu.chitiengui.bind");
    this.$store.dispatch("chungtu.giamgiahangban.bind");
    this.$store.dispatch("chungtu.tralaihangban.bind");
    this.$store.dispatch("chungtu.nhapkho.bind");
    this.$store.dispatch("chungtu.xuatkho.bind");
    this.$store.dispatch("chungtu.chuyenkho.bind");
  },
};
</script>