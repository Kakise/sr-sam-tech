import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render () {
        return (
            <div className="header">
                <h1>Blog</h1>
                <h4>Sous-titre</h4>
            </div>
        );
    }

}

export default Header;