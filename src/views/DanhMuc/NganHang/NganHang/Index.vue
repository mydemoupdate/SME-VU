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
  name: "NganHang",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.nganhang),
    };
  },
  computed: {
    ...mapGetters({
      list: "nganhang.list",
      detailPaneSize: "nganhang.panesize",
    }),
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("nganhang.panesize", 50);
      this.$store.dispatch("nganhang.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("nganhang.panesize", panes[1].size);
    },
  },
};
</script>