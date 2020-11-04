import { UserService } from '@/core/services/api.service';

export const RESOURCE = 'permissions';

export const SERVICE = UserService;

export default {
    giveRoles(id, roleIds) {
        return SERVICE.update(RESOURCE, id, {
            params: JSON.stringify(["roles", ...roleIds]),
            action: 'attach'
        });
    },
    revokeRoles(id, roleIds) {
        return SERVICE.update(RESOURCE, id, {
            params: JSON.stringify(["roles", ...roleIds]),
            action: 'detach'
        });
    },
}
