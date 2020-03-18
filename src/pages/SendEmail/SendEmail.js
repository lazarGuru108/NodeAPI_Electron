import React, { Component } from 'react';
import './SendEmail.scss';
import { Select, Button, Icon } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import emailjs from 'emailjs-com';
import FloatingInput from '../../components/FormControls/FloatingInput/FloatingInput';

const { Option } = Select;

class SendEmail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uname: '',
            email: '',
            phone: '',
            message: '',
            files: [],
            allSubject: [
                { value: 'subject1', name: 'subject1' },
                { value: 'subject2', name: 'subject2' },
                { value: 'subject3', name: 'subject3' },
            ]
        }
        this.onChange = this.onChange.bind(this);
    }

    handleFieldChange = (e, field) => {
        let value;
        if (field !== 'subject' && field !== 'file')
            value = e.target.value
        if (field === 'subject')
            value = e;
        if (field === 'file')
            console.log(e);
        this.setState({ [field]: value });
    }

    onChange(e) {
        var files = e.target.files;
        console.log(files);
        var filesArr = Array.prototype.slice.call(files);
        console.log(filesArr);
        this.setState({ files: [...this.state.files, ...filesArr] });
    }

    removeFile(f) {
        this.setState({ files: this.state.files.filter(x => x !== f) });
    }

    sendDetails = () => {
        let { uname, email, message, phone, files } = this.state;
        emailjs.init("user_3P1KByT6DzwMjmLt6xjGJ");
        let template_params = {
            "reply_to": email,
            "from_name": uname,
            "to_name": "",
            "message_html": message,
            "phone": phone,
            "attachment": files[0],
        }

        let service_id = "default_service";
        let template_id = "template_5aIkUkem";
        emailjs.send(service_id, template_id, template_params)
            .then(function (response) {
                alert('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
        console.log(uname, email, message, phone, files[0]);
    }

    render() {
        let { uname, email, phone, subject, message } = this.state;
        return (
            <div className="container" id="sendemail">
                {/* <div className="form-title">Please provide your details below</div> */}
                <form action="/action_page.php" className="email-form">
                    <div className="form-title">Please provide your details below</div>
                    {/* <div className="formgroup">
                        <input type="text" className="form-control" name="uname" placeholder=" " onChange={(e) => this.handleFieldChange(e, 'uname')}
                            name="uname" required value={uname || ''} />
                        <label htmlFor="uname">Your Name </label>
                        <div className="valid-feedback">Valid.</div>
                        <div className="invalid-feedback">Please fill out this field.</div>
                    </div> */}
                    <div className="form-group">
                        <div className="row">
                            <div className="col-3 title">
                                <label htmlFor="uname">Your Name </label>
                            </div>
                            <div className="col-7">
                                <input type="text" className="form-control" name="uname" placeholder="Your Name" onChange={(e) => this.handleFieldChange(e, 'uname')}
                                    name="uname" required value={uname || ''} />
                                {/* <label htmlFor="uname">Your Name </label> */}
                            </div>
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-3 title">
                                <label htmlFor="email">Email </label>
                            </div>
                            <div className="col-7">
                                <input type="text" className="form-control" name="email" placeholder="Email" onChange={(e) => this.handleFieldChange(e, 'email')}
                                    required value={email || ''} />
                                {/* <label htmlFor="email">Email </label> */}
                            </div>
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
                    </div>
                    <div className="form-group">
                        {/* <input type="text" className="form-control" name="phone" onChange={(e) => this.handleFieldChange(e, 'phone')}
                                    placeholder=" " required value={phone || ''} /> */}
                        {/* <label htmlFor="phone">Phone </label> */}
                        <div className="row">
                            <div className="col-3 title">
                                <label htmlFor="phone">Phone </label>
                            </div>
                            <div className="col-7">
                                <input type="text" className="form-control" name="phone" onChange={(e) => this.handleFieldChange(e, 'phone')}
                                    placeholder="Enter your phone number" name="phone" required value={phone || ''} />
                            </div>
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-3 title">
                                <label htmlFor="sel1">Subject </label>
                            </div>
                            <div className="col-md-7 col-12">
                                <Select
                                    showSearch
                                    optionFilterProp="children"
                                    placeholder="Select a person"
                                    /* onChange={handleChange}
                                    onFocus={handleFocus}
                                    onBlur={handleBlur} */
                                    // value={subject || ''}
                                    filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    name="subject" onChange={(e) => { this.handleFieldChange(e, 'subject') }}
                                >
                                    {
                                        this.state.allSubject.map((s, key) => (
                                            <Option key={key} value={s.value}>{s.name}</Option>
                                        ))
                                    }
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-3 title">
                                <label htmlFor="uname">Message {/* <i className="required">*</i> */}</label>
                            </div>
                            <div className="col-7">
                                <TextArea rows={3} className="form-control" required
                                    value={message || ''}
                                    placeholder="Message"
                                    name="message" onChange={(e) => { this.handleFieldChange(e, 'message') }} />
                            </div>
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-3 title">
                                <label htmlFor="file">Upload file </label>
                            </div>
                            <div className="col-7" style={{ display: 'flex' }}>
                                <label className="custom-file-upload">
                                    <input type="file" multiple onChange={this.onChange} />
                                    <i className="fa fa-cloud-upload" /> Attach
                                </label>
                                {this.state.files.map(x =>
                                    <div className="file-preview" key={x} onClick={this.removeFile.bind(this, x)}>{x.name}</div>
                                )}
                            </div>
                            <div className="valid-feedback">Valid.</div>
                            <div className="invalid-feedback">Please fill out this field.</div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-3 title">
                            </div>
                            <div className="col-12 col-md-1 col-sm-12">
                                <Button type="primary" onClick={() => this.sendDetails()}>Send Details</Button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SendEmail;