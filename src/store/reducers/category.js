import {
    ADD_NEW_CATEGORY,
    DELETE_CATEGORY,
    RESET_CATEGORY_ERROR,
    SELECT_CATEGORY,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_ERROR,
} from '../actions/category';

const initialState = {
    categoryList: [],
    selectedCategory: undefined,
};

const stateManagement = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY:
        {
            const updatedCategoryList = state.categoryList.slice(0);

            const { category } = action;
            const prevCategory = state.selectedCategory;

            const updatedCategory = updatedCategoryList.find(cat => cat.id === prevCategory.id);
            if(!updatedCategory){
                return state;
            }

            const isCategoryNameTaken = !!updatedCategoryList.find(cat =>
                cat.id !== prevCategory.id // is not the same selected category
                && cat.name === category.name // and his name is not already taken
            );
            if(isCategoryNameTaken){
                return {
                    ...state,
                    error: `Category name ${category.name} is already taken`,
                }
            }

            updatedCategory.updateCategory(category);

            return {
                ...state,
                categoryList: updatedCategoryList,
                selectedCategory: updatedCategory,
            };
        }

        case ADD_NEW_CATEGORY:
            const updatedCategoryList = state.categoryList.slice(0);

            const { category } = action;

            const isCategoryExisted = updatedCategoryList.find(cat => cat.id === category.id);
            if(isCategoryExisted){
                return state;
            }

            const isCategoryNameTaken = !!updatedCategoryList.find(loc =>
                loc.name === category.name // the category name is not already taken
            );
            if(isCategoryNameTaken){
                return {
                    ...state,
                    error: `Category name ${category.name} is already taken`,
                }
            }

            return {
                ...state,
                categoryList: [
                    ...state.categoryList,
                    category
                ],
            }

        case DELETE_CATEGORY: {
            const { categoryId } = action;
            const categoryList = state.categoryList.filter(category => category.id !== categoryId)
            return {
                ...state,
                categoryList
            }
        }


        case SELECT_CATEGORY:
            return {
                ...state,
                selectedCategory: action.category,
            }


        case RESET_CATEGORY_ERROR:
        case UPDATE_CATEGORY_ERROR:
            const { error = ''} = action;
            return {
                ...state,
                error,
            }

        default:
            return state;
    }
}

export default stateManagement;
