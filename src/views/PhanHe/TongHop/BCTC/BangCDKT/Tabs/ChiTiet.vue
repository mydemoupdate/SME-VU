<template>
  <CRow class="mx-1">
    <CCol col="8">
      <CForm class="size-sm">
        <CInput size="sm" label="Chỉ tiêu" :value.sync="obj.chitieu" />
        <CInput size="sm" label="Mã số" :value.sync="obj.id" />
        <CRow>
          <CCol sm="12" size="sm" class="form-group">
            <label class="col-form-label-sm">Loại chỉ tiêu</label>
            <Treeselect
              :appendToBody="true"
              :options="listLoaiChiTieu"
              :clearable="false"
              v-model="obj.loai"
            />
          </CCol>
        </CRow>
        <CInput
          type="number"
          readonly
          size="sm"
          label="Số cuối kỳ"
          :value="obj.socuoiky"
        />
        <CInput
          type="number"
          size="sm"
          label="Số đầu kỳ"
          :value.sync="obj.sodauky"
        />
        <CInput
          type="number"
          size="sm"
          label="Thứ tự ưu tiên"
          :value.sync="obj.index"
        />
      </CForm>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TabChiTiet",
  computed: {
    ...mapGetters({
      obj: "bangcdkt.selected",
    }),
    listLoaiChiTieu() {
      return [
        { id: 2, label: "Chi tiết" },
        { id: 1, label: "Tổng hợp" },
      ];
    },
  },
  methods: {
    create() {
      this.$store.dispatch("bangcdkt.create", {
        ...this.obj,
      });
    },
    save() {
      this.$store.dispatch("bangcdkt.update", this.obj);
    },
    destroy() {
      this.$store.dispatch("bangcdkt.delete");
    },
  },
};
</script>
