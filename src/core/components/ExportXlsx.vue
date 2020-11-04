<template>
  <div>
    <section>
      <xlsx-workbook>
        <xlsx-sheet
          :collection="sheet.data"
          v-for="sheet in sheets"
          :key="sheet.name"
          :sheet-name="sheet.name"
        />
        <xlsx-download
          ref="xlsxDownload"
          :filename="filename + '.xlsx'"
        ></xlsx-download>
      </xlsx-workbook>
    </section>
  </div>
</template>

<script>
import { XlsxWorkbook, XlsxSheet, XlsxDownload } from "vue-xlsx";
import { WARNING, PUSH_TOAST } from "@/core/services/store/toasts.module";
import { PUSH_ERROR } from "@/core/services/store/errors.module";

export default {
  name: "ExportXlsx",
  components: {
    XlsxWorkbook,
    XlsxSheet,
    XlsxDownload,
  },
  props: {
    sheets: {
      type: Array,
      required: true,
    },
    filename: {
      type: String,
      required: false,
      default: "Export",
    },
  },
  methods: {
    download() {
      try {
        this.$store.dispatch(PUSH_TOAST, {
          message: "Dữ liệu đang được tải xuống...",
          type: WARNING,
        });
        this.$refs.xlsxDownload.download();
      } catch (error) {
        this.$store.dispatch(PUSH_ERROR, { error });
      }
    },
  },
};
</script>