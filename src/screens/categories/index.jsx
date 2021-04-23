import './index.scss';
import React from 'react';
import CategoryDataTable from '../../components/categoryTabel';

const Categories = props => {
  return (
      <div className='vertical-center'>
        <div className='category-table-container'>
          <CategoryDataTable/>
        </div>
      </div>
  );
};

export default Categories;
