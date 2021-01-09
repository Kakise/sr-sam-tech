import React, {Component} from "react";
import "./Footer.css";

class Footer extends Component {
    render() {
        const date = new Date();
        return (
            <footer className="footer">
                <p>Copyright © 2020, {date.getFullYear()} - Sami T | Made using <a href="https://buttercms.com"
                                                                                   className="butter">ButterCMS</a></p>
            </footer>
        );
    }
}

export default Footer;