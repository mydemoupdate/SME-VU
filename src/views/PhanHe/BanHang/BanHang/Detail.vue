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
    <CTab :title="$t('Chiếc khấu')" :disabled="!selected">
      <ChiecKhauTab ref="chiecKhauTab" />
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
        <CButton @click="$refs.chiecKhauTab.create()">
          <CIcon name="cil-plus" v-c-tooltip="$t('Tạo mới')" />
        </CButton>
        <CButton @click="$refs.chiecKhauTab.save()">
          <CIcon name="cil-save" v-c-tooltip="$t('Lưu')" />
        </CButton>
        <CButton @click="$refs.chiecKhauTab.destroy()">
          <CIcon name="cil-trash" v-c-tooltip="$t('Xóa')" />
        </CButton>
      </CNav>
       <CNav v-if="activeTab === 3" class="line-left hidden-in-tab-content">
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
import ChiecKhauTab from "./Tabs/ChiecKhau";
import ThueTab from "./Tabs/Thue";
import { mapGetters } from "vuex";

export default {
  name: "ChiTietPhieuChi",
  components: {
    DetailTab,
    HangHoaTab,
    ThueTab,
    ChiecKhauTab,
  },
  computed: {
    ...mapGetters({
      activeTab: "chungtu.banhang.tab",
      selected: "chungtu.banhang.wasselected",
    }),
  },
  methods: {
    setActiveTab(index) {
      this.$store.commit("chungtu.banhang.tab", index);
    },
  },
};
</script>
