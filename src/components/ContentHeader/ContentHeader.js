import React from 'react';
import './ContentHeader.scss';

class ContentHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div id="contentheader">
                <section className="content-header">
                    <div className="header-icon">
                        <i className="pe-7s-world"></i>

                    </div>
                    <div className="header-title">
                        <h1>{this.props.title}</h1>
                        <small>{this.props.subTitle || 'Home'}</small>
                        <ol className="breadcrumb">
                            <li><a href="#"><i className="pe-7s-home"></i> {this.props.subTitle || 'Home'}</a></li>
                            <li className="active">{this.props.title}</li>
                        </ol>
                    </div>
                </section>
            </div>

        );
    }
}

export default ContentHeader;