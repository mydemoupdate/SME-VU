import Documents from '@/firestore/documents'
import lodash from 'lodash'

export const DOCUMENT = Documents.taikhoannganhang

export default {
    state: {},
    actions: {},
    mutations: {},
    getters: {
        'taikhoannganhang.cselect'(state) {
            const list = lodash.map(state['taikhoannganhanglist'], (item) => {
                return { ...item, ten: item.id + ' - ' + item.chutaikhoan + ' - ' + item.nganhang.id }
            })
            return lodash.toCSelect(list)
        },
    },
};
