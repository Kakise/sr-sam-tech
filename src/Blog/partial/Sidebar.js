import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as Github} from '../res/github.svg';
import {ReactComponent as Twitter} from '../res/twitter.svg';
import './Sidebar.css';

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

class Sidebar extends Component {
    render() {
        return (
            <div className="sidebar">
                <h1>Menu</h1>
                <ul>
                    <li>
                        {box("/", "Accueil")}
                    </li>
                    <li>
                        {box("/blog/categories", "Catégories")}
                    </li>
                    <li>
                        <Link to="https://twitter.com/STaaissat">
                            <div style={{float: 'left'}} className="box">
                                <Twitter/>
                            </div>
                        </Link>
                        <Link to="https://github.com/Kakise">
                            <div style={{float: 'left', margin: '0 0 0 7px'}} className="box">
                                <Github/>
                            </div>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }

}

export default Sidebar;