import React, { Component } from 'react';
import Butter from 'buttercms'
import { Helmet } from "react-helmet";
import {Link, withRouter} from 'react-router-dom';
import { DiscussionEmbed } from 'disqus-react';


import './BlogPost.css';

const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

class BlogPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    componentDidMount() {
        const slug = this.props.match.params.slug;

        butter.post.retrieve(slug).then((resp) => {
            this.setState({
                loaded: true,
                post: resp.data.data
            })
        });
    }

    render() {
        if (this.state.loaded) {
            const post = this.state.post;

            return (
                <div className="post">
                    <Helmet>
                        <title>{post.seo_title}</title>
                        <meta name="description" content={post.meta_description} />
                        <meta name="og:image" content={post.featured_image} />
                    </Helmet>
                    <div className="box">
                        <Link to="/">&lt;- Accueil</Link>
                    </div>
                    <h1 className="post-title">{post.title}</h1>
                    <article className="post-body" dangerouslySetInnerHTML={{__html: post.body}} />
                    <br />
                    <DiscussionEmbed
                        shortname='sams-techblog'
                        config={
                            {
                                identifier: post.id,
                                title: post.title,
                                language: 'fr_FR' //e.g. for Traditional Chinese (Taiwan)
                            }
                        }
                    />
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

export default withRouter(BlogPost);