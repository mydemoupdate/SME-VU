<template>
  <CTabs
    addNavWrapperClasses="menu"
    @update:activeTab="setActiveTab"
    :activeTab="activeTab"
  >
    <CTab :title="$t('Chi tiết')" active>
      <DetailTab ref="detailTab" />
    </CTab>
    <template>
      <CNav v-if="activeTab === 0" class="line-left hidden-in-tab-content">
        <CButton @click="$refs.detailTab.create()">
          <CIcon name="cil-plus" v-c-tooltip="$t('Tạo mới')" />
        </CButton>
        <CButton @click="$refs.detailTab.save()">
          <CIcon name="cil-save" v-c-tooltip="$t('Lưu')" />
        </CButton>
        <CButton @click="$refs.detailTab.destroy()">
          <CIcon name="cil-trash" v-c-tooltip="$t('Xóa')" />
        </CButton>
      </CNav>
    </template>
  </CTabs>
</template>

<script>
import DetailTab from "./Tabs/ChiTiet";
import { mapGetters } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailTab,
  },
  computed: {
    ...mapGetters({
      activeTab: "taikhoannganhang.tab",
    }),
  },
  methods: {
    setActiveTab(index) {
      this.$store.commit("taikhoannganhang.tab", index);
    },
  },
};
</script>
