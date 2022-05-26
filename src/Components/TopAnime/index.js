import {useEffect, useRef,useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import FilterListButton from '../FilterListButton'
import styles from './topAnime.module.scss'
import twoNumber from '../../FunctionSpJs/twoNumber'
import Loading from '../Loading'
import { domain } from '../../FunctionSpJs/constant'

function TopAnime()
{
    const [topViews,setTopViews] = useState()
    const [topComments,setTopComments] = useState()

    useEffect(()=>{
        axios.get(`${domain}/topViews`)
            .then(res=>{
                setTopViews(res.data)
            })
            .catch(err=>console.log(err))
    },[])

    useEffect(()=>{
        axios.get(`${domain}/topComments`)
            .then(res=>{
                setTopComments(res.data)
            })
            .catch(err=>console.log(err))
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
        <div className={'topAnime'}>
            {/* TOP VIEWS */}
            <div className={styles.topView}>
                <div className={styles.heading}>
                    <h2>XEM NHIỀU NHẤT</h2>
                </div>
                <FilterListButton
                    list={topViewsRef.current}
                    active={topViewsRef.current.buttonList[0].name}
                    parentSelector={`.${styles.topView}`}
                />
                <div className={styles.body}>
                    {topViews?
                        <div className={styles.animeList}>
                            {topViews.map((anime,index)=>{
                                return(
                                    <Link
                                        key={anime.name} 
                                        to={`/detail/${anime.id}`} 
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
                                                    `${twoNumber(anime.currentEp)}/${twoNumber(anime.endEp)}`
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
                                        to={`/detail/${anime.id}`} 
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
                                                    `${twoNumber(anime.currentEp)}/${twoNumber(anime.endEp)}`
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
