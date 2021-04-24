import './index.scss';
import React  from 'react';
import {useSelector} from 'react-redux';
import {Category} from "../../models/category";
import CategoryItemRender from "../categoryItemRender";


const CategoryList = () => {
    const { categoryList, locationList, selectedCategory, searchValue } = useSelector(state => ({
        locationList: state.location?.locationList ?? [],
        categoryList: state.category?.categoryList ?? [],
        selectedCategory: state.category?.selectedCategory ?? [],
        searchValue: state.settings?.searchValue ?? '',
    }));
    const selectedCategoryId = selectedCategory?.id;

    const categoryItemsList = categoryList
        .map(category => {
            if(!(category instanceof Category)){
                category = new Category({doc: category});
            }
            category.locations = locationList
                .filter(location => location.category === category.id)
                .length;

            category.selected = category.id === selectedCategoryId

            return category;
        })
        .filter(category => !searchValue || category.name.includes(searchValue))

    if(!categoryItemsList.length){
        return searchValue
            ? <p>Category list data not found for '{searchValue}' searching result</p>
            : <p>No Category data exists let's add some..</p>
    }

    return (
        <div style={{ height: 400, width: '100%' }}>
            {
                categoryItemsList.map((category, k) =>
                    <CategoryItemRender key={k} category={category} />
                )
            }
        </div>
    );
}
export default CategoryList;