<template>
  <CDataTable
    hover
    border
    sorter
    fixed
    :column-filter="columnFilter"
    :pagination="false"
    :itemsPerPage="5"
    size="sm"
    :items="items"
    :fields="fields"
    clickable-rows
    addTableClasses="nowrap"
    @row-clicked="rowClicked"
    @filtered-items-change="itemsChanged"
  >
    <template #footer>
      <tr>
        <template v-for="(result, index) in columnResults">
          <th :key="index">
            <div>{{ result }}</div>
          </th>
        </template>
      </tr>
      <tr v-if="columnInput">
        <slot
          v-for="(field, index) in fields"
          :name="`input-${field.key}`"
          v-bind="{ selected: selected, field: field, eventUpdate: onInput }"
        >
          <th :key="index">
            <div>
              <CInput
                :type="field.inputType || 'text'"
                size="sm"
                class="mb-0"
                :value="selected[field.key] || field.inputDefault"
                @update:value="onInput(field.key, $event)"
              />
            </div>
          </th>
        </slot>
      </tr>
    </template>
    <template
      v-for="(_, name) in $scopedSlots"
      :slot="name"
      slot-scope="slotData"
      ><slot :name="name" v-bind="slotData"
    /></template>
  </CDataTable>
</template>

<script>
export default {
  name: "AdvancedTable",
  props: {
    items: {
      type: Array,
      required: true,
    },
    fields: {
      type: Array,
      required: true,
    },
    columnFilter: {
      type: Boolean,
      default: false,
    },
    columnInput: {
      type: Boolean,
      default: false,
    },
    defaultSelected: {
      type: Object,
      required: false,
      default: null,
    },
  },
  data() {
    return {
      columnResults: [],
      selected: this.defaultSelected ?? {},
      dataInput: {},
    };
  },
  watch: {
    items(newItems) {
      this.itemsChanged(newItems);
    },
  },
  methods: {
    rowClicked(...params) {
      this.selected = params[0];
      this.dataInput = this.selected;
      this.$emit("row-clicked", ...params);
    },
    calTotal(field, items) {
      return this.lodash.sum(
        items.map((i) => {
          return i[field];
        })
      );
    },
    itemsChanged(items) {
      this.columnResults = this.fields.map((f) => {
        if (f.showCount) {
          return (f.countLabel ? this.$t(f.countLabel) + ": " : "") + items.length ?? 0;
        }
        if (!f.showTotal) {
          return null;
        }
        return (
          (f.totalLabel ? this.$t(f.totalLabel) + ": " : "") + (f.totalValue ?? this.calTotal(f.key, items))
        ); // (label) + (value)
      });
    },
    onInput(field, value) {
      this.dataInput = { ...this.dataInput, [field]: value };
      this.$emit("update:create", this.dataInput);
    },
  },
};
</script>