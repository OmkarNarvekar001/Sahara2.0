import React,{useState,useEffect} from 'react'
import './Left.css'
import ExploreIcon from '@material-ui/icons/Explore';
import RoomIcon from '@material-ui/icons/Room';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core';
import RowProfile from './RowProfile'
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import HomeIcon from '@material-ui/icons/Home';
import { useHistory,Link } from "react-router-dom";
import Axios from 'axios'

function Left({current}) {
    const history=useHistory();
    const [profileList,setProfileList]=useState([])
    useEffect(()=>{
        Axios.get(`http://localhost:3001/api/user/getfollowings/${JSON.parse(localStorage.getItem("user"))._id}`)
        .then((response)=>{
            setProfileList(response.data.followings);
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])
    
    return (
        <div className="left">
            <div className="top"></div>
            <Link style={{textDecoration:"none",color:"black"}} to="/" >
            <div className={current=="home"?"left_sidebar_row_active":"left_sidebar_row"} >
                <HomeIcon className={current=="home"?"left_sidebar_row_icon_active":"left_sidebar_row_icon"}/>
                <div className="left_sidebar_row_text">
                    Home
                </div>
            </div>
            </Link>

            <Link style={{textDecoration:"none",color:"black"}} to="/explore">
            <div className={current=="explore"?"left_sidebar_row_active":"left_sidebar_row"}>
                <ExploreIcon className={current=="explore"?"left_sidebar_row_icon_active":"left_sidebar_row_icon"}/>
                <div className="left_sidebar_row_text">
                    Explore
                </div>
            </div>
            </Link>
            
            <Link style={{textDecoration:"none",color:"black"}} to="/nearme">
            <div className={current=="nearme"?"left_sidebar_row_active":"left_sidebar_row"}>
                <RoomIcon className={current=="nearme"?"left_sidebar_row_icon_active":"left_sidebar_row_icon"}/>
                <div className="left_sidebar_row_text">
                    Near me
                </div>
            </div>
            </Link>

            <Link style={{textDecoration:"none",color:"black"}} to="/donations">
            <div className={current=="donations"?"left_sidebar_row_active":"left_sidebar_row"}>
                <MonetizationOnIcon className={current=="donations"?"left_sidebar_row_icon_active":"left_sidebar_row_icon"}/>
                <div className="left_sidebar_row_text">
                        Donations
                    </div>
            </div>
            </Link>

            {/* <Link style={{textDecoration:"none",color:"black"}} to="/news">
            <div className={current=="news"?"left_sidebar_row_active":"left_sidebar_row"}>
                <AnnouncementIcon className="left_sidebar_row_icon"/>
                <div className="left_sidebar_row_text">
                        News
                </div>
            </div>
            </Link> */}

            <div className="left_sidebar_2">
                <div className="left_sidebar_foryou">
                    Following
                </div>
                <div class="left_sidebar_row_people">
                    
                    {profileList.map(profile=>(
                        <Link className="link" to={`/profile/${profile.id}`}>
                            <RowProfile
                            profilePicture={profile.profilePicture}
                            username={profile.username}
                            role={profile.role}
                            />
                        </Link>
                    ))}
                    
                </div>
            </div>
            
            
        </div>
    )
}

export default Left
