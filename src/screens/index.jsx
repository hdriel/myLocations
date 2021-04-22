import React  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Categories from './categories';
import EditCategory from './editCategory';
import Locations from './locations';
import EditLocation from './editLocation';
import PageNotFound from './pageNotFound';
import Screen from '../wrappers/screen';

export const CATEGORIES = '/categories';
const EDIT_CATEGORY_URL = '/category/:categoryId';
export const EDIT_CATEGORY = categoryId => `/category/${categoryId || 'new'}`;
const LOCATIONS_BY_CATEGORY_URL = '/locations/:categoryId';
export const LOCATIONS_BY_CATEGORY = categoryId => `/locations/${categoryId}`;
const EDIT_LOCATION_URL = '/location/:locationId';
export const EDIT_LOCATION = locationId => `/locations/${locationId || 'new'}`;
export const DEFAULT_PAGE = CATEGORIES;

const Routes = props => {
  return (
    <Switch>
        <Route exact path='/'> <Redirect to={DEFAULT_PAGE} /> </Route>
        <Route exact path={CATEGORIES}>
            <Screen search={true}>
                <Categories />
            </Screen>
        </Route>
        <Route path={EDIT_CATEGORY_URL}>
            <Screen search={false}>
                <EditCategory />
            </Screen>
        </Route>
        <Route path={LOCATIONS_BY_CATEGORY_URL}>
            <Screen>
                <Locations />
            </Screen>
        </Route>
        <Route path={EDIT_LOCATION_URL}>
            <Screen search={false}>
                <EditLocation />
            </Screen>
        </Route>
        <Route> <PageNotFound /> </Route>
    </Switch>
  )
}

export default Routes;
