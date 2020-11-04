// Views
const Dashboard = () => import('@/core/views/Dashboard')

const Colors = () => import('@/core/views/theme/Colors')
const Typography = () => import('@/core/views/theme/Typography')

const Charts = () => import('@/core/views/charts/Charts')
const Widgets = () => import('@/core/views/widgets/Widgets')

// Views - Components
const Cards = () => import('@/core/views/base/Cards')
const Forms = () => import('@/core/views/base/Forms')
const Switches = () => import('@/core/views/base/Switches')
const Tables = () => import('@/core/views/base/Tables')
const Tabs = () => import('@/core/views/base/Tabs')
const Breadcrumbs = () => import('@/core/views/base/Breadcrumbs')
const Carousels = () => import('@/core/views/base/Carousels')
const Collapses = () => import('@/core/views/base/Collapses')
const Jumbotrons = () => import('@/core/views/base/Jumbotrons')
const ListGroups = () => import('@/core/views/base/ListGroups')
const Navs = () => import('@/core/views/base/Navs')
const Navbars = () => import('@/core/views/base/Navbars')
const Paginations = () => import('@/core/views/base/Paginations')
const Popovers = () => import('@/core/views/base/Popovers')
const ProgressBars = () => import('@/core/views/base/ProgressBars')
const Tooltips = () => import('@/core/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/core/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/core/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/core/views/buttons/Dropdowns')
const BrandButtons = () => import('@/core/views/buttons/BrandButtons')

// Views - Icons
const CoreUIIcons = () => import('@/core/views/icons/CoreUIIcons')
const Brands = () => import('@/core/views/icons/Brands')
const Flags = () => import('@/core/views/icons/Flags')

// Views - Notifications
const Alerts = () => import('@/core/views/notifications/Alerts')
const Badges = () => import('@/core/views/notifications/Badges')
const Modals = () => import('@/core/views/notifications/Modals')

export default [
    {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard'
        }
    },
    {
        path: 'theme',
        redirect: '/theme/colors',
        name: 'Theme',
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            {
                path: 'colors',
                name: 'Colors',
                component: Colors
            },
            {
                path: 'typography',
                name: 'Typography',
                component: Typography
            }
        ]
    },
    {
        path: 'charts',
        name: 'Charts',
        component: Charts
    },
    {
        path: 'widgets',
        name: 'Widgets',
        component: Widgets
    },
    {
        path: 'base',
        redirect: '/base/cards',
        name: 'Base',
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            {
                path: 'cards',
                name: 'Cards',
                component: Cards
            },
            {
                path: 'forms',
                name: 'Forms',
                component: Forms
            },
            {
                path: 'switches',
                name: 'Switches',
                component: Switches
            },
            {
                path: 'tables',
                name: 'Tables',
                component: Tables
            },
            {
                path: 'tabs',
                name: 'Tabs',
                component: Tabs
            },
            {
                path: 'breadcrumbs',
                name: 'Breadcrumbs',
                component: Breadcrumbs
            },
            {
                path: 'carousels',
                name: 'Carousels',
                component: Carousels
            },
            {
                path: 'collapses',
                name: 'Collapses',
                component: Collapses
            },
            {
                path: 'jumbotrons',
                name: 'Jumbotrons',
                component: Jumbotrons
            },
            {
                path: 'list-groups',
                name: 'List Groups',
                component: ListGroups
            },
            {
                path: 'navs',
                name: 'Navs',
                component: Navs
            },
            {
                path: 'navbars',
                name: 'Navbars',
                component: Navbars
            },
            {
                path: 'paginations',
                name: 'Paginations',
                component: Paginations
            },
            {
                path: 'popovers',
                name: 'Popovers',
                component: Popovers
            },
            {
                path: 'progress-bars',
                name: 'Progress Bars',
                component: ProgressBars
            },
            {
                path: 'tooltips',
                name: 'Tooltips',
                component: Tooltips
            }
        ]
    },
    {
        path: 'buttons',
        redirect: '/buttons/standard-buttons',
        name: 'Buttons',
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            {
                path: 'standard-buttons',
                name: 'Standard Buttons',
                component: StandardButtons
            },
            {
                path: 'button-groups',
                name: 'Button Groups',
                component: ButtonGroups
            },
            {
                path: 'dropdowns',
                name: 'Dropdowns',
                component: Dropdowns
            },
            {
                path: 'brand-buttons',
                name: 'Brand Buttons',
                component: BrandButtons
            }
        ]
    },
    {
        path: 'icons',
        redirect: '/icons/coreui-icons',
        name: 'CoreUI Icons',
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            {
                path: 'coreui-icons',
                name: 'Icons library',
                component: CoreUIIcons
            },
            {
                path: 'brands',
                name: 'Brands',
                component: Brands
            },
            {
                path: 'flags',
                name: 'Flags',
                component: Flags
            }
        ]
    },
    {
        path: 'notifications',
        redirect: '/notifications/alerts',
        name: 'Notifications',
        component: {
            render(c) { return c('router-view') }
        },
        children: [
            {
                path: 'alerts',
                name: 'Alerts',
                component: Alerts
            },
            {
                path: 'badges',
                name: 'Badges',
                component: Badges
            },
            {
                path: 'modals',
                name: 'Modals',
                component: Modals
            }
        ]
    },
]
