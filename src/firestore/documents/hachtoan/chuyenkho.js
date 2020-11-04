import COLLECTION from '@/firestore/collections/hachtoan.col'
import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import HTTK from '../httk'
import store from '@/core/services/store'
import VTHH from '../vthh'
import Kho from '../kho'
import DonVi from '../donvi'

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
        khoxuat: {
            required: false,
            type: DocumentReference,
            reference: Kho.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Kho xuất',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Kho xuất',
                customize(value) {
                    return store.getters['kho.list'].find(item => { return item.ten == value })
                }
            },
        },
        khonhap: {
            required: false,
            type: DocumentReference,
            reference: Kho.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Kho nhập',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Kho nhập',
                customize(value) {
                    return store.getters['kho.list'].find(item => { return item.ten == value })
                }
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
        donvitinh: {
            required: false,
            type: DocumentReference,
            reference: DonVi.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Đơn vị tính',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Đơn vị tính',
                customize(value) {
                    return store.getters['donvi.list'].find(item => { return item.ten == value })
                }
            },
        },
        soluong: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Số lượng',
                options: {
                    inputType: "number",
                    inputDefault: 0,
                }
            },
            import: {
                name: 'Số lượng',
            },
        },
        dongia: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Đơn giá',
                options: {
                    inputType: "number",
                    inputDefault: 0,
                }
            },
            import: {
                name: 'Đơn giá',
            },
        },
        tienhang: {
            required: false,
            type: Number,
            readonly: true,
            default: 0,
            export: {
                name: 'Tiền hàng',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng tiền hàng",
                }
            },
            cast(obj, item) {
                return item.dongia * item.soluong
            }
        },
    },
    initData: [],
}