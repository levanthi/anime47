import { collection, query, where, getDocs } from "firebase/firestore"
import {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {db} from '../../Firebase/config'
import { PATHAPP } from "../../FunctionSpJs/constant"
import removeAccents from "../../FunctionSpJs/removeAccents"
import twoNumber from '../../FunctionSpJs/twoNumber'
import Loading from "../Loading"
import styles from './searchWindow.module.scss'

function SearchWindow({searchInput})
{
    const [animeList,setAnimeList] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        (async()=>{
            if(searchInput===''){
                setAnimeList([])
                return
            }
            setIsLoading(true)
            let inputString = removeAccents(searchInput).replaceAll(' ','-').toLowerCase()
            const q = query(collection(db, "anime"), where('name', '>=', inputString),where('name', '<=', inputString+ '\uf8ff'))
            const q1 = query(collection(db, "china"), where('name', '>=', inputString),where('name', '<=', inputString+ '\uf8ff'))
            const q2 = query(collection(db, "live-action"), where('name', '>=', inputString),where('name', '<=', inputString+ '\uf8ff'))
            const querySnapshot =  getDocs(q)
            // querySnapshot.forEach((doc) => {
            //     animeList.push({type:'anime',data:doc.data()})
            // })
            const querySnapshot1 =  getDocs(q1)
            // querySnapshot1.forEach((doc) => {
            //     animeList.push({type:'china',data:doc.data()})
            // })
            const querySnapshot2 =  getDocs(q2)
            // querySnapshot2.forEach((doc) => {
            //     animeList.push({type:'live-action',data:doc.data()})
            // })
            Promise.all([querySnapshot,querySnapshot1,querySnapshot2])
                .then(res=>{
                    let animeList = []
                    res.forEach((snapshot,index)=>{
                        switch(index)
                        {
                            case 0:
                                snapshot.forEach(doc=>{
                                    animeList.push({type:'anime',data:doc.data()})
                                })
                                break
                            case 1:
                                snapshot.forEach(doc=>{
                                    animeList.push({type:'china',data:doc.data()})
                                })
                                break
                            case 2:
                                snapshot.forEach(doc=>{
                                    animeList.push({type:'live-action',data:doc.data()})
                                })
                                break
                        }
                    })
                    setAnimeList(animeList)
                    setIsLoading(false)
                    let notFoundElement = document.querySelector(`.${styles.empty}`)
                    if(notFoundElement && animeList.length===0)
                    {
                        notFoundElement.style.display='block'
                    }
                    else{
                        notFoundElement.style.display='none'
                    }
                })
        })()
    },[searchInput])

    return <>
        <div className={styles.empty}>Không tìm thấy....</div>
        {isLoading?<Loading/>:''}
        <div className={styles.searchList}>
            {animeList.map((animeItem)=>{
                return (
                    <Link key={animeItem.data.name} to={`${PATHAPP}/${animeItem.type}/${animeItem.data.name}`}>
                        <div className={styles.searchItem}>
                            <div className={styles.thumbnail} style={{backgroundImage:`url(${animeItem.data.thumbnail})`}}></div>
                            <div className={styles.info}>
                                <span className={styles.name}>
                                    {animeItem.data.name.toUpperCase()}
                                </span>
                                <span className={styles.status}>
                                    Trạng Thái:{` ${twoNumber(animeItem.data.episodes)}/${twoNumber(animeItem.data.maxEpisodes)}`}
                                </span>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </div>
    </>
}

export default SearchWindow
