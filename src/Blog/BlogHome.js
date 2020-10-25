import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import {Helmet} from "react-helmet";
import CommentCount from "./partial/CommentCount";
import LinkWithPreload from "./partial/LinkWithPreload";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import "./BlogHome.css";
import {butter, cacheVersion} from "../App";


function loadPage() {
    return (
        <>
            <Helmet>
                <title>Sam's TechBlog</title>
            </Helmet>
            <Header/>
            <Sidebar/>
        </>
    )
}

class BlogHome extends Component {
    constructor(props) {
        super(props);

        const page = this.props.match.params.page !== undefined ? this.props.match.params.page : 1;
        const cache = JSON.parse(localStorage.getItem("home_" + page));

        if (!cache) {
            this.state = {
                loaded: false
            };
        } else if (Date.now() - cache.retrieved < 86400000 && cache.cacheVersion === cacheVersion) { // If cache is younger than a day
            this.state = {
                loaded: true,
                resp: cache
            };
            console.log("Page loaded from cache");
            console.log("Page is " + (Date.now() - this.state.resp.retrieved).toString() + " ms old");
        } else {
            this.state = {
                loaded: false
            };
        }
    }

    fetchPosts(page) {
        if (!this.state.loaded) {
            butter.post.list({page: page, page_size: 10}).then((resp) => {
                resp.data["cacheVersion"] = cacheVersion;
                resp.data["retrieved"] = Date.now(); // Store cached date
                this.setState({
                    loaded: true,
                    resp: resp.data
                })
                localStorage.setItem("home_" + page, JSON.stringify(this.state.resp));
            });
        }
    }

    async componentDidMount() {
        const page = this.props.match.params.page !== undefined ? this.props.match.params.page : 1;

        this.fetchPosts(page)
    }

    render() {
        if (this.state.loaded) {
            const { next_page, previous_page } = this.state.resp.meta;

            return (
                <div className="grid">
                    {loadPage()}
                    <div className="blogHome">
                        <h1>Articles</h1>
                        {this.state.resp.data.map((post) => {
                            return (
                                <div className="post-element" key={post.slug}>
                                    <div className="post-link">
                                        <LinkWithPreload to={`/post/${post.slug}`}>{post.title}</LinkWithPreload>
                                    </div>
                                    <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.summary}}/>
                                    <div className="comments">
                                        <CommentCount
                                            clientId='857362afdf6cb80d03d3'
                                            clientSecret='eebbfa120cbea84c449100e592a48fe1dd521b23'
                                            owner="Kakise"
                                            repo="gitalk"
                                            title={post.title}
                                            slug={post.slug}/>
                                    </div>
                                </div>
                            )
                        })}

                        <br />

                        <div>
                            {previous_page && <LinkWithPreload to={`/p/${previous_page}`}>Prev</LinkWithPreload>}

                            {next_page && <LinkWithPreload to={`/p/${next_page}`}>Next</LinkWithPreload>}
                        </div>
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

export default withRouter(BlogHome);