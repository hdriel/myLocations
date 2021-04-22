import './index.scss';
import React from 'react';
import { useSelector } from 'react-redux';

const Locations = props => {
  const { locationList } = useSelector(state => ({
    locationList: state.location?.locationList ?? [],
  }));

  return (
    <div> {JSON.stringify(locationList)} </div>
  );
};

export default Locations;
