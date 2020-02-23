// @flow
import React from 'react';
import 'antd/dist/antd.css';
import './Sales.scss';
import { Button, Table, Input, Popconfirm, Form, Select } from 'antd';

class TableView extends React.Component {
    constructor(props) {
        super(props);
        /**For Table */
        this.columns = [
            {
                title: 'Items',
                dataIndex: 'items',
                width: '40%',
                render: (text, record) =>
                    <Button><i class="fa fa-edit">text</i></Button>
            },
            {
                title: 'Unit Price',
                dataIndex: 'unitprice',
                width: '15%'
            },
            {
                title: 'Quantity',
                dataIndex: 'quantity',
                width: '30%',
                render: (text, record) =>
                    this.state.dataSource.length >= 1 ? (
                        <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                            <i class="fa fa-close text-red pointer remove" data-id="571" title="Remove"></i>
                        </Popconfirm>
                    ) : null,
            },
            {
                title: 'Total Price',
                dataIndex: 'totalprice',
                width: '15%'
            },
        ];
        this.state = {
            dataSource: this.props.dataSource,
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
            datetime: '2020-02-01',
            invoiceid: count + 1,
            supplier: `Edward King 0 ${count}`,
            creator: 'creator 1',
            amount: '0',
            paidamount: '0',
            due: '0',
            status: '0',
            createdAt: '0',
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

    //serach Rows
    searchRows = (e) => {
        let searchText = e.target.value;
        let st = searchText.toLowerCase();
        let { dataSource } = this.state;
        let tempDataSource = dataSource.filter((d) => {
            return d.datetime.toLowerCase().indexOf(st) > -1 || d.supplier.toLowerCase().indexOf(st) > -1 || d.creator.toLowerCase().indexOf(st) > -1 || d.amount.toLowerCase().indexOf(st) > -1 || d.paidamount.toLowerCase().indexOf(st) > -1
        });
        this.setState({ tempDataSource, searchText });
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
        console.log(dataSource);
        return (
            <Table
                rowClassName={() => 'editable-row'}
                bordered
                dataSource={dataSource}
                columns={columns}
                pagination={false}
            />
        );
    }
}

export default TableView;