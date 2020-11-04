<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã VTHH"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên VTHH" :value.sync="obj.ten" />
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Nhóm VTHH</label>
            <Treeselect
              :appendToBody="true"
              :options="listNhomVTHH"
              :clearable="false"
              v-model="obj.nhom.id"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Đơn vị tính</label>
            <Treeselect
              :appendToBody="true"
              :options="listDonViTinh"
              :clearable="false"
              v-model="obj.donvi.id"
            />
          </CCol>
        </CRow>
        <CInput size="sm" label="Nguồn gốc" :value.sync="obj.nguongoc" />
        <CRow>
          <CCol col="6">
            <CInput
              size="sm"
              type="number"
              label="Đơn giá mua"
              :value.sync="obj.dongiamua"
            />
          </CCol>
          <CCol col="6">
            <CInput
              size="sm"
              type="number"
              label="Đơn giá bán"
              :value.sync="obj.dongiaban"
            />
          </CCol>
        </CRow>
        <CInput
          size="sm"
          type="number"
          label="Thuế suất GTGT"
          :value.sync="obj.thuesuatgtgt"
        />
      </CForm>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TabChiTiet",
  data() {
    return {
      id: null,
    };
  },
  computed: {
    ...mapGetters({
      obj: "vthh.selected",
      listNhomVTHH: "nhomvthh.cselect",
      listDonViTinh: "donvi.cselect",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("vthh.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("vthh.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("vthh.delete");
    },
  },
};
</script>
