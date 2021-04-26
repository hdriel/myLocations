export const UPDATE_SELECTED_ACTION = 'UPDATE_SELECTED_ACTION';
export const UPDATE_SEARCH_ITEM_VALUE = 'UPDATE_SEARCH_ITEM_VALUE';

export const updateSearchItemValue = (value) => ({type: UPDATE_SEARCH_ITEM_VALUE, value})

export const updateSelectionAction = ({selectedCrudAction, selectedAction}) => ({
    type: UPDATE_SELECTED_ACTION,
    selectedCrudAction,
    selectedAction
});