import React, {Component} from 'react';
import './Header.css';

class Header extends Component {
    render () {
        return (
            <div className="header">
                <h1>Sam's TechBlog</h1>
                <h4>Bienvenue sur mon site web ! Ici vous trouverez mes articles, projets et plein d'autres choses ! :)</h4>
            </div>
        );
    }

}

export default Header;