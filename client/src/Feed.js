import React,{useState,useContext,useEffect} from 'react'
import {Context} from './context/Store'
import Posts from './Posts'
import Axios from 'axios'
import './Feed.css'
import { TextField } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import AddCircleSharpIcon from '@material-ui/icons/AddCircleSharp';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";



function Feed() {
const history = useHistory();

    const height = 50
    const width = 585
    const labelOffset = -6
    const[post,setPost]=useState({
        file:"",
        caption:"",
        status:""
    });
    const [state,setState]=useContext(Context)
    const [check, setCheck]=useState(false);
    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [fileName,setFileName]=useState("");
    const [caption,setCaption]=useState("");
    const [postList,setPostList]=useState([]);
    

//check logged in
useEffect(()=>{
    if(state.user!=null || JSON.parse(localStorage.getItem('user'))!=null || state.user!=undefined || JSON.parse(localStorage.getItem('user'))!=null){
        console.log(state.user);
        console.log("_______________________________________")
        console.log(JSON.parse(localStorage.getItem('user')));
        if(state.user==null){
            setState({user:JSON.parse(localStorage.getItem('user'))})
        }

    }
    else{
        setState({user:null});
        localStorage.setItem('user',JSON.stringify(null));
        history.push('/signin')
    }
},[state])
//check logged in



    
//checkbox state 
const changeCheckbox=()=>{
    setCheck(!check)
}
//checkbox state


//
useEffect(()=>{
    Axios.get("http://localhost:3001/api/post/read").then((response)=>{
        if(response.message="success"){
            setPostList(response.data.post)
        }
    })
  },[])
  //

	const changeHandler = (event) => {
        console.log("file choosen",event.target.files[0])
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
	const handleSubmission = (event) => {
        // event.preventDefault();
        if(isFilePicked==false){
            window.alert("Choose a file to upload")
        }
        else{
        var post_type=""
        if(check==true){
            post_type="request";
        }
        else{
            post_type="general"
        }

        const formData = new FormData();
		formData.append('postImage', selectedFile);
        formData.append('userId', state.user._id);
        formData.append('img', selectedFile.name);
        formData.append('caption', caption);
        formData.append('post_type', post_type);
        
        
        Axios.post("http://localhost:3001/api/post/add", formData, {
            headers: {
            'Content-Type': `multipart/form-data; 
            'Authorization': 'JWT fefege...',
              'accept': 'application/json',
              'Accept-Language': 'en-US,en;q=0.8',boundary=${formData._boundary}`,
            }
          })
        .then((response) => {

              })
		.catch((error) => {
				console.error('Error:', error);
			});            
        }
	};
	


    return (
        <div className="feed">
            <div className="make_post">
            <form encType="multipart/form-data">
                <div className="make_post_row1">
                
                
                <label class="custom-file-upload">
                    <input type="file" className="form-control" filename="postImage" onChange={changeHandler}/>
                    Choose file
                </label>
            
                {JSON.parse(localStorage.getItem('user'))!=null?JSON.parse(localStorage.getItem('user')).role=="organization"?
                <div>
                <FormControlLabel
                control={
                    <Checkbox
                    onChange={changeCheckbox}
                    name="checkedB"
                    color="primary"
    
                    />
                }
                // label="Request donations"
                /><span style={{color:'white'}}>Request donations</span></div>:<div style={{height:25}}></div>:history.push("./signin")}
                </div>
                <div className="caption_input_text_container">
                <div className="input_caption_container">
                <input onChange={(event)=>{setCaption(event.target.value)}} className="input_caption" type="text" placeholder="Caption..."/>
                </div>
        
                <IconButton type="submit" onClick={(event)=>handleSubmission(event)}>
                    <AddCircleSharpIcon className="plus_button" style={{ fontSize: 35}}/>
                </IconButton>
                </div>
                </form>
            </div>
            <br/>
            <div className="feed_post_list">
            <Posts postList={postList}/>
            </div>
        </div>
    )
}

export default Feed
