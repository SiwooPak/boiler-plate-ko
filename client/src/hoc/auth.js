import React from 'react'
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { auth } from '../_actions/user_actions'

export default function(SpecificComponent, option, adminRoute = null) {
    // option:
    // null => 아무나 출입 가능
    // true => 로그인한 유저만 출입 가능
    // false => 로그인한 유저는 출입 불가.

    function AuthenticationCheck(props) {
        const dispatch = useDispatch();
        useEffect(() => {
            dispatch(auth()).then(response => {
                consolelog(response);
            })
        },[])
    }
}

export default auth
