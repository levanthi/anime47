import {useEffect, useRef,useState} from 'react'
import { collection, query, getDocs,limit,orderBy } from "firebase/firestore"
import { Link } from 'react-router-dom'

import {db} from '../../Firebase/config'
import FilterListButton from '../FilterListButton'
import styles from './topAnime.module.scss'
import twoNumber from '../../FunctionSpJs/twoNumber'
import Loading from '../Loading'
import { PATHAPP } from '../../FunctionSpJs/constant'

function TopAnime()
{
    const [topViews,setTopViews] = useState()
    const [topComments,setTopComments] = useState()
    useEffect(()=>{
        (async ()=>{
            const topViews = []
            const q = query(collection(db, "anime"), orderBy("views",'desc'),limit(10))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                topViews.push(doc.data())
            })
            setTopViews(topViews)
        })()
    },[])

    useEffect(()=>{
        (async ()=>{
            const topComments = []
            const q = query(collection(db, "anime"), orderBy("comments",'desc'),limit(10))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                topComments.push(doc.data())
            })
            setTopComments(topComments)
        })()
    },[])


    const topViewsRef = useRef({
        handleClick:async function(path){
            //call API
            // console.log(path)
        },
        buttonList:[
            {name:'Ngày',path:'top-views/day'},
            {name:'Tuần',path:'top-views/week'},
            {name:'Tháng',path:'top-views/month'},
            {name:'Mùa',path:'top-views/season'},
            {name:'Năm',path:'top-views/year'},
        ]
    })

    const topCommentsRef = useRef({
        handleClick:async function(path){
            //call API
            // console.log(path)
        },
        buttonList:[
            {name:'Mùa này',path:'top-comments/this-season'},
            {name:'Mùa trước',path:'top-comments/pre-season'},
            {name:'Năm',path:'top-comments/year'},
            {name:'All',path:'top-comments/all'},
        ]
    })
    return (
        <div className={styles.topAnime}>
            {/* TOP VIEWS */}
            <div className={styles.topViews}>
                <div className={styles.heading}>
                    <h2>XEM NHIỀU NHẤT</h2>
                </div>
                <FilterListButton
                    list={topViewsRef.current}
                    active={topViewsRef.current.buttonList[0].name}
                    parentSelector={`.${styles.topViews}`}
                />
                <div className={styles.body}>
                    {topViews?
                        <div className={styles.animeList}>
                            {topViews.map((anime,index)=>{
                                return(
                                    <Link
                                        key={anime.name} 
                                        to={`${PATHAPP}/anime/${anime.name}`} 
                                        className={styles.animeItem}
                                        style={index===0?{backgroundImage:`url(${anime.thumbnail})`}:{}}
                                    >
                                        <div 
                                            style={{backgroundImage:`url(${anime.thumbnail})`}} 
                                            className={styles.thumbnail}
                                        ></div>
                                        <div className={styles.animeInfo}>
                                            <span className={styles.brand}>
                                                {
                                                    `${twoNumber(anime.episodes)}/${twoNumber(anime.maxEpisodes)}`
                                                }
                                            </span>
                                            <div className={styles.name}>
                                                {anime.name.replaceAll('-',' ').toUpperCase()}
                                            </div>
                                            <div className={styles.comments}>{`${anime.comments} Bình luận`}</div>
                                            <div className={styles.views}>{`${anime.views} Lượt xem`}</div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>:<Loading/>
                    }
                </div>
            </div>

            {/* TOP COMMENTS */}
            <div className={styles.topComments}>
                <div className={styles.heading}>
                    <h2>BÌNH LUẬN NHIỀU</h2>
                </div>
                <FilterListButton
                    list={topCommentsRef.current}
                    active={topCommentsRef.current.buttonList[0].name}
                    parentSelector={`.${styles.topComments}`}
                />
                <div className={styles.body}>

                    {topComments?
                        <div className={styles.animeList}>
                            {topComments.map((anime,index)=>{
                                return(
                                    <Link
                                        key={anime.name} 
                                        to={`${PATHAPP}/anime/${anime.name}`} 
                                        className={styles.animeItem}
                                        style={index===0?{backgroundImage:`url(${anime.thumbnail})`}:{}}
                                    >
                                        <div 
                                            style={{backgroundImage:`url(${anime.thumbnail})`}} 
                                            className={styles.thumbnail}
                                        ></div>
                                        <div className={styles.animeInfo}>
                                            <span className={styles.brand}>
                                                {
                                                    `${twoNumber(anime.episodes)}/${twoNumber(anime.maxEpisodes)}`
                                                }
                                            </span>
                                            <div className={styles.name}>
                                                {anime.name.replaceAll('-',' ').toUpperCase()}
                                            </div>
                                            <div className={styles.comments}>{`${anime.comments} Bình luận`}</div>
                                            <div className={styles.views}>{`${anime.views} Lượt xem`}</div>
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>:<Loading/>
                    }
                </div>
            </div>
        </div>
    )
}

export default TopAnime
