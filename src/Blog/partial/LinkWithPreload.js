import {Link, matchPath} from "react-router-dom";
import React from "react";
import {routes} from "../../App";

const findComponentForRoute = (path, routes) => {
    const matchingRoute = routes.find(route =>
        matchPath(path, {
            path: route.path,
            exact: route.exact
        })
    );
    return matchingRoute ? matchingRoute.component : null;
};

const preloadRouteComponent = (path) => {
    const component = findComponentForRoute(path, routes);
    if (component && component.preload) {
        component.preload();
    }
};

const LinkWithPreload = ({to, onPreload, ...rest}) => {
    return (
        <Link
            to={to}
            onMouseEnter={() => preloadRouteComponent(to)}
            {...rest}
        />
    );
};
export default LinkWithPreload;