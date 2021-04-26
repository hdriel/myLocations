import './index.scss';
import React , {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from "react-router-dom";
import {CATEGORIES} from "../index";
import LocationList from "../../components/locationList";
import * as locationActions from "../../store/actions/location";

const Locations = props => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { selectedCategory } = useSelector(state => ({
    selectedCategory: state.category?.selectedCategory,
  }));

  useEffect(() => {
    if(!selectedCategory){
      history.replace(CATEGORIES);
    }
  }, [selectedCategory, history])

  useEffect(() => {
      dispatch(locationActions.resetError());
  }, [dispatch]);

  return (
      <div className='vertical-center'>
        <div className='location-table-container'>
          <LocationList/>
        </div>
      </div>
  );
};

export default Locations;
