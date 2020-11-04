<template>
  <div v-show="false">Preview</div>
</template>

<script>
export default {
  name: "ImportReceiver",
  props: {
    data: {
      type: Array,
      required: false,
    },
  },
  watch: {
    data(newData) {
      this.$emit("import", newData);
    },
  },
};
</script>