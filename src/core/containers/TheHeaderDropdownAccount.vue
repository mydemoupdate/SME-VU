<template>
  <CDropdown inNav class="c-header-nav-items" placement="bottom-end" add-menu-classes="pt-0 mt-1">
    <template #toggler>
      <CHeaderNavLink>
        <CIcon name="cil-user" />
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Account</strong>
    </CDropdownHeader>
    <CDropdownItem>
      <CIcon name="cil-user" />Profile
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-settings" />Settings
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-dollar" />Payments
      <CBadge color="secondary" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownItem>
      <CIcon name="cil-file" />Projects
      <CBadge color="primary" class="mfs-auto">{{ itemsCount }}</CBadge>
    </CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem>
      <CIcon name="cil-shield-alt" />Lock Account
    </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" />Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
import { LOGOUT } from "../services/store/auth.module";
import rediect from "../redirect";

export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      itemsCount: 42,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        rediect.auth.toLogin();
      });
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>