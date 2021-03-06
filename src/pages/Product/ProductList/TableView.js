// @flow
import React from 'react';
import 'antd/dist/antd.css';
import { Button, Table, Input, Popconfirm, Form, Select, AutoComplete } from 'antd';
import ButtonGroup from 'antd/lib/button/button-group';
import jsPDF from "jspdf";
import "jspdf-autotable";
import ReactToPrint from "react-to-print";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../Product.scss';
import noImage from '../../../assets/images/noimage.jpg'

const { Option } = Select;

/**For Table */
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {

    state = {
        editing: false,
    };

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    save = e => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    renderCell = form => {
        this.form = form;
        const { children, dataIndex, record, title } = this.props;
        const { editing } = this.state;
        return editing ? (
            <Form.Item style={{ margin: 0 }}>
                {form.getFieldDecorator(dataIndex, {
                    rules: [
                        {
                            required: true,
                            message: `${title} is required.`,
                        },
                    ],
                    initialValue: record[dataIndex],
                })(<Input ref={node => (this.input = node)} onPressEnter={this.save} onBlur={this.save} />)}
            </Form.Item>
        ) : (
                <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                >
                    {children}
                </div>
            );
    };

    render() {
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            children,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
                ) : (
                        children
                    )}
            </td>
        );
    }
}

/**end Table */

class TableView extends React.Component {
    constructor(props) {
        super(props);
        /**For Table */
        this.printColumns = [
            {
                title: '',
                dataIndex: 'checkbox',
                width: '5%',
            },
            {
                title: 'Iamge',
                dataIndex: 'image',
                width: '5%'
            },
            {
                title: 'P.Code',
                dataIndex: 'pcode',
                width: '10%'
            },
            {
                title: 'Name',
                dataIndex: 'uname',
                width: '10%'
            },
            {
                title: 'Supplier',
                dataIndex: 'supplier',
                width: '15%'
            },
            {
                title: 'Stock',
                dataIndex: 'stock',
                width: '10%'
            },
            {
                title: 'Purchase Price',
                dataIndex: 'purchaseprice'
            },
            {
                title: 'Selling Price',
                dataIndex: 'sellingprice'
            }
        ]
        this.columns = [
            {
                title: '',
                dataIndex: 'checkbox',
                width: '5%',
                render: (text, record) =>
                    <input type="checkbox" />
            },
            {
                title: 'Iamge',
                dataIndex: 'image',
                width: '5%',
                render: (text, record) =>
                    <img src={noImage} style={{ width: "20px" }} />
            },
            {
                title: 'P.Code',
                dataIndex: 'pcode',
                width: '10%',
                defaultSortOrder: 'ascend',
                sorter: (a, b) => a.pcode - b.pcode,
            },
            {
                title: 'Name',
                dataIndex: 'uname',
                width: '10%',
                sorter: (a, b) => a.uname > b.uname,
                editable: false,
            },
            {
                title: 'Supplier',
                dataIndex: 'supplier',
                width: '15%',
                sorter: (a, b) => a.supplier > b.supplier,
                editable: false,
            },
            {
                title: 'Stock',
                dataIndex: 'stock',
                width: '10%',
                sorter: (a, b) => a.stock > b.stock,
                editable: false,
            },
            {
                title: 'Purchase Price',
                dataIndex: 'purchaseprice',
                sorter: (a, b) => a.purchaseprice > b.purchaseprice,
                editable: false,
            },
            {
                title: 'Selling Price',
                dataIndex: 'sellingprice',
                sorter: (a, b) => a.sellingprice > b.sellingprice,
                editable: false,
            },
            {
                title: 'View',
                dataIndex: 'view',
                render: (text, record) =>
                    <Button type="primary" className="tableButton" onClick={() => this.handleView(record)} style={{ background: 'rgb(0, 192, 239)' }} ><i className="fa fa-fw fa-user"></i></Button>
            },
            {
                title: 'Edit',
                dataIndex: 'edit',
                render: (text, record) =>
                    <Button type="primary" className="tableButton" onClick={() => this.handleEdit(record)} style={{ background: 'rgb(60, 141, 188)' }} ><i className="fa fa-fw fa-pencil"></i></Button>
            },
            {
                title: 'Purchase',
                dataIndex: 'purchase',
                render: (text, record) =>
                    <Button type="primary" className="tableButton" ><i className="fa fa-fw fa-shopping-cart"></i></Button>
            },
            {
                title: 'Print Barcode',
                dataIndex: 'printbarcode',
                render: (text, record) =>
                    <Button type="primary" className="tableButton" ><i className="fa fa-barcode"></i></Button>
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

    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            id: count + 1,
            name: `Edward King 0 ${count}`,
            mobile: '0',
            product: '0',
            createdAt: '0',
            status: '0',
            purchase: '0',
            view: '0',
            edit: '0',
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
        });
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
            return d.uname.toLowerCase().indexOf(st) > -1 || d.mobile.toLowerCase().indexOf(st) > -1 || d.product.toLowerCase().indexOf(st) > -1 || d.createdAt.toLowerCase().indexOf(st) > -1
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
        const headers = [["P.Code", "Name", "Supplier", "Stock", "Purchase Price", "Selling Price"]];

        const data = this.state.dataSource.map(elt => [elt.pcode, elt.uname, elt.supplier, elt.stock, elt.purchaseprice, elt.sellingprice]);

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
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const printColumns = this.printColumns;
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
                                style={{ width: '50%' }}
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
                                <CopyToClipboard text={JSON.stringify(this.state.dataSource)}>
                                    <Button type="normal" size="small" title="copy">
                                        <i className="fa fa-files-o"></i>
                                    </Button>
                                </CopyToClipboard>

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
                            <Input type="text" style={{ padding: '5px', width: '70%' }} placeholder="Search ..." value={searchText} onChange={(e) => this.searchRows(e)} />
                        </div>
                    </div>
                </div>
                <br/><br/>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={!searchText ? dataSource : tempDataSource}
                    columns={columns}
                    pagination={{ pageSize: this.state.pageSize }}
                    ref={el => (this.componentRef = el)}
                />
                <Table
                    className="print-source"
                    bordered
                    ref={el => (this.componentRef = el)}
                    dataSource={!searchText ? dataSource : tempDataSource}
                    columns={printColumns}
                    pagination={false}
                />
            </div>
        );
    }
}

export default TableView;