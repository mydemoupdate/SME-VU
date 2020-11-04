import Documents from '@/firestore/documents'
import lodash from 'lodash';

export const DOCUMENT = Documents.bangcdkt

export default {
    state: {},
    actions: {},
    mutations: {},
    getters: {
        ['bangcdkt.list'](state) {
            let list = lodash.map(state['bangcdktlist'], chitieu => {
                if (chitieu.loai == 1) { // loai == Tổng hợp => sodauky = 0
                    chitieu.sodauky = 0
                }
                chitieu.socuoiky = 0
                return chitieu
            })
            list = lodash.orderBy(list, ['index', 'id', 'loai'], ['desc', 'desc', 'asc'])
            return lodash.orderBy(lodash.cast(list, DOCUMENT), 'id')
        },
        ['bangcdkt.cselect'](state) {
            const list = lodash.map(state['bangcdktlist'], (item) => {
                return { ...item, ten: item.id + ' - ' + item.chitieu }
            })
            return lodash.toCSelect(list)
        },
    },
};
