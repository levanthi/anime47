import { useEffect, useLayoutEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'


import SignUp from './SignUp'
import SignIn from './SignIn'
import styles from './login.module.scss'

function Login(setUser) {
    const location = useLocation()
    const [type,setType] = useState()
    useLayoutEffect(()=>{
        setType(location.pathname.slice(location.pathname.lastIndexOf('/')+1))
    },[location])
    
    return <div className={styles.authen} >
        <form id='form1' >
            {type==='sign-up'?<SignUp/>:''}
            {type==='sign-in'?<SignIn setUser={setUser} />:''}
        </form>
    </div>
}

export default Login
