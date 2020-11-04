import { AuthService } from '@/core/services/api.service';

export const SERVICE = AuthService;

export default {
    getAccessToken(payload) {
        return SERVICE.post('oauth/token', payload)
    },
    refreshAccessToken(payload) {
        return SERVICE.post('oauth/token', payload)
    },
    register(payload) {
        return SERVICE.post('api/register', payload)
    },
    resendMailVerification(payload) {
        return SERVICE.post('api/email/resend', payload)
    },
    verifyEmail({ username, token, expires, signature }) {
        return SERVICE.query(`api/email/verify/${username}/${token}`, { expires, signature })
    },
    sendMailResetPassword(payload) {
        return SERVICE.post('api/password/email', payload)
    },
    resetPassword(payload) {
        return SERVICE.post('api/password/reset', payload)
    },
}
