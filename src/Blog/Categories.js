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
        const cache = JSON.parse(sessionStorage.getItem("categories"));

        if (!cache) {
            const resp = await butter.category.list()
            this.setState(resp.data);
            sessionStorage.setItem("categories", JSON.stringify(this.state.data));
        } else {
            this.setState({data: cache});
            console.log("Page loaded from cache");
        }

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
                            <Link to={`/blog/category/${category.slug}`}>
                                <div className="box" key={key}>
                                    <span>{category.name}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Categories;