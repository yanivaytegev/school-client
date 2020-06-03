import React, { Component } from 'react';
import '../../App.css';


class Footer extends Component {


    render() {
        return (

            <div>
                <footer>
                    <div className="roww">
                        <div className="col-md-4">
                            <span className="copyright">Copyright © Your Website 2014</span>
                        </div>
                        <div className="col-md-4">
                            <ul >
                                <li><a href="https://twitter.com/explore"><i className="fa fa-twitter"></i></a>
                                </li>
                                <li><a href="https://www.facebook.com/"><i className="fa fa-facebook"></i></a>
                                </li>
                                <li><a href="https://www.linkedin.com/"><i className="fa fa-linkedin"></i></a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <ul>
                                <li><a href="https://protfolio-ya-cv.web.app/">My Protfolio</a>
                                </li>
                                <li><a href="https://www.facebook.com/">Source Code</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

export default Footer; 