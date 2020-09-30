import React, {Component, Suspense} from 'react';
import Butter from 'buttercms';
import {Helmet} from 'react-helmet';
import {Link} from "react-router-dom";
import './Category.css';

const Header = React.lazy(() => import('./partial/Header'))
const Sidebar = React.lazy(() => import('./partial/Sidebar'))
const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

class Category extends Component {
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
        const category = this.state.data;

        let noPosts = false;
        if (this.state.data.recent_posts.length === 0)
            noPosts = true;


        return (
            <div className="grid">
                <Helmet>
                    <title>{ `Sam's TechBlog - ${ category.name }` }</title>
                </Helmet>
                <Suspense fallback={<div className="loading">Loading...</div>}>
                    <Header />
                    <Sidebar />
                </Suspense>
                <div className="categories">
                    <h1>{category.name}</h1>
                    <div>
                        {category.recent_posts.map((post, key) => {
                            return (
                                <div className="post-element" key={key} onClick={() => {window.location.href = `/post/${post.slug}`;}}>
                                    <div className="post-link">
                                        <Link to={`/post/${post.slug}`}>{post.title}</Link>
                                    </div>
                                    <div className="post-excerpt" dangerouslySetInnerHTML={{__html: post.summary}} />
                                </div>
                            )
                        })}
                        {noPosts &&
                            <h2>Aucun article dans cette catégorie</h2>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Category;