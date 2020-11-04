<template>
  <CTabs
    addNavWrapperClasses="menu"
    @update:activeTab="setActiveTab"
    :activeTab="activeTab"
  >
    <CTab :title="$t('Chi tiết')" active>
      <DetailTab ref="detailTab" />
    </CTab>
    <CTab :title="$t('Hàng hóa')" :disabled="!selected">
      <HangHoaTab ref="hangHoaTab" />
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
        <CButton @click="$refs.hangHoaTab.create()">
          <CIcon name="cil-plus" v-c-tooltip="$t('Tạo mới')" />
        </CButton>
        <CButton @click="$refs.hangHoaTab.save()">
          <CIcon name="cil-save" v-c-tooltip="$t('Lưu')" />
        </CButton>
        <CButton @click="$refs.hangHoaTab.destroy()">
          <CIcon name="cil-trash" v-c-tooltip="$t('Xóa')" />
        </CButton>
      </CNav>
    </template>
  </CTabs>
</template>

<script>
import DetailTab from "./Tabs/ChiTiet";
import HangHoaTab from "./Tabs/HangHoa";
import { mapGetters } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailTab,
    HangHoaTab,
  },
  computed: {
    ...mapGetters({
      activeTab: "chungtu.chuyenkho.tab",
      selected: "chungtu.chuyenkho.wasselected",
    }),
  },
  methods: {
    setActiveTab(index) {
      this.$store.commit("chungtu.chuyenkho.tab", index);
    },
  },
};
</script>
