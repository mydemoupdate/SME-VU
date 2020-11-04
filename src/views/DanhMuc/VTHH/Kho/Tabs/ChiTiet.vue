<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã kho"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên kho" :value.sync="obj.ten" />
        <CInput size="sm" label="Địa chỉ" :value.sync="obj.diachi" />
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
      obj: "kho.selected",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("kho.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("kho.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("kho.delete");
    },
  },
};
</script>
