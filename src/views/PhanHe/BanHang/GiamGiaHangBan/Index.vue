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
            <template #khachhang="{ item }">
              <td>{{ item.khachhang.ten }}</td>
            </template>
            <template #nhanvienbanhang="{ item }">
              <td>{{ item.nhanvienbanhang.ten }}</td>
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
            <template #khachhang-filter>
              <CInput
                size="sm"
                class="mb-0"
                :value.sync="filter.khachhang.value"
              />
            </template>
            <template #nhanvienbanhang-filter>
              <CInput
                size="sm"
                class="mb-0"
                :value.sync="filter.nhanvienbanhang.value"
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
  name: "GiamGiaHangBan",
  components: {
    Detail,
  },
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.chungtu.giamgiahangban),
      filter: {
        loai: {
          value: null,
          keyFilter: "id",
          condition: "=",
        },
        khachhang: {
          value: null,
          keyFilter: "ten",
        },
        nhanvienbanhang: {
          value: null,
          keyFilter: "ten",
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      list: "chungtu.giamgiahangban.list",
      detailPaneSize: "chungtu.giamgiahangban.panesize",
      listLoaiChungTu: "loaichungtu.cselect",
    }),
    items() {
      return this.lodash.advancedFilter(this.list, this.filter);
    },
  },
  methods: {
    showDetail(obj) {
      this.$store.commit("chungtu.giamgiahangban.panesize", 50);
      this.$store.dispatch("chungtu.giamgiahangban.select", obj.id);
    },
    onPaneResized(panes) {
      this.$store.commit("chungtu.giamgiahangban.panesize", panes[1].size);
    },
  },
};
</script>