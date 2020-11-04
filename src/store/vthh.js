import Documents from '@/firestore/documents'
import lodash from 'lodash';

export const DOCUMENT = Documents.vthh

export default {
    state: {},
    actions: {},
    mutations: {},
    getters: {
        'vthh.cselect'(state) {
            const list = lodash.map(state['vthhlist'], (item) => {
                return { ...item, ten: item.id + ' - ' + item.ten }
            })
            return lodash.toCSelect(list)
        },
    },
};
