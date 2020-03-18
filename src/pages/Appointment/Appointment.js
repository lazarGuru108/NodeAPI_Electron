import React, { Component } from 'react';
import './Appointment.scss';
import { Select, Button, Icon } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {
    Calendar, CalendarCell, CalendarWeekCell, CalendarNavigationItem, CalendarHeaderTitle, DateInput, DatePicker, TimePicker, MultiViewCalendar, DateRangePicker, DateTimePicker
} from '@progress/kendo-react-dateinputs';
/* import '@progress/kendo-react-intl'
import '@progress/kendo-react-tooltip'
import '@progress/kendo-react-common'
import '@progress/kendo-react-popup'
import '@progress/kendo-date-math'
import '@progress/kendo-react-dropdowns' */

// import Email from '../../assets/js/smtp.js';

const { Option } = Select;

class Appointment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            secondname: '',
            email: '',
            files: [],
            allServices: [
                { value: 'service1', name: 'service1' },
                { value: 'service2', name: 'service2' },
            ],
            allProviders: [
                { value: 'provider1', name: 'provider1' },
                { value: 'provider2', name: 'provider2' },
            ],
            value: new Date(),
            selectedDates: []
        }
    }

    handleFieldChange = (e, field) => {
        console.log(e.target.value);
        let value;
        if (field === 'service' || field === 'provider')
            value = e;
        else if (field === 'file')
            console.log(e);
        else
            value = e.target.value;
        this.setState({ [field]: value });
    }

    selectDate = (event) => {
        let selectedDates = this.state.selectedDates;
        selectedDates.push(event.target.value.toString());
        this.setState({ value: event.target.value, selectedDates: selectedDates });
    }

    deleteDateList = (e, key) => {
        let selectedDates = this.state.selectedDates;
        delete selectedDates[key];
        this.setState({selectedDates: selectedDates});
    }

    onAppointment() {

    }

    render() {
        let { firstname, secondname, email, service, provider, selectedDates } = this.state;
        return (
            <div className="container" id="appointment">
                <div className="row">
                    <div className="col-md-6" style={{ display: "grid" }}>
                        <label htmlFor="sel1">CHOOSE SERVICE * </label>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            // defaultValue=""
                            placeholder="Choose Service"
                            style={{ width: 240 }}
                            /* onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur} */
                            // value={service || ''}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            name="service" onChange={(e) => { this.handleFieldChange(e, 'service') }}
                        >
                            {
                                this.state.allServices.map((s, key) => (
                                    <Option key={key} value={s.value}>{s.name}</Option>
                                ))
                            }
                        </Select>
                    </div>
                    <div className="col-md-6" style={{ display: "grid" }}>
                        <label htmlFor="sel1">CHOOSE PROVIDER * </label>
                        <Select
                            showSearch
                            optionFilterProp="children"
                            // defaultValue=""
                            style={{ width: 240 }}
                            /* onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur} */
                            // value={provider || ''}
                            placeholder="Choose Provider"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            name="provider" onChange={(e) => { this.handleFieldChange(e, 'provider') }}
                        >
                            {
                                this.state.allProviders.map((s, key) => (
                                    <Option key={key} value={s.value}>{s.name}</Option>
                                ))
                            }
                        </Select>
                    </div>
                </div>
                <div className="row" style={{ display: 'grid' }}>
                    <div style={{ padding: "15px", paddingBottom: "0px" }}>
                        <span>CHOOSE DATE & TIME*</span>
                    </div>
                    <div style={{ padding: "5px 15px" }}>
                        <span>
                            You can select 2 time slots per date and a maximum of 6 selections in total for this demo. The selected bookings are shown below the calendar.
                        </span>
                    </div>
                    <div className="calendar" style={{ padding: "15px" }}>
                        <DateTimePicker
                            value={this.state.value}
                            onChange={this.selectDate}
                        />
                        {
                            selectedDates.length > 0 &&
                            <div>
                                <ul style={{listStyleType:"none"}}>
                                    {
                                        selectedDates.map((val, index) => {
                                            return (
                                                <li key={index}>
                                                    <i className="fa fa-times-circle" onClick={(e) => this.deleteDateList(e,index)}></i>
                                                    {val}
                                                </li>
                                            );
                                        })
                                    }
                                </ul>
                                
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <div className="name">
                        <div style={{ paddingBottom: "10px", paddingTop: "20px" }}><span>NAME *</span></div>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" className="form-control" name="firstname" onChange={(e) => this.handleFieldChange(e, 'firstname')}
                                    placeholder="First Name" name="firstname" required value={firstname || ''} style={{ width: 240 }} />
                                <span>First</span>
                            </div>
                            <div className="col-md-6">
                                <input type="text" className="form-control" name="secondname" onChange={(e) => this.handleFieldChange(e, 'secondname')}
                                    placeholder="Last Name" name="secondname" required value={secondname || ''} style={{ width: 240 }} />
                                <span>Last</span>
                            </div>
                        </div>
                    </div>
                    <div className="email">
                        <div style={{ paddingBottom: "10px", paddingTop: "20px" }}><span>EMAIL *</span></div>
                        <div className="row">
                            <div className="col-md-6">
                                <input type="text" className="form-control" name="email" onChange={(e) => this.handleFieldChange(e, 'email')}
                                    placeholder="Email" name="email" required value={email || ''} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="button" style={{ padding: "15px" }}>
                    <Button type="primary" style={{ backgroundColor: "#00B277" }} onClick={this.onAppointment}>Send Details</Button>
                </div>
            </div>
        )
    }
}

export default Appointment;