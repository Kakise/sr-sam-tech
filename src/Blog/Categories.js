import React, {Component} from "react";
import {Helmet} from "react-helmet";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import LinkWithPreload from "./partial/LinkWithPreload";
import "./Categories.css";
import {butter, cacheVersion} from "../App";

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
        } else if (Date.now() - cache.retrieved < 86400000 && cache.cacheVersion === cacheVersion) {
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
                resp.data.cacheVersion = cacheVersion;
                this.setState({
                    loaded: true,
                    resp: resp.data,
                });
                localStorage.setItem("categories", JSON.stringify(resp.data));
            }).catch(function(resp) {
                window.location.href = "/404";
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
                    <Header/>
                    <Sidebar/>
                    <div className="categories">
                        <h1>Liste des catégories</h1>
                        {this.state.resp.data.map((category, key) => {
                            return (
                                <LinkWithPreload to={`/blog/category/${category.slug}`} key={key}>
                                    <div className="box">
                                        <span>{category.name}</span>
                                    </div>
                                </LinkWithPreload>
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