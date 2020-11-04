<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã tài khoản"
          :value="obj.id"
          @update:value="updateId"
        />
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Ngân hàng</label>
            <Treeselect
              :appendToBody="true"
              :options="listNganHang"
              :clearable="false"
              v-model="obj.nganhang.id"
            />
          </CCol>
        </CRow>
        <CInput size="sm" label="Chi nhánh" :value.sync="obj.chinhanh" />
        <CInput size="sm" label="Địa chỉ" :value.sync="obj.diachi" />
        <CInput size="sm" label="Chủ tài khoản" :value.sync="obj.chutaikhoan" />
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
      obj: "taikhoannganhang.selected",
      listNganHang: "nganhang.cselect",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("taikhoannganhang.create", {
        ...this.obj,
        id: this.id,
      });
    },
    save() {
      this.$store.dispatch("taikhoannganhang.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("taikhoannganhang.delete");
    },
  },
};
</script>
