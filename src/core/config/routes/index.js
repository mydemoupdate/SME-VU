// Containers
const TheContainer = () => import('@/core/containers/TheContainer')

import customProtectedRoutes from '@/config/routes/protected';
import customPublicRoutes from '@/config/routes/public';
import publicRoutes from './public'
import protectedRoutes from './protected'

export default [
    {
        path: '/',
        redirect: '/dashboard',
        name: 'Home',
        component: TheContainer,
        meta: {
            authRequired: true
        },
        children: [
            ...protectedRoutes,
            ...customProtectedRoutes
        ]
    },
    ...publicRoutes,
    ...customPublicRoutes
]
