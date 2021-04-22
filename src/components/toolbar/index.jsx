import './index.sass';
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


const ToolbarActions = props => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        selectedLocation,
        selectedCategory,
        selectedCrudAction,
        selectedSection
    } = useSelector(state => ({
        selectedAction: state.settings?.selectedAction,
        selectedSection: state.settings?.selectedSection,
        selectedCrudAction: state.settings?.selectedCrudAction,
        selectedLocation: state.location?.selectedLocation,
        selectedCategory: state.category?.selectedCategory,
    }));
    const history = useHistory();

    const createHandler = () => {
        switch (selectedSection) {
            case CATEGORY_SECTION:
                dispatch(settingsActions.updateSelectionAction({
                    selectedAction: CATEGORY_ACTIONS.CREATE,
                    selectedCrudAction: CRUD_ACTIONS.CREATE,
                }));
                history.push(EDIT_CATEGORY());
                // window.location.reload();
                break;
            case LOCATION_SECTION:
                dispatch(settingsActions.updateSelectionAction({
                    selectedAction: LOCATION_ACTIONS.CREATE,
                    selectedCrudAction: CRUD_ACTIONS.CREATE,
                }));
                history.push(EDIT_LOCATION());
                // window.location.reload();
                break;
            default: break;
        }
    }

    const viewHandler = () => {
        switch (selectedSection) {
            case CATEGORY_SECTION:
                history.push(LOCATIONS_BY_CATEGORY(selectedCategory?.id));
                break;
            case LOCATION_SECTION:
                dispatch(settingsActions.updateSelectionAction({
                    selectedAction: LOCATION_ACTIONS.UPDATE,
                    selectedCrudAction: CRUD_ACTIONS.VIEW,
                }));
                history.push(EDIT_LOCATION(selectedLocation?.id));
                break;
            default: break;
        }
    }

    const editHandler = () => {
        switch (selectedSection) {
            case CATEGORY_SECTION:
                dispatch(settingsActions.updateSelectionAction({
                    selectedAction: LOCATION_ACTIONS.UPDATE,
                    selectedCrudAction: CRUD_ACTIONS.VIEW,
                }));
                history.push(EDIT_CATEGORY(selectedCategory?.id));
                break;
            case LOCATION_SECTION:
                dispatch(settingsActions.updateSelectionAction({
                    selectedAction: LOCATION_ACTIONS.UPDATE,
                    selectedCrudAction: CRUD_ACTIONS.VIEW,
                }));
                history.push(EDIT_LOCATION(selectedLocation?.id));
                break;
            default: break;
        }
    }

    const deleteHandler = () => {
        switch (selectedSection) {
            case CATEGORY_SECTION:
                dispatch(categoryActions.deleteCategory(selectedCategory?.id));
                break;
            case LOCATION_SECTION:
                dispatch(locationActions.deleteLocation(selectedLocation?.id));
                break;
            default: break;
        }
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <span className={classes.title}>Available Actions: </span>
                <Button
                    variant="outlined"
                    color="default"
                    className={classes.button}
                    startIcon={<AddCircleOutlineIcon />}
                    // disabled={true}
                    onClick={createHandler}
                > <span className={classes.text}>Create</span> </Button>

                <Button
                    variant="outlined"
                    color="default"
                    className={classes.button}
                    startIcon={<ImportContactsIcon />}
                    onClick={viewHandler}
                > <span className={classes.text}>View</span> </Button>

                <Button
                    variant="outlined"
                    color="default"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={editHandler}
                > <span className={classes.text}>Edit</span> </Button>

                <Button
                    variant="outlined"
                    color="default"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={deleteHandler}
                > <span className={classes.text}>Delete</span> </Button>
            </CardContent>
        </Card>
    );
}

export default ToolbarActions;