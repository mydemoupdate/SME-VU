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
  name: "DoiTuong",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.kmcp),
    };
  },
  computed: {
    ...mapGetters({
      list: "kmcp.list",
      detailPaneSize: "kmcp.panesize",
    }),
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("kmcp.panesize", 50);
      this.$store.dispatch("kmcp.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("kmcp.panesize", panes[1].size);
    },
  },
};
</script>