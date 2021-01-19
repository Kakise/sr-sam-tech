import React, {Component} from "react";
import "./Search.css";

class SearchBar extends Component {
    render() {
        return (
            <div className="search-bar">
                <form method="get" action="/results" role="search">
                    <input className="search" id="search" type="search" name="q" placeholder="Rechercher..." required/>
                    <label htmlFor="search" style={{display: 'none'}}>Entrez votre recherche</label>
                </form>
            </div>

        );
    }
}

export default SearchBar;