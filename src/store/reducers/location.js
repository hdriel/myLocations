import {
    UPDATE_LOCATION,
    ADD_NEW_LOCATION,
    DELETE_LOCATION,
    RESET_LOCATION_ERROR,
    SELECT_LOCATION,
    DELETE_LOCATION_BY_CATEGORY,
    UPDATE_LOCATION_ERROR,
} from '../actions/location';

const initialState = {
    locationList: [],
    selectedLocation: undefined,
    error: '',
};

const stateManagement = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOCATION:
        {
            const updatedLocationList = state.locationList.slice(0);

            const { location } = action;
            const prevLocation = state.selectedLocation;

            const updatedLocation = updatedLocationList.find(loc => loc.id === prevLocation.id);
            if(!updatedLocation){
                return state;
            }

            const isLocationNameTaken = !!updatedLocationList.find(loc =>
                loc.id !== prevLocation.id // is not the same selected location
                && loc.name === location.name // and his name is not already taken
            );
            if(isLocationNameTaken){
                return {
                    ...state,
                    error: `Location name ${location.name} is already taken`,
                }
            }

            updatedLocation.updateLocation(location);

            return {
                ...state,
                locationList: updatedLocationList,
                selectedLocation: updatedLocation,
            };
        }

        case ADD_NEW_LOCATION:
            const updatedLocationList = state.locationList.slice(0);

            const { location } = action;

            const isLocationExisted = updatedLocationList.find(loc => loc.id === location.id);
            if(isLocationExisted){
                return state;
            }

            const isLocationNameTaken = !!updatedLocationList.find(loc =>
               loc.name === location.name // the location name is not already taken
            );
            if(isLocationNameTaken){
                return {
                    ...state,
                    error: `Location name ${location.name} is already taken`,
                }
            }

            return {
                ...state,
                locationList: [
                    ...state.locationList,
                    location
                ],
            }

        case DELETE_LOCATION: {
            const { locationId } = action;
            const locationList = state.locationList.filter(location => location.id !== locationId)
            return {
                ...state,
                locationList
            }
        }

        case DELETE_LOCATION_BY_CATEGORY: {
            const categoryId = action.categoryId;
            const locationList = state.locationList.filter(location => location.category !== categoryId)

            return {
                ...state,
                locationList
            }
        }


        case SELECT_LOCATION:
            return {
                ...state,
                selectedLocation: action.location,
            }

        case RESET_LOCATION_ERROR:
        case UPDATE_LOCATION_ERROR:
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
