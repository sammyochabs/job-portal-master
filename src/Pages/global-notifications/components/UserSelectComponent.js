/**
|--------------------------------------------------
| User Search with multi select option
|--------------------------------------------------
*/

/**
 * Add dependencies
 */

import React, {useState, useEffect} from 'react'
import MultiSelect from "react-multi-select-component";
import { getUsers } from '../../../store/actions/activityLog';

function UserSelectComponent({onSelect, slug}) {

    const [options, setOptions] = useState([]);
    const [selected, setSelected] = useState([]);

    useEffect(()=>{
        getUsers({role_slug: slug}).then(res => {
            if(!res.error){
                const { data } = res; let updatedData = []
                if( data && Array.isArray(data) && data.length > 0 ){
                    updatedData = data.map(user => ({ label: `${user.first_name} ${user.last_name}`, value: user._id }));
                    setOptions([ ...updatedData ]);
                }
            }
        })
    },[]);

    const _userSelectionHander = (selectedUser) =>{
        setSelected(selectedUser);
        let data = [];
        if( Array.isArray(selectedUser) && selectedUser.length > 0 ){
            data = selectedUser.map(user => user.value);
        }

        onSelect(data.join(','));

    }

    return (
        <MultiSelect
            options={options}
            value={selected}
            onChange={_userSelectionHander}
            labelledBy="Filter by user"
            //isLoading
        />
    )
}

export default UserSelectComponent;
