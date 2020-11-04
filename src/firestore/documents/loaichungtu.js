import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import COLLECTION from '../collections/loaichungtu.col'
import HTTK from './httk'
import store from '@/core/services/store'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã loại chứng từ',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã loại chứng từ',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên loại chứng từ',
            },
            import: {
                name: 'Tên loại chứng từ',
            },
        },
        tkno: {
            required: false,
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
            required: false,
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
    initData: [
        {
            id: 'BHCTT',
            ten: 'Bán hàng chưa thu tiền',
            tkno: HTTK.collection.doc('131'),
        },
        {
            id: 'CKTM',
            ten: 'Chiết khấu thương mại',
            tkno: HTTK.collection.doc('521'),
        },
        {
            id: 'GTSCĐHH',
            ten: 'Ghi giảm TSCĐ hữu hình',
            tkco: HTTK.collection.doc('211'),
        },
        {
            id: 'TTNCCTM',
            ten: 'Trả tiền nhà cung cấp bằng tiền mặt',
            tkno: HTTK.collection.doc('331'),
            tkco: HTTK.collection.doc('111'),
        },
    ],
}