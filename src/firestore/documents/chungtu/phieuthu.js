import COLLECTION from '@/firestore/collections/chungtu/phieuthu.col'
import { DocumentReference, Timestamp } from '@/core/services/firebase/firestore.firebase'
import LoaiChungTu from '../loaichungtu'
import HachToan from '../hachtoan/phieuthu'
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
        hachtoan: {
            required: false,
            type: Array,
            default: [],
            export: {
                customize(items) {
                    return lodash.toExport(items, HachToan)
                }
            },
            import: {
                customize(attribute, item) {
                    const newHT = HachToan.collection.doc()
                    store.commit('hachtoan.phieuthu.import.add', { ...item, id: newHT.id })
                    return newHT
                },
                onSuccess() {
                    store.dispatch('hachtoan.phieuthu.import')
                }
            },
            castStore(listHT) {
                return lodash.castToDocRefs(listHT, HachToan)
            },
            cast(obj) {
                if (obj instanceof Array && obj.length) {
                    return lodash.cast(obj, HachToan)
                }
                return obj
            }
        },
        sotien: {
            required: false,
            default: 0,
            export: {
                name: 'Số tiền',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng tiền",
                }
            },
            cast(obj, item) {
                return lodash.sum(lodash.map(item.hachtoan, ht => ht ? ht.sotien : 0))
            }
        },
        doituong: {
            required: false,
            type: DocumentReference,
            reference: doituong.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Đối tượng',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Đối tượng',
                customize(value) {
                    return store.getters['doituong.list'].find(item => { return item.id == value })
                }
            },
        },
        lydo: {
            required: true,
            type: String,
            export: {
                name: 'Lý do thu',
            },
            import: {
                name: 'Lý do thu',
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
            id: 'PT00001',
            loai: LoaiChungTu.collection.doc('BHCTT'),
            hachtoan: [
                HachToan.collection.doc('j986f6ghj'),
                HachToan.collection.doc('j9hhhoo0j'),
            ],
            lydo: 'Rút tiền gửi về nộp quỹ',
        },
        {
            ngayhachtoan: new Date(),
            ngaychungtu: new Date(),
            id: 'PT00002',
            loai: LoaiChungTu.collection.doc('BHCTT'),
            hachtoan: [
                HachToan.collection.doc('5rf6gt7dd'),
            ],
            lydo: 'Rút tiền gửi về nộp quỹ',
        },
        {
            ngayhachtoan: new Date(),
            ngaychungtu: new Date(),
            id: 'PT00003',
            loai: LoaiChungTu.collection.doc('CKTM'),
            hachtoan: [
                HachToan.collection.doc('2ncxdshn2'),
            ],
            lydo: 'Thu hoàn thuế GTGT',
        },
    ],
}