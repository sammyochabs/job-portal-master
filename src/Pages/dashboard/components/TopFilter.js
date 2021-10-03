/**
 * -------------------------------------
 * Add Filter on top of the Dashboard
 * -------------------------------------
 */

/**
 * Add dependencies
 */

import React, { useEffect, useState, useReducer } from 'react';

const INPUT_CHANGED = 'input_changed';

const SearchReducers = (state, action) =>{
    switch ( action.type ) {
        case INPUT_CHANGED: return {
            ...state,
            [action.field] : {
                value: action.value
            }
        }
            
        default: return state
            
    }
}

function TopFilter({onSubmit, resetFilter}) {

    const initState = {
        from_date: {
            value: ''
        },
        to_date: {
            value: ''
        },
        // status: {
        //     value: ''
        // },
        // crm_user: {
        //     value: ''
        // },
    };

    const onSearchSubmit = (ev) =>{
        ev.preventDefault();
        onSubmit(state);
    }

    const _resetFilter = () => {
        dispatch({type: INPUT_CHANGED, field: 'from_date', value: ''});
        dispatch({type: INPUT_CHANGED, field: 'to_date', value: ''});
        resetFilter();
    }

    const [state, dispatch] = useReducer(SearchReducers, initState);

    return (
        <div className="dashmbord_card_holder">
            <div className="dashboard_card">
                <div className="dashbord_filter_wrp">
                    <form onSubmit={onSearchSubmit}>
                        <div className="form-inline">
                        <div className="form-group">
                                <label>From Date</label>
                                <input 
                                    type="date"
                                    value={state.from_date.value}
                                    onChange={({target: { value }}) => dispatch({type: INPUT_CHANGED, field: 'from_date', value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>To Date</label>
                                <input 
                                    type="date"
                                    value={state.to_date.value}
                                    onChange={({target: { value }}) => dispatch({type: INPUT_CHANGED, field: 'to_date', value})}
                                />
                            </div>
                            {/* <div className="form-group">
                                <label>Query Status</label>
                                <select
                                    value={state.status.value}
                                    onChange={({target: { value }}) => dispatch({type: INPUT_CHANGED, field: 'status', value})}
                                >
                                    <option>query status one</option>
                                    <option>query status two</option>
                                    <option>query status three</option>
                                    <option>query status four</option>
                                    <option>query status five</option>
                                    <option>query status six</option>
                                </select>
                            </div> */}

                            {/* <div className="form-group">
                                <label>CRM User</label>
                                <select
                                    value={state.crm_user.value}
                                    onChange={({target: { value }}) => dispatch({type: INPUT_CHANGED, field: 'crm_user', value})}
                                >
                                    <option>CRM user one</option>
                                    <option>CRM user two</option>
                                    <option>CRM user three</option>
                                    <option>CRM user four</option>
                                    <option>CRM user five</option>
                                    <option>CRM user six</option>
                                </select>
                            </div> */}

                            <div className="form-group">
                                <button type="submit" className="commn-btn dashbord_filter">Filter</button>
                            </div>
                            <div className="form-group">
                                <button type="button" onClick={_resetFilter} className="commn-btn dashbord_filter">Clear</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default TopFilter;


