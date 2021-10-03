/**
|--------------------------------------------------
| User Profile section for Admin
|--------------------------------------------------
*/

/**
 * Add dependencies
 */

import React from 'react';
import { useSelector } from "react-redux";

const UserProfile = () => {

    const user = useSelector(state => state.auth.user);
    const [showProfile, setShowProfile] = React.useState(false);

    const _profileHandler = (ev) =>{
        ev.preventDefault();
        setShowProfile(prevState => !prevState);
    }
    
    return (
        <div className="user_profile_holder">
            <div className="profile_details_holder">
                <span className="user_propic">
                    {
                    user && user.profile_picture ? 
                        <img src={user.profile_picture} alt="user_profile" />
                    : <img src={require('../../assets/images/user-pro.png').default} alt="user" />
                    }
                    
                </span>
            <div className="user_profile_txt">
                <h4>{user && user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : ''}</h4>
                <p>{user.designation && user.designation}</p>
            </div>
                <a href="#" onClick={_profileHandler} className={showProfile ? "profilearrow openProfile" : "profilearrow" }></a>
            </div>

            <div className={showProfile ? "user_profile_detailsholder openProfile" : "user_profile_detailsholder" }>
                <p>Email: {user.email && user.email}</p>
                <p>Phone No.: {user.phone && user.phone}</p>
            </div>
      </div>
    )
}

export default UserProfile
