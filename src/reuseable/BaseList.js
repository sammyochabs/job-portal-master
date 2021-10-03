import React from 'react';
import { Link } from 'react-router-dom';
import DefaultStructure from '../layouts/defaultStructure';

const BaseList = (props) => {
    const { addButton,
        listHeading,
        children,
        pageTitle,
        pagination,
        multiselect,
        multiselectTitle,
        multiSelectAction,
        filter,
        hasHistory,
        historyTitle,
        onLoadHistory,
        HistoryData,
        showHistory,
        breadcrumb,
        moreClass
    } = props;
    return (
        <DefaultStructure pageTitle={pageTitle}>
            {
                breadcrumb
            }
            <div className="">
                {/* <div className="cmnpadding left_panel"> */}

                <div className="booking_payment_sec"> 
                    <div className="listinngholder">
                        <div className="listinngholder_top">
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
                            {filter}
                        </div>
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
                    {
                        hasHistory &&
                        <div className="loadhistory_btn-hlder">
                            <a href="#" onClick={onLoadHistory} className="commn-btn">Load History</a>
                        </div>
                    }
                    {
                        hasHistory && showHistory &&
                        <div className="lisingtable table-responsive add-tbl">
                            <table>
                                <thead>
                                    <tr>
                                        {
                                            historyTitle && historyTitle.length > 0 && historyTitle.map((title, index) =>
                                                <th key={index}>{multiselect && index === 0 ? multiselect : title}</th>
                                            )
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {HistoryData}
                                </tbody>
                            </table>
                        </div>
                    }
                    
                </div>
            </div>
        </DefaultStructure>
    )
}

export default BaseList;
