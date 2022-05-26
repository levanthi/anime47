import axios from 'axios'
import {useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import { domain } from '../../FunctionSpJs/constant'
import removeAccents from "../../FunctionSpJs/removeAccents"
import twoNumber from '../../FunctionSpJs/twoNumber'
import Loading from "../Loading"
import styles from './searchWindow.module.scss'

function SearchWindow({searchInput})
{
    const [animeList,setAnimeList] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true)
        if(searchInput.trim()===''){
            setAnimeList([])
            setIsLoading(false)
            return
        }
        axios.get(`${domain}/search`,{
            params:{
                name:searchInput
            }
        })
        .then(res=>{
            setAnimeList(res.data)
            setIsLoading(false)
        })
    },[searchInput])
    return <>
        <div className={styles.empty}>Không tìm thấy....</div>
        {isLoading?<Loading/>:''}
        <div className={styles.searchList}>
            {animeList.map((animeItem)=>{
                return (
                    <Link key={animeItem.name} to={`/detail/${animeItem.id}`}>
                        <div className={styles.searchItem}>
                            <div className={styles.thumbnail} style={{backgroundImage:`url(${animeItem.thumbnail})`}}></div>
                            <div className={styles.info}>
                                <span className={styles.name}>
                                    {animeItem.name}
                                </span>
                                <span className={styles.status}>
                                    Trạng Thái:{` ${twoNumber(animeItem.currentEp)}/${twoNumber(animeItem.endEp)}`}
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
