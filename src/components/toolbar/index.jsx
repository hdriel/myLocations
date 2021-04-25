import './index.scss';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import useStyles from './useStyle';
import { CATEGORY_ACTIONS, LOCATION_ACTIONS, CATEGORY_SECTION, LOCATION_SECTION, CRUD_ACTIONS } from "../../utils/consts";
import { useSelector, useDispatch} from "react-redux";
import { useHistory } from "react-router-dom";
import { EDIT_CATEGORY, EDIT_LOCATION, LOCATIONS_BY_CATEGORY } from "../../screens";
import * as locationActions from "../../store/actions/location";
import * as categoryActions from "../../store/actions/category";
import * as settingsActions from "../../store/actions/settings";
import {Category} from "../../models/category";
import {uid} from "uid";
import {Location} from "../../models/location";


const ToolbarActions = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const {
        selectedCrudAction,
        selectedLocation,
        selectedCategory,
    } = useSelector(state => ({
        selectedCrudAction: state.settings?.selectedCrudAction,
        selectedLocation: state.location?.selectedLocation,
        selectedCategory: state.category?.selectedCategory,
    }));

    const {
        section,
        allowedActions: {
            create: allowedCreateActions = false,
            edit: allowedUpdateActions = false,
            view: allowedViewActions = false,
            delete: allowedDeleteActions = false,
        } = {
            create: false,
            edit: false,
            view: false,
            delete: false,
        }
    } = props

    const sectionHandler = {
        [CATEGORY_SECTION]: {
            createHandler() {
                dispatch(settingsActions.updateSelectionAction({
                    selectedAction: CATEGORY_ACTIONS.CREATE,
                    selectedCrudAction: CRUD_ACTIONS.CREATE,
                }));
                dispatch(categoryActions.selectCategory(new Category({id: uid(), name: ''})));
                history.push(EDIT_CATEGORY());
            },
            editHandler(){
                if(selectedCategory){
                    dispatch(settingsActions.updateSelectionAction({
                        selectedAction: CATEGORY_ACTIONS.UPDATE,
                        selectedCrudAction: CRUD_ACTIONS.UPDATE,
                    }));
                    history.push(EDIT_CATEGORY(selectedCategory.id));
                }
            },
            viewHandler(){
                history.push(LOCATIONS_BY_CATEGORY(selectedCategory?.id));
            },
            deleteHandler(){
                dispatch(categoryActions.deleteCategory(selectedCategory?.id));
            }
        },
        [LOCATION_SECTION]: {
            createHandler() {
                dispatch(settingsActions.updateSelectionAction({
                    selectedAction: LOCATION_ACTIONS.CREATE,
                    selectedCrudAction: CRUD_ACTIONS.CREATE,
                }));
                dispatch(locationActions.selectLocation(new Location({id: uid()})));
                history.push(EDIT_LOCATION());
            },
            editHandler(){
                if(selectedLocation){
                    dispatch(settingsActions.updateSelectionAction({
                        selectedAction: LOCATION_ACTIONS.UPDATE,
                        selectedCrudAction: CRUD_ACTIONS.UPDATE,
                    }));
                    history.push(EDIT_LOCATION(selectedLocation?.id));
                }
            },
            viewHandler(){
                if(selectedLocation){
                    dispatch(settingsActions.updateSelectionAction({
                        selectedAction: LOCATION_ACTIONS.VIEW,
                        selectedCrudAction: CRUD_ACTIONS.VIEW,
                    }));
                    history.push(EDIT_LOCATION(selectedLocation?.id));
                }
            },
            deleteHandler(){
                dispatch(locationActions.deleteLocation(selectedLocation?.id));
            }
        }
    }

    const createHandler = sectionHandler[section]?.createHandler;
    const viewHandler = sectionHandler[section]?.viewHandler;
    const editHandler = sectionHandler[section]?.editHandler;
    const deleteHandler = sectionHandler[section]?.deleteHandler;

    const createSelectedStyle = selectedCrudAction === CRUD_ACTIONS.CREATE ? 'contained' : 'outlined';
    const viewSelectedStyle = selectedCrudAction === CRUD_ACTIONS.VIEW ? 'contained' : 'outlined';
    const editSelectedStyle = selectedCrudAction === CRUD_ACTIONS.UPDATE ? 'contained' : 'outlined';
    const deleteSelectedStyle = selectedCrudAction === CRUD_ACTIONS.DELETE ? 'contained' : 'outlined';

    return (
        <Card className={classes.root}>
            <CardContent>
                <span className={classes.title}>Available Actions: </span>

                <Button
                    variant={createSelectedStyle}
                    color="default"
                    className={classes.button}
                    startIcon={<AddCircleOutlineIcon />}
                    disabled={!allowedCreateActions}
                    onClick={createHandler}
                > <span className={classes.text}>Create</span> </Button>

                <Button
                    variant={viewSelectedStyle}
                    color="default"
                    className={classes.button}
                    startIcon={<ImportContactsIcon />}
                    onClick={viewHandler}
                    disabled={!allowedViewActions}
                > <span className={classes.text}>View</span> </Button>

                <Button
                    variant={editSelectedStyle}
                    color="default"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={editHandler}
                    disabled={!allowedUpdateActions}
                > <span className={classes.text}>Edit</span> </Button>

                <Button
                    variant={deleteSelectedStyle}
                    color="default"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={deleteHandler}
                    disabled={!allowedDeleteActions}
                > <span className={classes.text}>Delete</span> </Button>

            </CardContent>
        </Card>
    );
}

export default ToolbarActions;