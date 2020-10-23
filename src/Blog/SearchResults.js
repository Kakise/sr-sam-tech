import React, {Component} from 'react';
import Butter from 'buttercms'
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import CommentCount from "./partial/CommentCount";
import Header from './partial/Header';
import Sidebar from './partial/Sidebar';
import './BlogHome.css';

const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

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
        this.state = {
            query: null
        }
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const query = params.get('q');
        const cache = JSON.parse(sessionStorage.getItem("search_" + query));

        if(!cache) {
            butter.post.search(query, {page: 1, page_size: 100}).then((resp) => {
                this.state = {
                    resp: resp.data,
                    query: query
                };
                sessionStorage.setItem("search_" + query, JSON.stringify(this.state.resp));
            });
        } else {
            this.state = {
                resp: cache,
                query: query
            };
            console.log("Query loaded from cache");
        }
    }

    render() {
            return (
                <div className="grid">
                    {loadPage()}
                    <div className="blogHome">
                        <h1>Résultats correspondants à : "{this.state.query}"</h1>
                        {this.state.resp.data.map((post) => {
                            return (
                                <div className="post-element" key={post.slug}>
                                    <div className="post-link">
                                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                    </div>
                                    <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.summary}} />
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

    }
}

export default SearchResults;