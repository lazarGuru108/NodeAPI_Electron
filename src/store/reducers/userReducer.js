import * as actionType from '../actions/actionTypes';

const initialState = {
    users: [],
};

const userReducer = (state = initialState, action)=>{
    switch(action.type) {
        case actionType.USER_ALL: 
        {
            return {
                ...state,
                users: action.users || []
            }
        }
        default:
            return state;
    }
};

export default userReducer;