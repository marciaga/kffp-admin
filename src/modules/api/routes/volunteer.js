import Joi from 'joi';
import { API_BASE_URL } from '../constants';
import { getVolunteerReport, postVolunteerForm } from '../../../models/volunteer';

const volunteerRoutes = [
    {
        path: `${API_BASE_URL}/volunteer/hours`,
        method: 'POST',
        config: {
            auth: {
                strategy: 'jwt'
            },
            handler: postVolunteerForm
        }
    },
    {
        path: `${API_BASE_URL}/volunteer/report`,
        method: 'GET',
        config: {
            auth: {
                strategy: 'jwt'
            },
            handler: getVolunteerReport,
            validate: {
                query: {
                    startDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
                    endDate: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/),
                    userId: Joi.string(),
                    type: Joi.string()
                }
            }
        }
    }
];

export default volunteerRoutes;
