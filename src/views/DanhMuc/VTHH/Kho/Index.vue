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
  name: "Kho",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.kho),
    };
  },
  computed: {
    ...mapGetters({
      list: "kho.list",
      detailPaneSize: "kho.panesize",
    }),
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("kho.panesize", 50);
      this.$store.dispatch("kho.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("kho.panesize", panes[1].size);
    },
  },
};
</script>