import React, {Component} from "react";
import {Helmet} from "react-helmet";
import Header from "./partial/Header";
import Sidebar from "./partial/Sidebar";
import "./Blog.css";

function loadPage() {
    return (
        <>
            <Helmet>
                <title>Erreur 404</title>
            </Helmet>
            <Header/>
            <Sidebar/>

        </>
    )
}

class NotFoundPage extends Component {

    render() {
            return (
                <div className="grid">
                    {loadPage()}
                    <div className="blogHome">
                        <h1>Erreur 404</h1>
                        <p>
                            La page que vous recherchez n'a pas été trouvée.
                        </p>
                    </div>
                </div>
            )
    }
}

export default NotFoundPage;