<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã loại TSCD"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên loại TSCD" :value.sync="obj.ten" />
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
      obj: "loaitscd.selected",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("loaitscd.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("loaitscd.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("loaitscd.delete");
    },
  },
};
</script>
