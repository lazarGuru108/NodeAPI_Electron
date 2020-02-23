// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json'

class NotFoundPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="container">
        <Link to={routes.HOME}>
          <p>404 Page Not Found</p>
          {/* <p>{this.props.location.pathname}</p> */}
          {/* <p>{this.context.router.getCurrentRoutes()}</p> */}
        </Link>
      </div>
    )
  }
}

export default NotFoundPage;