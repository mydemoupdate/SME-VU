import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import COLLECTION from '../collections/taikhoannganhang.col'
import NganHang from './nganhang'
import store from '@/core/services/store'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã tài khoản',
            },
            import: {
                name: 'Mã tài khoản',
            },
        },
        nganhang: {
            required: true,
            type: DocumentReference,
            default: { id: '', ten: '' },
            reference: NganHang.collection,
            export: {
                name: 'Ngân hàng',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Ngân hàng',
                customize(value) {
                    return store.getters['nganhang.list'].find(item => { return item.ten == value })
                }
            },
        },
        chinhanh: {
            required: false,
            type: String,
            export: {
                name: 'Chi nhánh',
            },
            import: {
                name: 'Chi nhánh',
            },
        },
        diachi: {
            required: false,
            type: String,
            export: {
                name: 'Địa chỉ',
            },
            import: {
                name: 'Địa chỉ',
            },
        },
        chutaikhoan: {
            required: false,
            type: String,
            export: {
                name: 'Chủ tài khoản',
            },
            import: {
                name: 'Chủ tài khoản',
            },
        },
    },
    initData: [
        {
            id: '0001254878210',
            nganhang: NganHang.collection.doc('ABBank'),
            chinhanh: 'Ngân hàng TMCP Quân đội - Chi nhánh Thăng Long',
            diachi: '2150 Phạm Văn Đồng, Cầu Giấy, Hà Nội',
            chutaikhoan: 'Phạm Văn Đồng',
        },
        {
            id: '0124010015487',
            nganhang: NganHang.collection.doc('Agribank'),
            chinhanh: 'Ngân hàng Đầu tư và Phát triển Việt Nam - Chi nhánh Thanh Xuân',
            diachi: '1254 Nguyễn Trãi, Thanh Xuân, Hà Nội',
            chutaikhoan: 'Nguyễn Trãi',
        },
    ],
}