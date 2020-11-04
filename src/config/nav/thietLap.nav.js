import i18n from '@/core/plugins/vue-i18n'

const MenuHTTK = () => import('@/views/DanhMuc/HTTK/Menu')
const MenuCCTC = () => import('@/views/DanhMuc/CCTC/Menu')
const MenuDoiTuong = () => import('@/views/DanhMuc/DoiTuong/Menu')
const MenuLoaiCCDC = () => import('@/views/DanhMuc/LoaiCCDC/Menu')
const MenuLoaiTSCD = () => import('@/views/DanhMuc/LoaiTSCD/Menu')
const MenuVTHH = () => import('@/views/DanhMuc/VTHH/Menu')
const MenuNganHang = () => import('@/views/DanhMuc/NganHang/Menu')
const MenuKMCP = () => import('@/views/DanhMuc/KMCP/Menu')
const MenuKhac = () => import('@/views/DanhMuc/Khac/Menu')

export default [
    {
        _name: 'CSidebarNavTitle',
        _children: [i18n.t('Thiết lập')],
    },
    {
        _name: 'CSidebarNavDropdown',
        name: i18n.t('Danh mục'),
        to: '/danh-muc',
        icon: 'cil-folder',
        items: [
            {
                name: 'HTTK',
                to: '/danh-muc/httk',
                menu: MenuHTTK,
            },
            {
                name: i18n.t('Cơ cấu tổ chức'),
                to: '/danh-muc/cctc',
                menu: MenuCCTC,
            },
            {
                name: i18n.t('Đối tượng'),
                to: '/danh-muc/doi-tuong',
                menu: MenuDoiTuong,
            },
            {
                name: i18n.t('Loại CCDC'),
                to: '/danh-muc/loai-ccdc',
                menu: MenuLoaiCCDC,
            },
            {
                name: i18n.t('Loại TSCD'),
                to: '/danh-muc/loai-tscd',
                menu: MenuLoaiTSCD,
            },
            {
                name: i18n.t('Vật tư hàng hóa'),
                to: '/danh-muc/vthh',
                menu: MenuVTHH,
            },
            {
                name: i18n.t('Khoản mục chi phí'),
                to: '/danh-muc/kmcp',
                menu: MenuKMCP,
            },
            {
                name: i18n.t('Ngân hàng'),
                to: '/danh-muc/ngan-hang',
                menu: MenuNganHang,
            },
            {
                name: i18n.t('Khác'),
                to: '/danh-muc/khac',
                menu: MenuKhac,
            },
        ],
    },
]