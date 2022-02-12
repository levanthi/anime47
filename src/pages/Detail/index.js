import {useEffect, useState} from 'react'
import { collection, query, where, getDocs ,updateDoc, arrayUnion,doc} from "firebase/firestore"
import {Link,useLocation} from 'react-router-dom'

import { db } from '../../Firebase/config'
import removeAccents from '../../FunctionSpJs/removeAccents'
import genreToAccent from '../../FunctionSpJs/genreToAccent'
import styles from './detail.module.scss'
import twoNumber from '../../FunctionSpJs/twoNumber'
import Loading from '../../Components/Loading'
import { PATHAPP } from '../../FunctionSpJs/constant'

function Detail()
{
    const location=useLocation()
    const [anime,setAnime] = useState()
    useEffect(()=>{
        (()=>{
            setAnime(null)
            let pathName = window.location.pathname.slice(1)
            let name = pathName.slice(pathName.lastIndexOf('/')+1)
            let path = pathName.slice(pathName.indexOf('/')+1,pathName.lastIndexOf('/'))
            let anime = {}
            const q = query(collection(db, path), where("name", "==", name))
            const q1 = query(collection(db, 'videos'), where("name", "==", name))

            const querySnapshot = getDocs(q)
            const querySnapshot1 = getDocs(q1)

            Promise.all([querySnapshot,querySnapshot1])
                .then(([s1,s2])=>{
                    s1.forEach((doc) => {
                        anime = {...doc.data()}
                    })
                    s2.forEach((doc) => {
                        anime.description=doc.data().description
                    })
                    setAnime(anime)
                })
        })()
    },[location.pathname])
    useEffect(()=>{
        window.scrollTo({top:0})
    })
    return(
        <div className={styles.detailWrap}>
            {anime?
                <div className={styles.detail}>
                    <div className='row'>
                        <div className='col l-12'>
                            {anime?
                                <div className={styles.animeItem}>
                                    <div className={styles.thumbnailGroup}>
                                        <div className={styles.thumbnail} style={{backgroundImage:`url(${anime.thumbnail})`}}>
                                            <div className={styles.buttonGroup}>
                                                <button
                                                    onClick={async ()=>{
                                                        const user = JSON.parse(sessionStorage.getItem('anime47User'))
                                                        if(user)
                                                        {
                                                            const path= window.location.pathname
                                                            const animeName = path.slice(path.lastIndexOf('/')+1)
                                                            let type = path.slice(path.indexOf('/')+1,path.lastIndexOf('/'))
                                                            type=type.slice(type.indexOf('/')+1)
                                                            const userRef = doc(db, "user",user.name)

                                                            await updateDoc(userRef, {
                                                                [type]:arrayUnion(animeName)
                                                            })
                                                            alert('Thêm vào tủ phim thành công!')
                                                        }
                                                        else{
                                                            alert('Bạn phải đăng nhập để sử dụng chức năng này!')
                                                        }
                                                    }}
                                                >Lưu Lại</button>
                                                <Link
                                                    to={`/${PATHAPP}/watch/${window.location.pathname.slice(window.location.pathname.lastIndexOf('/')+1)}`}
                                                >
                                                    <button>Xem Anime</button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.animeInfo}>
                                        <h2 className={styles.animeName}>
                                            {anime.displayName?anime.displayName.toUpperCase():anime.name.replaceAll('-',' ').toUpperCase()}
                                        </h2>
                                        <div className={styles.infoGroup}>
                                            <span>
                                                Trạng thái:
                                                <span className={styles.status}>
                                                    {`${twoNumber(anime.episodes)}/${twoNumber(anime.maxEpisodes)}`}
                                                </span>
                                            </span>
                                            <span>
                                                Lượt Xem:
                                                <span className={styles.views}>{anime.views} Lượt xem</span>
                                            </span>
                                            {window.location.pathname.includes('anime')?
                                            <span>
                                                Thể loại:
                                                <span className={styles.genres}>
                                                    
                                                {
                                                    anime.genres?anime.genres.map((genre,index,arr)=>{
                                                        return (
                                                            <Link 
                                                                key={index} to={`/${PATHAPP}/filter/genres/${removeAccents(genre).replaceAll(' ','-').toLowerCase()}`}
                                                                onClick={()=>{
                                                                    window.scroll({top:0})
                                                                }}
                                                            >
                                                                {genreToAccent(genre)}
                                                                {index===arr.length-1?'':','}
                                                            </Link>
                                                        )
                                                    }):''
                                                }
                                                    
                                                </span>
                                            </span>:''
                                            }
                                            <span>
                                                Bình luận:
                                                <span className={styles.comments}>{anime.comments} Bình luận</span>
                                            </span>
                                            <div >
                                                Nội dung: 
                                                <span className={styles.desctiption}>
                                                    {anime.description}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :''
                            }
                        </div>
                    </div>
                </div>:<Loading/>
            }
        </div>
    )
}

export default Detail
