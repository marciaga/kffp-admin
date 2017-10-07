import { API_BASE_URL } from '../constants';
import { postVolunteerForm } from '../../../models/volunteer';

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
    }
];

export default volunteerRoutes;
