import React,{useContext,useState,useEffect} from 'react'
import {BrowserRouter as Router,Link,Route} from "react-router-dom";
import './Nav.css';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MessageIcon from '@material-ui/icons/Message';
import SearchIcon from '@material-ui/icons/Search';
import { IconButton,Menu,MenuItem } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import {Context} from './context/Store'

function Nav() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [state,setState]=useContext(Context)

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      localStorage.setItem('user',JSON.stringify(null))
      setState({user:null})
    };
    const handleCloseTp=()=>{
        setAnchorEl(null);
    }
    return (
        <div className="nav">


            <div className="nav_1">
                <img src="/logo.png" width="60px" style={{marginTop:"-6px"}} className="nav_logo" alt="logo" />
            </div>


            <div className="nav_2">
                <div className="search_div">
                    {/* <SearchIcon className="search_icon"/>
                    <input type="text" placeholder="Search Sahara" className="search_input"/> */}
                </div>

            </div>


            <div className="nav_3">
                {/* <IconButton style={{height:50}}>
                    <MessageIcon className="nav_icon" style={{ fontSize: 27 }} />
                </IconButton>
                
                <IconButton style={{height:50}}>
                    <NotificationsIcon className="nav_icon" style={{ fontSize: 27 }} />
                </IconButton> */}
                
                <Link style={{textDecoration:'none',color:'black'}} to={`/profile/${JSON.parse(localStorage.getItem('user'))._id}`}>
                <IconButton style={{height:50}}>
                    <AccountCircleIcon className="nav_icon" style={{ fontSize: 27 }} />
                </IconButton>
                </Link>

                <IconButton style={{height:50}}>
                    <SettingsIcon aria-controls="simple-menu" aria-haspopup="true" className="nav_icon" style={{ fontSize: 27 }} onClick={handleClick}/>
                    <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseTp}
                    style={{marginTop:30}}
                    >
                        <Link style={{textDecoration:'none',color:'black'}} to={`/profile/edit`}><MenuItem>Edit Profile</MenuItem></Link>
                        <Link style={{textDecoration:'none',color:'black'}} to={`/signin`}><MenuItem onClick={handleClose}>Logout</MenuItem></Link>
                    </Menu>
                </IconButton>
                
                
            </div>

            
        </div>
    )
}

export default Nav