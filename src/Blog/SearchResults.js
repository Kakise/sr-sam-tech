import React, {Component, Suspense} from 'react';
import Butter from 'buttercms'
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {CommentCount} from "disqus-react";
import './BlogHome.css';

const Header = React.lazy(() => import('./partial/Header'))
const Sidebar = React.lazy(() => import('./partial/Sidebar'))
const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

function loadPage() {
    return(
        <>
            <Helmet>
                <title>Sam's TechBlog - Accueil</title>
            </Helmet>
            <Suspense fallback={<div className="loading">Loading...</div>}>
                <Header />
                <Sidebar />
            </Suspense>
        </>
    )
}

class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const query = params.get('q');
        const cache = JSON.parse(sessionStorage.getItem("search_" + query));

        if(!cache) {
            butter.post.search(query, {page: 1, page_size: 100}).then((resp) => {
                this.setState({
                    loaded: true,
                    resp: resp.data,
                    query: query
                })
                sessionStorage.setItem("search_" + query, JSON.stringify(this.state.resp));
            });
        } else {
            this.setState({
                loaded: true,
                resp: cache,
                query: query
            });
            console.log("Post loaded from cache");
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
                            return (
                                <div className="post-element" key={post.slug}>
                                    <div className="post-link">
                                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                    </div>
                                    <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.summary}} />
                                    <div className="comments">
                                        <CommentCount
                                            shortname='sams-techblog'
                                            config={
                                                {
                                                    url: post.url,
                                                    identifier: post.slug,
                                                    title: post.title
                                                }
                                            }
                                        >
                                            Commentaires
                                        </CommentCount>
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
            )
        }
    }
}

export default SearchResults;