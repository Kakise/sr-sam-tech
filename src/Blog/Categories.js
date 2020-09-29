import React, {Component, Suspense} from 'react';
import Butter from 'buttercms';
import {Helmet} from "react-helmet";
import {Link} from 'react-router-dom';
import './Categories.css';

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
            <div className="grid">
                <Helmet>
                    <title>Sam's TechBlog - Catégories</title>
                </Helmet>
                <Suspense fallback={<div className="loading">Loading...</div>}>
                    <Header />
                    <Sidebar />
                </Suspense>
                <div className="categories">
                    <h1>Liste des catégories</h1>
                    {this.state.data.map((category, key) => {
                        return (
                            <div className="box" key={key}>
                                <Link to={`/blog/category/${category.slug}`}>{category.name}</Link>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Categories;