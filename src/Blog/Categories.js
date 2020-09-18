import React, {Component, Suspense} from 'react';
import Butter from 'buttercms';
import {Helmet} from "react-helmet";

const Header = React.lazy(() => import('./partial/Header'))
const Sidebar = React.lazy(() => import('./partial/Sidebar'))
const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');


class Categories extends Component {
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
                <Helmet>
                    <title>Sam's TechBlog - Catégories</title>
                </Helmet>
                <Suspense fallback={<div className="loading">Loading...</div>}>
                    <Header />
                    <Sidebar />
                </Suspense>

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

export default Categories;