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
            <template #nhom="{ item }">
              <td>{{ item.nhom.ten }}</td>
            </template>
            <template #donvi="{ item }">
              <td>{{ item.donvi.ten }}</td>
            </template>
            <template #nhom-filter>
              <CRow>
                <CCol sm="12" size="sm" class="form-group">
                  <Treeselect
                    :appendToBody="true"
                    :options="listNhomVTHH"
                    :clearable="false"
                    v-model="filter.nhom.value"
                  />
                </CCol>
              </CRow>
            </template>
            <template #donvi-filter>
              <CRow>
                <CCol sm="12" size="sm" class="form-group">
                  <Treeselect
                    :appendToBody="true"
                    :options="listDonVi"
                    :clearable="false"
                    v-model="filter.donvi.value"
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
  name: "VTHH",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.vthh),
      filter: {
        nhom: {
          value: null,
          keyFilter: "id",
          condition: "=",
        },
        donvi: {
          value: null,
          keyFilter: "id",
          condition: "=",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "vthh.list",
      listNhomVTHH: "nhomvthh.cselect",
      listDonVi: "donvi.cselect",
      detailPaneSize: "vthh.panesize",
    }),
    items() {
      return this.lodash.advancedFilter(this.list, this.filter);
    },
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("vthh.panesize", 50);
      this.$store.dispatch("vthh.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("vthh.panesize", panes[1].size);
    },
  },
};
</script>