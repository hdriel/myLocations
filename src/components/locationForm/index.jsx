import './index.scss';
import React, {useCallback, useEffect, useReducer} from 'react';
import { Button, TextField, Paper, Typography } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';
import {CATEGORY_ACTIONS, CRUD_ACTIONS, LOCATION_ACTIONS} from "../../utils/consts";
import useStyle from "./useStyle";
import * as locationActions from "../../store/actions/location";
import * as settingsActions from "../../store/actions/settings";
import { useHistory } from "react-router-dom";
import {CATEGORIES, LOCATIONS_BY_CATEGORY} from "../../screens";
import {Location} from "../../models/location";
import { Alert, AlertTitle } from '@material-ui/lab';


const LocationForm = props => {
    const history = useHistory();
    const classes = useStyle();
    const dispatch = useDispatch();
    const {
        selectedLocation,
        selectedCategory,
        selectedAction,
        locationError,
        savedSuccessfully,
    } = useSelector(state => ({
        locationError: state.location?.error ?? '',
        savedSuccessfully: state.location?.savedSuccessfully ?? false,
        selectedLocation: state.location?.selectedLocation ?? null,
        selectedCategory: state.category?.selectedCategory ?? null,
        selectedAction: state.settings?.selectedAction ?? CATEGORY_ACTIONS.CREATE,
    }));

    const updatedLocation = selectedLocation && new Location({doc: selectedLocation});
    const selectedCategoryId = selectedCategory?.id ?? '';
    const selectedCategoryName = selectedCategory?.name ?? '';

    let formTitle;
    let formDescriptionTitle;
    let eventHandler;
    let editMode = true;

    switch(selectedAction) {
        case LOCATION_ACTIONS.CREATE:
            formTitle = 'NEW LOCATION';
            formDescriptionTitle = `Fill form to create a new ${selectedCategoryName} location`;
            eventHandler = locationActions.createLocation;
            break;

        case LOCATION_ACTIONS.UPDATE:
            formTitle = 'UPDATE LOCATION';
            formDescriptionTitle = `Fill form to update '${selectedCategoryName}' location: '${updatedLocation?.name}'`;
            eventHandler = locationActions.updateLocation;
            break;

        case LOCATION_ACTIONS.VIEW:
            formTitle = 'LOCATION DETAILS';
            formDescriptionTitle = '';
            editMode = false;
            break;

        default: break;
    }
    const [formInput, setFormInput] = useReducer(
        (state, newState) => ({ ...state, ...newState }),
        {
            name: updatedLocation?.name ?? '',
            address: updatedLocation?.address ?? '',
            category: selectedCategory?.name ?? '',
            latitude: updatedLocation?.coordinates?.latitude ?? '',
            longitude: updatedLocation?.coordinates?.latitude ?? '',
        }
    );

    const handleInput = evt => {
        const name = evt.target.name;
        const newValue = evt.target.value;
        setFormInput({ [name]: newValue });
    };


    const submitHandler = evt => {
        evt.preventDefault();
        if(eventHandler && updatedLocation){
            updatedLocation.name = formInput.name;
            updatedLocation.categoryId = selectedCategory.id;
            updatedLocation.address = formInput.address;
            updatedLocation.coordinates.latitude = formInput.latitude;
            updatedLocation.coordinates.longitude = formInput.longitude;

            dispatch(eventHandler(updatedLocation));
        }
    };

    const goBackPage = useCallback(() => {
        dispatch(locationActions.selectLocation(null));
        dispatch(settingsActions.updateSelectionAction({
            selectedAction: CRUD_ACTIONS.NONE,
            selectedCrudAction: CRUD_ACTIONS.NONE,
        }));

        history.replace(selectedCategoryId
            ? LOCATIONS_BY_CATEGORY(selectedCategoryId)
            : CATEGORIES
        );
    }, [dispatch, history, selectedCategoryId]);

    const cancelHandler = evt => {
        evt && evt.preventDefault();
        goBackPage();
    };

    useEffect(() => {
        let timeoutId;
        if(locationError){
            timeoutId = setTimeout(() => dispatch(locationActions.resetError()), 5 * 1000);
        }

        return () => timeoutId && clearTimeout(timeoutId);
    }, [savedSuccessfully, dispatch, locationError]);

    useEffect(() => {
        if(savedSuccessfully){
            goBackPage();
        }
    }, [goBackPage, savedSuccessfully]);

    useEffect(() => {
        window.onbeforeunload = function() {
            goBackPage();
            return true;
        };

        if(!selectedLocation){
            history.replace(selectedCategoryId
                ? LOCATIONS_BY_CATEGORY(selectedCategoryId)
                : CATEGORIES
            );
        }

        return () => {
            window.onbeforeunload = null;
        };
    }, [history, dispatch, selectedLocation, selectedCategory, selectedCategoryId, goBackPage])

    return (
        <Paper className={classes.root + ' location-form-root'}>
            <Typography variant="h5" component="h3"> { formTitle } </Typography>
            <Typography component="p"> { formDescriptionTitle } </Typography>

            <form onSubmit={submitHandler}>

                <TextField
                    variant='outlined'
                    label="Category"
                    id="margin-normal"
                    name="category"
                    defaultValue={formInput.category}
                    required={true}
                    disabled={true}
                    className={classes.textField + ' text-field'}
                />

                <TextField
                    variant='outlined'
                    label="Name"
                    id="margin-normal"
                    name="name"
                    defaultValue={formInput.name}
                    required={true}
                    disabled={!editMode}
                    className={classes.textField + ' text-field'}
                    onChange={handleInput}
                />


                <TextField
                    variant='outlined'
                    label="Address"
                    id="margin-normal"
                    name="address"
                    defaultValue={formInput.address}
                    required={true}
                    disabled={!editMode}
                    className={classes.textField + ' text-field'}
                    onChange={handleInput}
                />

                <div className={classes.row + ' form-row-container'}>
                    <TextField
                        variant='outlined'
                        label="Coordinates.latitude"
                        id="margin-normal"
                        name="latitude"
                        defaultValue={formInput.latitude}
                        required={true}
                        disabled={!editMode}
                        className={classes.textFieldRow}
                        fullWidth={true}
                        onChange={handleInput}
                    />

                    <TextField
                        variant='outlined'
                        label="Coordinates.longitude"
                        id="margin-normal"
                        name="longitude"
                        defaultValue={formInput.longitude}
                        required={true}
                        disabled={!editMode}
                        className={classes.textFieldRow}
                        fullWidth={true}
                        onChange={handleInput}
                    />
                </div>

                {
                    locationError && (
                        <div className={classes.alert}>
                            <Alert severity="error">
                                <AlertTitle className={classes.alertTitle}>Error</AlertTitle>
                                {locationError}
                            </Alert>
                        </div>
                    )
                }

                {
                    editMode && (
                        <div className={classes.row + ' location-form-row-container'}>
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
                        </div>
                    )
                }
            </form>
        </Paper>
    );
}
export default LocationForm;
