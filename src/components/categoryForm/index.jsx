import './index.scss';
import React, {useEffect, useReducer} from 'react';
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import {CATEGORY_ACTIONS, CRUD_ACTIONS} from "../../utils/consts";
import useStyle from "./useStyle";
import * as categoryActions from "../../store/actions/category";
import * as settingsActions from "../../store/actions/settings";
import { useHistory, useParams } from "react-router-dom";
import {CATEGORIES} from "../../screens";
import {Category} from "../../models/category";


const CategoryForm = props => {
    const history = useHistory();
    const classes = useStyle();
    const dispatch = useDispatch();
    const { categoryId } = useParams();
    const { selectedCategory, selectedAction } = useSelector(state => ({
        selectedCategory: state.category?.selectedCategory,
        selectedAction: state.settings?.selectedAction ?? CATEGORY_ACTIONS.CREATE,
    }));

    const updatedCategory = selectedCategory && new Category({doc: selectedCategory});

    useEffect(() => {
        if(!selectedCategory) history.replace(CATEGORIES);
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
            formDescriptionTitle = `Fill form to update '${updatedCategory.name}' category`;
            eventHandler = categoryActions.updateCategory;
            break;
    }
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: updatedCategory?.name ?? '',
        }
    );

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };


    const submitHandler = evt => {
        evt.preventDefault();
        if(eventHandler){
            updatedCategory.name = formInput.name;
            dispatch(eventHandler(updatedCategory));
            categoryActions.selectCategory(null);
            dispatch(settingsActions.updateSelectionAction({
                selectedAction: CRUD_ACTIONS.NONE,
                selectedCrudAction: CRUD_ACTIONS.NONE,
            }));
            history.replace(CATEGORIES);
        }
    };

    const cancelHandler = evt => {
        evt.preventDefault();
        dispatch(categoryActions.selectCategory(null));
        dispatch(settingsActions.updateSelectionAction({
            selectedAction: CRUD_ACTIONS.NONE,
            selectedCrudAction: CRUD_ACTIONS.NONE,
        }));
        history.replace(CATEGORIES);
    };

    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3"> { formTitle } </Typography>
                <Typography component="p"> { formDescriptionTitle } </Typography>

                <form onSubmit={submitHandler}>
                    <TextField
                        label="Name"
                        id="margin-normal"
                        name="name"
                        defaultValue={formInput.name}
                        required={true}
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
                        onClick={cancelHandler}
                    >Cancel</Button>
                </form>
            </Paper>
        </div>
    );
}
export default CategoryForm;
