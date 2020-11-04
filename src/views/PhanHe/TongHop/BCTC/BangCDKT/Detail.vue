<template>
  <CTabs
    addNavWrapperClasses="menu"
    @update:activeTab="setActiveTab"
    :activeTab="activeTab"
  >
    <CTab :title="$t('Chi tiết')" active>
      <DetailTab ref="detailTab" />
    </CTab>
    <CTab :title="$t('Công thức')" active>
      <CongThucTab ref="congThucTab" />
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
        <CButton @click="$refs.congThucTab.create()">
          <CIcon name="cil-plus" v-c-tooltip="$t('Tạo mới')" />
        </CButton>
        <CButton @click="$refs.congThucTab.destroy()">
          <CIcon name="cil-trash" v-c-tooltip="$t('Xóa')" />
        </CButton>
      </CNav>
    </template>
  </CTabs>
</template>

<script>
import DetailTab from "./Tabs/ChiTiet";
import CongThucTab from "./Tabs/CongThuc";
import { mapGetters } from "vuex";

export default {
  name: "Detail",
  components: {
    DetailTab,
    CongThucTab,
  },
  computed: {
    ...mapGetters({
      activeTab: "bangcdkt.tab",
      selected: "bangcdkt.wasselected",
    }),
  },
  methods: {
    setActiveTab(index) {
      this.$store.commit("bangcdkt.tab", index);
    },
  },
};
</script>
