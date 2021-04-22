import {
    UPDATE_SEARCH_ITEM_VALUE,
    UPDATE_SELECTED_ACTION
} from '../actions/settings';

const initialState = {
    title: 'Category List',
    searchValue: '',
    selectedAction: undefined,
    selectedSection: 'CATEGORY',
    selectedCrudAction: '',
};

const stateManagement = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_ITEM_VALUE:
            return {
                ...state,
                searchValue: action.value,
            }

        case UPDATE_SELECTED_ACTION:
            return {
                ...state,
                selectedAction: action.selectedAction,
                selectedCrudAction: action.selectedCrudAction,
            }

        default:
            return state;
    }
}

export default stateManagement;
