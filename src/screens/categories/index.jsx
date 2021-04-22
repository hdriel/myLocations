import './index.scss';
import React from 'react';
import { useSelector } from 'react-redux';

const Categories = props => {
  const { categoryList } = useSelector(state => ({
    categoryList: state.category?.categoryList ?? [],
  }));

  return (
    <div> {JSON.stringify(categoryList)} </div>
  );
};

export default Categories;
