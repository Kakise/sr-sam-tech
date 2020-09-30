import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { ReactComponent as Github } from '../res/github.svg';
import { ReactComponent as Twitter } from '../res/twitter.svg';
import './Sidebar.css';

class Sidebar extends Component {
    render () {
        return (
            <div className="sidebar">
                <h1>Menu</h1>
                <ul>
                    <li>
                        <Link to="/">
                            <div className="box">
                                Accueil
                            </div>
                        </Link>
                    </li>
                    <li>
                    <Link to="/blog/categories">
                        <div className="box">
                            Catégories
                        </div>
                    </Link>
                </li>
                    <li>
                        <a href="https://twitter.com/STaaissat">
                            <div style={{float: 'left'}} className="box">
                                <Twitter />
                            </div>
                        </a>
                        <a href="https://github.com/Kakise">
                            <div style={{float: 'left', margin: '0 0 0 7px'}} className="box">
                                <Github />
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }

}

export default Sidebar;