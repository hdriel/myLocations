import './index.scss';
import React  from 'react';
import {useSelector} from 'react-redux';
import {Location} from "../../models/location";
import LocationItemRender from "../locationItemRender";


const LocationList = (props) => {
    const { locationList, categoryList, selectedCategory, selectedLocation, searchValue } = useSelector(state => ({
        locationList: state.location?.locationList ?? [],
        categoryList: state.category?.categoryList ?? [],
        selectedLocation: state.location?.selectedLocation ?? null,
        selectedCategory: state.category?.selectedCategory ?? null,
        searchValue: state.settings?.searchValue ?? '',
    }));
    const selectedLocationId = selectedLocation?.id;

    const locationItemsList = locationList
        .filter(location => location.categoryId === selectedCategory?.id)
        .map(location => {
            if(!(location instanceof Location)){
                location = new Location({doc: location});
            }

            location.selected = location.id === selectedLocationId
            location.category = categoryList.find(category => category.id === location.categoryId)?.name;

            return location;
        })
        .filter(location => !searchValue || location.name.includes(searchValue))

    const categoryName = selectedCategory?.name ?? '';
    if(!locationItemsList.length){
        return searchValue
            ? <p>{categoryName} location list data not found for '{searchValue}' searching result</p>
            : <p>No Location data exists for category '{categoryName}' let's add some..</p>
    }

    return (
        <div className='horizontal-center flex-col'>
            <div className='horizontal-center flex-col location-list-container'>
            {
                locationItemsList.map((location, k) =>
                    <LocationItemRender key={k} location={location} />
                )
            }
            </div>
        </div>
    );
}
export default LocationList;
