import { GET_USERS } from '../constants';

const initialState = {
    userList: []
};

export default function usersReducer (state = initialState, action) {
    switch (action.type) {
    case GET_USERS:
        const userList = action.data;

        return Object.assign({}, state, {
            userList: userList
        });
    default:
        return state;
    }
}
