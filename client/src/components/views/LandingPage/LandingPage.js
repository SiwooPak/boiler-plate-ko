import React, { useEffect} from 'react'
import axios from 'axios';

function LandingPage() {

    useEffect(() => {
        axios.get('http://localhost:5000/api/hello')
        .then(Response => console.log(Response.data))
}, [])


    return (
        <div>
            LandingPage
        </div>
    )
}

export default LandingPage
