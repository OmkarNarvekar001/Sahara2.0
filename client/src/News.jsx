import React from 'react'
import './News.css'

function News({img,cap1,cap2}) {
    return (
        
            <div className="main_container">
                <img className="news_image" src={img} alt="News" />
                
                    <div className="black_bg"></div>
                    <div className="info_container">
                    
                    <div className="info">
                        {cap1}
                    </div>
                    <div className="donations">
                    Rs. {cap2} raised
                    </div>
                    
                </div>
            </div>
        
    )
}

export default News
