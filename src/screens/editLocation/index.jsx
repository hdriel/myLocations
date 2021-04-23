import './index.scss';
import React, {useEffect} from 'react';
import { useSelector } from 'react-redux';
import {useHistory} from "react-router-dom";
import {CATEGORIES} from "../index";

const EditLocation = props => {
  const history = useHistory();

  const { locationList, selectedCategory } = useSelector(state => ({
    locationList: state.location?.locationList ?? [],
    selectedCategory: state.category?.selectedCategory,
  }));

  useEffect(() => {
    if(!selectedCategory){
      history.push(CATEGORIES);
    }
  }, [])

  return (
    <div>Edit</div>
  );
};

export default EditLocation;
