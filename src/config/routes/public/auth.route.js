// Views - Pages
const Login = () => import('@/core/views/pages/Login')
const Register = () => import('@/core/views/pages/Register')

export default [
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]