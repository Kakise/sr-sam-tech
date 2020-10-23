import React, {Component} from 'react';
import Butter from 'buttercms';
import {Helmet} from 'react-helmet';
import Header from './partial/Header';
import Sidebar from './partial/Sidebar';
import './Category.css';
import LinkWithPreload from "./partial/LinkWithPreload";
import {cacheVersion} from "../App";

const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

function loadPage(name) {
    return (
        <>
            <Helmet>
                <title>{`Sam's TechBlog - ${name}`}</title>
            </Helmet>
            <Header/>
            <Sidebar/>

        </>
    )
}

function loadingDiv() {
    return (
        <div className="loading">
            Loading...
        </div>
    );
}

class Category extends Component {
    constructor(props) {
        super(props);

        const {match} = this.props;
        const cache = JSON.parse(localStorage.getItem("category_" + match.params.category));

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
            const {match} = this.props;
            butter.category.retrieve(match.params.category, {
                include: 'recent_posts'
            }).then((resp) => {
                resp.data.retrieved = Date.now();
                resp.data["cacheVersion"] = cacheVersion;
                this.setState({
                    loaded: true,
                    resp: resp.data,
                });
                localStorage.setItem("category_" + match.params.category, JSON.stringify(resp.data));
            });
        }
    }

    render() {

        if (this.state.loaded) {
            const category = this.state.resp.data;
            return (
                <div className="grid">
                    {loadPage(category.name)}
                    <div className="categories">
                        <h1>{category.name}</h1>
                        <div>
                            {category.recent_posts.map((post, key) => {
                                return (
                                    <div className="post-element" key={key}>
                                        <div className="post-link">
                                            <LinkWithPreload to={`/post/${post.slug}`}>{post.title}</LinkWithPreload>
                                        </div>
                                        <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.summary}}/>
                                    </div>
                                )
                            })}
                            {category.recent_posts.length === 0 &&
                            <h2>Aucun article dans cette catégorie</h2>
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            return loadingDiv();
        }
    }
}

export default Category;