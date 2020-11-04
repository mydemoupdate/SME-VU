import { UserService } from '@/core/services/api.service';

export const RESOURCE = 'users';

export const SERVICE = UserService;

export default {
    givePermissions(id, permissionIds) {
        return SERVICE.update(RESOURCE, id, {
            params: JSON.stringify(["directPermissions", ...permissionIds]),
            action: 'attach'
        });
    },
    revokePermissions(id, permissionIds) {
        return SERVICE.update(RESOURCE, id, {
            params: JSON.stringify(["directPermissions", ...permissionIds]),
            action: 'detach'
        });
    },
    setRole(id, roleId) {
        return SERVICE.update(RESOURCE, id, { role_id: roleId });
    },
}
