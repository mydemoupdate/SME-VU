<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã KMCP"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên KMCP" :value.sync="obj.ten" />
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Thuộc</label>
            <Treeselect
              :appendToBody="true"
              :options="listKMCP"
              :clearable="false"
              v-model="obj.thuoc.id"
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
      obj: "kmcp.selected",
      listKMCP: "kmcp.cselect",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("kmcp.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("kmcp.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("kmcp.delete");
    },
  },
};
</script>
