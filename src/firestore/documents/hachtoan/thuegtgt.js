import COLLECTION from '@/firestore/collections/hachtoan.col'
import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import HTTK from '../httk'
import VTHH from '../vthh'
import store from '@/core/services/store'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: false,
            type: String,
            import: {},
        },
        hanghoa: {
            required: true,
            type: DocumentReference,
            reference: VTHH.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Hàng hóa',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                },
                customize(obj) {
                    return obj.id
                }
            },
            import: {
                name: 'Hàng hóa',
                customize(value) {
                    return store.getters['vthh.list'].find(item => { return item.id == value })
                }
            },
        },
        diendai: {
            required: false,
            type: String,
            export: {
                name: 'Diễn giải',
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
        tienhang: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Tiền hàng',
                options: {
                    inputType: "number",
                    inputDefault: 0,
                }
            },
            import: {
                name: 'Tiền hàng',
            },
        },
        phantramthue: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Phần trăm thuế GTGT',
                options: {
                    inputType: "number",
                    inputDefault: 0,
                }
            },
            import: {
                name: 'Phần trăm thuế GTGT',
            },
        },
        tienthuegtgt: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Tiền thuế GTGT',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng tiền thuế GTGT",
                }
            },
            cast(obj, item) {
                return item.tienhang * item.phantramthue / 100
            }
        },
    },
    initData: [],
}