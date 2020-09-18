import React, { Component, Suspense } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Butter from 'buttercms';
import {Helmet} from "react-helmet";
import './BlogHome.css';

const Header = React.lazy(() => import('./Header'))
const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

class BlogHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false
        };
    }

    fetchPosts(page) {
        butter.post.list({page: page, page_size: 10}).then((resp) => {
            this.setState({
                loaded: true,
                resp: resp.data
            })
        });
    }

    componentDidMount() {
        const page = this.props.match.params.page;

        this.fetchPosts(page)
    }

    render() {
        if (this.state.loaded) {
            const { next_page, previous_page } = this.state.resp.meta;

            return (
                <div>
                    <Helmet>
                        <title>Sam's TechBlog - Accueil</title>
                    </Helmet>
                    <Suspense fallback={<div className="loading">Loading...</div>}>
                        <Header />
                    </Suspense>
                    {this.state.resp.data.map((post) => {
                        return (
                            <div className="post-element">
                                <div className="post-link" key={post.slug}>
                                    <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                </div>
                                <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.summary}} />
                            </div>
                        )
                    })}

                    <br />

                    <div>
                        {previous_page && <Link to={`/p/${previous_page}`}>Prev</Link>}

                        {next_page && <Link to={`/p/${next_page}`}>Next</Link>}
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

export default withRouter(BlogHome);