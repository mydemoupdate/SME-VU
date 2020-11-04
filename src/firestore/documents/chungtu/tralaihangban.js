import COLLECTION from '@/firestore/collections/chungtu/tralaihangban.col'
import { DocumentReference, Timestamp } from '@/core/services/firebase/firestore.firebase'
import LoaiChungTu from '../loaichungtu'
import HachToanTraLaiTienHang from '../hachtoan/tralaihangban'
import HachToanTraLaiChiecKhau from '../hachtoan/chieckhau'
import HachToanTraLaiThueGTGT from '../hachtoan/tralaithuegtgt'
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
        khachhang: {
            required: true,
            type: DocumentReference,
            reference: doituong.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Khách hàng',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Khách hàng',
                customize(value) {
                    return store.getters['doituong.list'].find(item => { return item.ten == value })
                }
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
        nhanvienbanhang: {
            required: false,
            type: DocumentReference,
            reference: doituong.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Nhân viên bán hàng',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Nhân viên bán hàng',
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
                    return lodash.toExport(items, HachToanTraLaiTienHang)
                }
            },
            import: {
                customize(attribute, item) {
                    const newHT = HachToanTraLaiTienHang.collection.doc()
                    store.commit('hachtoan.tralaihangban.import.add', { ...item, id: newHT.id })
                    return newHT
                },
                onSuccess() {
                    store.dispatch('hachtoan.tralaihangban.import')
                }
            },
            castStore(listHT) {
                return lodash.castToDocRefs(listHT, HachToanTraLaiTienHang)
            },
            cast(obj) {
                if (obj instanceof Array && obj.length) {
                    return lodash.cast(obj, HachToanTraLaiTienHang)
                }
                return obj
            },
        },
        hachtoanchieckhau: {
            required: false,
            default: [],
            castStore(listHT) {
                return lodash.castToDocRefs(listHT, HachToanTraLaiChiecKhau)
            },
            cast(obj) {
                if (obj instanceof Array && obj.length) {
                    return lodash.cast(obj, HachToanTraLaiChiecKhau)
                }
                return obj
            }
        },
        hachtoanthuegtgt: {
            required: false,
            default: [],
            castStore(listHT) {
                return lodash.castToDocRefs(listHT, HachToanTraLaiThueGTGT)
            },
            cast(obj) {
                if (obj instanceof Array && obj.length) {
                    return lodash.cast(obj, HachToanTraLaiThueGTGT)
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
        tienchieckhau: {
            required: false,
            default: 0,
            export: {
                name: 'Tiền chiếc khấu',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng tiền chiếc khấu",
                }
            },
            cast(obj, item) {
                return lodash.sum(lodash.map(item.hachtoanchieckhau, ht => ht ? ht.tienchieckhau : 0))
            }
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
                return item.tienhang - item.tienchieckhau + item.tienthuegtgt
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
            id: 'TLHB00001',
            khachhang: doituong.collection.doc('NCCCTY_HOANGCAU'),
            diengiai: 'Trả hàng',
            nhanvienbanhang: doituong.collection.doc('NNVNGOCYEN'),
            loai: LoaiChungTu.collection.doc('TTNCCTM'),
        },
        {
            ngayhachtoan: new Date(),
            ngaychungtu: new Date(),
            id: 'TLHB00002',
            khachhang: doituong.collection.doc('NCCDL_NGOC_YEN'),
            diengiai: 'Khánh trả lại hàng bán',
            nhanvienbanhang: doituong.collection.doc('NVTIENDAT'),
            loai: LoaiChungTu.collection.doc('TTNCCTM'),
        },
    ],
}