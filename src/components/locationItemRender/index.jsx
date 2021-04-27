import './index.scss';
import React, {useState, useEffect} from 'react';
import * as locationActions from '../../store/actions/location';
import { useDispatch } from 'react-redux';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from '@material-ui/core/Tooltip';

const LocationItemRender = (props) => {
    const dispatch = useDispatch();
    const { location } = props
    const { selected } = location;

    const [isSelected, setIsSelected] = useState(selected);

    const onSelectHandler = () => {
        dispatch(locationActions.selectLocation(isSelected ? undefined : location));
        setIsSelected(value => !value);
    }

    const onLocationIconClickHandler = (zoom = 18) => {
        const { coordinates: {latitude: lat, longitude: lon} } = location;
        const url = `https://maps.google.com/?q=${+lat},${+lon}&ll=${+lat},${+lon}&z=${zoom}`
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null;
    }

    useEffect(() => { setIsSelected(selected) }, [selected]);

    const isSelectedClass = isSelected ? 'selected' : '';

    return (
        <Card className={ 'location-item-card ' + isSelectedClass} onClick={onSelectHandler}>
            <CardContent className='location-item-card-content flex-row'>
                <div className='flex-row w-100'>
                    <Checkbox
                        className='location-checkbox'
                        checked={isSelected}
                        onChange={onSelectHandler}
                        inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                    <div className='flex-col location-details'>
                         <span className='location-title-container category'>
                             <span className='location-title'>Category:</span> <span>{location?.category}</span>
                         </span>
                         <span className='location-title-container'>
                             <span className='location-title'>Name:</span> <span>{location?.name}</span>
                         </span>
                         <span className='location-title-container'>
                             <span className='location-title'>Address:</span> <span>{location?.address}</span>
                         </span>
                         <span className='location-title-container'>
                             <span className='location-title'>coordinates:</span>
                             <span>{location?.coordinates?.latitude}</span>,
                             <span>{location?.coordinates?.longitude}</span>
                         </span>
                    </div>

                    <Tooltip
                        title="open location on google map site"
                        placement="bottom"
                        className={'location-icon'}
                    >
                        <LocationOnIcon onClick={onLocationIconClickHandler} fontSize="large"/>
                    </Tooltip>
                </div>
            </CardContent>
        </Card>
    )
}
export default LocationItemRender;
