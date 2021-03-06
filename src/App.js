import React, {Suspense} from "react";
import {Route, Switch} from "react-router-dom";
import Butter from "buttercms";
import "./App.css";
import BlogHome from './Blog/BlogHome';
import BlogPost from './Blog/BlogPost';
import Categories from './Blog/Categories';
import Category from './Blog/Category';
import SearchResults from './Blog/SearchResults';
import Footer from './Blog/partial/Footer';
import BlogPage from './Blog/BlogPage';
import Header from "./Blog/partial/Header";
import Sidebar from "./Blog/partial/Sidebar";

const cacheVersion = '5a00a';
const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

console.log("App Version: " + cacheVersion);


const routes = [
    {path: "/", exact: true, component: BlogHome},
    {path: "/p/:page", exact: true, component: BlogHome},
    {path: "/results", exact: true, component: SearchResults},
    {path: "/post/:slug", exact: true, component: BlogPost},
    {path: "/blog/categories", exact: true, component: Categories},
    {path: "/blog/category/:category", exact: true, component: Category},
    {path: "/:page", exact: true, component: BlogPage}
];

function e404() {
    return (
        <div className="blogHome">
            <h1>Erreur 404</h1>
            <p>La page que vous avez demandé n'a pas été trouvée. Si vous pensez que c'est une erreur, merci de nous en
                informer via le formulaire de contact.</p>
        </div>
    );
}

function App() {
    return (
        <>
            <main>
                <Suspense fallback={<div className="loading">Loading...</div>}>
                    <Header/>
                    <Sidebar/>
                    <Switch>
                        {routes.map(route => (
                            <Route
                                key={route.path}
                                exact={route.exact}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
                        <Route component={e404}/>
                    </Switch>

                </Suspense>
            </main>
            <Footer />
        </>
    )
}

export {App as default, routes, cacheVersion, butter};