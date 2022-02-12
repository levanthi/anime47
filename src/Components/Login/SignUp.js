import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc,setDoc,collection } from "firebase/firestore"

import {db} from '../../Firebase/config'
import styles from './login.module.scss'
import Validator from '../../FunctionSpJs/Validator'

function SignUp()
{
    const navigate = useNavigate()
    const [isSubmit,setIsSubmit] = useState(false)

    async function signUp(result,exist)
    {
        const docRef = doc(db, 'user', result.name);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const existElement = document.querySelector(exist.selector)
            existElement.innerText = exist.message
        } else {
            const dataRef = doc(collection(db, "user"))
            await setDoc(doc(db,'user',result.name),result)
            alert('Đăng ký tài khoản thành công! Vui lòng đăng nhập!')
            setIsSubmit(true)
        }
    }

    useEffect(()=>{
        if(isSubmit)
        {
            navigate('/login/sign-in')
        }
    },[isSubmit])

    useEffect(()=>{
        Validator({
            form:'#form1',
            rules:[
                Validator.isRequire('#name','Vui lòng nhập tên đăng nhập!'),
                Validator.isRequire('#password','Vui lòng nhập mật khẩu!'),
                Validator.isRequire('#passwordConfirmation','Vui lòng nhập lại mật khẩu'),
                Validator.minLength('#password',6),
                Validator.minLength('#passwordConfirmation',6),
                Validator.passwordComfirmation('#passwordConfirmation','#password')
            ],
            errorSelector:styles.error,
            exist:{selector:'#exist',message:'Tài khoản đã tồn tại vui lòng dùng tên tài khoản khác!'},
            callBack:signUp
        })
    },[])
    return(
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
                <div className={styles.formGroup}>
                    <label htmlFor='passwordConfirmation'>Xác Nhận Mật Khẩu</label>
                    <input name='passwordConfirmation' type='password' id='passwordConfirmation'/>
                </div>
                <span className={clsx(styles.error,styles.confirmError)}></span>
            </div>
            <div>
                <div className={styles.error} id='exist' style={{height:'16px'}} ></div>
                <button>Đăng Ký</button>
            </div>
        </>
    )
}

export default SignUp
