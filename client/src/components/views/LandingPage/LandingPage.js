import React, { useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
        axios.get('/api/hello')
        .then(Response => console.log(Response.data))
}, [])


    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>홈</h2>
        </div>
    )
}

export default LandingPage
