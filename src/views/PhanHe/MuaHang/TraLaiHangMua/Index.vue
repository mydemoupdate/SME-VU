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
            <template #nhacungcap="{ item }">
              <td>{{ item.nhacungcap.ten }}</td>
            </template>
            <template #nhanvienmuahang="{ item }">
              <td>{{ item.nhanvienmuahang.ten }}</td>
            </template>
            <template #loai="{ item }">
              <td>{{ item.loai.ten }}</td>
            </template>
            <template #loai-filter>
              <CRow>
                <CCol sm="12" size="sm" class="form-group">
                  <Treeselect
                    :appendToBody="true"
                    :options="listLoaiChungTu"
                    :clearable="false"
                    v-model="filter.loai.value"
                  />
                </CCol>
              </CRow>
            </template>
            <template #nhacungcap-filter>
              <CInput
                size="sm"
                class="mb-0"
                :value.sync="filter.nhacungcap.value"
              />
            </template>
            <template #nhanvienmuahang-filter>
              <CInput
                size="sm"
                class="mb-0"
                :value.sync="filter.nhanvienmuahang.value"
              />
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
  name: "GiamGiaHangMua",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.chungtu.tralaihangmua),
      filter: {
        loai: {
          value: null,
          keyFilter: "id",
          condition: "=",
        },
        nhacungcap: {
          value: null,
          keyFilter: "ten",
        },
        nhanvienmuahang: {
          value: null,
          keyFilter: "ten",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "chungtu.tralaihangmua.list",
      detailPaneSize: "chungtu.tralaihangmua.panesize",
      listLoaiChungTu: "loaichungtu.cselect",
    }),
    items() {
      return this.lodash.advancedFilter(this.list, this.filter);
    },
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("chungtu.tralaihangmua.panesize", 50);
      this.$store.dispatch("chungtu.tralaihangmua.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("chungtu.tralaihangmua.panesize", panes[1].size);
    },
  },
};
</script>