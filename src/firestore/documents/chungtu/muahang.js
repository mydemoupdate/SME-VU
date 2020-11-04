import COLLECTION from '@/firestore/collections/chungtu/muahang.col'
import { DocumentReference, Timestamp } from '@/core/services/firebase/firestore.firebase'
import LoaiChungTu from '../loaichungtu'
import HachToanTienHang from '../hachtoan/muahang'
import HachToanThueGTGT from '../hachtoan/thuegtgt'
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
        ngaygiaohang: {
            required: false,
            type: Timestamp,
            cast: (value) => {
                if (value instanceof Timestamp) {
                    return lodash.formatDate(value.toDate())
                }
                return value
            },
            export: {
                name: 'Ngày giao hàng',
            },
            import: {
                name: 'Ngày giao hàng',
            },
        },
        ngaythanhtoan: {
            required: false,
            type: Timestamp,
            cast: (value) => {
                if (value instanceof Timestamp) {
                    return lodash.formatDate(value.toDate())
                }
                return value
            },
            export: {
                name: 'Ngày thanh toán',
            },
            import: {
                name: 'Ngày thanh toán',
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
                    store.commit('hachtoan.muahang.import.add', { ...item, id: newHT.id })
                    return newHT
                },
                onSuccess() {
                    store.dispatch('hachtoan.muahang.import')
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
        hachtoanthuegtgt: {
            required: false,
            default: [],
            castStore(listHT) {
                return lodash.castToDocRefs(listHT, HachToanThueGTGT)
            },
            cast(obj) {
                if (obj instanceof Array && obj.length) {
                    return lodash.cast(obj, HachToanThueGTGT)
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
                return lodash.sum(lodash.map(item.hachtoantienhang, ht => ht ? ht.tienchieckhau : 0))
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
        chiphimuahang: {
            required: false,
            default: 0,
            export: {
                name: 'Chi phí mua hàng',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng chi phí mua hàng",
                }
            },
            cast(obj, item) {
                return lodash.sum(lodash.map(item.hachtoantienhang, ht => ht ? ht.chiphimuahang : 0))
            },
        },
        giatrinhapkho: {
            required: false,
            default: 0,
            export: {
                name: 'Giá trị nhập kho',
                options: {
                    showTotal: true,
                    totalLabel: "Tổng giá trị nhập kho",
                }
            },
            cast(obj, item) {
                return lodash.sum(lodash.map(item.hachtoantienhang, ht => ht ? ht.giatrinhapkho : 0))
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
            id: 'MH00001',
            nhacungcap: doituong.collection.doc('NCCCTY_HOANGCAU'),
            diachi: '2105 Đê La Thành, Đống Đa, Hà Nội',
            diengiai: 'Mua hàng',
            nhanvienmuahang: doituong.collection.doc('NNVNGOCYEN'),
            loai: LoaiChungTu.collection.doc('TTNCCTM'),
        },
        {
            ngayhachtoan: new Date(),
            ngaychungtu: new Date(),
            id: 'MH00002',
            nhacungcap: doituong.collection.doc('NCCDL_NGOC_YEN'),
            diachi: 'Hải Dương',
            diengiai: 'Phí hải quan cho lô hàng nhập khẩu của công ty Minh Anh',
            nhanvienmuahang: doituong.collection.doc('NVTIENDAT'),
            loai: LoaiChungTu.collection.doc('TTNCCTM'),
        },
    ],
}