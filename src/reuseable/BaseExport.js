/**
|--------------------------------------------------
| All Exportable data share this class as their base class
|--------------------------------------------------
*/
import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const BaseExport = ({data, title, heading, dataLoading}) => {
    
        //console.log(dataLoading);
        if(data && data.length > 0 ){
            const labels = Object.keys(data[0])

            //console.log(labels);
            return (
                <ExcelFile filename={title || 'download_123'} element={<button className="commn-btn mrgn-less">Export Excel</button>}>
                    <ExcelSheet data={data} name={title|| 'Download'}>
                        {/* <ExcelColumn label="Name" value="name"/>
                        <ExcelColumn label="Wallet Money" value="amount"/>
                        <ExcelColumn label="Gender" value="sex"/>
                        <ExcelColumn label="Marital Status"
                                    value={(col) => col.is_married ? "Married" : "Single"}/> */}
                        {
                            labels && labels.map((label, index) => 
                                <ExcelColumn key={index} label={heading[index]} 
                                value={label}
                                />
                            )
                        }
                    </ExcelSheet>
                </ExcelFile>
            );
        }

        if( data && data.length == 0 && !dataLoading )
            return null;

        return <div className="loading-btn"></div>;
}


export default BaseExport;