<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Số tài khoản"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên tài khoản" :value.sync="obj.ten" />
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Tính chất</label>
            <Treeselect
              :appendToBody="true"
              :options="listTinhChat"
              :clearable="false"
              v-model="obj.tinhchat.id"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Tài khoản tổng hợp</label>
            <Treeselect
              :appendToBody="true"
              :options="listHTTK"
              :clearable="false"
              v-model="obj.taikhoantonghop.id"
            />
          </CCol>
        </CRow>
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
      obj: "httk.selected",
      listTinhChat: "tinhchat.cselect",
      listHTTK: "httk.cselect",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("httk.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("httk.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("httk.delete");
    },
  },
};
</script>
