<template>
  <CNav>
    <CButton @click="showCreate">
      <CIcon name="cil-plus" v-c-tooltip="$t('Tạo mới')" />
    </CButton>
    <CButton @click="callImport" :disabled="language !== 'vi'">
      <CIcon
        v-if="language === 'vi'"
        name="cil-arrow-thick-to-bottom"
        v-c-tooltip="$t('Nhập dữ liệu')"
      />
      <CIcon
        v-else
        name="cil-arrow-thick-to-bottom"
        v-c-tooltip="$t('Vietnamese only')"
      />
    </CButton>
    <CButton @click="callExport">
      <CIcon name="cil-arrow-thick-to-top" v-c-tooltip="$t('Xuất dữ liệu')" />
    </CButton>
    <CButton @click="fresh" v-if="!isProduction">
      <CIcon
        name="cil-recycle"
        class="text-danger"
        v-c-tooltip="$t('Làm mới dữ liệu')"
      />
    </CButton>
    <slot></slot>
    <ExportXlsx
      v-show="false"
      ref="export"
      :sheets="sheets"
      :filename="fileExportName"
    />
    <ImportXlsx v-show="false" ref="import" @import="onImport" />
  </CNav>
</template>

<script>
import i18nService from "@/core/services/i18n.service.js";

export default {
  name: "GeneralActions",
  props: {
    fileExportName: {
      type: String,
      required: false,
      default: "Data",
    },
    sheetName: {
      type: String,
      required: false,
      default: "Sheet",
    },
    collection: {
      type: Object,
      required: false,
    },
    storeName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      language: i18nService.getActiveLanguage(),
      isProduction: process.env.NODE_ENV === "production",
    };
  },
  computed: {
    dataExport() {
      return this.$store.getters[this.storeName + ".dataexport"];
    },
    sheets() {
      return [
        {
          name: this.sheetName,
          data: this.dataExport,
        },
      ];
    },
  },
  methods: {
    fresh() {
      this.collection.init();
    },
    showCreate() {
      this.$store.commit(this.storeName + ".panesize", 70);
      this.$store.commit(this.storeName + ".purgeselect");
    },
    callExport() {
      this.$refs.export.download();
    },
    callImport() {
      this.$refs.import.show();
    },
    onImport(data) {
      this.$store.commit(this.storeName + ".import.set", data);
      this.$store.dispatch(this.storeName + ".import");
    },
  },
};
</script>
