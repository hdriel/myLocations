import { DELETE_LOCATION_BY_CATEGORY } from './location'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const ADD_NEW_CATEGORY = 'ADD_NEW_CATEGORY';
export const DELETE_CATEGORY = 'DELETE_CATEGORY';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const RESET_CATEGORY_ERROR = 'RESET_CATEGORY_ERROR';
export const UPDATE_CATEGORY_ERROR = 'UPDATE_CATEGORY_ERROR';
export const LOADING_CATEGORY_MOCK_DATA = 'LOADING_CATEGORY_MOCK_DATA';

export const createCategory = category => ({type: ADD_NEW_CATEGORY, category});

export const selectCategory = category => ({type: SELECT_CATEGORY, category});

export const updateCategory = category => ({type: UPDATE_CATEGORY, category});

export const deleteCategory = categoryId => {
    return (dispatch) => {
        dispatch({type: DELETE_LOCATION_BY_CATEGORY, categoryId});
        dispatch({type: DELETE_CATEGORY, categoryId});
    };
}

export const resetError = () => ({type: RESET_CATEGORY_ERROR});

export const updateError = error => ({type: UPDATE_CATEGORY_ERROR, error});

export const loadingMockData = categoryList => ({type: LOADING_CATEGORY_MOCK_DATA, categoryList});
