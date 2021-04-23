import './index.scss';
import React, {useEffect, useReducer} from 'react';
import { Button, Icon, TextField, Paper, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import {Category} from "../../models/category";
import {CATEGORY_ACTIONS} from "../../utils/consts";
import useStyle from "./useStyle";
import * as categoryActions from "../../store/actions/category";
import { useHistory, useParams } from "react-router-dom";
import { uid } from 'uid';


const CategoryForm = props => {
    const history = useHistory();
    const classes = useStyle();
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const { selectedCategory, selectedAction, categoryList } = useSelector(state => ({
        categoryList: state.category?.categoryList,
        selectedCategory: state.category?.selectedCategory,
        selectedAction: state.settings?.selectedAction ?? CATEGORY_ACTIONS.CREATE,
    }));

    useEffect(() => {
        if(!selectedCategory){
            let category;
            if(categoryId && categoryId === 'new'){
                category = new Category({id: uid(), name: ''})
            }
            else {
                category = categoryList.find(cat => cat.id === categoryId);
            }
            dispatch(categoryActions.selectCategory(category))
        }
    }, [selectedCategory, categoryId, dispatch])

    let formTitle;
    let formDescriptionTitle;
    let eventHandler;

    switch(selectedAction) {
        case CATEGORY_ACTIONS.CREATE:
            formTitle = 'NEW CATEGORY';
            formDescriptionTitle = 'Fill form to create a new category';
            eventHandler = categoryActions.createCategory;
            break;

        case CATEGORY_ACTIONS.UPDATE:
            formTitle = 'UPDATE CATEGORY';
            formDescriptionTitle = `Fill form to update '${selectedCategory.name}' category`;
            eventHandler = categoryActions.updateCategory;
            break;
    }
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: selectedCategory?.name,
        }
    );

    const handleSubmit = evt => {
        evt.preventDefault();
        if(eventHandler){
            const { name } = formInput;
            selectedCategory.name = name;
            dispatch(eventHandler(selectedCategory));
            history.goBack();
        }
    };

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };

    if(!selectedCategory){
        return null;
    }

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3"> { formTitle } </Typography>
                <Typography component="p"> { formDescriptionTitle } </Typography>

                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        id="margin-normal"
                        name="name"
                        defaultValue={formInput.email}
                        className={classes.textField}
                        helperText="Enter your category name"
                        onChange={handleInput}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.button}
                    >Save</Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                    >Cancel</Button>
                </form>
            </Paper>
        </div>
    );
}
export default CategoryForm;
