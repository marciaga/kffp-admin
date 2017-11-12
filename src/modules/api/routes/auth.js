import Joi from 'joi';
import { API_BASE_URL } from '../constants';
import { verifyToken } from '../../../models/user';
import { handlePasswordReset, resetPassword } from '../../../models/auth';

const authRoutes = [
    {
        path: `${API_BASE_URL}/auth/forgot-password`,
        method: 'POST',
        config: {
            handler: handlePasswordReset,
            auth: {
                mode: 'optional'
            }
        }
    },
    {
        path: `${API_BASE_URL}/auth/reset-password`,
        method: 'POST',
        config: {
            auth: false,
            pre: [
                { method: verifyToken, assign: 'data' }
            ],
            handler: resetPassword,
            auth: {
                strategy: 'jwt',
            }
        }
    }
];

export default authRoutes;
