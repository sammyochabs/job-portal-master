import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { RouteNames } from '../../../constants/RouteNames';

const Item = ({ data }) => {
    const [ show, setShow ] = useState( false );
    const moreButtonHandler = (ev) =>{
        ev.preventDefault();
        setShow( prevState => !prevState );
    }
    if( !data )
        return (
            <tr>
                <td colSpan={3}>
                    <span className="name">No Data found</span>
                </td> 
            </tr>
        );


    return (
        <tr>
            <td>
                <span className="name">{ data.first_name }</span>
            </td>
            <td>
                <span className="name">{ data.last_name }</span>
            </td>
            <td>
                <span className="email">{ data.email }</span>
            </td> 
            <td>
                <span className="role">{ data.phone }</span>
            </td> 
            <td>
                <span className="role">{ data.role.name }</span>
            </td> 
            <td>
                <div className="more"> 
                <Link to={`${RouteNames.adminUserEdit}/${data._id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                     
                </div>
            </td>
    </tr>
    )
}

export default Item;
