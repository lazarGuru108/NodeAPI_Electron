import React from "react"
import { Layout } from "antd";

class AdminLayout extends React.Component {

    render() {
        return (
            <Layout id={this.props.id}>
                {this.props.children}
            </Layout>
        );
    }
}

export default AdminLayout;