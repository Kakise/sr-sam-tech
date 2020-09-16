import React  from 'react';
import { Route, Switch } from 'react-router-dom';
import BlogHome from "./Blog/BlogHome";
import BlogPost from "./Blog/BlogPost";

import './App.css';

function App() {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={BlogHome} />
                <Route path={"/p/:page"} component={BlogHome} />
                <Route path={"/post/:slug"} component={BlogPost} />
            </Switch>
        </main>
    )
}

export default App;