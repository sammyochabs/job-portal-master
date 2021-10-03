import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { RouteNames } from '../../../constants/RouteNames';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
const Item = (props) => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [data, setData] = useState(props.data);
    const [status, setStatus] = useState(props.status);

    const _changeBookingStatus = (statusId) => {
        //setShow( true );
        Swal.fire({
            title: 'Are you sure?',
            text: 'Want to change Booking Status',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.value) {
                // updateBookingStatus({ status: statusId, consignment_id: data._id }).then(res => {

                //     if (!res.error) {

                //         toast.success(res.data.data, {
                //             onOpen: () => {
                //                 setData(prevData => ({
                //                     ...prevData,
                //                     statusData: {
                //                         ...prevData.statusData,
                //                         _id: statusId
                //                     }
                //                 })
                //                 );
                //             }
                //         });

                //     }
                // });
            }
        })
    }

    const _confirmHandler = () => {
        setShow(false);
    }
    //console.log(data);

    if (!data)
        return (
            <tr>
                <td colSpan="3">
                    <span className="name">No Data found</span>
                </td>
            </tr>
        );

    //console.log(data);
    return (
        <>
            <tr>
                <td>
                    <span className="name">{data.user_name && data.user_name }</span>
                </td>
                <td>
                    <span className="email">{data.chat_type && data.chat_type}</span>
                </td>
                <td>
                    <span className="role">{data.is_active ? 'Active' : 'In-active'}</span>
                </td>
                <td>
                    <div className="more">
                        <Link
                            to={`${RouteNames.userChat}/${data.user_id}`}
                            title="Start Chat"
                        >
                            <i className="fa fa-comments" aria-hidden="true"></i>
                        </Link>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default Item;
