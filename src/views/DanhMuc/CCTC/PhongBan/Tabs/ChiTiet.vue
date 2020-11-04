<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã phòng ban"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên phòng ban" :value.sync="obj.ten" />
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
      obj: "phongban.selected",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("phongban.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("phongban.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("phongban.delete");
    },
  },
};
</script>
