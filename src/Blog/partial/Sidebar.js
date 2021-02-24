import React, {Component} from "react";
import {ReactComponent as Github} from "../res/github.svg";
import {ReactComponent as Twitter} from "../res/twitter.svg";
import {butter, cacheVersion} from "../../App";
import "./Sidebar.css";
import {Link} from "react-router-dom";

function box(link, text) {
    return (
        <>
            <Link to={link}>
                <div className="box">
                    {text}
                </div>
            </Link>
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
                sideBarLoaded: false
            };
        } else if (Date.now() - cache.retrieved < 86400000 && cache.cacheVersion === cacheVersion) { // If cache is younger than a day
            this.state = {
                sideBarLoaded: true,
                SBResp: cache
            };
            console.log("Page loaded from cache");
            console.log("Page is " + (Date.now() - this.state.SBResp.retrieved).toString() + " ms old");
        } else {
            this.state = {
                sideBarLoaded: false
            };
        }
    }

    fetchPages() {
        if (!this.state.sideBarLoaded) {
            butter.page.list('default').then((resp) => {
                resp.data["retrieved"] = Date.now(); // Store cached date
                resp.data["cacheVersion"] = cacheVersion;
                let index = 0;
                let i;
                for (i = 0; i < resp.data.data.length; i++) {
                    if (resp.data.data[i].slug === "404")
                        index = i;
                }
                resp.data.data.splice(index, 1);
                this.setState({
                    sideBarLoaded: true,
                    SBResp: resp.data
                })
                localStorage.setItem("sidebar", JSON.stringify(this.state.SBResp));
            });
        }
    }

    async componentDidMount() {
        this.fetchPages();
    }


    render() {
        if (this.state.sideBarLoaded) {
            const links = this.state.SBResp.data;
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