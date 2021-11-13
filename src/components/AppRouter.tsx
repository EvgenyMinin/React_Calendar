import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { privateRoutes, publicRoutes, RouteNames } from '../router';

export const AppRouter = () => {
    const { isAuth } = useAppSelector((state) => state.auth);

    return isAuth ? (
        <Switch>
            {privateRoutes.map((route) => (
                <Route key={route.path} {...route} />
            ))}

            <Redirect to={RouteNames.EVENTS} />
        </Switch>
    ) : (
        <Switch>
            {publicRoutes.map((route) => (
                <Route key={route.path} {...route} />
            ))}

            <Redirect to={RouteNames.LOGIN} />
        </Switch>
    );
};
