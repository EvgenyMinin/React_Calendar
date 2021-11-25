import { Login, Event, EventDetails, SignUp } from '../pages';

export interface Route {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    LOGIN = '/login',
    SIGN_UP = '/sign-up',
    EVENTS = '/events',
    EVENT_DETAILS = '/events/:date',
}

export const publicRoutes: Route[] = [
    { path: RouteNames.LOGIN, component: Login, exact: true },
    { path: RouteNames.SIGN_UP, component: SignUp, exact: true },
];

export const privateRoutes: Route[] = [
    { path: RouteNames.EVENTS, component: Event, exact: true },
    { path: RouteNames.EVENT_DETAILS, component: EventDetails, exact: true },
];
