import './index.scss';
import React, {useState, useEffect} from 'react';
import * as locationActions from '../../store/actions/location';
import { useDispatch } from 'react-redux';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import LocationOnIcon from '@material-ui/icons/LocationOn';

const LocationItemRender = (props) => {
    const dispatch = useDispatch();
    const { location } = props
    const { selected } = location;

    const [isSelected, setIsSelected] = useState(selected);

    const onSelectHandler = () => {
        dispatch(locationActions.selectLocation(isSelected ? undefined : location));
        setIsSelected(value => !value);
    }

    useEffect(() => { setIsSelected(selected) }, [selected]);

    const isSelectedClass = isSelected ? 'selected' : '';

    return (
        <Card className={ 'location-item-card ' + isSelectedClass} onClick={onSelectHandler}>
            <CardContent className='location-item-card-content flex-row'>
                <div className='flex-row'>
                    <LocationOnIcon className={'location-icon'}/>
                    <div className='flex-col location-details'>
                         <span><span className='location-title'>Name:</span> <span>{location?.name}</span></span>
                         <span><span className='location-title'>Address:</span> <span>{location?.address}</span></span>
                         <span>
                             <span className='location-title'>coordinates:</span>
                             <span>{location?.coordinates?.latitude}</span>,
                             <span>{location?.coordinates?.longitude}</span>
                         </span>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
export default LocationItemRender;