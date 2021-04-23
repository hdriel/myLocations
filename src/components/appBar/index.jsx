import './index.scss';
import React, {useEffect} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './useStyle';
import {useHistory, useParams} from "react-router-dom";
import * as settingsActions from "../../store/actions/settings";
import {useSelector, useDispatch} from "react-redux";
import _ from "lodash";
import {TITLE_REPLACE_ACTION} from "../../utils/consts";


const SearchAppBar = props => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch  = useDispatch();
    const { existsCategoryList, selectedCategory, selectedLocation } = useSelector(state => ({
        existsCategoryList: state.category?.categoryList?.length ?? 0,
        selectedCategory: state.category?.selectedCategory,
        selectedLocation: state.location?.selectedLocation,
    }));

    let { title = '*' } = props;
    const { categoryId, locationId } = useParams();
    // console.table({categoryId, locationId});
    const action = (locationId && selectedLocation) || (categoryId && selectedCategory)
        ? 'Edit'
        : 'New';

    title = title.replace(TITLE_REPLACE_ACTION, action);

    const searchItemAvailable = !!props.search && existsCategoryList;

    const goBackPage = () => {
        dispatch(settingsActions.updateSearchItemValue(''));
        history.goBack();
    }

    const updateSearchValue = (event) => {
        const { target: { value } } = event;
        _.debounce(
            () => dispatch(settingsActions.updateSearchItemValue(value)),
            2*1000
        );
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {
                        history.length > 1 && (
                            <IconButton
                                edge="start"
                                className={classes.menuButton}
                                color="inherit"
                                aria-label="open drawer"
                                onClick={goBackPage}
                            >
                                <KeyboardBackspaceIcon/>
                            </IconButton>
                        )
                    }
                    <Typography className={classes.title} variant="h6" noWrap> { title } </Typography>
                    {
                        searchItemAvailable && (
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search category"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={updateSearchValue}
                                />
                            </div>
                        )
                    }
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default SearchAppBar;