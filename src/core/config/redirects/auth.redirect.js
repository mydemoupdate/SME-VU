import router from '@/core/router'

export default {
    // to({path}){
    //     window.location.href = process.env.VUE_APP_AUTH_BASE_URL + path
    // },
    to(params) {
        router.push(params).catch(() => { })
    },
    toLogin() {
        this.to({ path: '/login' });
    },
    toEmailUnverified() {
        this.to({ path: '/email-unverified' });
    }
}