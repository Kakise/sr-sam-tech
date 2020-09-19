import React, {Component, Suspense} from 'react';
import Butter from 'buttercms';
import {Helmet} from 'react-helmet';
import './Categories.css';

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
        const category = this.state.data

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
                        {this.state.data.recent_posts.map((post, key) => {
                            return (
                                <div key={key}>
                                    <a href={`/post/${post.slug}`}>{post.title}</a>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default Category;
