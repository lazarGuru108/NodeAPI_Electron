import React from 'react';
import 'antd/dist/antd.css';
import '../ManageStores.scss';
import { Button, Icon, Card, Avatar } from 'antd';
import Meta from 'antd/lib/card/Meta';
import noLogo from '../../../assets/images/1_logo.png';
import noFavicon from '../../../assets/images/1_favicon.png';

class EmailTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logoSelected: false,
            backgroundSelected: false,
            logoFile: null,
            backgroundFile: null,
            formData: {}
        }

    }

    componentWillReceiveProps(props) {
        this.setState({ formData: { ...props.initData } });
    }

    componentDidMount() {
        this.setState({ formData: { ...this.props.initData } });
    }

    uploadLogo = () => {
        console.log('sfo');
    }
    onSelect =(e,type) => {
        console.log('sjofhweoihfgoweihg',e.target.files);
        let files = e.target.files;
        this.setState({[type]: files[0]});
        

    }

    render() {
        let { ftpHostname, ftpUsername, ftpPassword } = this.state.formData;
        let { logoSelected, backgroundSelected, logoFile, backgroundFile } = this.state;
        console.log(backgroundFile,logoFile);
        return (
            <>
                <div className="container-fluid" id="LogoTab">
                    <div className="between"></div>
                    <div className="titleContainer">
                        <label className="title" style={{color:"#555"}}>Logo</label>
                    </div>
                    <div className="group" style={{backgroundColor:"#fafafa"}}>
                        <div className="row">
                            <div className="col-md-3 col-12 col-sm-12"></div>
                            <div className="col-md-2 col-12 col-sm-12" style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <img src={logoSelected ? noLogo : noLogo} />
                                    <label style={{ width: '100%', marginTop: '10px' }}>
                                        Max. 100 kb
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-5 col-12 col-sm-12" >
                                <div className="upload-field">
                                    <input className="file-field" type="file" name="file" id="file" required="" onChange={(e) => this.onSelect(e,'logoFile')} />
                                    <button type="submit" className="btn btn-sm btn-warning btn-logo-upload form-btn" data-loading-text="Uploading..." onClick={() => this.uploadLogo()}>
                                        <span className="fa fa-fw fa-upload"></span>
                                        Upload
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-2 col-12 col-sm-12"></div>
                        </div>
                    </div>
                    <div className="between"></div>
                    <div className="titleContainer">
                        <label className="title" style={{color:"#555"}}>Background</label>
                    </div>
                    <div className="group" style={{backgroundColor:"#fafafa"}}>
                        <div className="row">
                            <div className="col-md-3 col-12 col-sm-12"></div>
                            <div className="col-md-2 col-12 col-sm-12" style={{
                                alignItems: 'center',
                                display: 'flex',
                                justifyContent: 'center',
                            }}>
                                <div style={{ textAlign: 'center' }}>
                                    <img src={backgroundSelected ? noFavicon : noFavicon} />
                                    <label style={{ width: '100%', marginTop: '10px' }}>
                                        Max. 50 kb
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-5 col-12 col-sm-12" >
                                <div className="upload-field">
                                    <input className="file-field" type="file" name="file" id="file" required=""  onChange={(e) => this.onSelect(e,'backgroundFile')} />
                                    <button type="submit" className="btn btn-sm btn-warning btn-logo-upload form-btn" data-loading-text="Uploading...">
                                        <span className="fa fa-fw fa-upload"></span>
                                        Upload
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-2 col-12 col-sm-12"></div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default EmailTab;