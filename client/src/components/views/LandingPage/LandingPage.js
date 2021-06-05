import React, { useEffect} from 'react'
import axios from 'axios';

function LandingPage(props) {

    useEffect(() => {
        axios.get('/api/hello')
        .then(Response => console.log(Response.data))
}, [])

const onClickHandler = () => {
    axios.get('/api/users/logout')
    .then(response => {
        //console.log(response.data)
        if(response.config.success) {
            props.history.push("/login");
        } else {
            alert('logout failed!')
        }
    })
}


    return (
        <div style={{
            display:'flex', justifyContent: 'center', alignItems: 'center',
            width: '100%', height: '100vh'
        }}>
            <h2>홈</h2>
            <button onClick={onClickHandler}>로그아웃</button>
        </div>
    )
}

export default LandingPage
