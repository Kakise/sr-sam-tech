import React, {Component} from 'react';
import Butter from 'buttercms'
import { Helmet } from "react-helmet";
import {Link, withRouter} from 'react-router-dom';
import { DiscussionEmbed } from 'disqus-react';


import './BlogPost.css';

const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

function loadPage(name, desc, featured_image) {
    return(
        <>
            <Helmet>
                <title>{name}</title>
                <meta name="description" content={desc} />
                <meta name="og:image" content={featured_image} />
            </Helmet>
            <Link to="/">
                <div className="box">
                    <span>&lt;- Accueil</span>
                </div>
            </Link>
        </>
    )
}
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
                    {loadPage(post.seo_title, post.meta_description, post.featured_image)}
                    <h1 className="post-title">{post.title}</h1>
                    <article className="post-body" dangerouslySetInnerHTML={{__html: post.body}} />
                    <br />
                    <DiscussionEmbed
                        shortname='sams-techblog'
                        config={
                            {
                                identifier: post.slug,
                                url: post.url,
                                title: post.title,
                                language: 'fr'
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