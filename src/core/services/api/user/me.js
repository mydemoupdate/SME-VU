import { UserService } from '@/core/services/api.service';

export const RESOURCE = 'me';

export const SERVICE = UserService;

export default {
    infor(query) {
        SERVICE.setHeader();
        return SERVICE.query(RESOURCE, query);
    },
    logout() {
        return SERVICE.post(RESOURCE + '/logout');
    }
}
