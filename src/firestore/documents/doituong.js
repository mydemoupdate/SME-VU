import COLLECTION from '../collections/doituong.col'
import { DocumentReference } from '@/core/services/firebase/firestore.firebase'
import PhongBan from './phongban'
import LoaiDoiTuong from './loaidoituong'
import store from '@/core/services/store'

export default {
    collection: COLLECTION,
    attributes: {
        id: {
            required: true,
            type: String,
            export: {
                name: 'Mã đối tượng',
                options: {
                    showCount: true,
                    countLabel: "Số dòng",
                }
            },
            import: {
                name: 'Mã đối tượng',
            },
        },
        ten: {
            required: true,
            type: String,
            export: {
                name: 'Tên đối tượng',
            },
            import: {
                name: 'Tên đối tượng',
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
        dienthoai: {
            required: false,
            type: String,
            export: {
                name: 'Điện thoại',
            },
            import: {
                name: 'Điện thoại',
            },
        },
        masothue: {
            required: false,
            type: String,
            export: {
                name: 'Mã số thuế',
            },
            import: {
                name: 'Mã số thuế',
            },
        },
        donvi: {
            required: false,
            type: DocumentReference,
            reference: PhongBan.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Đơn vị',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Đơn vị',
                customize(value) {
                    return store.getters['doituong.list'].find(item => { return item.ten == value })
                }
            },
        },
        loai: {
            required: true,
            type: DocumentReference,
            reference: LoaiDoiTuong.collection,
            default: { id: '', ten: '' },
            export: {
                name: 'Loại đối tượng',
                customize(obj) {
                    return obj.ten
                }
            },
            import: {
                name: 'Loại đối tượng',
                customize(value) {
                    return store.getters['doituong.list'].find(item => { return item.id == value })
                }
            },
        }
    },
    initData: [
        {
            id: 'KHCTY_TIENDAT',
            ten: 'Công ty TNHH Tiến Đạt',
            diachi: '2548 Kim Mã, Ba Đình, Hà Nội',
            masothue: '0101243150',
            loai: LoaiDoiTuong.collection.doc('KH'),
        },
        {
            id: 'KHDL_NGOCYEN',
            ten: 'Đại lý Ngọc Yến',
            diachi: 'Hải Dương',
            loai: LoaiDoiTuong.collection.doc('KH'),
        },
        {
            id: 'KHNTLOAN',
            ten: 'Nguyễn Thị Loan',
            diachi: '2548 Nguyễn Văn Cừ, Gia Lâm, Hà Nội',
            loai: LoaiDoiTuong.collection.doc('KH'),
        },
        {
            id: 'NVTIENDAT',
            ten: 'Tiến Đạt',
            diachi: '2548 Kim Mã, Ba Đình, Hà Nội',
            loai: LoaiDoiTuong.collection.doc('NV'),
        },
        {
            id: 'NNVNGOCYEN',
            ten: 'Ngọc Yến',
            diachi: 'Hải Dương',
            loai: LoaiDoiTuong.collection.doc('NV'),
        },
        {
            id: 'NCCCTY_MINHHUONG',
            ten: 'Công ty TNHH Minh Hương',
            diachi: '3021 Kim Mã, Ba Đình, Hà Nội',
            masothue: '0101243150',
            loai: LoaiDoiTuong.collection.doc('NCC'),
        },
        {
            id: 'NCCCTY_HOANGCAU',
            ten: 'Công ty Cổ phần Hoàng Cầu',
            diachi: '2105 Đê La Thành, Đống Đa, Hà Nội',
            masothue: '0101243150',
            loai: LoaiDoiTuong.collection.doc('NCC'),
        },
        {
            id: 'NCCDL_NGOC_YEN',
            ten: 'Đại lý Ngọc Yến',
            diachi: 'Hải Dương',
            loai: LoaiDoiTuong.collection.doc('NCC'),
        },
    ],
}