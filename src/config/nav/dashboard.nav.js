import i18n from '@/core/plugins/vue-i18n'

export default [
    {
        _name: 'CSidebarNavItem',
        name: i18n.t('Dashboard'),
        to: '/dashboard',
        icon: 'cil-speedometer',
        badge: {
            color: 'primary',
            text: 'NEW'
        }
    },
]