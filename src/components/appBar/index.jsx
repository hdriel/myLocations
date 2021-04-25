import './index.scss';
import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './useStyle';
import {useHistory, useParams, useLocation} from "react-router-dom";
import * as settingsActions from "../../store/actions/settings";
import * as categoryActions from "../../store/actions/category";
import {useSelector, useDispatch} from "react-redux";
import _ from "lodash";
import {CRUD_ACTIONS, TITLE_REPLACE_ACTION, TITLE_REPLACE_CATEGORY} from "../../utils/consts";
import {CATEGORIES} from "../../screens";


const SearchAppBar = props => {
    const history = useHistory();
    const classes = useStyles();
    const dispatch  = useDispatch();
    const { existsCategoryList, selectedCategory, selectedLocation } = useSelector(state => ({
        existsCategoryList: state.category?.categoryList?.length ?? 0,
        selectedCategory: state.category?.selectedCategory,
        selectedLocation: state.location?.selectedLocation,
    }));

    // Back configuration
    const goBackPage = () => {
        dispatch(settingsActions.updateSearchItemValue(''));
        dispatch(categoryActions.selectCategory(null));
        dispatch(settingsActions.updateSelectionAction({
            selectedAction: CRUD_ACTIONS.NONE,
            selectedCrudAction: CRUD_ACTIONS.NONE,
        }));
        history.goBack();
    }

    const { pathname } = useLocation();
    const locationUrl = pathname.replace('^\/', '');
    const mainRoute = locationUrl === CATEGORIES;

    // Title Configuration
    let { title = '*' } = props;
    const { categoryId, locationId } = useParams();
    const action = (locationId !== 'new' && selectedLocation) || (categoryId !== 'new' && selectedCategory)
        ? 'Edit'
        : 'New';

    title = title.replace(TITLE_REPLACE_ACTION, action);
    title = title.replace(TITLE_REPLACE_CATEGORY, selectedCategory?.name ?? '');
    // Search Configuration
    const searchItemAvailable = !!props.search && existsCategoryList;

    const [reload, setReload] = useState(false);
    const callApi = (event) => {
        const { target: { value } } = event;
        console.log('search for: ', value);
        dispatch(settingsActions.updateSearchItemValue(value))
        setReload(true);
    };
    const [updateSearchValue] = useState(() => _.debounce(callApi, 1000));


    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {
                        !mainRoute && (
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
                        !!searchItemAvailable && (
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
