import React, {Component} from "react";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import CommentCount from "./partial/CommentCount";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import {butter, cacheVersion} from "../App";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt} from "@fortawesome/free-regular-svg-icons";
import "./Blog.css";

function loadPage() {
    return (
        <>
            <Helmet>
                <title>Sam's TechBlog - Accueil</title>
            </Helmet>
            <Header/>
            <Sidebar/>
        </>
    )
}

class SearchResults extends Component {
    constructor(props) {
        super(props);

        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const query = params.get('q');
        const cache = JSON.parse(sessionStorage.getItem("search_" + query));

        if (!cache) {
            this.state = {
                loaded: false
            }
        } else if (Date.now() - cache.retrieved < 86400000 && cache.cacheVersion === cacheVersion) {
            this.state = {
                resp: cache,
                query: query
            };
            console.log("Query loaded from cache");
        } else {
            this.state = {
                loaded: false
            }
        }
    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const query = params.get('q');

        if (!this.state.loaded) {
            butter.post.search(query, {page: 1, page_size: 100}).then((resp) => {
                resp.data["cacheVersion"] = cacheVersion;
                resp.data.retrieved = Date.now();
                this.setState({
                    resp: resp.data,
                    query: query,
                    loaded: true
                });
                sessionStorage.setItem("search_" + query, JSON.stringify(this.state.resp));
            }).catch(function(resp) {
                window.location.href = "/404";
            });
        }
    }

    render() {
        if (this.state.loaded) {
            return (
                <div className="grid">
                    {loadPage()}
                    <div className="blogHome">
                        <h1>Résultats correspondants à : "{this.state.query}"</h1>
                        {this.state.resp.data.map((post) => {
                            const d = new Date(Date.parse(post.updated));
                            return (
                                <div className="post-element" key={post.slug}>
                                    <div className="post-link">
                                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                    </div>
                                    <p className="post-date">
                                        <FontAwesomeIcon icon={faCalendarAlt}/>&nbsp;&nbsp;{d.toLocaleString('fr-FR')}
                                    </p>
                                    <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.summary}}/>
                                    <div className="comments">
                                        <CommentCount
                                            clientId='857362afdf6cb80d03d3'
                                            clientSecret='eebbfa120cbea84c449100e592a48fe1dd521b23'
                                            owner="Kakise"
                                            repo="gitalk"
                                            title={post.title}/>
                                    </div>
                                </div>
                            )
                        })}
                        {this.state.resp.data.length === 0 &&
                        <h2>Aucun article ne correspond à votre recherche</h2>
                        }
                    </div>
                </div>
            );
        } else {
            return (
                <div className="loading">
                    Loading...
                </div>
            );
        }
    }
}

export default SearchResults;