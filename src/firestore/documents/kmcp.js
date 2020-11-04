import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import COLLECTION from '../collections/kmcp.col'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã khoản mục chi phí',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã khoản mục chi phí',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên khoản mục chi phí',
            },
            import: {
                name: 'Tên khoản mục chi phí',
            },
        },
        thuoc: {
            required: false,
            type: DocumentReference,
            reference: COLLECTION,
            default: { id: '', ten: '' },
            import: {
                name: 'Tên khoản mục chi phí',
            },
        },
    },
    initData: [
        {
            id: 'CP_BH',
            ten: 'Chi phí bán hàng',
        },
        {
            id: 'CP_BB',
            ten: 'Chi phí bao bì',
            thuoc: COLLECTION.doc('CP_BH')
        },
        {
            id: 'CP_QL',
            ten: 'Chi phí quản lý',
        },
    ],
}