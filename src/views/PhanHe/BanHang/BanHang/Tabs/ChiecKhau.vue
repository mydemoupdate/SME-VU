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
    <template #hanghoa="{ item }">
      <td>{{ item.hanghoa ? item.hanghoa.ten : "" }}</td>
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
    <template #input-hanghoa="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listVTHH"
              :clearable="false"
              :value="selected.hanghoa ? selected.hanghoa.id : ''"
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
  name: "TabChiecKhau",
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.hachtoan.chieckhau),
      dataInput: {},
    };
  },
  computed: {
    ...mapGetters({
      chungtu: "chungtu.banhang.selected",
      hachtoan: "hachtoan.chieckhau.selected",
      listHTTK: "httk.cselect",
      listVTHH: "vthh.cselect",
    }),
    listHachToan() {
      return this.chungtu.hachtoanchieckhau;
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
      this.$store.dispatch(
        "chungtu.banhang.hachtoan.chieckhau.create",
        this.dataInput
      );
    },
    save() {
      this.$store.dispatch(
        "chungtu.banhang.hachtoan.chieckhau.update",
        this.dataInput
      );
    },
    destroy() {
      this.$store.dispatch(
        "chungtu.banhang.hachtoan.chieckhau.delete",
        this.dataInput.id
      );
    },
  },
};
</script>
