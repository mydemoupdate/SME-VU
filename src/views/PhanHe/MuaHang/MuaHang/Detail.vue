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
    <CTab :title="$t('Thuế')" :disabled="!selected">
      <ThueTab ref="thueTab" />
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
      <CNav v-if="activeTab === 2" class="line-left hidden-in-tab-content">
        <CButton @click="$refs.thueTab.create()">
          <CIcon name="cil-plus" v-c-tooltip="$t('Tạo mới')" />
        </CButton>
        <CButton @click="$refs.thueTab.save()">
          <CIcon name="cil-save" v-c-tooltip="$t('Lưu')" />
        </CButton>
        <CButton @click="$refs.thueTab.destroy()">
          <CIcon name="cil-trash" v-c-tooltip="$t('Xóa')" />
        </CButton>
      </CNav>
    </template>
  </CTabs>
</template>

<script>
import DetailTab from "./Tabs/ChiTiet";
import HangHoaTab from "./Tabs/HangHoa";
import ThueTab from "./Tabs/Thue";
import { mapGetters } from "vuex";

export default {
  name: "ChiTietPhieuChi",
  components: {
    DetailTab,
    HangHoaTab,
    ThueTab,
  },
  computed: {
    ...mapGetters({
      activeTab: "chungtu.muahang.tab",
      selected: "chungtu.muahang.wasselected",
    }),
  },
  methods: {
    setActiveTab(index) {
      this.$store.commit("chungtu.muahang.tab", index);
    },
  },
};
</script>
