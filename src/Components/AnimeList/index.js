import { Link } from 'react-router-dom'
import {useState,memo} from 'react'
import { getDocs,collection,query, limit } from "firebase/firestore"
import { useEffect } from 'react'

import {db} from '../../Firebase/config'
import styles from './animeList.module.scss'
import {ReactComponent as Comment} from '../../static/icon/comment-alt-solid.svg'
import {ReactComponent as Check} from '../../static/icon/check-solid.svg'
import {ReactComponent as Play} from '../../static/icon/play-solid.svg'
import Loading from '../Loading'

function AnimeList({path='anime',limited=20,data})
{
    const [animeList,setAnimeList] = useState()
    useEffect(()=>{
        if(!data){
            (async()=>{
                const animeList = []
                const querySnapshot = await getDocs(query(collection(db, path),limit(limited)))
                querySnapshot.forEach((doc) => {
                    animeList.push(doc.data())
                })
                setAnimeList(animeList)
            })()
        }
        else{
            setAnimeList(data)
        }
    },[data])
    return (
        <>
            {animeList?animeList.map((anime)=>{
                return(
                    <div title={anime.name} key={anime.name} className='col l-3 c-4'>
                        <div className={styles.animeItem}>
                            <span className={styles.brand}>{`${anime.episodes}/${anime.maxEpisodes||'??'}`}</span>
                            <Link to={`${path}/${anime.name.toLowerCase()}`}>
                                <span className={styles.play}>
                                    <Play/>
                                </span>
                                <div className={styles.thumbnailWrap}>
                                    <div style={{backgroundImage:`url(${anime.thumbnail})`}} className={styles.thumbnail}></div>
                                </div>
                                <div className={styles.animeInfo}>
                                    <div className={styles.name}>
                                        {anime.displayName?anime.displayName.toUpperCase():anime.name.replaceAll('-',' ').toUpperCase()}
                                    </div>
                                    <div className={styles.numberGroup}>
                                        <div>
                                            <Comment/>
                                            <div className={styles.comments}>{anime.comments}</div>
                                        </div>
                                        <div>
                                            <Check/>
                                            <div className={styles.views}>{anime.views}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            }):<Loading/>}
        </>
    )
   
}

export default memo(AnimeList)
