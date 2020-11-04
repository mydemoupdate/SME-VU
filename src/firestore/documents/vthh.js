import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import COLLECTION from '../collections/vthh.col'
import NhomVTHH from './nhomvthh'
import DonVi from './donvi'
import store from '@/core/services/store'
import lodash from 'lodash'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã VTHH',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã VTHH',
                customize(value) {
                    value = lodash.replace(value, /[^a-z0-9]/gi, '')
                    return lodash.trim(value)
                }
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên VTHH',
            },
            import: {
                name: 'Tên VTHH',
            },
        },
        nhom: {
            required: false,
            type: DocumentReference,
            default: { id: '', ten: '' },
            reference: NhomVTHH.collection,
            export: {
                name: 'Nhóm VTHH',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Nhóm VTHH',
                customize(value) {
                    return store.getters['nhomvthh.list'].find(item => { return item.ten == value })
                }
            },
        },
        donvi: {
            required: false,
            type: DocumentReference,
            default: { id: '', ten: '' },
            reference: DonVi.collection,
            export: {
                name: 'Đơn vị',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Đơn vị',
                customize(value) {
                    return store.getters['donvi.list'].find(item => { return item.ten == value })
                }
            },
        },
        nguongoc: {
            required: false,
            type: String,
            export: {
                name: 'Nguồn gốc',
            },
            import: {
                name: 'Nguồn gốc',
            },
        },
        dongiamua: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Đơn giá mua',
            },
            import: {
                name: 'Đơn giá mua',
            },
        },
        dongiaban: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Đơn giá bán',
            },
            import: {
                name: 'Đơn giá bán',
            },
        },
        thuesuatgtgt: {
            required: false,
            type: Number,
            default: 0,
            export: {
                name: 'Thuế suất GTGT',
            },
            import: {
                name: 'Thuế suất GTGT',
            },
        }
    },
    initData: [
        {
            id: 'AO_SOMI_NAM',
            ten: 'Áo sơ mi Nam',
            nhom: NhomVTHH.collection.doc('NVL'),
            donvi: DonVi.collection.doc('cai'),
            nguongoc: 'VietNam',
            dongiamua: 100,
            dongiaban: 150,
            thuesuatgtgt: 0,
        },
        {
            id: 'BAN_PHIM',
            ten: 'Bàn phím Mitsumi',
            nhom: NhomVTHH.collection.doc('NVL'),
            donvi: DonVi.collection.doc('cai'),
            nguongoc: 'VietNam',
            dongiamua: 500,
            dongiaban: 600,
            thuesuatgtgt: 10,
        },
    ],
}