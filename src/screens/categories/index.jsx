import './index.scss';
import React, {useEffect} from 'react';
import CategoryList from '../../components/categoryList';
import * as categoryActions from '../../store/actions/category';
import {useDispatch} from "react-redux";

const Categories = props => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(categoryActions.resetError());
    }, [dispatch]);

    return (
        <div className='vertical-center '>
            <div className='category-data-container scrollable-category'>
                <CategoryList/>
            </div>
        </div>
    );
};

export default Categories;
