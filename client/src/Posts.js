import React,{useEffect,useState,useContext} from 'react'
import Post from './Post'
import './Posts.css'
import {Context} from './context/Store'
import Axios from 'axios'
import { TodayOutlined } from '@material-ui/icons'

function Posts({postList}) {
    const [state,setState]=useContext(Context)
    

    return (
        <div className="posts">
            {postList.slice(0).reverse().map(todo=>(
                
                <Post
                _id={todo._id}
                userId={todo.userId}
                img={todo.img}
                createdAt={todo.createdAt}
                caption={todo.caption}
                donations={todo.donations}
                likes={todo.likes}
                post_type={todo.post_type}
                /> 
            ))}
        </div>
    )
}

export default Posts
