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
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Nộp vào tài khoản</label>
            <Treeselect
              :appendToBody="true"
              :options="listTKNganHang"
              :clearable="false"
              v-model="obj.taikhoannganhang.id"
            />
          </CCol>
        </CRow>
        <CInput size="sm" label="Lý do" :value.sync="obj.lydo" />
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
  name: "TabChiTietThuTienGui",
  computed: {
    ...mapGetters({
      obj: "chungtu.thutiengui.selected",
      listLoaiCT: "loaichungtu.cselect",
      listDoiTuong: "doituong.cselect",
      listTKNganHang: "taikhoannganhang.cselect",
    }),
  },
  methods: {
    create() {
      this.$store.dispatch("chungtu.thutiengui.create", {
        ...this.obj,
        hachtoan: [],
      });
    },
    save() {
      this.$store.dispatch("chungtu.thutiengui.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("chungtu.thutiengui.delete");
    },
  },
};
</script>
