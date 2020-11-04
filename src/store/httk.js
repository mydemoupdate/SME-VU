import Documents from '@/firestore/documents'
import lodash from 'lodash';

export const DOCUMENT = Documents.httk

export default {
    state: {},
    actions: {},
    mutations: {},
    getters: {
        'httk.cselect'(state) {
            const list = lodash.map(state['httklist'], (item) => {
                return { ...item, ten: item.id + ' - ' + item.ten }
            })
            return lodash.toCSelect(list)
        },
    },
};
