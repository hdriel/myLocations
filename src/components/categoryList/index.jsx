import './index.scss';
import React  from 'react';
import {useSelector} from 'react-redux';
import {Category} from "../../models/category";
import CategoryItemRender from "../categoryItemRender";


const CategoryList = () => {
    const { categoryList, locationList, selectedCategory, searchValue } = useSelector(state => ({
        locationList: state.location?.locationList ?? [],
        categoryList: state.category?.categoryList ?? [],
        selectedCategory: state.category?.selectedCategory ?? null,
        searchValue: state.settings?.searchValue ?? '',
    }));
    const selectedCategoryId = selectedCategory?.id;

    const categoryItemsList = categoryList
        .map(category => {
            if(!(category instanceof Category)){
                category = new Category({doc: category});
            }

            category.locations = locationList
                .filter(location => location.categoryId === category.id)
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
        <div className='horizontal-center flex-col'>
            <div className='horizontal-center flex-col category-list-container'>
                {
                    categoryItemsList.map((category, k) =>
                        <CategoryItemRender key={k} category={category} />
                    )
                }
            </div>
        </div>
    );
}
export default CategoryList;
