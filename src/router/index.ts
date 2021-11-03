import { Login, Event } from '../pages';

export interface Route {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
}

export const publicRoutes: Route[] = [{ path: RouteNames.LOGIN, component: Login, exact: true }];

export const privateRoutes: Route[] = [{ path: RouteNames.EVENT, component: Event, exact: true }];
