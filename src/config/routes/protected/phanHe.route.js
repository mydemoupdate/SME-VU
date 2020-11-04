// Quỹ
const PhieuThu = () => import('@/views/PhanHe/Quy/PhieuThu/Index')
const PhieuChi = () => import('@/views/PhanHe/Quy/PhieuChi/Index')

// Mua hàng
const MuaHang = () => import('@/views/PhanHe/MuaHang/MuaHang/Index')
const GiamGiaHangMua = () => import('@/views/PhanHe/MuaHang/GiamGiaHangMua/Index')
const TraLaiHangMua = () => import('@/views/PhanHe/MuaHang/TraLaiHangMua/Index')

// Bán hàng
const BanHang = () => import('@/views/PhanHe/BanHang/BanHang/Index')
const GiamGiaHangBan = () => import('@/views/PhanHe/BanHang/GiamGiaHangBan/Index')
const TraLaiHangBan = () => import('@/views/PhanHe/BanHang/TraLaiHangBan/Index')

// Ngân hàng
const ThuTienGui = () => import('@/views/PhanHe/NganHang/ThuTienGui/Index')
const ChiTienGui = () => import('@/views/PhanHe/NganHang/ChiTienGui/Index')

// Kho
const NhapKho = () => import('@/views/PhanHe/Kho/NhapKho/Index')
const XuatKho = () => import('@/views/PhanHe/Kho/XuatKho/Index')
const ChuyenKho = () => import('@/views/PhanHe/Kho/ChuyenKho/Index')

// BCTC
const BangCDKT = () => import('@/views/PhanHe/TongHop/BCTC/BangCDKT/Index')


export default [
    {
        path: 'phan-he',
        meta: {
            label: 'Phân hệ'
        },
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            {
                path: 'quy',
                name: 'Quỹ',
                redirect: 'quy/phieu-thu',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'phieu-thu',
                        name: 'Phiếu thu',
                        component: PhieuThu,
                    },
                    {
                        path: 'phieu-chi',
                        name: 'Phiếu chi',
                        component: PhieuChi,
                    },
                ],
            },
            {
                path: 'ngan-hang',
                name: 'Ngân hàng',
                redirect: 'ngan-hang/thu-tien-gui',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'thu-tien-gui',
                        name: 'Thu tiền gửi',
                        component: ThuTienGui,
                    },
                    {
                        path: 'chi-tien-gui',
                        name: 'Chi tiền gửi',
                        component: ChiTienGui,
                    },
                ],
            },
            {
                path: 'mua-hang',
                name: 'Mua hàng',
                redirect: 'mua-hang/ct-mua-hang',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'ct-mua-hang',
                        name: 'Chứng từ mua hàng',
                        component: MuaHang,
                    },
                    {
                        path: 'giam-gia-hang-mua',
                        name: 'Giảm giá hàng mua',
                        component: GiamGiaHangMua,
                    },
                    {
                        path: 'tra-lai-hang-mua',
                        name: 'Trả lại hàng mua',
                        component: TraLaiHangMua,
                    },
                ],
            },
            {
                path: 'ban-hang',
                name: 'Bán hàng',
                redirect: 'ban-hang/ct-ban-hang',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'ct-ban-hang',
                        name: 'Chứng từ bán hàng',
                        component: BanHang,
                    },
                    {
                        path: 'giam-gia-hang-ban',
                        name: 'Giảm giá hàng bán',
                        component: GiamGiaHangBan,
                    },
                    {
                        path: 'tra-lai-hang-ban',
                        name: 'Trả lại hàng bán',
                        component: TraLaiHangBan,
                    },
                ],
            },
            {
                path: 'kho',
                name: 'Kho',
                redirect: 'kho/ct-nhap-kho',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'ct-nhap-kho',
                        name: 'Chứng từ nhập kho',
                        component: NhapKho,
                    },
                    {
                        path: 'ct-xuat-kho',
                        name: 'Chứng từ xuất kho',
                        component: XuatKho,
                    },
                    {
                        path: 'ct-chuyen-kho',
                        name: 'Chứng từ chuyển kho',
                        component: ChuyenKho,
                    },
                ],
            },
            {
                path: 'thu-kho',
                name: 'Thủ kho',
            },
            {
                path: 'tong-hop/bctc',
                name: 'Báo cáo tài chính',
                redirect: 'tong-hop/bctc/bang-cdkt',
                component: {
                    render(c) { return c('router-view') }
                },
                children: [
                    {
                        path: 'bang-cdkt',
                        name: 'Bảng cân đối kế toán',
                        component: BangCDKT,
                    },
                ],
            },
        ],
    },
]