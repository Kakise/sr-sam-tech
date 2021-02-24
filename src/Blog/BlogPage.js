import React, {Component} from "react";
import {withRouter} from "react-router-dom";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import {Helmet} from "react-helmet";
import {butter, cacheVersion} from "../App";
import "./Blog.css";


class BlogPage extends Component {
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

    componentWillUnmount() {
        this.unlisten();
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

    fetchPage(page, chgPage) {
        if (!this.state.loaded || chgPage) {
            const search = this.props.location.search;
            const params = new URLSearchParams(search);
            const preview = params.get('preview') ? 1 : 0;

            butter.page.retrieve('default', page, {'preview': preview}).then((resp) => {
                resp.data["retrieved"] = Date.now(); // Store cached date
                resp.data["cacheVersion"] = cacheVersion;
                this.setState({
                    loaded: true,
                    resp: resp.data
                })
                if (!preview)
                    localStorage.setItem(page, JSON.stringify(this.state.resp));
            }).catch(function (resp) {
                // TODO: Catch 404 ?
                // window.location.href = "/404";
            });
        }
    }

    componentDidMount() {
        let chgPage = false;
        this.unlisten = this.props.history.listen((location, action) => {
            console.log("Page changed")
            console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
            console.log(`The last navigation action was ${action}`)
            chgPage = true;
            this.fetchPage(location.pathname.split("/")[1], chgPage);
        });
        const page = this.props.match.params.page;

        this.fetchPage(page, chgPage);
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

export default withRouter(BlogPage);