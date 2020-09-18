import React, {Suspense}  from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

const BlogHome = React.lazy(() =>  import('./Blog/BlogHome'));
const BlogPost = React.lazy(() =>  import('./Blog/BlogPost'));
const Categories = React.lazy(() =>  import('./Blog/Categories'));
const Category = React.lazy(() =>  import('./Blog/Category'));

function App() {
    return (
        <main>
            <Suspense fallback={<div className="loading">Loading...</div> }>
                <Router>
                    <Switch>
                        <Route exact path="/" component={BlogHome} />
                        <Route path="/p/:page" component={BlogHome} />
                        <Route path="/post/:slug" component={BlogPost} />
                        <Route path="/blog/categories" component={Categories} />
                        <Route path="/blog/category/:category" component={Category} />
                    </Switch>
                </Router>
            </Suspense>
        </main>
    )
}

export default App;