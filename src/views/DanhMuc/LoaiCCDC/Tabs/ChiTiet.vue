<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã loại CCDC"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên loại CCDC" :value.sync="obj.ten" />
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
      obj: "loaiccdc.selected",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("loaiccdc.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("loaiccdc.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("loaiccdc.delete");
    },
  },
};
</script>
