import Joi from 'joi';
import { API_BASE_URL } from '../constants';
import { handlePasswordReset } from '../../../models/auth';

const authRoutes = [
    {
        path: `${API_BASE_URL}/auth/forgot-password`,
        method: 'POST',
        config: {
            auth: {
                // strategy: 'jwt',
                // scope: ['admin']
            },
            handler: handlePasswordReset
        }
    }
];

export default authRoutes;
