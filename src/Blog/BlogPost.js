import React, {Component} from 'react';
import Butter from 'buttercms';
import {Helmet} from "react-helmet";
import {withRouter} from 'react-router-dom';
import GitalkComponent from "gitalk/dist/gitalk-component";
import Highlight from 'react-highlight';
import LinkWithPreload from "./partial/LinkWithPreload";

import 'gitalk/dist/gitalk.css';
import 'highlight.js/styles/solarized-light.css';
import './BlogPost.css';
import {cacheVersion} from "../App";

const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

function loadPage(name, desc, featured_image) {
    return (
        <>
            <Helmet>
                <title>{name}</title>
                <meta name="description" content={desc}/>
                <meta name="og:image" content={featured_image}/>
            </Helmet>
            <LinkWithPreload to="/">
                <div className="box">
                    <span>&lt;- Accueil</span>
                </div>
            </LinkWithPreload>
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

class BlogPost extends Component {

    constructor(props) {
        super(props);

        const slug = this.props.match.params.slug;
        const cache = JSON.parse(localStorage.getItem(slug));

        // Idk how to code lmao
        if (!cache) {
            this.state = {
                loaded: false
            };
        } else if (Date.now() - cache.retrieved < 604800000 && cache.cacheVersion === cacheVersion) { // If cache is younger than a week
            this.state = {
                loaded: true,
                post: cache
            };
        } else {
            this.state = {
                loaded: false
            };
        }
    }

    async componentDidMount() {
        const slug = this.props.match.params.slug;

        if (!this.state.loaded) {
            // Retrieve post if not in localStorage
            butter.post.retrieve(slug).then((resp) => {
                resp.data.data["retrieved"] = Date.now();
                resp.data["cacheVersion"] = cacheVersion;
                this.setState({
                    loaded: true,
                    post: resp.data.data
                })
                if (this.state.post.status === "published")
                    localStorage.setItem(slug, JSON.stringify(this.state.post));
            });
        } else {
            console.log("Post loaded from cache");
            console.log("Post is " + (Date.now() - this.state.post.retrieved).toString() + " ms old");
        }
    }

    render() {
        if (this.state.loaded) {
            const post = this.state.post;

            return (
                <div className="post">
                    {loadPage(post.seo_title, post.meta_description, post.featured_image)}
                    <h1 className="post-title">{post.title}</h1>
                    <article className="post-body">
                        <Highlight innerHTML={true}>
                            {post.body}
                        </Highlight>
                    </article>
                    <br/>
                    <GitalkComponent options={{
                        clientID: '857362afdf6cb80d03d3',
                        clientSecret: 'eebbfa120cbea84c449100e592a48fe1dd521b23',
                        repo: 'gitalk',      // The repository of store comments,
                        owner: 'Kakise',
                        admin: ['Kakise'],
                        id: post.url.slice(0, 49),      // Ensure uniqueness and length less than 50
                        title: post.title,
                        language: 'fr',
                        distractionFreeMode: false  // Facebook-like distraction free mode
                    }}/>
                </div>
            );
        } else {
            return loadingDiv();
        }
    }
}

export default withRouter(BlogPost);