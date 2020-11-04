// Tài khoản
const HTTK = () => import('@/views/DanhMuc/HTTK/Index')

// Cơ cấu tổ chức
const PhongBan = () => import('@/views/DanhMuc/CCTC/PhongBan/Index')

// Đối tượng
const DoiTuong = () => import('@/views/DanhMuc/DoiTuong/Index')

// Loại CCDC
const LoaiCCDC = () => import('@/views/DanhMuc/LoaiCCDC/Index')

// Loại TSCD
const LoaiTSCD = () => import('@/views/DanhMuc/LoaiTSCD/Index')

// Khoản mục chi phí
const KMCP = () => import('@/views/DanhMuc/KMCP/Index')

// VTHH
const VTHH = () => import('@/views/DanhMuc/VTHH/VTHH/Index')
const Kho = () => import('@/views/DanhMuc/VTHH/Kho/Index')
const NhomVTHH = () => import('@/views/DanhMuc/VTHH/Nhom/Index')
const DonViTinh = () => import('@/views/DanhMuc/VTHH/DonVi/Index')

// Ngân hàng
const NganHang = () => import('@/views/DanhMuc/NganHang/NganHang/Index')
const TKNganHang = () => import('@/views/DanhMuc/NganHang/TKNganHang/Index')

// Khác
const MucThuChi = () => import('@/views/DanhMuc/Khac/MucThuChi/Index')
const LoaiTien = () => import('@/views/DanhMuc/Khac/LoaiTien/Index')
const LoaiChungTu = () => import('@/views/DanhMuc/Khac/LoaiChungTu/Index')

export default [
    {
        path: 'danh-muc',
        meta: {
            label: 'Danh mục'
        },
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            {
                path: 'httk',
                name: 'Hệ thống tài khoản',
                component: HTTK
            },
            {
                path: 'cctc',
                name: 'Cơ cấu tổ chức',
                redirect: 'cctc/phong-ban',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'phong-ban',
                        name: 'Phòng ban',
                        component: PhongBan,
                    },
                ],
            },
            {
                path: 'doi-tuong',
                name: 'Đối tượng',
                component: DoiTuong,
            },
            {
                path: 'loai-ccdc',
                name: 'Loại CCDC',
                component: LoaiCCDC
            },
            {
                path: 'loai-tscd',
                name: 'Loại TSCD',
                component: LoaiTSCD
            },
            {
                path: 'vthh',
                name: 'Vật tư hàng hóa',
                redirect: 'vthh/vthh',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'vthh',
                        name: 'Vật tư hàng hóa',
                        component: VTHH,
                    },
                    {
                        path: 'kho',
                        name: 'Kho',
                        component: Kho,
                    },
                    {
                        path: 'nhom',
                        name: 'Nhóm VTHH',
                        component: NhomVTHH,
                    },
                    {
                        path: 'don-vi',
                        name: 'Đơn vị tính',
                        component: DonViTinh,
                    },
                ],
            },
            {
                path: 'kmcp',
                name: 'Khoản mục chi phí',
                component: KMCP,
            },
            {
                path: 'ngan-hang',
                name: 'Ngân hàng',
                redirect: 'ngan-hang/ngan-hang',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'ngan-hang',
                        name: 'Ngân hàng',
                        component: NganHang,
                    },
                    {
                        path: 'tk-ngan-hang',
                        name: 'Tài khoản ngân hàng',
                        component: TKNganHang,
                    },
                ],
            },
            {
                path: 'khac',
                name: 'Khác',
                redirect: 'khac/muc-thu-chi',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'muc-thu-chi',
                        name: 'Mục thu chi',
                        component: MucThuChi,
                    },
                    {
                        path: 'loai-tien',
                        name: 'Loại tiền',
                        component: LoaiTien,
                    },
                    {
                        path: 'loai-chung-tu',
                        name: 'Loại chứng từ',
                        component: LoaiChungTu,
                    },
                ],
            },
        ]
    },
]