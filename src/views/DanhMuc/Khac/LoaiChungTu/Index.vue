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
            <template #tkno="{ item }">
              <td>{{ item.tkno.ten }}</td>
            </template>
            <template #tkco="{ item }">
              <td>{{ item.tkco.ten }}</td>
            </template>
            <template #tkno-filter>
              <CRow>
                <CCol sm="12" size="sm" class="form-group">
                  <Treeselect
                    :appendToBody="true"
                    :options="listHTTK"
                    :clearable="false"
                    v-model="filter.tkno.value"
                  />
                </CCol>
              </CRow>
            </template>
            <template #tkco-filter>
              <CRow>
                <CCol sm="12" size="sm" class="form-group">
                  <Treeselect
                    :appendToBody="true"
                    :options="listHTTK"
                    :clearable="false"
                    v-model="filter.tkco.value"
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
  name: "LoaiChungTu",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.loaichungtu),
      filter: {
        tkno: {
          value: null,
          keyFilter: "id",
          condition: "=",
        },
        tkco: {
          value: null,
          keyFilter: "id",
          condition: "=",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "loaichungtu.list",
      listHTTK: "httk.cselect",
      detailPaneSize: "loaichungtu.panesize",
    }),
    items() {
      return this.lodash.advancedFilter(this.list, this.filter);
    },
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("loaichungtu.panesize", 50);
      this.$store.dispatch("loaichungtu.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("loaichungtu.panesize", panes[1].size);
    },
  },
};
</script>