import {
    ADD_NEW_CATEGORY,
    DELETE_CATEGORY,
    RESET_CATEGORY_ERROR,
    SELECT_CATEGORY,
    UPDATE_CATEGORY,
    UPDATE_CATEGORY_ERROR,
    LOADING_CATEGORY_MOCK_DATA
} from '../actions/category';
import {Category} from "../../models/category";
import {RESTORE_FROM_PERSIST_DATA} from "../../utils/consts";

const initialState = {
    categoryList: [],
    selectedCategory: null,
    error: '',
    savedSuccessfully: false,
};

const stateManagement = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CATEGORY: {
            // console.log(`FIRED: ${action.type}`);
            const updatedCategoryList = state.categoryList.map(category => new Category({doc: category}));

            const { category } = action;
            const prevCategory = new Category({doc: state.selectedCategory});

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
                    savedSuccessfully: false,
                }
            }

            updatedCategory.updateFromObj(category);

            return {
                ...state,
                categoryList: updatedCategoryList,
                selectedCategory: null,
                error: '',
                savedSuccessfully: true,
            };
        }

        case ADD_NEW_CATEGORY:
            // console.log(`FIRED: ${action.type}`);
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
                    savedSuccessfully: false,
                }
            }

            updatedCategoryList.push(category);

            return {
                ...state,
                categoryList: updatedCategoryList,
                selectedCategory: null,
                error: '',
                savedSuccessfully: true,
            }

        case DELETE_CATEGORY: {
            // console.log(`FIRED: ${action.type}`);
            const { categoryId } = action;
            const categoryList = state.categoryList.filter(category => category.id !== categoryId)
            return {
                ...state,
                categoryList,
                selectedCategory: null,
                savedSuccessfully: true,
            }
        }

        case SELECT_CATEGORY:
            // console.log(`FIRED: ${action.type}`);
            return {
                ...state,
                selectedCategory: action.category || null,
                error: '',
            }

        case RESET_CATEGORY_ERROR:
        case UPDATE_CATEGORY_ERROR:
            // console.log(`FIRED: ${action.type}`);
            const { error = '' } = action;
            return {
                ...state,
                error,
                savedSuccessfully: false,
            }

        case RESTORE_FROM_PERSIST_DATA:
            let { categoryList } = state;
            if(!categoryList.length){
                return state;
            }

            categoryList = categoryList.map(category => {
                if(!(category instanceof Category)){
                    return new Category({doc: category})
                }
                return category;
            })

            return {
                ...state,
                categoryList,
                selectedCategory: null,
                savedSuccessfully: false,
            };

        case LOADING_CATEGORY_MOCK_DATA:
            // console.log(`FIRED: ${action.type}`);
            return {
                ...state,
                categoryList: action.categoryList,
                selectedCategory: null,
                error: '',
                savedSuccessfully: false,
            }

        default:
            // console.log(`FIRED DEFAULT CATEGORY REDUCER: ${action.type}`);
            return state;
    }
}

export default stateManagement;
