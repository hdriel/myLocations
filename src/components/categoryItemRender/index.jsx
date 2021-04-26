import './index.scss';
import React, {useState, useEffect} from 'react';
import * as categoryActions from '../../store/actions/category';
import Checkbox from '@material-ui/core/Checkbox';
import { useDispatch } from 'react-redux';
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";

const CategoryItemRender = (props) => {
    const dispatch = useDispatch();
    const { category } = props
    const { selected, locations: count = 0 } = category;

    const [isSelected, setIsSelected] = useState(selected);

    const onSelectHandler = () => {
        dispatch(categoryActions.selectCategory(isSelected ? undefined : category));
        setIsSelected(value => !value);
    }

    useEffect(() => { setIsSelected(selected) }, [selected]);

    const isSelectedClass = isSelected ? 'selected' : '';

    return (
        <Card className={ 'category-item-card ' + isSelectedClass} onClick={onSelectHandler}>
            <CardContent className='category-item-card-content flex-row'>
                <Checkbox
                    checked={isSelected}
                    onChange={onSelectHandler}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                <div className='flex-row'>
                    <p> <span className='category-title'>Category:</span> <span>{category.name}</span> </p>
                    <p> <span>{count}</span> locations </p>
                </div>
            </CardContent>
        </Card>
    )
}
export default CategoryItemRender;
