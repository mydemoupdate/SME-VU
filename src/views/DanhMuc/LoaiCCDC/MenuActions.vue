<template>
  <GeneralActions
    :fileExportName="fileExportName"
    :collection="collection"
    :storeName="storeName"
  />
</template>

<script>
import Documents from "@/firestore/documents";

export default {
  name: "MenuActions",
  data() {
    return {
      collection: Documents.loaiccdc,
      fileExportName: "LoaiCCDC",
      storeName: "loaiccdc",
    };
  },
};
</script>
