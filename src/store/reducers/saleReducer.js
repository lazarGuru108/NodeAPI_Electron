import * as actionType from '../actions/actionTypes';

const initialState = {
    sales: [],
};

const saleReducer = (state = initialState, action)=>{
    switch(action.type) {
        case actionType.SALE_ALL: 
        {
            return {
                ...state,
                sales: action.sales
            }
        }
        default:
            return state;
    }
};

export default saleReducer;