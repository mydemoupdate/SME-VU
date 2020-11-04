<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Ký hiệu"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên ngân hàng" :value.sync="obj.ten" />
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
      obj: "nganhang.selected",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("nganhang.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("nganhang.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("nganhang.delete");
    },
  },
};
</script>
