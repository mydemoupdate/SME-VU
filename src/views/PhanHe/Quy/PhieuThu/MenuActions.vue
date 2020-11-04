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
      collection: Documents.chungtu.phieuthu,
      fileExportName: "PhieuThu",
      storeName: "chungtu.phieuthu",
    };
  },
};
</script>
