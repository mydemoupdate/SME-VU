import COLLECTION from '@/firestore/collections/hachtoan.col'
import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import HTTK from '../httk'
import DoiTuong from '../doituong'
import MucThuChi from '../mucthuchi'
import TKNganHang from '../taikhoannganhang'
import store from '@/core/services/store'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: false,
            type: String,
            import: {},
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
        sotien: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Số tiền',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng tiền",
                    inputType: "number",
                    inputDefault: 0,
                }
            },
            import: {
                name: 'Số tiền',
            },
        },
        doituong: {
            required: false,
            type: DocumentReference,
            reference: DoiTuong.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Đối tượng',
                customize(obj) {
                    return obj.id
                }
            },
            import: {
                name: 'Đối tượng',
                customize(value) {
                    return store.getters['doituong.list'].find(item => { return item.id == value })
                }
            },
        },
        mucthu: {
            required: false,
            type: DocumentReference,
            reference: MucThuChi.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Mục thu',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Mục thu',
                customize(value) {
                    return store.getters['mucthuchi.list'].find(item => { return item.ten == value })
                }
            },
        },
        taikhoannganhang: {
            required: false,
            type: DocumentReference,
            reference: TKNganHang.collection,
            default: { id: '', chutaikhoan: '', nganhang: { id: '', ten: '' } },
            export: {
                name: 'TK ngân hàng',
                customize(obj) {
                    return obj.id
                }
            },
            import: {
                name: 'TK ngân hàng',
                customize(value) {
                    return store.getters['taikhoannganhang.list'].find(item => { return item.id == value })
                }
            },
        },
    },
    initData: [
        {
            id: 'j986f6ghj',
            diendai: 'Thu hồi khoản tạm ứng không sử dụng hết sau khi quyết toán',
            tkno: HTTK.collection.doc('1111'),
            tkco: HTTK.collection.doc('141'),
            sotien: 1000,
        },
        {
            id: 'j9hhhoo0j',
            diendai: 'Thu hồi khoản tạm ứng không sử dụng hết sau khi quyết toán',
            tkno: HTTK.collection.doc('1111'),
            tkco: HTTK.collection.doc('141'),
            sotien: 2000,
        },
        {
            id: '5rf6gt7dd',
            diendai: 'Rút tiền gử ngân hàngi về nộp quỹ',
            tkno: HTTK.collection.doc('1111'),
            tkco: HTTK.collection.doc('1121'),
            sotien: 20000,
        },
        {
            id: '2ncxdshn2',
            diendai: 'Tiền mua hàng ứng trước của công ty TNHH Tiến Đạt',
            tkno: HTTK.collection.doc('1111'),
            tkco: HTTK.collection.doc('131'),
            sotien: 500,
        },
        {
            diendai: 'Tiền mua hàng ứng trước của công ty TNHH Tiến Đạt',
            tkno: HTTK.collection.doc('1111'),
            tkco: HTTK.collection.doc('131'),
            sotien: 500,
        },
    ],
}