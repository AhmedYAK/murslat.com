import conf from '../../configuration/config';
import {FETCHING_CATEGORIES,FETCHING_CATEGORIES_SUCCESS,FETCHING_CATEGORIES_FAILURE} from '../ActionsTypes/CategoriesActionsTypes';

export const fetchCategories = ()=>{
    return (dispatch)=>{
        dispatch(getCategories())
        fetch(conf.Magento.url,{
            method: 'get',
            headers: {
                'Authorization': 'OAuth oauth_consumer_key="",oauth_consumer_secret="",oauth_token="",oauth_token_secret=""'
                //'Content-Type': 'application/x-www-form-urlencoded'
            },
        })
    }
};
//https://api.twitter.com/1.1/users/show.json?screen_name=[HERE]&oauth_consumer_key=[HERE]&oauth_consumer_secret=[HERE]&oauth_token=[HERE]&oauth_token_secret=[HERE]
const getCategories = ()=>{
    return {
        type:FETCHING_CATEGORIES
    }
};

const getCategoriesSuccess = (data)=>{
    return {
        type:FETCHING_CATEGORIES_SUCCESS,
        data
    }
};

const getCategoriesFailure = ()=>{
    return {
        type:FETCHING_CATEGORIES_FAILURE,
    }
}