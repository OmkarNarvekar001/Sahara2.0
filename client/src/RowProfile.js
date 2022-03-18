import React from 'react'
import './RowProfile.css'

import { Avatar } from '@material-ui/core';


function RowProfile({profilePicture,username,role}) {
    return (
        <div className="row_profile">
            <Avatar alt="Remy Sharp" src={profilePicture==''?'/uploads/profile.jpg':`/uploads/${profilePicture}`} style={{width:'30px',height:'30px'}}/>
            <div className="row_profile_info">
                <div className="row_profile_username">
                {username}
                </div>
                <div className="row_profile_role">
                    {role}
                </div>
            </div>
        </div>
    )
}

export default RowProfile
