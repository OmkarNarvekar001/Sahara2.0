import React,{useContext} from 'react'
import './SignIn.css'
import { useState ,useEffect} from "react"
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios'
import {Context} from './context/Store'
import { useHistory } from "react-router-dom";

function SignIn() {
    const history=useHistory();
    const [state,setState]=useContext(Context)
    const height = 50
    const width = 300
    const labelOffset = -6
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    


    const login=async()=>{
        Axios.post("http://localhost:3001/api/signin",{email:email,password:password})
              .then((response) => {
                console.log(response)
                if(response.data.message=="Auth successfull"){
                  setState({user:response.data.user})
                  localStorage.setItem('user',JSON.stringify(response.data.user))
                  history.push('/')
                }
                else{
                  window.alert("Invalid credentials hei1")
                }
              }, (error) => {
                console.log(error)
                window.alert("Invalid credentials hei2")
              });
    }

    const handleLogin = async googleData => {
        const res = await fetch("http://localhost:3001/api/v1/auth/google", {
            method: "POST",
            body: JSON.stringify({
            token: googleData.tokenId
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        const data = await res.json()
        if(data.message=="success"){
          setState({user:data.user})
          localStorage.setItem('user',JSON.stringify(data.user))
          history.push('/')
        }
        else{

          window.alert("Invalid credentials")
        }
        
        // store returned user somehow
      }

    return (
        <div className="signin">
          
            <div className="signin_container">
            <h1 className="form_title">Sign in</h1>
                
                <div className="input_text_container">
                <TextField onChange={(event)=>{setEmail(event.target.value)}}  id="filled-basic" label="Email"  variant="outlined" style={{ height }}InputLabelProps={{style: {height,...({ top: `${labelOffset}px` }),width,...({ top: `${labelOffset}px` }),},}}inputProps={{style: {height,padding: '0 14px',width,padding: '0 14px',},}} />
                </div>

                <div className="input_text_container">
                <TextField onChange={(event)=>{setPassword(event.target.value)}} id="filled-basic" label="Password" variant="outlined" style={{ height }}InputLabelProps={{style: {height,...({ top: `${labelOffset}px` }),width,...({ top: `${labelOffset}px` }),},}}inputProps={{style: {height,padding: '0 14px',width,padding: '0 14px',},}} type="password"/>
                </div>

                <div className="signup_buttons">
                <input type="submit" value="Login" onClick={login} className="login_button"/>
                <GoogleLogin
                clientId="624398540702-hft2l1uf6p82b8u4ui0soag8l7e9mdrq.apps.googleusercontent.com"
                buttonText="Log in with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
                />
                </div>
            
            </div>

        </div>
    )
}

export default SignIn
