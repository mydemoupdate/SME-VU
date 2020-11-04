<template>
  <CRow class="mx-1">
    <CCol col="8">
      <CForm class="size-sm">
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Đối tượng</label>
            <Treeselect
              :appendToBody="true"
              :options="listDoiTuong"
              :clearable="false"
              v-model="obj.doituong.id"
            />
          </CCol>
        </CRow>
        <CInput
          size="sm"
          label="Người giao hàng"
          :value.sync="obj.nguoigiaohang"
        />
        <CInput size="sm" label="Diễn giải" :value.sync="obj.diengiai" />
        <CInput size="sm" label="Mã tracking" :value.sync="obj.tracking" />
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Loại chứng từ</label>
            <Treeselect
              :appendToBody="true"
              :options="listLoaiCT"
              :clearable="false"
              v-model="obj.loai.id"
            />
          </CCol>
        </CRow>
      </CForm>
    </CCol>
    <CCol col="4" class="line-left">
      <CForm class="size-sm">
        <CInput
          size="sm"
          type="date"
          label="Ngày hạch toán"
          :value.sync="obj.ngayhachtoan"
        />
        <CInput
          size="sm"
          type="date"
          label="Ngày chứng từ"
          :value.sync="obj.ngaychungtu"
        />
        <CInput size="sm" label="Số chứng từ" :value.sync="obj.id" />
      </CForm>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TabChiTiet",
  computed: {
    ...mapGetters({
      obj: "chungtu.nhapkho.selected",
      listLoaiCT: "loaichungtu.cselect",
      listDoiTuong: "doituong.cselect",
    }),
  },
  methods: {
    create() {
      this.$store.dispatch("chungtu.nhapkho.create", {
        ...this.obj,
      });
    },
    save() {
      this.$store.dispatch("chungtu.nhapkho.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("chungtu.nhapkho.delete");
    },
  },
};
</script>
