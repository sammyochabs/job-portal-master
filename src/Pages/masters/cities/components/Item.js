import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { RouteNames } from '../../../../constants/RouteNames';
const Item = ({ data }) => {
    const [show, setShow] = useState(false);
    const moreButtonHandler = (ev) => {
        ev.preventDefault();
        setShow(prevState => !prevState);
    }
    if (!data)
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
                <span className="name">{data.name}</span>
            </td>
            <td>
                <div className="more">
                    <Link to={`${RouteNames.cityEdit}/${data._id}`}><i className="fa fa-pencil" aria-hidden="true"></i></Link>
                    {/* <li><Link to="#">delete</Link></li> */}
                </div>
            </td>
        </tr>
    )
}

export default Item
