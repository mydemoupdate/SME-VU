import COLLECTION from '@/firestore/collections/chungtu/giamgiahangmua.col'
import { DocumentReference, Timestamp } from '@/core/services/firebase/firestore.firebase'
import LoaiChungTu from '../loaichungtu'
import HachToanGiamGiaTienHang from '../hachtoan/giamgiahangmua'
import HachToanGiamGiaThueGTGT from '../hachtoan/giamgiathuegtgt'
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
        nhacungcap: {
            required: true,
            type: DocumentReference,
            reference: doituong.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Nhà cung cấp',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Nhà cung cấp',
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
        nhanvienmuahang: {
            required: false,
            type: DocumentReference,
            reference: doituong.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Nhân viên mua hàng',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Nhân viên mua hàng',
                customize(value) {
                    return store.getters['doituong.list'].find(item => { return item.ten == value })
                }
            },
        },
        hachtoantienhang: {
            required: false,
            type: Array,
            default: [],
            export: {
                customize(items) {
                    return lodash.toExport(items, HachToanGiamGiaTienHang)
                }
            },
            import: {
                customize(attribute, item) {
                    const newHT = HachToanGiamGiaTienHang.collection.doc()
                    store.commit('hachtoan.giamgiahangmua.import.add', { ...item, id: newHT.id })
                    return newHT
                },
                onSuccess() {
                    store.dispatch('hachtoan.giamgiahangmua.import')
                }
            },
            castStore(listHT) {
                return lodash.castToDocRefs(listHT, HachToanGiamGiaTienHang)
            },
            cast(obj) {
                if (obj instanceof Array && obj.length) {
                    return lodash.cast(obj, HachToanGiamGiaTienHang)
                }
                return obj
            },
        },
        hachtoanthuegtgt: {
            required: false,
            default: [],
            castStore(listHT) {
                return lodash.castToDocRefs(listHT, HachToanGiamGiaThueGTGT)
            },
            cast(obj) {
                if (obj instanceof Array && obj.length) {
                    return lodash.cast(obj, HachToanGiamGiaThueGTGT)
                }
                return obj
            }
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
        tienthuegtgt: {
            required: false,
            default: 0,
            export: {
                name: 'Tiền thuế GTGT',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng tiền thuế GTGT",
                }
            },
            cast(obj, item) {
                return lodash.sum(lodash.map(item.hachtoanthuegtgt, ht => ht ? ht.tienthuegtgt : 0))
            }
        },
        tienthanhtoan: {
            required: false,
            default: 0,
            export: {
                name: 'Tiền thanh toán',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng tiền thanh toán",
                }
            },
            cast(obj, item) {
                return item.tienhang + item.tienthuegtgt
            }
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
            id: 'GGHM00001',
            nhacungcap: doituong.collection.doc('NCCCTY_HOANGCAU'),
            diengiai: 'Giảm giá hàng',
            nhanvienmuahang: doituong.collection.doc('NNVNGOCYEN'),
            loai: LoaiChungTu.collection.doc('TTNCCTM'),
        },
        {
            ngayhachtoan: new Date(),
            ngaychungtu: new Date(),
            id: 'GGHM00002',
            nhacungcap: doituong.collection.doc('NCCDL_NGOC_YEN'),
            diengiai: 'Phí hải quan cho lô hàng nhập khẩu của công ty Minh Anh',
            nhanvienmuahang: doituong.collection.doc('NVTIENDAT'),
            loai: LoaiChungTu.collection.doc('TTNCCTM'),
        },
    ],
}