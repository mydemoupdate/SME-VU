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
    <template #khoxuat="{ item }">
      <td>{{ item.khoxuat ? item.khoxuat.ten : "" }}</td>
    </template>
    <template #khonhap="{ item }">
      <td>{{ item.khonhap ? item.khonhap.ten : "" }}</td>
    </template>
    <template #donvitinh="{ item }">
      <td>{{ item.donvitinh ? item.donvitinh.ten : "" }}</td>
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
    <template #input-khonhap="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listKho"
              :clearable="false"
              :value="selected.khonhap ? selected.khonhap.id : ''"
              @input="eventUpdate(field.key, { id: $event })"
            />
          </CCol>
        </CRow>
      </th>
    </template>
    <template #input-khoxuat="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listKho"
              :clearable="false"
              :value="selected.khoxuat ? selected.khoxuat.id : ''"
              @input="eventUpdate(field.key, { id: $event })"
            />
          </CCol>
        </CRow>
      </th>
    </template>
    <template #input-donvitinh="{ selected, eventUpdate, field }">
      <th>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <Treeselect
              :appendToBody="true"
              :options="listDonVi"
              :clearable="false"
              :value="selected.donvitinh ? selected.donvitinh.id : ''"
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
  name: "TabHangHoa",
  data() {
    return {
      fields: this.lodash.getTableFields(Documents.hachtoan.chuyenkho),
      dataInput: {},
    };
  },
  computed: {
    ...mapGetters({
      chungtu: "chungtu.chuyenkho.selected",
      hachtoan: "hachtoan.chuyenkho.selected",
      listHTTK: "httk.cselect",
      listVTHH: "vthh.cselect",
      listKho: "kho.cselect",
      listDonVi: "donvi.cselect",
    }),
    listHachToan() {
      return this.chungtu.hachtoantienhang.filter((ht) => ht != null);
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
        "chungtu.chuyenkho.hachtoan.tienhang.create",
        this.dataInput
      );
    },
    save() {
      this.$store.dispatch(
        "chungtu.chuyenkho.hachtoan.tienhang.update",
        this.dataInput
      );
    },
    destroy() {
      this.$store.dispatch(
        "chungtu.chuyenkho.hachtoan.tienhang.delete",
        this.dataInput.id
      );
    },
  },
};
</script>
