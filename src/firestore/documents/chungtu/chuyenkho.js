import COLLECTION from '@/firestore/collections/chungtu/chuyenkho.col'
import { DocumentReference, Timestamp } from '@/core/services/firebase/firestore.firebase'
import LoaiChungTu from '../loaichungtu'
import HachToanTienHang from '../hachtoan/chuyenkho'
import lodash from 'lodash'
import store from '@/core/services/store'
import doituong from '../doituong'

export default {
    collection: COLLECTION,
    attributes: {
        ngayhachtoan: {
            required: true,
            type: Timestamp,
            cast: (value) => {
                if (value instanceof Timestamp) {
                    return lodash.formatDate(value.toDate())
                }
                return value
            },
            export: {
                name: 'Ngày hạch toán',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Ngày hạch toán',
            },
        },
        ngaychungtu: {
            required: true,
            type: Timestamp,
            cast: (value) => {
                if (value instanceof Timestamp) {
                    return lodash.formatDate(value.toDate())
                }
                return value
            },
            export: {
                name: 'Ngày chứng từ',
            },
            import: {
                name: 'Ngày chứng từ',
            },
        },
        id: {
            required: true,
            type: String,
            export: {
                name: 'Số chứng từ',
            },
            import: {
                name: 'Số chứng từ',
            },
        },
        nguoivanchuyen: {
            required: true,
            type: DocumentReference,
            reference: doituong.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Người vận chuyển',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Người vận chuyển',
                customize(value) {
                    return store.getters['doituong.list'].find(item => { return item.ten == value })
                }
            },
        },
        diengiai: {
            required: false,
            type: String,
            export: {
                name: 'Diễn giải',
            },
            import: {
                name: 'Diễn giải',
            },
        },
        hachtoantienhang: {
            required: false,
            type: Array,
            default: [],
            export: {
                customize(items) {
                    return lodash.toExport(items, HachToanTienHang)
                }
            },
            import: {
                customize(attribute, item) {
                    const newHT = HachToanTienHang.collection.doc()
                    store.commit('hachtoan.chuyenkho.import.add', { ...item, id: newHT.id })
                    return newHT
                },
                onSuccess() {
                    store.dispatch('hachtoan.chuyenkho.import')
                }
            },
            castStore(listHT) {
                return lodash.castToDocRefs(listHT, HachToanTienHang)
            },
            cast(obj) {
                if (obj instanceof Array && obj.length) {
                    return lodash.cast(obj, HachToanTienHang)
                }
                return obj
            },
        },
        tienhang: {
            required: false,
            default: 0,
            export: {
                name: 'Tiền hàng',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng tiền hàng",
                }
            },
            cast(obj, item) {
                return lodash.sum(lodash.map(item.hachtoantienhang, ht => ht ? ht.tienhang : 0))
            },
        },
        loai: {
            required: true,
            type: DocumentReference,
            reference: LoaiChungTu.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Loại chứng từ',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Loại chứng từ',
                customize(value) {
                    return store.getters['loaichungtu.list'].find(item => { return item.ten == value })
                }
            },
        },
    },
    initData: [
        {
            ngayhachtoan: new Date(),
            ngaychungtu: new Date(),
            id: 'CK00001',
            nguoivanchuyen: doituong.collection.doc('NNVNGOCYEN'),
            diengiai: 'Chuyển hàng về kho X',
            loai: LoaiChungTu.collection.doc('TTNCCTM'),
        },
        {
            ngayhachtoan: new Date(),
            ngaychungtu: new Date(),
            id: 'CK00002',
            nguoivanchuyen: doituong.collection.doc('NNVNGOCYEN'),
            diengiai: 'Chuyển hàng về kho Y',
            loai: LoaiChungTu.collection.doc('TTNCCTM'),
        },
    ],
}