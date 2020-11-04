<template>
  <div>
    <CToaster :autohide="timeout" position="bottom-right">
      <template v-for="(toast, i) in toasts">
        <CToast :key="i" :show="true">
          <template #header>
            <p v-if="!!toast.title" :class="getStyle(toast.type)">{{toast.title}}</p>
          </template>
          <template class="p-0">
            <p v-if="!toast.title" :class="getStyle(toast.type)">{{toast.message}}</p>
            <p v-if="!!toast.title" class="w-100 m-0">{{toast.message}}</p>
          </template>
        </CToast>
      </template>
    </CToaster>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { TOASTS, TIMEOUT_TOASTS } from "../services/store/toasts.module";

export default {
  name: "Toast",
  computed: {
    ...mapGetters({ toasts: TOASTS, timeout: TIMEOUT_TOASTS }),
  },
  methods: {
    getStyle(color) {
      return "w-100 m-0 text-" + color;
    },
  },
};
</script>
