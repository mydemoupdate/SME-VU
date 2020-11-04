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
      collection: Documents.chungtu.tralaihangmua,
      fileExportName: "TraLaiHangMuaHangMua",
      storeName: "chungtu.tralaihangmua",
    };
  },
};
</script>
