export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const ADD_NEW_LOCATION = 'ADD_NEW_LOCATION';
export const DELETE_LOCATION = 'DELETE_LOCATION';
export const DELETE_LOCATION_BY_CATEGORY = 'DELETE_LOCATION_BY_CATEGORY';
export const SELECT_LOCATION = 'SELECT_LOCATION';
export const RESET_LOCATION_ERROR = 'RESET_LOCATION_ERROR';
export const UPDATE_LOCATION_ERROR = 'UPDATE_LOCATION_ERROR';
export const LOADING_LOCATION_MOCK_DATA = 'LOADING_LOCATION_MOCK_DATA';

export const createLocation = location => ({type: ADD_NEW_LOCATION, location});

export const selectLocation = location => ({type: SELECT_LOCATION, location});

export const updateLocation = location => ({type: UPDATE_LOCATION, location});

export const deleteLocation = locationId => ({type: DELETE_LOCATION, locationId});

export const resetError = locationId => ({type: RESET_LOCATION_ERROR, locationId});

export const loadingMockData = locationList => ({type: LOADING_LOCATION_MOCK_DATA, locationList});
