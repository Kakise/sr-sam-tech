import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import Butter from 'buttercms';
import Header from './partial/Header';
import Sidebar from './partial/Sidebar';
import {Helmet} from "react-helmet";

import './BlogHome.css';
import {cacheVersion} from "../App";

const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

class BlogHome extends Component {
    constructor(props) {
        super(props);

        const page = this.props.match.params.page;
        const cache = JSON.parse(localStorage.getItem(page));

        if (!cache) {
            this.state = {
                loaded: false
            };
        } else if (Date.now() - cache.retrieved < 604800000 && cache.cacheVersion === cacheVersion) { // If cache is younger than a week
            this.state = {
                loaded: true,
                resp: cache
            };
            console.log("Page loaded from cache");
            console.log("Page is " + (Date.now() - this.state.resp.retrieved).toString() + " ms old");
        } else {
            this.state = {
                loaded: false
            };
        }
    }

    loadPage() {
        const page = this.state.resp.data;
        return (
            <>
                <Helmet>
                    <title>{page.fields.seo.title}</title>
                    <meta name="description" content={page.fields.seo.meta_description}/>
                </Helmet>
                <Header/>
                <Sidebar/>
            </>
        )
    }

    fetchPage(page) {
        if (!this.state.loaded) {
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            const preview = params.get('preview');
            let prevParam = {};

            if (preview == 1) {
                prevParam = {
                    'preview': 1
                };
            }

            butter.page.retrieve('*', page, prevParam).then((resp) => {
                resp.data["retrieved"] = Date.now(); // Store cached date
                resp.data["cacheVersion"] = cacheVersion;
                this.setState({
                    loaded: true,
                    resp: resp.data
                })
                if (preview.preview !== 1)
                    localStorage.setItem(page, JSON.stringify(this.state.resp));
            });
        }
    }

    async componentDidMount() {
        const page = this.props.match.params.page;

        this.fetchPage(page);
    }

    render() {
        if (this.state.loaded) {
            const page = this.state.resp.data;
            return (
                <div className="grid">
                    {this.loadPage()}
                    <div className="blogHome" dangerouslySetInnerHTML={{__html: page.fields.body}}>
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