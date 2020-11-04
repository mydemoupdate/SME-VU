<template>
  <AdvancedTable
    :fields="fields"
    :items="listHachToan"
    :defaultSelected="hachtoan"
    :columnInput="true"
    @update:create="onInputUpdate"
    @row-clicked="onSelect"
  >
    <template #tkno="{ item }">
      <td>{{ item.tkno ? item.tkno.id : "" }}</td>
    </template>
    <template #tkco="{ item }">
      <td>{{ item.tkco ? item.tkco.id : "" }}</td>
    </template>
    <template #doituong="{ item }">
      <td>{{ item.doituong ? item.doituong.ten : "" }}</td>
    </template>
    <template #mucthu="{ item }">
      <td>{{ item.mucthu ? item.mucthu.ten : "" }}</td>
    </template>
    <template #taikhoannganhang="{ item }">
      <td>{{ item.taikhoannganhang ? item.taikhoannganhang.id : "" }}</td>
    </template>
    <template #input-tkno="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listHTTK"
              :clearable="false"
              :value="selected.tkno ? selected.tkno.id : ''"
              @input="eventUpdate(field.key, { id: $event })"
            />
          </CCol>
        </CRow>
      </th>
    </template>
    <template #input-tkco="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listHTTK"
              :clearable="false"
              :value="selected.tkco ? selected.tkco.id : ''"
              @input="eventUpdate(field.key, { id: $event })"
            />
          </CCol>
        </CRow>
      </th>
    </template>
    <template #input-doituong="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listDoiTuong"
              :clearable="false"
              :value="selected.doituong ? selected.doituong.id : ''"
              @input="eventUpdate(field.key, { id: $event })"
            />
          </CCol>
        </CRow>
      </th>
    </template>
    <template #input-mucthu="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listMucTC"
              :clearable="false"
              :value="selected.mucthu ? selected.mucthu.id : ''"
              @input="eventUpdate(field.key, { id: $event })"
            />
          </CCol>
        </CRow>
      </th>
    </template>
    <template #input-taikhoannganhang="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listTKNganHang"
              :clearable="false"
              :value="
                selected.taikhoannganhang ? selected.taikhoannganhang.id : ''
              "
              @input="eventUpdate(field.key, { id: $event })"
            />
          </CCol>
        </CRow>
      </th>
    </template>
  </AdvancedTable>
</template>

<script>
import { mapGetters } from "vuex";
import Documents from "@/firestore/documents";

export default {
  name: "TabHachToan",
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.hachtoan.phieuthu),
      dataInput: {},
    };
  },
  computed: {
    ...mapGetters({
      chungtu: "chungtu.phieuthu.selected",
      hachtoan: "hachtoan.phieuthu.selected",
      listHTTK: "httk.cselect",
      listMucTC: "mucthuchi.cselect",
      listDoiTuong: "doituong.cselect",
      listTKNganHang: "taikhoannganhang.cselect",
    }),
    listHachToan() {
      return this.chungtu.hachtoan;
    },
  },
  methods: {
    onInputUpdate(value) {
      this.dataInput = value;
    },
    onSelect(item) {
      this.dataInput = item;
    },
    create() {
      this.dataInput.id = null;
      this.$store.dispatch("chungtu.phieuthu.hachtoan.create", this.dataInput);
    },
    save() {
      this.$store.dispatch("chungtu.phieuthu.hachtoan.update", this.dataInput);
    },
    destroy() {
      this.$store.dispatch(
        "chungtu.phieuthu.hachtoan.delete",
        this.dataInput.id
      );
    },
  },
};
</script>
