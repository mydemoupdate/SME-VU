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
            <template #donvi="{ item }">
              <td>{{ item.donvi.ten }}</td>
            </template>
            <template #loai="{ item }">
              <td>{{ item.loai.ten }}</td>
            </template>
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
      fields: this.lodash.getTableFields(Documents.doituong),
    };
  },
  computed: {
    ...mapGetters({
      list: "doituong.list",
      detailPaneSize: "doituong.panesize",
    }),
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("doituong.panesize", 50);
      this.$store.dispatch("doituong.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("doituong.panesize", panes[1].size);
    },
  },
};
</script>