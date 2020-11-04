import { UserService } from '@/core/services/api.service';

export const RESOURCE = 'roles';

export const SERVICE = UserService;

export default {
    givePermissions(id, permissionIds) {
        return SERVICE.update(RESOURCE, id, {
            params: JSON.stringify(["permissions", ...permissionIds]),
            action: 'attach'
        });
    },
    revokePermissions(id, permissionIds) {
        return SERVICE.update(RESOURCE, id, {
            params: JSON.stringify(["permissions", ...permissionIds]),
            action: 'detach'
        });
    },
    giveChilds(id, roleIds) {
        return SERVICE.update(RESOURCE, id, {
            params: JSON.stringify(["childs", ...roleIds]),
            action: 'attach'
        });
    },
    revokeChilds(id, roleIds) {
        return SERVICE.update(RESOURCE, id, {
            params: JSON.stringify(["childs", ...roleIds]),
            action: 'detach'
        });
    },
}
