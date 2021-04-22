import './index.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import CategoryForm from "../../components/categoryForm";

const EditCategory = props => {

  return (
    <div className={'vertical-center'}><CategoryForm /></div>
  );
};

export default EditCategory;
