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
        kho: {
            required: false,
            type: DocumentReference,
            reference: Kho.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Kho',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Kho',
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
        tylechikhau: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Tỷ lệ chiếc khấu',
                options: {
                    inputType: "number",
                    inputDefault: 0,
                }
            },
            import: {
                name: 'Tỷ lệ chiếc khấu',
            },
        },
        tienchieckhau: {
            required: false,
            type: Number,
            readonly: true,
            default: 0,
            export: {
                name: 'Tiền chiếc khấu',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng tiền chiếc khấu",
                }
            },
            cast(obj, item) {
                return item.tienhang * item.tylechikhau / 100
            }
        },
        chiphimuahang: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Chi phí mua hàng',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng chi phí mua hàng",
                    inputType: "number",
                    inputDefault: 0,
                }
            },
            import: {
                name: 'Chi phí mua hàng',
            },
        },
        giatrinhapkho: {
            required: false,
            type: Number,
            readonly: true,
            default: 0,
            export: {
                name: 'Giá trị nhập kho',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng giá trị nhập kho",
                }
            },
            cast(obj, item) {
                return item.tienhang + item.chiphimuahang - item.tienchieckhau
            }
        },
    },
    initData: [],
}