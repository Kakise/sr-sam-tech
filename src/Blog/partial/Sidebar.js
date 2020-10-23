import React, {Component} from 'react';
import LinkWithPreload from "./LinkWithPreload";
import {ReactComponent as Github} from '../res/github.svg';
import {ReactComponent as Twitter} from '../res/twitter.svg';
import './Sidebar.css';
import Butter from "buttercms";
import {cacheVersion} from "../../App";

const butter = Butter('1f984113d19d94aeba9f2a731197b9993b18a369');

function box(link, text) {
    return (
        <>
            <LinkWithPreload to={link}>
                <div className="box">
                    {text}
                </div>
            </LinkWithPreload>
        </>
    );
}

function loadingDiv() {
    return (
        <div className="loading">
            Loading...
        </div>
    );
}

class Sidebar extends Component {
    constructor(props) {
        super(props);

        const cache = JSON.parse(localStorage.getItem("sidebar"));

        if (!cache) {
            this.state = {
                loaded: false
            };
        } else if (Date.now() - cache.retrieved < 86400000 && cache.cacheVersion === cacheVersion) { // If cache is younger than a day
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

    fetchPages() {
        if (!this.state.loaded) {
            butter.page.list('*').then((resp) => {
                resp.data["retrieved"] = Date.now(); // Store cached date
                resp.data["cacheVersion"] = cacheVersion;
                this.setState({
                    loaded: true,
                    resp: resp.data
                })
                localStorage.setItem("sidebar", JSON.stringify(this.state.resp));
            });
        }
    }

    async componentDidMount() {
        this.fetchPages();
    }

    render() {
        if (this.state.loaded) {
            const links = this.state.resp.data;
            return (
                <div className="sidebar">
                    <h1>Menu</h1>
                    <ul>
                        <li key={"accueil"}>
                            {box("/", "Accueil")}
                        </li>
                        <li key={"categories"}>
                            {box("/blog/categories", "Catégories")}
                        </li>
                        {links.map((link) => {
                            return (
                                <li key={link.slug}>
                                    {box("/" + link.slug, link.name)}
                                </li>
                            );
                        })}
                        <li key={"socials"}>
                            <a href="https://twitter.com/STaaissat">
                                <div style={{float: 'left'}} className="box">
                                    <Twitter/>
                                </div>
                            </a>
                            <a href="https://github.com/Kakise">
                                <div style={{float: 'left', margin: '0 0 0 7px'}} className="box">
                                    <Github/>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            );
        } else {
            return loadingDiv();
        }
    }

}

export default Sidebar;