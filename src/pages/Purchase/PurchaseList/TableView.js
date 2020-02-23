// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactToPrint from "react-to-print";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import '../Purchase.scss';
import { Button, Table, Input, Popconfirm, Select } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';

const { Option } = Select;

class TableView extends React.Component {
    pdfExportComponent;
    grid;
    constructor(props) {
        super(props);
        /**For Table */
        this.columns = [
            {
                title: 'DateTime',
                dataIndex: 'datetime',
                width: '15%',
                sorter: (a, b) => a.datetime > b.datetime,
            },
            {
                title: 'Invoice Id',
                dataIndex: 'invoiceid',
                width: '15%',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.invoiceid - b.invoiceid,
            },
            {
                title: 'Supplier',
                dataIndex: 'supplier',
                width: '30%',
                sorter: (a, b) => a.supplier > b.supplier,
            },
            {
                title: 'Creator',
                dataIndex: 'creator',
                width: '20%',
                sorter: (a, b) => a.creator > b.creator,
            },
            {
                title: 'Amount',
                dataIndex: 'amount',
                sorter: (a, b) => a.createdAt > b.createdAt,
            },
            {
                title: 'Paid Amount',
                dataIndex: 'paidamount',
                sorter: (a, b) => a.createdAt > b.createdAt,
            },
            {
                title: 'Due',
                dataIndex: 'due',
                sorter: (a, b) => a.createdAt > b.createdAt,
            },
            {
                title: 'Status',
                dataIndex: 'status',
                render: (status, record) =>
                    <div><p className="status m-0">{status}</p></div>
            },
            {
                title: 'Pay',
                dataIndex: 'pay',
                render: (text, record) =>
                    <Button type="primary" className="tableButton" style={{ background: 'rgb(0, 192, 239)' }}><i className="fa fa-money"></i></Button>
            },
            {
                title: 'Return',
                dataIndex: 'ret',
                render: (text, record) =>
                    <Button type="primary" className="tableButton" onClick={() => this.handleView(record)} style={{ background: 'rgb(0, 192, 239)' }} ><i className="fa fa-minus"></i></Button>
            },
            {
                title: 'View',
                dataIndex: 'view',
                render: (text, record) =>
                    <Button type="primary" className="tableButton" onClick={() => this.handleView(record)} style={{ background: 'rgb(0, 192, 239)' }} ><i className="fa fa-eye"></i></Button>
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                render: (text, record) =>
                    <Button type="primary" className="tableButton" onClick={() => this.handleEdit(record)} style={{ background: 'rgb(60, 141, 188)' }} ><i className="fa fa-fw fa-pencil"></i></Button>
            },
            {
                title: 'Delete',
                dataIndex: 'operation',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <Button type="primary" className="tableButton" style={{ background: 'rgb(221, 75, 57)' }} ><i className="fa fa-fw fa-trash"></i></Button>
                        </Popconfirm>
                    ) : null,
            },
        ];
        this.state = {
            pageSize: 10,
            dataSource: [],
            count: 0,
            searchText: '',
            tmpDataSource: [],
        };
        /**For Table */
    }

    componentWillReceiveProps(props) {
        this.setState({ dataSource: props.dataSource });
    }

    componentDidMount() {
        this.setState({ dataSource: this.props.dataSource });
    }

    handleEdit = (record) => {
        this.props.handle(record, 'edit');
    }

    handleView = (record) => {
        // this.props.handle(record, 'view');
    }

    handleDelete = key => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    handleSave = row => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    //select show
    selectShow = (value, option) => {
        this.setState({ pageSize: parseInt(value) });
    }

    //serach Rows
    searchRows = (e) => {
        console.log(e.target.value);
        let searchText = e.target.value;
        let st = searchText.toLowerCase();
        let { dataSource } = this.state;
        let tempDataSource = dataSource.filter((d) => {
            return d.datetime.toLowerCase().indexOf(st) > -1 || d.supplier.toLowerCase().indexOf(st) > -1 || d.creator.toLowerCase().indexOf(st) > -1 || d.amount.toLowerCase().indexOf(st) > -1 || d.paidamount.toLowerCase().indexOf(st) > -1
        });
        this.setState({ tempDataSource, searchText });
    }

    exportPDF = () => {
        const unit = "pt";
        const size = "B5"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Product Report";
        const headers = [["Date Time", "Invoice Id", "Supplier", "Creator", "Amount", "Paid Amount", "Due"]];

        const data = this.state.dataSource.map(elt => [elt.datetime, elt.invoiceid, elt.supplier, elt.creator, elt.amount, elt.paidamount, elt.due]);

        let content = {
            startY: 50,
            head: headers,
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    exportToCSV = () => {
        let fileName = "product_report";
        let fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        let fileExtension = '.xlsx';
        const ws = XLSX.utils.json_to_sheet(this.state.dataSource);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    render() {
        const { dataSource, searchText, tempDataSource } = this.state;
        const columns = this.columns.map(col => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-m-4 col-4">
                        <div className="row">
                            <label style={{ padding: '5px 5px 0 15px' }}>Show</label>
                            <Select
                                showSearch
                                style={{ width: 200 }}
                                optionFilterProp="children"
                                defaultValue="10"
                                filterOption={(input, option) => option.props.children.indexOf(input) >= 0}
                                onSelect={(value, option) => this.selectShow(value, option)}
                            >
                                <Option value="10">10</Option>
                                <Option value="25">25</Option>
                                <Option value="50">50</Option>
                                <Option value="100">100</Option>
                                <Option value="200">200</Option>
                            </Select>
                            <label style={{ padding: '5px 5px 0 5px' }}>entries</label>
                        </div>
                    </div>
                    <div className="col-m-4 col-4" style={{ padding: '10px 20px 0 120px' }}>
                        <div className="row">
                            <ButtonGroup>
                                <ReactToPrint
                                    trigger={() => <Button type="normal" size="small" title="print">
                                        <i className="fa fa-print"></i>
                                    </Button>}
                                    content={() => this.componentRef}
                                />
                                {/* <Button type="normal" size="small" title="print">
                                    <i className="fa fa-print"></i>
                                </Button> */}
                                <Button type="normal" size="small" title="copy">
                                    <i className="fa fa-files-o"></i>
                                </Button>
                                <Button type="normal" size="small" title="Excel" onClick={this.exportToCSV}>
                                    <i className="fa fa-file-excel-o"></i>
                                </Button>
                                <Button type="normal" size="small" title="Text">
                                    <i className="fa fa-file-text-o"></i>
                                </Button>
                                <Button type="normal" size="small" title="Pdf" onClick={this.exportPDF}>
                                    <i className="fa fa-file-pdf-o"></i>
                                </Button>
                                <Button type="normal" size="small" title="Email">
                                    <i className="fa fa-envelope"></i>
                                </Button>
                            </ButtonGroup>
                        </div>
                    </div>
                    <div className="col-m-4 col-4">
                        <div className="row" style={{ padding: '0px 0px 0px 217px' }}>
                            <label style={{ padding: '5px 15px 0 15px' }}>Search</label>
                            <Input type="text" style={{ padding: '5px', width: '200px' }} placeholder="Search ..." value={searchText} onChange={(e) => this.searchRows(e)} />
                        </div>
                    </div>
                </div>
                <br></br>
                <Table
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={!searchText ? dataSource : tempDataSource}
                    columns={columns}
                    pagination={{ pageSize: this.state.pageSize }}
                    ref={el => (this.componentRef = el)}
                />
            </div>
        );
    }
}

export default TableView;