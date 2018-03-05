import {FETCHING_CATEGORIES,FETCHING_CATEGORIES_SUCCESS,FETCHING_CATEGORIES_FAILURE} from '../ActionsTypes/CategoriesActionsTypes';
const initialState = {
    categories:[],
    isFetching:false,
    error:false,
};

export default CategoriesReducer = (state = initialState,action)=>{
    switch (action.type){
        case FETCHING_CATEGORIES:
            return {
                ...state,
                isFetching:true,
                categories:[]
            }

        case FETCHING_CATEGORIES_SUCCESS:
            return {
                ...state,
                isFetching:false,
                categories:action.data
            }
        case FETCHING_CATEGORIES_FAILURE:
            return{
                ...state,
                isFetching:false,
                error:true,
            }
        default:
            return state
    }
}