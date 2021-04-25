import {
    UPDATE_SEARCH_ITEM_VALUE,
    UPDATE_SELECTED_ACTION
} from '../actions/settings';

const initialState = {
    searchValue: '',
    selectedAction: undefined,
    selectedCrudAction: '',
};

const stateManagement = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_SEARCH_ITEM_VALUE:
            console.log(`FIRED: ${action.type}`);
            return {
                ...state,
                searchValue: action.value,
            }

        case UPDATE_SELECTED_ACTION:
            console.log(`FIRED: ${action.type}`);
            return {
                ...state,
                selectedAction: action.selectedAction,
                selectedCrudAction: action.selectedCrudAction,
            }

        default:
            console.log(`FIRED DEFAULT SETTINGS REDUCER: ${action.type}`);
            return state;
    }
}

export default stateManagement;
