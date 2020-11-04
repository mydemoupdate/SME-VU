import COLLECTION from '@/firestore/collections/hachtoan.col'
import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import HTTK from './httk'
import store from '@/core/services/store'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: false,
            type: String,
        },
        diendai: {
            required: false,
            type: String,
            export: {
                name: 'Diễn giải',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Diễn giải',
            },
        },
        tkno: {
            required: true,
            type: DocumentReference,
            reference: HTTK.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Tài khoản nợ',
                customize(obj) {
                    return obj.id
                }
            },
            import: {
                name: 'Tài khoản nợ',
                customize(value) {
                    return store.getters['httk.list'].find(item => { return item.id == value })
                }
            },
        },
        tkco: {
            required: true,
            type: DocumentReference,
            reference: HTTK.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Tài khoản có',
                customize(obj) {
                    return obj.id
                }
            },
            import: {
                name: 'Tài khoản có',
                customize(value) {
                    return store.getters['httk.list'].find(item => { return item.id == value })
                }
            },
        },
    },
    initData: [],
}