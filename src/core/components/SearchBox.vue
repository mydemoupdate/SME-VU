<!-- 
props:
    fields: [
        { value: "", label: "All" },
        { value: "id", label: "Username" },
        { value: "roles.name", label: "Roles", onlyValues:["Admin", "Buyer"] },
    ],

events:
    fieldChanged
    valueChanged
-->

<template>
  <CCol col="12">
    <CRow>
      <CCol sm="12" md="3">
        <CSelect :options="fields" @update:value="fieldChanged" />
      </CCol>
      <CCol sm="12" md="9">
        <CInput
          v-show="!isConditionSelect"
          placeholder="Search"
          :value.sync="value"
          @update:value="valueChanged"
        />
        <CSelect
          v-show="isConditionSelect"
          :options="field.onlyValues"
          @update:value="valueChanged"
          placeholder="Select"
        />
      </CCol>
    </CRow>
  </CCol>
</template>

<script>
export default {
  name: "SearchBox",
  props: {
    fields: {
      type: Array,
      default: function () {
        return [{ value: "", label: "All" }];
      },
    },
  },
  data() {
    return {
      field: String,
      value: "",
    };
  },
  watch: {
    field: {
      handler(value) {
        this.$emit("fieldChanged", value);
      },
    },
    value: {
      handler(value) {
        this.$emit("valueChanged", value);
      },
    },
  },
  computed: {
    isConditionSelect() {
      return !!this.field.onlyValues;
    },
  },
  methods: {
    fieldChanged(field) {
      this.field = this.fields.find((e) => {
        return e.value == field;
      });
      this.value = null;
    },
    valueChanged(value) {
      this.value = value;
    },
  },
};
</script>