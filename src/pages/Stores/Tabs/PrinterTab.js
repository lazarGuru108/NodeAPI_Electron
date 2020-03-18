import React from 'react';
import 'antd/dist/antd.css';
import '../ManageStores.scss';
import { Select, Button, Icon } from 'antd';
import noImage from '../../../assets/images/noimage.jpg'
import { Link } from 'react-router-dom';

const { Option } = Select;

class PrinterTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allPrinters: [
                'epson 1',
                'epson 2',
                'epson 3',
                'epson 4',
            ],
            
            formData: { printers: [] }
        }
        this.saveHandler = this.saveHandler.bind(this);
        this.resetHandler = this.resetHandler.bind(this);
    }

    componentWillReceiveProps(props) {
        this.setState({ formData: { ...props.initData } });
    }

    componentDidMount() {
        this.setState({ formData: { ...this.props.initData } });
    }

    changeName = (e) => {
        this.setState({ codeName: e.target.value });
    }

    handleFieldChange = (e, field, s = undefined) => {
        let val = e;
        let otherFields = ['group', 'status', 'country'];
        let formData = this.state.formData;
        if (otherFields.indexOf(field) === -1) {
            val = e.target.value;
        }

        if (field === 'printerSelect') {
            val = e.target.checked;
            let printers = val ? this.state.allPrinters : [];
            console.log(val, printers);
            formData.printerSelect = val;
            formData.printers = printers;
            this.setState({ formData }, () => {
                console.log(this.state.formData);
            });
        }
       
        if (field === 'printers') {

            val = e.target.checked;
            let printers = this.state.formData.printers || [];
            if (!val) {
                printers = printers.filter((ss) => ss !== s);
            } else {
                printers.push(s);
            }
            val = printers;
        }

        this.setState({ formData: { ...formData, [field]: val } }, () => {console.log(field,val);
        });
    }

    handleSearchPrinter = (e) => {
        let val = e.target.value;

    }

    saveHandler() {
        // validation code here
        this.props.onSave(this.state.formData);
    }

    resetHandler() {
        this.setState({ formData: { printers: [] } });
    }

    render() {
        let {printerSelect, printers } = this.state.formData;
            console.log(this.state.formData);
        // console.log(group);
        // let repassword = '';
        return (
            <>
                <div className="editForm">
                    <form action="/action_page.php" className="needs-validation">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-3 title">
                                    <label htmlFor="uname">Printer <i className="required">*</i></label>
                                </div>
                                <div className="col-7">
                                    <label className="form-check-label" >
                                        <input type="checkbox" className="form-check-input" required
                                            checked={printerSelect || false}
                                            name="printerSelect" onChange={(e) => { this.handleFieldChange(e, 'printerSelect') }} />
                                        <span>select/deselect</span>
                                    </label>
                                    <div>
                                        <input type="text" className="form-control" required name="searchStore"
                                            onChange={(e) => { this.handleSearchPrinter(e) }} />
                                    </div>
                                    <div className="form-check-fields" style={{ background: '#f5f5f5', padding: '15px 0px 0px' }}>
                                        {
                                            this.state.allPrinters.map((s, key) => {

                                                let isSelected = printers.indexOf(s) > -1;
                                                return (
                                                    <div key={key}>
                                                        <label className="form-check-label" >
                                                            <input type="checkbox" className="form-check-input" required checked={isSelected}
                                                                name="printers" onChange={(e) => { this.handleFieldChange(e, 'printers', s) }}
                                                            /><span style={{color: "#555"}}>{s}</span>
                                                        </label>
                                                    </div>
                                                )
                                            }
                                            )
                                        }
                                    </div>
                                </div>
                                <div className="valid-feedback">Valid.</div>
                                <div className="invalid-feedback">Please fill out this field.</div>
                            </div>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}

export default PrinterTab;