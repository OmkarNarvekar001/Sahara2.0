import React,{useState} from 'react';
var user;
if(JSON.parse(localStorage.getItem('user'))!=null){
    user=JSON.parse(localStorage.getItem('user'))
}else{
    user=null
}

const initialState={
    user:user
}


export const Context=React.createContext();

const Store=({children})=>{
    const[state,setState]=useState(initialState);

    return(
        <Context.Provider value={[state,setState]}>{children}</Context.Provider>
    )
}

export default Store;