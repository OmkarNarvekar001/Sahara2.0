import React from 'react';
import News from './News';
function NewsList() {
    return (
        <div>
            <News
            img={'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'}
            cap1={"More than 10,000 under previliged students' school fees paid for this year"}
            cap2={'1 Lakh'}
            />
            <News
            img={'https://images.unsplash.com/photo-1609139003551-ee40f5f73ec0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'}
            cap1={"Supply of food for older citizes in Katmandu"}
            cap2={'10,000'}
            />
            <News
            img={'https://images.unsplash.com/photo-1593113598332-cd288d649433?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=870&q=80'}
            cap1={"Food drive (Distribution in more than 50 slums)"}
            cap2={'20,000'}
            />
            <News
            img={'https://images.unsplash.com/photo-1615461066841-6116e61058f4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=983&q=80'}
            cap1={"Free health checkup organized by Arogya Setu"}
            cap2={'50,000'}
            />
        </div>
    )
}

export default NewsList
