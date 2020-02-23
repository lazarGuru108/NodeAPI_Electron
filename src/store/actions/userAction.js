import * as actionTypes from './actionTypes';
import { SERVER_URL } from '../../global/config';


export const getAllUsers = () => {
    return dispatch => {
        return fetch(SERVER_URL + '/api/users')
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('allUserInfo', JSON.stringify(res.users));
                dispatch({ type: actionTypes.USER_ALL, users: res.users });
                return res;
            })
    }
}