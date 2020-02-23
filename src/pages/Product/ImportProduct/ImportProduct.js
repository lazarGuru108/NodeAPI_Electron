import React from 'react';
import { Button } from 'antd';

class ImportProduct extends React.Component {
    render() {
        return(
            <div className="container-fluid" style={{padding: "1px"}}>
                <div className="text-warning">
                <span style={{color: "rgb(166, 109, 113)"}}>
                The first line in downloaded .xls file should remain as it is. Please do not change the order of columns. Please make sure the (*.xls) file is UTF-8 encoded. 
                The images should be uploaded in storage/products/ (or where you pointed) folder. The System will check that if a row exists then update, if not exist then insert.
                </span>
                </div>
                <div style={{padding: "15px"}}>
                    <div className="row" style={{padding: "4px", justifyContent: "center"}}>
                        <span>Download Sample Format File <a href="#"><span style={{color: "rgb(60, 141, 188)"}}><i className="fa fa-fw fa-upload"></i>Download</span></a></span>
                    </div>
                    <div className="row" style={{padding: "4px", justifyContent: "center"}}>
                        <span>Select .xls file</span>   
                        <div><input type="file" accept=".xls"/></div>
                    </div>
                    <div className="row" style={{padding: "4px", justifyContent: "center"}}>
                        <div><Button type="primary" ><i className="fa fa-fw fa-upload"/>Import</Button></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImportProduct;