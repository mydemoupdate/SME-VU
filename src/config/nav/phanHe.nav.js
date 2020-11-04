import i18n from '@/core/plugins/vue-i18n'

const MenuQuy = () => import('../../views/PhanHe/Quy/Menu')
const MenuMuaHang = () => import('../../views/PhanHe/MuaHang/Menu')
const MenuBanHang = () => import('../../views/PhanHe/BanHang/Menu')
const MenuNganHang = () => import('../../views/PhanHe/NganHang/Menu')
const MenuKho = () => import('../../views/PhanHe/Kho/Menu')
const MenuBCTC = () => import('../../views/PhanHe/TongHop/BCTC/Menu')

export default [
    {
        _name: 'CSidebarNavTitle',
        _children: [i18n.t('Phân hệ')],
    },
    {
        _name: 'CSidebarNavItem',
        name: i18n.t('Quỹ'),
        to: '/phan-he/quy',
        icon: 'cil-folder',
        menu: MenuQuy
    },
    {
        _name: 'CSidebarNavItem',
        name: i18n.t('Ngân hàng'),
        to: '/phan-he/ngan-hang',
        icon: 'cil-folder',
        menu: MenuNganHang,
    },
    {
        _name: 'CSidebarNavItem',
        name: i18n.t('Mua hàng'),
        to: '/phan-he/mua-hang',
        icon: 'cil-folder',
        menu: MenuMuaHang,
    },
    {
        _name: 'CSidebarNavItem',
        name: i18n.t('Bán hàng'),
        to: '/phan-he/ban-hang',
        icon: 'cil-folder',
        menu: MenuBanHang,
    },
    {
        _name: 'CSidebarNavItem',
        name: i18n.t('Kho'),
        to: '/phan-he/kho',
        icon: 'cil-folder',
        menu: MenuKho,
    },
    {
        _name: 'CSidebarNavDropdown',
        name: i18n.t('Tổng hợp'),
        to: '/phan-he/tong-hop',
        icon: 'cil-folder',
        menu: MenuBCTC,
        items: [
            {
                name: i18n.t('Báo cáo tài chính'),
                to: '/phan-he/tong-hop/bctc',
            },
        ]
    },
]
