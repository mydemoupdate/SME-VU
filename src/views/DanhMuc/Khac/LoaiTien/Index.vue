<template>
  <CRow>
    <CCol col="12" class="p-0">
      <Splitpanes
        class="default-theme"
        horizontal
        style="height: 84vh"
        @resized="onPaneResized"
      >
        <Pane :size="100 - detailPaneSize">
          <AdvancedTable
            :fields="fields"
            :items="list"
            :columnFilter="true"
            @row-clicked="showDetail"
          >
          </AdvancedTable>
        </Pane>
        <Pane :size="detailPaneSize">
          <Detail />
        </Pane>
      </Splitpanes>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
import Detail from "./Detail";
import Documents from "@/firestore/documents";

export default {
  name: "LoaiTien",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.loaitien),
    };
  },
  computed: {
    ...mapGetters({
      list: "loaitien.list",
      detailPaneSize: "loaitien.panesize",
    }),
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("loaitien.panesize", 50);
      this.$store.dispatch("loaitien.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("loaitien.panesize", panes[1].size);
    },
  },
};
</script>