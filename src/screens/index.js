import React  from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Categories from './categories';
import Locations from './locations';
import PageNotFound from './pageNotFound';

export const CATEGORY = '/categories';
export const LOCATIONS = '/locations';
export const DEFAULT_PAGE = CATEGORY;

const Routes = props => {
  return (
    <Switch>
        <Route exact path='/'> <Redirect to={DEFAULT_PAGE} /> </Route>
        <Route path={CATEGORY}> <Categories /> </Route>
        <Route path={LOCATIONS}> <Locations /> </Route>
        <Route> <PageNotFound /> </Route>
    </Switch>
  )
}

export default Routes;
