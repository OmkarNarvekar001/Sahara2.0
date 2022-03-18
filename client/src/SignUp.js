import React from 'react'
import { useState ,useEffect,useContext} from "react"
import Axios from 'axios'
import'./SignUp.css'
import { TextField } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Context} from './context/Store'
import { useHistory } from "react-router-dom";

function SignUp() {
    const history=useHistory();
    const height = 50
    const width = 300
    const labelOffset = -6
    const responseGoogle = (response) => {
        console.log(response);
      }
    const[username,setUsername]=useState('')
    const[email,setEmail]=useState('')
    const[password,setPassowrd]=useState('')
    const[confirmPassword,setConfirmPassowrd]=useState('')
    const[confirmPasswordError,setConfirmPassowrdError]=useState('')
    const[passwordError,setPasswordError]=useState('')
    const[usernameError,setUsernameError]=useState('')
    const[emailError,setEmailError]=useState('')
    const[checked,setChecked]=useState(false)
    const [state,setState]=useContext(Context)
    const handleClick = () => {setChecked(!checked)}

    const validate=()=>{
        var emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        var usernamePattern=new RegExp(/^[a-zA-Z0-9]+$/);
        var count=0
        if(password!==confirmPassword ){
            setConfirmPassowrdError("Doesn't match")
            count+=1
        }
        if(!emailPattern.test(email) ){
            setEmailError("Invalid email")
            count+=1
        }
        if(!usernamePattern.test(username)){
            setUsernameError("Invalid username")
            count+=1
        }
        if(password.length<6 ){
            setPasswordError("Invalid password")
            count+=1
        }
        if(count!=0){
            count=0
            return false
        }
        else{
            count=0
            return true
        }
    }
    // const setNull=()=>{
    // setUsername('')
    // setEmail('')
    // setPassowrd('')
    // setConfirmPassowrd('')
    // setConfirmPassowrdError('')
    // setPasswordError('')
    // setUsernameError('')
    // setEmailError('')
    // setChecked(false)
    // }
    
    const register=()=>{
        if(validate()){
            Axios.post("http://localhost:3001/api/signup",{name:username,email:email,password:password,role:(checked?"organization":"donor")})
            .then((response) => {
                // setNull()
                window.alert("Check your mail for account activation..")
              }, (error) => {
                window.alert("Registration unsucessfull")
              });
        }
        
      };



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
        <div className="signup">
            <div className="signup_container">
            <h1 className="form_title">Sign up</h1>
            <div className="input_text_container">

            <TextField error={usernameError!=""} onChange={(event)=>{setUsername(event.target.value)}} id="filled-basic" label="Username" helperText={usernameError} variant="outlined" style={{ height }}InputLabelProps={{style: {height,...({ top: `${labelOffset}px` }),width,...({ top: `${labelOffset}px` }),},}}inputProps={{style: {height,padding: '0 14px',width,padding: '0 14px',},}} />
            </div>

            <div className="input_text_container">
            <TextField error={emailError!=""} onChange={(event)=>{setEmail(event.target.value);}} id="filled-basic" label="Email" helperText={emailError} variant="outlined" errorText={"error"} style={{ height }}InputLabelProps={{style: {height,...({ top: `${labelOffset}px` }),width,...({ top: `${labelOffset}px` }),},}}inputProps={{style: {height,padding: '0 14px',width,padding: '0 14px',},}}/>
            </div>

            <div className="input_text_container">
            <TextField error={passwordError!=""} onChange={(event)=>{setPassowrd(event.target.value)}} helperText={passwordError} id="filled-basic" type="password" label="Password" variant="outlined" style={{ height }}InputLabelProps={{style: {height,...({ top: `${labelOffset}px` }),width,...({ top: `${labelOffset}px` }),},}}inputProps={{style: {height,padding: '0 14px',width,padding: '0 14px',},}}/>
            </div>

            <div className="input_text_container">
            <TextField error={confirmPasswordError!=""} onChange={(event)=>{setConfirmPassowrd(event.target.value)}} helperText={confirmPasswordError} id="filled-basic" type="password" label="Confirm Password" variant="outlined" style={{ height }}InputLabelProps={{style: {height,...({ top: `${labelOffset}px` }),width,...({ top: `${labelOffset}px` }),},}}inputProps={{style: {height,padding: '0 14px',width,padding: '0 14px',},}}/>
            </div>

            <div className="input_text_container">
            <FormControlLabel
                control={
                    <Checkbox
                    checked={checked}
                    onClick={handleClick}
                    name="checkedB"
                    color="primary"
                    />
                }
                label="Sign up as an organization"
                />
            </div>

            <div className="signup_buttons">
            <input type="submit" value="Sign up" onClick={register} className="follow_button"/>
            <GoogleLogin
                clientId="624398540702-hft2l1uf6p82b8u4ui0soag8l7e9mdrq.apps.googleusercontent.com"
                buttonText="Sign up with Google"
                onSuccess={handleLogin}
                onFailure={handleLogin}
                cookiePolicy={'single_host_origin'}
                />
            </div>
            
        </div>
            

        </div>
    )
}

export default SignUp
