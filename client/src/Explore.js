import React,{useState,useEffect} from 'react'
import Posts from './Posts'
import Left from './Left'
import Nav from './Nav'
import Feed from './Feed'
import Right from './Right'
import './Explore.css'
import Axios from 'axios'

function Explore() {
    const [postList,setPostList]=useState([]);
    useEffect(()=>{
        Axios.get("http://localhost:3001/api/post/read").then((response)=>{
            if(response.message="success"){
                setPostList(response.data.post)
            }
        })
      },[])
    return (
        <div >
            <Nav/>
            <div className='explore_main'>
                <Left current={"explore"}/>
                <div className="explore_content">
                    <div className="spacer"></div>
                    <div className="explore_posts">
                    <Posts postList={postList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Explore
