import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import Butter from 'buttercms'
import {Helmet} from "react-helmet";

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
                    {this.state.resp.data.map((post) => {
                        return (
                            <div className="post-link" key={post.slug}>
                                <Link to={`/post/${post.slug}`}>{post.title}</Link>
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

class Categories extends React.Component {
    state = {
        data: []
    }
    async componentDidMount () {
        const resp = await butter.category.list()
        this.setState(resp.data)
    }
    render () {
        return (
            <div>
                {this.state.data.map((category, key) => {
                    return (
                        <div key={key}>
                            <a href={`/blog/category/${category.slug}`}>{category.name}</a>
                        </div>
                    )
                })}
            </div>
        )
    }
}

class Category extends React.Component {
    state = {
        data: {
            recent_posts: []
        }
    }
    async componentDidMount () {
        const { match } = this.props
        const resp = await butter.category.retrieve(match.params.category, {
            include: 'recent_posts'
        })
        this.setState(resp.data)
    }
    render () {
        const category = this.state.data

        return (
            <div>
                <h1>{category.name}</h1>
                <div>
                    {this.state.data.recent_posts.map((post, key) => {
                        return (
                            <div key={key}>
                                <a href={`/blog/posts/${post.slug}`}>{post.title}</a>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

const RoutedBlogHome = withRouter(BlogHome);

export {
    RoutedBlogHome as BlogHome,
    Categories,
    Category
};