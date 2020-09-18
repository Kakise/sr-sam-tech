import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './Sidebar.css';

class Sidebar extends Component {
    render () {
        return (
            <div className="sidebar">
                <h1>Sidebar</h1>
                <ul>
                    <li>
                        <Link to="/">
                            <div className="box">
                                Accueil
                            </div>
                        </Link>
                    </li>
                    <li>
                        <a href="https://twitter.com/STaaissat">
                            <div style={{float: 'left'}} className="box">
                                <svg viewBox="0 0 24 24" width="1em" height="1em"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66
            10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5
            4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                    </svg>
                            </div>
                        </a>
                        <a href="https://github.com/Kakise">
                            <div style={{float: 'left', margin: '0 0 0 7px'}} className="box">
                                <svg viewBox="0 0 24 24" width="1em" height="1em" className="svelte-f3e4uo">
                                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0
        0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07
        5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65
        5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42
        3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                </svg>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        );
    }

}

export default Sidebar;