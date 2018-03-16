import { API_BASE_URL } from '../constants';
import {
    getProducts,
    createProduct,
    updateProduct
} from '../../../models/products';

const productRoutes = [
    {
        path: `${API_BASE_URL}/products`,
        method: 'GET',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin', 'dj', 'reports'],
                mode: 'optional'
            },
            handler: getProducts
        }
    },
    {
        path: `${API_BASE_URL}/products`,
        method: 'POST',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin'],
            },
            handler: createProduct
        }
    },
    {
        path: `${API_BASE_URL}/products`,
        method: 'PUT',
        config: {
            auth: {
                strategy: 'jwt',
                scope: ['admin']
            },
            handler: updateProduct
        }
    },
];

export default productRoutes;
