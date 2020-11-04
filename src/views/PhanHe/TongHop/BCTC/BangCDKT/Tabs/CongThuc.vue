<template>
  <AdvancedTable
    :fields="fields"
    :items="listCongThuc"
    :columnInput="true"
    @update:create="onInputUpdate"
    @row-clicked="onSelect"
  >
    <template #input-pheptinh="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listPhepTinh"
              :clearable="false"
              :value="selected.pheptinh"
              @input="eventUpdate(field.key, $event)"
            />
          </CCol>
        </CRow>
      </th>
    </template>
    <template #input-chitieu="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listChiTieu"
              :clearable="false"
              :value="selected.chitieu"
              @input="eventUpdate(field.key, $event)"
            />
          </CCol>
        </CRow>
      </th>
    </template>
    <template #input-taikhoan="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listHTTK"
              :clearable="false"
              :value="selected.taikhoan"
              @input="eventUpdate(field.key, $event)"
            />
          </CCol>
        </CRow>
      </th>
    </template>
    <template #input-tinhchat="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listTinhChat"
              :clearable="false"
              :value="selected.tinhchat"
              @input="eventUpdate(field.key, $event)"
            />
          </CCol>
        </CRow>
      </th>
    </template>
  </AdvancedTable>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TabCongThuc",
  data() {
    return {
      dataInput: {
        pheptinh: "+",
        tinhchat: "tkno",
      },
    };
  },
  computed: {
    ...mapGetters({
      chitieu: "bangcdkt.selected",
      listChiTieu: "bangcdkt.cselect",
      listHTTK: "httk.cselect",
    }),
    laChiTieuTongHop() {
      return this.chitieu.loai === 1;
    },
    fields() {
      if (this.laChiTieuTongHop) {
        return [
          { key: "pheptinh", label: "Phép tính" },
          { key: "chitieu", label: "Chỉ tiêu" },
        ];
      }
      return [
        { key: "pheptinh", label: "Phép tính" },
        { key: "taikhoan", label: "Tài khoản" },
        { key: "tinhchat", label: "Tính chất" },
      ];
    },
    listCongThuc() {
      return this.laChiTieuTongHop
        ? this.chitieu.congthuctinhtongchitieu
        : this.chitieu.congthuctinhtongtaikhoan;
    },
    listPhepTinh() {
      return [
        { id: "+", label: "+" },
        { id: "-", label: "-" },
      ];
    },
    listTinhChat() {
      return [
        { id: "tkno", label: "Dư nợ" },
        { id: "tkco", label: "Dư có" },
      ];
    },
  },
  methods: {
    onInputUpdate(value) {
      this.dataInput = { ...this.dataInput, ...value };
    },
    onSelect(item) {
      this.dataInput = { ...this.dataInput, ...item };
    },
    create() {
      if (this.laChiTieuTongHop) {
        this.$store.dispatch("bangcdkt.update", {
          congthuctinhtongchitieu: [
            ...this.chitieu.congthuctinhtongchitieu,
            this.dataInput,
          ],
        });
      } else {
        this.$store.dispatch("bangcdkt.update", {
          congthuctinhtongtaikhoan: [
            ...this.chitieu.congthuctinhtongtaikhoan,
            this.dataInput,
          ],
        });
      }
    },
    destroy() {
      if (this.laChiTieuTongHop) {
        this.lodash.remove(this.chitieu.congthuctinhtongchitieu, (ct) => {
          return (
            ct.pheptinh === this.dataInput.pheptinh &&
            (!ct.chitieu || ct.chitieu === this.dataInput.chitieu)
          );
        });
        this.$store.dispatch("bangcdkt.update", {
          congthuctinhtongchitieu: this.chitieu.congthuctinhtongchitieu,
        });
      } else {
        this.lodash.remove(this.chitieu.congthuctinhtongtaikhoan, (ct) => {
          return (
            ct.pheptinh === this.dataInput.pheptinh &&
            (!ct.taikhoan || ct.taikhoan === this.dataInput.taikhoan)
          );
        });
        this.$store.dispatch("bangcdkt.update", {
          congthuctinhtongtaikhoan: this.chitieu.congthuctinhtongtaikhoan,
        });
      }
    },
  },
};
</script>
