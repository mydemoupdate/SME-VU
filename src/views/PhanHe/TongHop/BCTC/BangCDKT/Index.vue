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
            :items="items"
            @row-clicked="showDetail"
          >
            <template #chitieu="{ item }">
              <td :class="getStyle(item)">
                {{ item.chitieu }}
              </td>
            </template>
            <template #id="{ item }">
              <td :class="getStyle(item)">
                {{ item.id }}
              </td>
            </template>
            <template #socuoiky="{ item }">
              <td :class="getStyle(item)">
                {{ item.socuoiky }}
              </td>
            </template>
            <template #sodauky="{ item }">
              <td :class="getStyle(item)">
                {{ item.sodauky }}
              </td>
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
  name: "BangCanDoiKeToan",
  components: {
    Detail,
  },
  created() {
    this.$store.dispatch("bangcdkt.bind");
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.bangcdkt),
    };
  },
  computed: {
    ...mapGetters({
      items: "bangcdkt.list",
      detailPaneSize: "bangcdkt.panesize",
    }),
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("bangcdkt.panesize", 50);
      this.$store.dispatch("bangcdkt.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("bangcdkt.panesize", panes[1].size);
    },
    getStyle(item) {
      return item.loai === 1 ? "font-weight-bold" : "";
    },
  },
};
</script>