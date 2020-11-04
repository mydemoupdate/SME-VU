<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã nhóm VTHH"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên nhóm VTHH" :value.sync="obj.ten" />
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
      obj: "nhomvthh.selected",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("nhomvthh.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("nhomvthh.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("nhomvthh.delete");
    },
  },
};
</script>
