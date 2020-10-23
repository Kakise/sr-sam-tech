import React, {Component, Suspense} from 'react';
import Butter from 'buttercms';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import './Categories.css';

const Header = React.lazy(() => import('./partial/Header'));
const Sidebar = React.lazy(() => import('./partial/Sidebar'));
const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

function loadingDiv() {
    return (
        <div className="loading">
            Loading...
        </div>
    );
}

class Categories extends Component {
    constructor(props) {
        super(props);

        const cache = JSON.parse(localStorage.getItem("categories"));

        if (!cache) {
            this.state = {
                loaded: false
            };
        } else if (Date.now() - cache.retrieved < 86400000) {
            this.state = {
                loaded: true,
                resp: cache,
            };
            console.log("Page loaded from cache");
            console.log("Page is " + (Date.now() - this.state.resp.retrieved).toString() + " ms old");
        } else {
            this.state = {
                loaded: false,
            };
        }

    }

    async componentDidMount() {
        if (!this.state.loaded) {
            butter.category.list().then((resp) => {
                resp.data.retrieved = Date.now();
                this.setState({
                    loaded: true,
                    resp: resp.data,
                });
                localStorage.setItem("categories", JSON.stringify(resp.data));
            });
        }
    }

    render() {
        if (this.state.loaded) {
            return (
                <div className="grid">
                    <Helmet>
                        <title>Catégories</title>
                    </Helmet>
                    <Suspense fallback={<div className="loading">Loading...</div>}>
                        <Header/>
                        <Sidebar/>
                    </Suspense>
                    <div className="categories">
                        <h1>Liste des catégories</h1>
                        {this.state.resp.data.map((category, key) => {
                            return (
                                <Link to={`/blog/category/${category.slug}`} key={key}>
                                    <div className="box">
                                        <span>{category.name}</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            )
        } else {
            return loadingDiv();
        }
    }
}

export default Categories;