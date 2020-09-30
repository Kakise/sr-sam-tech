import React, { Component } from 'react';
import './Search.css';

class SearchBar extends Component {
    render() {
        return(
            <div className="search-bar">
                <form method="get" action="/results" role="search">
                    <input id="search" type="search" name="q" placeholder="Rechercher..." autoFocus required/>
                    <button type="submit">Go</button>
                </form>
            </div>

        );
    }
}

export default SearchBar;