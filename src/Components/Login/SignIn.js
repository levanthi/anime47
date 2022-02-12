import clsx from 'clsx'
import { doc, getDoc } from "firebase/firestore"
import { useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../App'

import {db} from '../../Firebase/config'
import styles from './login.module.scss'
import Validator from '../../FunctionSpJs/Validator'
import { PATHAPP } from '../../FunctionSpJs/constant'
function SignIn()
{
    const usercontext = useContext(userContext)
    const navigate = useNavigate()
    async function signIn(result,exist)
    {
        const docRef = doc(db, "user", result.name)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists() && docSnap.data().password===result.password) {
            sessionStorage.setItem('anime47User',JSON.stringify({name:result.name}))
            alert('Đăng nhập thành công')
            usercontext.setUser(docSnap.data())
            navigate(`/${PATHAPP}`)
        } else {
            const errorElement = document.querySelector(exist.selector)
            errorElement.innerHTML = exist.message
        }
    }
    useEffect(()=>{
        Validator({
            form:'#form1',
            rules:[
                Validator.isRequire('#name','vui lòng nhập tên!'),
                Validator.isRequire('#password','vui lòng nhập mật khẩu!'),
                Validator.minLength('#password',6)
            ],
            errorSelector:styles.error,
            exist:{selector:'#error',message:'Tên tài khoản hoặc mật khẩu không đúng!'},
            callBack:signIn
        })
    })
    return (
        <>
            <div>
                <div className={styles.formGroup}>
                    <label htmlFor='name'>Tài Khoản</label>
                    <input name='name' id='name'/>
                </div>
                <span className={clsx(styles.error,styles.nameError)}></span>
            </div>
            <div>
                <div className={styles.formGroup}>
                    <label htmlFor='password'>Mật Khẩu</label>
                    <input name='password' type='password' id='password'/>
                </div>
                <span className={clsx(styles.error,styles.passwordError)}></span>
            </div>
            <div>
                <div style={{height:'16px'}} id='error' className={styles.error}></div>
                <button>Đăng Nhập</button>
            </div> 
        </>
    )
}

export default SignIn
