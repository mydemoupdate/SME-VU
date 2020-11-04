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
            :columnFilter="true"
            @row-clicked="showDetail"
          >
            <template #nganhang="{ item }">
              <td>{{ item.nganhang.ten }}</td>
            </template>
            <template #nganhang-filter>
              <CRow>
                <CCol sm="12" size="sm" class="form-group">
                  <Treeselect
                    :appendToBody="true"
                    :options="listNganHang"
                    :clearable="false"
                    v-model="filter.nganhang.value"
                  />
                </CCol>
              </CRow>
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
  name: "TKNganHang",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.taikhoannganhang),
      filter: {
        nganhang: {
          value: null,
          keyFilter: "id",
          condition: "=",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "taikhoannganhang.list",
      listNganHang: "nganhang.cselect",
      detailPaneSize: "taikhoannganhang.panesize",
    }),
    items() {
      return this.lodash.advancedFilter(this.list, this.filter);
    },
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("taikhoannganhang.panesize", 50);
      this.$store.dispatch("taikhoannganhang.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("taikhoannganhang.panesize", panes[1].size);
    },
  },
};
</script>