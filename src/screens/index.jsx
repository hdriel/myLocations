import React  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Categories from './categories';
import EditCategory from './editCategory';
import Locations from './locations';
import EditLocation from './editLocation';
import PageNotFound from './pageNotFound';
import Screen from '../wrappers/screen';
import {CATEGORY_SECTION, LOCATION_SECTION, TITLE_REPLACE_ACTION} from "../utils/consts";
import {useSelector} from "react-redux";

export const CATEGORIES = '/categories';
const EDIT_CATEGORY_URL = '/category/:categoryId';
export const EDIT_CATEGORY = categoryId => `/category/${categoryId || 'new'}`;
const LOCATIONS_BY_CATEGORY_URL = '/locations-by-category/:categoryId';
export const LOCATIONS_BY_CATEGORY = categoryId => `/locations-by-category/${categoryId}`;
const EDIT_LOCATION_URL = '/location/:locationId';
export const EDIT_LOCATION = locationId => `/location/${locationId || 'new'}`;
export const DEFAULT_PAGE = CATEGORIES;

const Routes = props => {
  const {selectedCategory, selectedLocation} = useSelector(state => ({
      selectedCategory: state.category?.selectedCategory,
      selectedLocation: state.location?.selectedLocation,
  }))

  return (
    <Switch>
        <Route exact path='/'> <Redirect to={DEFAULT_PAGE} /> </Route>
        <Route exact path={CATEGORIES}>
            <Screen
                search={true}
                section={CATEGORY_SECTION}
                title='Category List'
                allowedActions={{ create: !selectedCategory, edit: selectedCategory, delete: selectedCategory, view: selectedCategory }}
            >
                <Categories />
            </Screen>
        </Route>
        <Route path={EDIT_CATEGORY_URL}>
            <Screen
                search={false}
                section={CATEGORY_SECTION}
                title={`${TITLE_REPLACE_ACTION} Category`}
                allowedActions={{ create: false, edit: false, delete: false, view: false }}
            >
                <EditCategory />
            </Screen>
        </Route>
        <Route path={LOCATIONS_BY_CATEGORY_URL}>
            <Screen
                search={true}
                section={LOCATION_SECTION}
                title='Location List'
                allowedActions={{ create: !selectedLocation, edit: selectedLocation, delete: selectedLocation, view: selectedLocation }}
            >
                <Locations />
            </Screen>
        </Route>
        <Route path={EDIT_LOCATION_URL}>
            <Screen
                search={false}
                section={LOCATION_SECTION}
                title={`${TITLE_REPLACE_ACTION} Location`}
                allowedActions={{ create: false, edit: false, delete: false, view: false }}
            >
                <EditLocation />
            </Screen>
        </Route>
        <Route> <PageNotFound /> </Route>
    </Switch>
  )
}

export default Routes;
