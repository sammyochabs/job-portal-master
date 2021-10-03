/**
|--------------------------------------------------
| All app user list
|--------------------------------------------------
*/

/**
 * Add dependencies
 */

import React, { useState, useEffect } from 'react';

function UserList({ users, onSelect , clearData }) {
    
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [allChecked, setAllChecked] = useState(false);

    useEffect(() =>{
        if( clearData ){
            setSelectedUsers([]);
            setAllChecked(false);
        }
    },[clearData])
    
    const _allSelectHandler = ({target: {checked}}) => {
        
        if( checked ){
            const ids = users.map( user => user._id);
            setSelectedUsers( ids );
            setAllChecked(true);
            onSelect( ids );
        }else{
            setSelectedUsers([]);
            setAllChecked(false);
            onSelect( [] );
        }
    
    }

    const _selectUserHandler = ({ target : { checked, value }}) =>{
        if( checked ) {
            
            const _ids = [ ...selectedUsers ];
            setSelectedUsers(prevIds => [ ...prevIds, value ]);
            onSelect([ ..._ids, value ]);

            if( _ids.length + 1 === users.length )
                setAllChecked( true );
        
        }else{
            const updateIdList = [ ...selectedUsers ];
            const index = updateIdList.indexOf(value);
            
            if(index > -1){

                updateIdList.splice(index, 1);
                setSelectedUsers([ ...updateIdList ]);
                setAllChecked(false);
                onSelect([...updateIdList]);
            
            }
        }
    }
    
    return (
        <div className="appusr_list_wrpr">
            <div className="appuser_frm_hloder">
                { users.length > 0 && 
                    <div className="form-group select-allgrp">
                        <input 
                            type="checkbox"
                            onChange={_allSelectHandler}
                            checked={allChecked}
                        />
                        <h4>Select All Users</h4>
                    </div>

                    
                }
                <div className="form-inline twoflt-frmghrup">
                <div className="form-group"></div>
                    <div className="form-group">
                        <h3>Name</h3>
                    </div>

                    <div className="form-group">
                        <h3>Amount</h3>
                    </div>
                </div>
                {
                    users.length > 0 ? users.map(user => 
                        <React.Fragment key={user._id}>
                            
                            <div className="form-inline custm-frm-inline">
                            <div className="form-group">
                                <input 
                                    type="checkbox"
                                    value={user._id}
                                    checked={selectedUsers.length > 0 && selectedUsers.includes(user._id) ? true : false}
                                    onChange={_selectUserHandler}
                                />
                            </div>
                                <div className="form-group">
                                        <div className="nm">
                                            <p>{user.first_name} {user.last_name}</p>
                                        </div>
                                    </div>
                                
                                <div className="form-group">
                                    <div className="ammount">
                                        <p>Rs.{user.user_payments && user.user_payments.hasOwnProperty('amount') ? user.user_payments.amount : 0 }</p>
                                    </div>
                                </div>    
                            </div>

                                
                        </React.Fragment>
                       
                    ) : <p className="userData_notFound">No user Found</p>
                }
            </div>
        </div> 
    )
    
}

export default UserList;
