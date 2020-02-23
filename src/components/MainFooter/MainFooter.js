import React from 'react';
import './MainFooter.scss'
const toTop = function () {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
}

class MainFooter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <footer id="footer">
                    <strong>
                        CopyrightÃ‚Â© 2018-2019 Bdtask. All rights reserved.   	</strong><i className="fa fa-heart color-green"></i>
                </footer>
                <div id="toTop" onClick={toTop} className="btn back-top"
                    style={{ display: 'block', backgroundColor: '#37a000', borderRadius: '100%' }}>
                    <span className="fa fa-arrow-up text-white"></span></div>
            </>
        );
    }
}

export default MainFooter;