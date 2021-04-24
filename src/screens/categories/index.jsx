import './index.scss';
import React from 'react';
import CategoryList from '../../components/CategoryList';

const Categories = props => {
  return (
      <div className='vertical-center'>
        <div className='category-table-container'>
          <CategoryList/>
        </div>
      </div>
  );
};

export default Categories;
