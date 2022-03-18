import React,{useState,useEffect} from 'react'
import Avatar from '@material-ui/core/Avatar';
import './ProfileEdit.css'
import Axios from 'axios'
import Nav from './Nav'
import { TextField } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import SaveIcon from '@material-ui/icons/Save';
import { IconButton } from '@material-ui/core';
import { useHistory } from "react-router-dom";

function ProfileEdit() {

    const history=useHistory();
    const [hd,setHd]=useState(JSON.parse(localStorage.getItem('user')).hd)
    const [hl,setHl]=useState(JSON.parse(localStorage.getItem('user')).hl)
    const [name,setName]=useState(JSON.parse(localStorage.getItem('user')).name);
    const [bio, setBio]=useState(JSON.parse(localStorage.getItem('user')).bio)
    const [email,setEmail]=useState(JSON.parse(localStorage.getItem('user')).email)
    const [role,setRole]=useState(JSON.parse(localStorage.getItem('user')).role)
    const [password,setPassword]=useState(JSON.parse(localStorage.getItem('user')).role)
    const [profilePicture,setProfilePicture]=useState("");
    const [loginType,setLoginType]=useState(JSON.parse(localStorage.getItem('user')).confirmationCode==""?"Google":"Email")
    const [selectedFile,setSelectedFile]=useState("");
    const[isFilePicked,setIsFilePicked]=useState(false)

    useEffect(()=>{
        if(JSON.parse(localStorage.getItem('user')).profilePicture!=""){
            setProfilePicture(`/uploads/${JSON.parse(localStorage.getItem('user')).profilePicture}`)
        }
        else{
            setProfilePicture('/uploads/profile.jpg')
        }
    },[])    

    const changeHD=()=>{
        setHd(!hd)
    }
    const changeHL=()=>{
        setHl(!hl)
    }

    const changeHandler = (event) => {
        console.log("file choosen",event.target.files[0])
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
        if (event.target.files && event.target.files[0]) {
            setProfilePicture(URL.createObjectURL(event.target.files[0]));
            console.log(event.target.files[0].name)
          }
	};

    

    const save=()=>{
        const formData = new FormData();
		formData.append('postImage', selectedFile);
        formData.append('name', name);
        formData.append('img', selectedFile.name);
        formData.append('bio', bio);
        formData.append('hd', hd);
        formData.append('hl', hl);
        formData.append('userId', JSON.parse(localStorage.getItem('user'))._id);
        
        Axios.put("http://localhost:3001/api/user/update", formData, {
            headers: {
            'Content-Type': `multipart/form-data; 
            'Authorization': 'JWT fefege...',
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',boundary=${formData._boundary}`,
            }
          })
        .then((response) => {
            localStorage.setItem('user',JSON.stringify(response.data.user))
              })
		.catch((error) => {
				console.error('Error:', error);
			});
        
    }

    
    return (
        <div>
            <Nav/>
            <div className="container">
            <div className="container_1">
                <div className="avatar_container">
                <form encType="multipart/form-data">
                    <Avatar alt="Profile picture" src={profilePicture} style={{width:'200px',height:'200px',marginBottom:'30px'}} className="profile_page_avatar"/>
                    <label class="custom-file-upload" style={{marginLeft:'50px'}}>
                    <input type="file"  className="form-control" filename="postImage" onChange={changeHandler} />
                    Choose file
                    </label>
                    </form>
                    
                </div>

                <div className="form1_container">
                    <div className="texfield_container">
                    {/* <TextField onChange={(event)=>{setName(event.target.value)}} autoComplete={name}  value={name} id="outlined-basic" label="Username" variant="outlined" /> */}
                    <input type="text" className="input_caption" onChange={(event)=>{setName(event.target.value)}} value={name}/>
                    </div>
                    <div className="texfield_container">
                    {/* <TextField onChange={(event)=>{setBio(event.target.value)}} autoComplete={bio}  value={bio} id="outlined-basic" label="Bio" variant="outlined" /> */}
                    <input type="text" className="input_caption" onChange={(event)=>{setBio(event.target.value)}} value={bio}/>
                    </div>
                </div>
            </div>

            <div className="container_2">
                    <div className="profile_username" style={{color:'white'}}>Account type: <span style={{color:"rgb(66,103,178)"}}>{role}</span></div>
                    <div className="profile_username" style={{color:'white'}}>Logged in using: <span style={{color:"rgb(66,103,178)"}}>{loginType}</span></div>
                    <div className="textfield_container">
                    {/* <TextField InputProps={{readOnly: true,}} autoComplete={email}  value={email} label="Email" id="outlined-basic" variant="outlined" /> */}
                    <input type="text" className="input_caption" value={email} readonly/>
                    </div>
                    <div className="checkboxes">
                    <FormControlLabel  control={<Checkbox checked={hd} onChange={changeHD} name="checkedB" color="primary" />}  /><span style={{color:'white'}}>Hide recent donations</span>
                    <FormControlLabel control={<Checkbox checked={hl} onChange={changeHL} name="checkedB" color="primary" />} /><span style={{color:'white'}}>Hide location</span>
                    </div>
                    <div className="form_buttons">
                    <button className="follow_button" onClick={save}><span className="button_text">Save</span></button>
                        {/* <IconButton onClick={save}>
                            <SaveIcon style={{ fontSize: 36 }} className="save_button"/>
                        </IconButton> */}
                    </div>
                    
            </div>
            </div>
            
        </div>
    )
}

export default ProfileEdit
