<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã loại chứng từ"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên loại chứng từ" :value.sync="obj.ten" />
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">TK nợ</label>
            <Treeselect
              :appendToBody="true"
              :options="listHTTK"
              :clearable="false"
              v-model="obj.tkno.id"
            />
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">TK có</label>
            <Treeselect
              :appendToBody="true"
              :options="listHTTK"
              :clearable="false"
              v-model="obj.tkco.id"
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
      obj: "loaichungtu.selected",
      listHTTK: "httk.cselect",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("loaichungtu.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("loaichungtu.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("loaichungtu.delete");
    },
  },
};
</script>
