import './index.scss';
import React , {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";
import {CATEGORIES} from "../index";
import LocationList from "../../components/locationList";

const Locations = props => {
  const history = useHistory();

  const { selectedCategory } = useSelector(state => ({
    selectedCategory: state.category?.selectedCategory,
  }));

  useEffect(() => {
    if(!selectedCategory){
      history.replace(CATEGORIES);
    }
  }, [selectedCategory, history])

  return (
      <div className='vertical-center'>
        <div className='location-table-container'>
          <LocationList/>
        </div>
      </div>
  );
};

export default Locations;
