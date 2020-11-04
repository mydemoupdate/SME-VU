<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã đơn vị"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên đơn vị" :value.sync="obj.ten" />
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
      obj: "donvi.selected",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("donvi.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("donvi.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("donvi.delete");
    },
  },
};
</script>
