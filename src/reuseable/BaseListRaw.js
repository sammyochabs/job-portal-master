import React from 'react';
import { Link } from 'react-router-dom';
import BaseExport from './BaseExport';

const BaseListRaw = (props) => {
    const { addButton,
        listHeading,
        children,
        pagination,
        multiselect,
        multiselectTitle,
        multiSelectAction,
        filter,
        exportData,
        search,
        moreClass,
        topClass,
    } = props;

    return (
        <>
            <div className={topClass ? `listinngholder_top align_right ${topClass}` : "listinngholder_top align_right"}>
                        
                        {addButton && <Link to={addButton} className="commn-btn">ADD</Link>}
                        {multiselect &&
                            <button
                                type="button"
                                className="commn-btn mSelect"
                                onClick={multiSelectAction}
                            >
                                {multiselectTitle}
                            </button>
                        }
                        
                        {search}
                        {exportData && Object.keys(exportData).length > 0 && <BaseExport dataLoading={exportData.dataLoading} data={exportData.data} title={exportData.pageName} heading={exportData.heading}/>}
                </div>
                <div className="searchpanel">
                    {filter}
                </div>
            <div className="cmnpadding left_panel">

                <div className="listinngholder">
                    <div className={moreClass ? `lisingtable table-responsive add-tbl ${moreClass}` : "lisingtable table-responsive add-tbl"}>
                        <table>
                            <thead>
                                <tr>
                                    {
                                        listHeading && listHeading.length > 0 && listHeading.map((title, index) =>
                                            <th key={index}>{multiselect && index === 0 ? multiselect : title}</th>
                                        )
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {children}
                            </tbody>
                        </table>
                    </div>
                    {pagination}
                </div>
            </div>
        </>
    )
}

export default BaseListRaw;
