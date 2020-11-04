<template>
  <section>
    <input ref="uploadFile" type="file" @change="onChange" />
    <xlsx-read :file="file">
      <xlsx-sheets>
        <template #default="{ sheets }">
          <xlsx-json v-for="(sheet, i) in sheets" :sheet="sheet" :key="i">
            <template #default="{ collection }">
              <ImportReceiver :data="collection" @import="onImport" />
            </template>
          </xlsx-json>
        </template>
      </xlsx-sheets>
    </xlsx-read>
  </section>
</template>

<script>
import { XlsxRead, XlsxSheets, XlsxJson } from "vue-xlsx";

export default {
  name: "ImportXlsx",
  components: {
    XlsxRead,
    XlsxSheets,
    XlsxJson,
  },
  data() {
    return {
      file: new Blob(),
    };
  },
  methods: {
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      this.$refs.uploadFile.value = null;
    },
    show() {
      this.$refs.uploadFile.click();
    },
    onImport(data) {
      this.$emit("import", data);
    },
  },
};
</script>
