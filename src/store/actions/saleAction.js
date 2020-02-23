import * as actionTypes from './actionTypes.js';
import { SERVER_URL } from '../../global/config.js';

export const getAllSales = () => {
    return dispatch => {
        return fetch(SERVER_URL + '/api/sales')
            .then(res => res.json())
            .then(res => {
                localStorage.setItem('allSaleInfo', JSON.stringify(res.sales));
                dispatch({ type: actionTypes.SALE_ALL, sales: res.sales });
                return res;
            })
    }
}