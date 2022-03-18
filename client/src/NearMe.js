import React from 'react'
import MapContainer from './MapContainer'
import Nav from './Nav'
import Left from './Left'
import './NearMe.css'
function NearMe() {
    return (
        <div>
            <div >
            <Nav/>
            <div className='explore_main'>
                <Left current={"nearme"}/>
                <div className="explore_content">
                        <MapContainer/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default NearMe
