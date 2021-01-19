import React, {Component} from "react";
import SearchBar from "./Search";
import "./Header.css";

class Header extends Component {
    render() {
        return (
            <>
                <div className="header">
                    <h1 onClick={() => {
                        window.location.href = "/";
                    }}>Sam's TechBlog</h1>
                    <p>Bienvenue sur mon site web ! Ici vous trouverez mes articles, projets et plein d'autres choses !
                        :)</p>
                </div>
                <SearchBar/>
            </>
        );
    }
}

export default Header;