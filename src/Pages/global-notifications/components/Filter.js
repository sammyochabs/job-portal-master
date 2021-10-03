/**
|--------------------------------------------------
| Push notification filter section
|--------------------------------------------------
*/
/**
 * Add dependencies
 */

import React, { useState, useEffect } from 'react';

function Filter({ onFilter, clearData }) {

    const [data, setData] = useState({
        role_slug: 'booking_user',
        user_type: '',
        time_interval: '',
        sort_by: ''
    });

    useEffect(() => {
        if(clearData){
            setData({
                role_slug: 'booking_user',
                user_type: '',
                time_interval: '',
                sort_by: ''
            });
        }
    }, [clearData])

    const _inputDataHandler = ({target: {value, name}}) =>{
        setData(prevData => ({
            ...prevData,
            [name] : value
        }));
    }

    const _submitDataForFilter = (ev) =>{
        ev.preventDefault();
        onFilter(data);
    }

    return (
        <div className="form-inline">
            <div className="form-group">
                <select
                    name="user_type"
                    value={data.user_type}
                    onChange={_inputDataHandler}
                >
                    <option value="">User Type</option>
                    <option value="1">Active</option>
                    <option value="2">In-active</option>
                </select>
            </div>
            <div className="form-group">
            <select
                name="time_interval"
                value={data.time_interval}
                onChange={_inputDataHandler}
            >
                    <option value="">Time</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                    
                </select>
            </div>
            <div className="form-group">
            <select
                name="sort_by"
                value={data.sort_by}
                onChange={_inputDataHandler}
            >
                    <option value="">Sort</option>
                    <option value="high">High Business Ammount</option>
                    <option value="low">Low Business Ammount</option>
                    <option value="seasonal">Seasonal</option>
                    
                </select>
            </div>

            <div className="form-group">
                <input 
                    type="submit" 
                    value="Search" 
                    className="commn-btn"
                    onClick={_submitDataForFilter}
                />
            </div>
        </div> 
    )
}

export default Filter;

