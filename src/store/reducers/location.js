import {
    UPDATE_LOCATION,
    ADD_NEW_LOCATION,
    DELETE_LOCATION,
    RESET_LOCATION_ERROR,
    SELECT_LOCATION,
    DELETE_LOCATION_BY_CATEGORY,
    UPDATE_LOCATION_ERROR,
    LOADING_LOCATION_MOCK_DATA
} from '../actions/location';
import {Location} from "../../models/location";


const initialState = {
    locationList: [],
    selectedLocation: undefined,
    error: '',
    savedSuccessfully: false,
};

const stateManagement = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_LOCATION: {
            // console.log(`FIRED: ${action.type}`);
            const updatedLocationList = state.locationList.map(location => new Location({doc: location}));

            const { location } = action;
            const prevLocation = new Location({doc: state.selectedLocation});

            const updatedLocation = updatedLocationList.find(loc => loc.id === prevLocation.id);
            if(!updatedLocation){
                return state;
            }

            const isLocationNameTaken = !!updatedLocationList
                .filter(loc => loc.categoryId === location.categoryId)
                .find(loc =>
                    loc.id !== prevLocation.id // is not the same selected location
                    && loc.name === location.name // and his name is not already taken
                );
            if(isLocationNameTaken){
                return {
                    ...state,
                    error: `Location name ${location.name} is already taken`,
                    savedSuccessfully: false,
                }
            }

            updatedLocation.updateFromObj(location);

            return {
                ...state,
                locationList: updatedLocationList,
                selectedLocation: null,
                error: '',
                savedSuccessfully: true,
            };
        }

        case ADD_NEW_LOCATION: {
            // console.log(`FIRED: ${action.type}`);
            const updatedLocationList = state.locationList.slice(0);

            const { location } = action;

            const isLocationExisted = updatedLocationList.find(cat => cat.id === location.id);
            if(isLocationExisted){
                return state;
            }

            const isLocationNameTaken = !!updatedLocationList
                .filter(loc => loc.categoryId === location.categoryId)
                .find(loc => loc.name === location.name ); // the location name is not already taken

            if(isLocationNameTaken){
                return {
                    ...state,
                    error: `Location name ${location.name} is already taken`,
                    savedSuccessfully: false,
                }
            }

            updatedLocationList.push(location);

            return {
                ...state,
                locationList: updatedLocationList,
                selectedLocation: null,
                savedSuccessfully: true,
            }
        }

        case DELETE_LOCATION: {
            // console.log(`FIRED: ${action.type}`);
            const { locationId } = action;
            const locationList = state.locationList.filter(location => location.id !== locationId)
            return {
                ...state,
                locationList,
                selectedLocation: null,
                savedSuccessfully: true,
            }
        }

        case DELETE_LOCATION_BY_CATEGORY: {
            // console.log(`FIRED: ${action.type}`);
            const categoryId = action.categoryId;
            const locationList = state.locationList.filter(location => location.categoryId !== categoryId)

            return {
                ...state,
                locationList,
                savedSuccessfully: true,
            }
        }


        case SELECT_LOCATION:
            // console.log(`FIRED: ${action.type}`);
            return {
                ...state,
                selectedLocation: action.location,
                error: '',
            }

        case RESET_LOCATION_ERROR:
        case UPDATE_LOCATION_ERROR:
            // console.log(`FIRED: ${action.type}`);
            const { error = ''} = action;
            return {
                ...state,
                error,
                savedSuccessfully: false,
            }

        case LOADING_LOCATION_MOCK_DATA:
            // console.log(`FIRED: ${action.type}`);
            return {
                ...state,
                locationList: action.locationList,
                selectedLocation: null,
                error: '',
                savedSuccessfully: false,
            }

         default:
             // console.log(`FIRED DEFAULT LOCATION REDUCER: ${action.type}`);
             return state;
    }
}

export default stateManagement;
