import './index.scss';
import React , {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {Category} from "../../models/category";
import CategoryItemRender from "../categoryItemRender";


const CategoryDataTable = () => {
    const { categoryList, locationList, selectedCategory } = useSelector(state => ({
        locationList: state.location?.locationList ?? [],
        categoryList: state.category?.categoryList ?? [],
        selectedCategory: state.category?.selectedCategory ?? [],
    }));
    const selectedCategoryId = selectedCategory && (selectedCategory?.id || selectedCategory?._id);

    const categoryItemsList = categoryList.map(category => {
        if(!(category instanceof Category)){
            category = new Category({doc: category});
        }
        category.locations = locationList
            .filter(location => location.category === category.id)
            .length;

        category.selected = category.id === selectedCategoryId

        return category;
    })

    console.log(categoryItemsList.map(({selected})=> selected));

    return (
        <div style={{ height: 400, width: '100%' }}>
            {
                categoryItemsList.map((category, k) => <CategoryItemRender key={k} category={category} />)
            }
        </div>
    );
}
export default CategoryDataTable;