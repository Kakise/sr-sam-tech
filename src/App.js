import React, {Suspense} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

const cacheVersion = '3e41a';

console.log("App Version: " + cacheVersion);

const ReactLazyPreload = importStatement => {
    const Component = React.lazy(importStatement);
    Component.preload = importStatement;
    return Component;
};

const BlogHome = ReactLazyPreload(() => import('./Blog/BlogHome'));
const BlogPost = ReactLazyPreload(() => import('./Blog/BlogPost'));
const Categories = ReactLazyPreload(() => import('./Blog/Categories'));
const Category = ReactLazyPreload(() => import('./Blog/Category'));
const SearchResults = ReactLazyPreload(() => import('./Blog/SearchResults'));
const Footer = React.lazy(() => import('./Blog/partial/Footer'));
const BlogPage = ReactLazyPreload(() => import('./Blog/BlogPage'));

const routes = [
    {path: "/", exact: true, component: BlogHome},
    {path: "/p/:page", exact: true, component: BlogHome},
    {path: "/results", exact: true, component: SearchResults},
    {path: "/post/:slug", exact: true, component: BlogPost},
    {path: "/blog/categories", exact: true, component: Categories},
    {path: "/blog/category/:category", exact: true, component: Category},
    {path: "/:page", exact: true, component: BlogPage}
];

function App() {
    return (
        <main>
            <Suspense fallback={<div className="loading">Loading...</div>}>
                <Router>
                    <Switch>
                        {routes.map(route => (
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
                    </Switch>
                </Router>
                <Footer />
            </Suspense>
        </main>
    )
}

export {App as default, routes, cacheVersion};