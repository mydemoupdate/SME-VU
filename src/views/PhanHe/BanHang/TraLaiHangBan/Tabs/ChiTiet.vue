<template>
  <CRow class="mx-1">
    <CCol col="8">
      <CForm class="size-sm">
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Khách hàng</label>
            <Treeselect
              :appendToBody="true"
              :options="listKH"
              :clearable="false"
              v-model="obj.khachhang.id"
            />
          </CCol>
        </CRow>
        <CInput size="sm" label="Địa chỉ" :value.sync="obj.diachi" />
        <CInput size="sm" label="Diễn giải" :value.sync="obj.diengiai" />
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Nhân viên bán hàng</label>
            <Treeselect
              :appendToBody="true"
              :options="listNV"
              :clearable="false"
              v-model="obj.nhanvienbanhang.id"
            />
          </CCol>
        </CRow>
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
      obj: "chungtu.tralaihangban.selected",
      listLoaiCT: "loaichungtu.cselect",
      listKH: "doituong.cselect",
      listNV: "doituong.cselect",
    }),
  },
  methods: {
    create() {
      this.$store.dispatch("chungtu.tralaihangban.create", {
        ...this.obj,
        hachtoantienhang: [],
        hachtoanchieckhau: [],
        hachtoanthuegtgt: [],
      });
    },
    save() {
      this.$store.dispatch("chungtu.tralaihangban.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("chungtu.tralaihangban.delete");
    },
  },
};
</script>
