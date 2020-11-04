<template>
  <CTabs
    addNavWrapperClasses="menu"
    @update:activeTab="setActiveTab"
    :activeTab="activeTab"
  >
    <CTab :title="$t('Chi tiết')" active>
      <DetailTab ref="detailTab" />
    </CTab>
    <CTab :title="$t('Hạch toán')" :disabled="!selected">
      <HachToanTab ref="hachToanTab" />
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
      <CNav v-if="activeTab === 1" class="line-left hidden-in-tab-content">
        <CButton @click="$refs.hachToanTab.create()">
          <CIcon name="cil-plus" v-c-tooltip="$t('Tạo mới')" />
        </CButton>
        <CButton @click="$refs.hachToanTab.save()">
          <CIcon name="cil-save" v-c-tooltip="$t('Lưu')" />
        </CButton>
        <CButton @click="$refs.hachToanTab.destroy()">
          <CIcon name="cil-trash" v-c-tooltip="$t('Xóa')" />
        </CButton>
      </CNav>
    </template>
  </CTabs>
</template>

<script>
import DetailTab from "./Tabs/ChiTiet";
import HachToanTab from "./Tabs/HachToan";
import { mapGetters } from "vuex";

export default {
  name: "ChiTietThuTienGui",
  components: {
    DetailTab,
    HachToanTab,
  },
  computed: {
    ...mapGetters({
      activeTab: "chungtu.thutiengui.tab",
      selected: "chungtu.thutiengui.wasselected",
    }),
  },
  methods: {
    setActiveTab(index) {
      this.$store.commit("chungtu.thutiengui.tab", index);
    },
  },
};
</script>
