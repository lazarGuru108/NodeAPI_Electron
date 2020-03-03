import React, { Component } from 'react';
import { Table } from 'antd';

const dataSource = [
    {
      key: '1',
      client: 'Mike',
      since: 32,
      see: 'Down',
    },
    {
      key: '2',
      client: 'John',
      since: 42,
      see: 'eet',
    },
    {
      key: '1',
      client: 'Mike',
      since: 32,
      see: 'Street',
    },
    {
      key: '2',
      client: 'John',
      since: 42,
      see: '10',
    },
    {
      key: '2',
      client: 'John',
      since: 42,
      see: 'eet',
    },
    {
      key: '1',
      client: 'Mike',
      since: 32,
      see: 'Street',
    },
    {
      key: '2',
      client: 'John',
      since: 42,
      see: '10',
    },
  ];
  
  const columns = [
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
      width: '40%',
      height: 30,
    },
    {
      title: 'Member Since',
      dataIndex: 'since',
      key: 'since',
      width: '40%',
      height: 30,
    },
    {
      title: 'See',
      dataIndex: 'see',
      key: 'see',
      width: '20%',
      height: 30,
    },
  ];
  
  

class TableView extends React.Component {
    render(){
        return (
            <Table dataSource={dataSource} columns={columns} pagination={false} bordered scroll={{ y: 168 }}/>
        );
    }
}

export default TableView;