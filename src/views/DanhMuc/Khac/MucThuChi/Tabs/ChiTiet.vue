<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã mục thu chi"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên mục thu chi" :value.sync="obj.ten" />
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
      obj: "mucthuchi.selected",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("mucthuchi.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("mucthuchi.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("mucthuchi.delete");
    },
  },
};
</script>
