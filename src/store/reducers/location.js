import {
    UPDATE_LOCATION,
    ADD_NEW_LOCATION,
    DELETE_LOCATION,
    RESET_LOCATION_ERROR,
    SELECT_LOCATION,
    DELETE_LOCATION_BY_CATEGORY,
    UPDATE_LOCATION_ERROR,
} from '../actions/location';
import {Location} from "../../models/location";
import {RESTORE_FROM_PERSIST_DATA} from "../../utils/consts";

const initialState = {
    locationList: [],
    selectedLocation: undefined,
    error: '',
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

            // todo: check the unique location name per category
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

            updatedLocation.updateFromObj(location);

            return {
                ...state,
                locationList: updatedLocationList,
                selectedLocation: null,
                error: '',
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

            // todo: check the unique location name per category
            const isLocationNameTaken = !!updatedLocationList.find(loc =>
                loc.name === location.name // the location name is not already taken
            );

            if(isLocationNameTaken){
                return {
                    ...state,
                    error: `Location name ${location.name} is already taken`,
                }
            }

            updatedLocationList.push(location);

            return {
                ...state,
                locationList: updatedLocationList,
                selectedLocation: null,
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
            }
        }

        case DELETE_LOCATION_BY_CATEGORY: {
            // console.log(`FIRED: ${action.type}`);
            const categoryId = action.categoryId;
            const locationList = state.locationList.filter(location => location.categoryId !== categoryId)

            return {
                ...state,
                locationList
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
            }

        case RESTORE_FROM_PERSIST_DATA:
            let { locationList } = state;
            if(!locationList.length){
                return state;
            }

            locationList = locationList.map(location => {
                if(!(location instanceof Location)){
                    return new Location({doc: location})
                }
                return location;
            })

            return {
                ...state,
                locationList,
                selectedLocation: null,
            };

         default:
             console.log(`FIRED DEFAULT LOCATION REDUCER: ${action.type}`);
             return state;
    }
}

export default stateManagement;
