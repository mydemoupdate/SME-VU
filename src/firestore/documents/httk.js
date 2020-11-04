import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import COLLECTION from '../collections/httk.col'
import TinhChat from './tinhchat'
import store from '@/core/services/store'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Số tài khoản',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Số tài khoản',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên tài khoản',
            },
            import: {
                name: 'Tên tài khoản',
            },
        },
        tinhchat: {
            required: true,
            type: DocumentReference,
            reference: TinhChat.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Tính chất',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Tính chất',
                customize(value) {
                    return store.getters['tinhchat.list'].find(item => { return item.ten == value })
                }
            },
        },
        taikhoantonghop: {
            required: false,
            type: String,
            export: {
                name: 'Tài khoản tổng hợp',
            },
            import: {
                name: 'Tài khoản tổng hợp',
            },
        },
    },
    initData: [
        {
            id: '111',
            ten: 'Tiền mặt',
            tinhchat: TinhChat.collection.doc('DN'),
        },
        {
            id: '1111',
            ten: 'Tiền Việt Nam',
            tinhchat: TinhChat.collection.doc('DN'),
            taikhoantonghop: '111',
        },
        {
            id: '1112',
            ten: 'Ngoại tệ',
            tinhchat: TinhChat.collection.doc('DN'),
            taikhoantonghop: '111',
        },
        {
            id: '112',
            ten: 'Tiền gửi ngân hàng',
            tinhchat: TinhChat.collection.doc('DN'),
        },
        {
            id: '1121',
            ten: 'Tiền Việt Nam',
            tinhchat: TinhChat.collection.doc('DN'),
            taikhoantonghop: '112',
        },
        {
            id: '1122',
            ten: 'Ngoại tệ',
            tinhchat: TinhChat.collection.doc('DN'),
            taikhoantonghop: '112',
        },
    ],
}