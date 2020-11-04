<template>
  <CRow class="mx-1">
    <CCol col="7">
      <CForm class="size-sm">
        <CInput
          size="sm"
          label="Mã loại tiền"
          :value="obj.id"
          @update:value="updateId"
        />
        <CInput size="sm" label="Tên loại tiền" :value.sync="obj.ten" />
        <CInput
          size="sm"
          type="number"
          label="Tỷ giá"
          :value.sync="obj.tygia"
        />
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
      obj: "loaitien.selected",
    }),
  },
  methods: {
    updateId(id) {
      this.id = id;
    },
    create() {
      this.$store.dispatch("loaitien.create", { ...this.obj, id: this.id });
    },
    save() {
      this.$store.dispatch("loaitien.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("loaitien.delete");
    },
  },
};
</script>
