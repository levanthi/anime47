import {useState,useRef,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

import Loading from '../../Components/Loading'
import {ReactComponent as Play} from '../../static/icon/play-solid.svg'
import {ReactComponent as Pause} from '../../static/icon/pause-solid.svg'
import {ReactComponent as Backward} from '../../static/icon/backward-solid.svg'
import {ReactComponent as Forward} from '../../static/icon/forward-solid.svg'
import {ReactComponent as Volume} from '../../static/icon/volume-up-solid.svg'
import {ReactComponent as Light} from '../../static/icon/lightbulb-regular.svg'
import {ReactComponent as Setting} from '../../static/icon/cog-solid.svg'
import {ReactComponent as Expand} from '../../static/icon/expand-alt-solid.svg'
import {ReactComponent as ExpandAll} from '../../static/icon/expand-solid.svg'
import converSecondstoHMS from '../../FunctionSpJs/converSecondstoHMS'
import styles from './watch.module.scss'
import { domain } from '../../FunctionSpJs/constant'

function Watch()
{
    const location = useLocation()
    const [active,setActive] = useState(1)
    const [episodes,setEpisode] = useState([]) 
    const [isVideoLoaded,setIsVideoLoaded] = useState(false)
    const videoRef = useRef()
    const isExpand = useRef(false)
    const expandBtnRef = useRef()
    const idInterValRef = useRef()
    useEffect(()=>{
        axios.get(`${domain}${location.pathname}`)
            .then(res=>{
                setEpisode(res.data.episodes)
            })
    },[])
    function handlePlayStop()
    {
        let playElement = document.querySelector(`.${styles.play}`)
        let videoState = document.querySelector(`.${styles.videoState}`)
        if(videoRef.current.isPlaying)
        {
            videoRef.current.isPlaying= false
            videoRef.current.pause()
            if(playElement)
                playElement.classList.remove(styles.playing)
            if(videoState){
                videoState.style.visibility='visible'
                videoState.style.backgroundColor='rgba(0, 0, 0,.3)'
            }
        }
        else{
            videoRef.current.isPlaying=true
            videoRef.current.play()
            if(playElement)
                playElement.classList.add(styles.playing)
            if(videoState){
                videoState.style.visibility='hidden'
                videoState.style.backgroundColor='transparent'
            }
        }
    }
    function handleSetResolution(e)
    {
        let videoResolution = e.target.parentElement
        let settingIcon = document.querySelector(`.${styles.setting} svg`)
        if(videoResolution){
            videoResolution.style.visibility='hidden'
            videoResolution.style.opacity='0'
        }
        if(settingIcon){
            settingIcon.style.color='white'
        }
    }
    function handleLight()
    {
        let overlayElement = document.querySelector('.overlay')
        let lightElement = document.querySelector(`.${styles.light}`)
        if(overlayElement.style.visibility==='visible'){
            overlayElement.style.visibility='hidden'
            overlayElement.style.opacity='0'
        }
        else{
            overlayElement.style.visibility='visible'
            overlayElement.style.opacity='1'
        }
        if(lightElement)
            lightElement.classList.toggle('video-controls-active')
    }
    function handleExpand()
    {
        let windowWIdth = window.innerWidth
        let videoWrap = document.querySelector(`.${styles.videoWrap}`)
        let topAnime = document.querySelector(`.topAnime`)
        let expandIcon = document.querySelector(`.${styles.expand}`)
        if(expandIcon)
        {
            expandIcon.classList.toggle('video-controls-active')
        }
        if(windowWIdth>=1100)
        {
            if(!isExpand.current)
            {
                const videoWidth = 990
                videoWrap.style.width=videoWidth + 'px'
                if(topAnime){
                    topAnime.style.marginTop = (videoWidth*0.56 + 50) + 'px'
                }
                isExpand.current=!isExpand.current
                expandBtnRef.current.innerText = 'Thu nhỏ'
            }
            else{
                videoWrap.style.width='100%'
                topAnime.style.marginTop = 0
                isExpand.current=!isExpand.current
                expandBtnRef.current.innerText = 'Phóng to'
            }
        }
    }

    return(
        <>
        <span 
            className='overlay'
            onClick={(e)=>{
                e.target.style.visibility='hidden'
                e.target.style.opacity='0'
            }}
        ></span>
        <div className={styles.Watch}>
            <div className={styles.videoWrap}>
                <span className={styles.error}>
                    Không thể tải tập phim! Vui lòng thử lại, kiểm tra internet hoặc liên hệ quản trị viên!
                </span>
                {isVideoLoaded?
                    <span 
                        className={styles.videoState}
                        onClick={handlePlayStop}
                    >
                        <div>
                            <Play/>
                            <span className={styles.playAnimate}></span>
                            <span className={styles.playAnimate}></span>
                        </div>
                    </span>:''}
                <video 
                    preload='metadata'
                    ref={videoRef} type='video/mp4' 
                    src={episodes[active-1]?.url}
                    onClick={handlePlayStop}
                    onLoadedData={()=>{
                        let videoState = document.querySelector(`.${styles.videoState}`)
                        if(videoState)
                        {
                            videoState.style.visibility='visible'
                        }
                        setIsVideoLoaded(true)
                        let errorElement = document.querySelector(`.${styles.error}`)
                        errorElement.style.display='none'
                    }}
                    onError={()=>{
                        // setIsVideoLoaded(false)
                        let errorElement = document.querySelector(`.${styles.error}`)
                        errorElement.style.display='block'
                    }}
                    onPlaying={(e)=>{
                        clearInterval(idInterValRef.current)
                        idInterValRef.current = setInterval(()=>{
                            let currentTime = document.querySelector(`.${styles.currentTime}`)
                            if(currentTime)
                                currentTime.innerText = converSecondstoHMS(e.target.currentTime)
                        },1000)
                    }}
                    onPause={()=>{
                        clearInterval(idInterValRef.current)
                    }}
                    onTimeUpdate={(e)=>{
                        let width = e.target.currentTime*100/e.target.duration
                        let processElement = document.querySelector(`.${styles.process}`)
                        if(processElement){
                            processElement.lastChild.style.width = width + '%'
                        }
                    }}
                >
                </video>
                {isVideoLoaded?
                    <div className={styles.control}>
                        <span 
                            className={styles.play}
                            id='play'
                            onClick={handlePlayStop}
                        >
                            <div className={styles.playIcon}><Play/></div>
                            <div className={styles.pauseIcon}><Pause/></div>
                        </span>
                        <span 
                            className={styles.backward}
                            onClick={()=>{
                                let times = videoRef.current.currentTime-10
                                let currentTime = document.querySelector(`.${styles.currentTime}`)
                                if(times<0)
                                    times=0
                                videoRef.current.currentTime=times
                                currentTime.innerText = converSecondstoHMS(times)
                            }}
                        >
                            <Backward/>
                        </span>
                        <span 
                            className={styles.forward}
                            onClick={()=>{
                                let currentTime = document.querySelector(`.${styles.currentTime}`)
                                let times = videoRef.current.currentTime+10
                                if(times>videoRef.current.duration)
                                    times=videoRef.current.duration
                                videoRef.current.currentTime=times
                                currentTime.innerText = converSecondstoHMS(times)
                            }}
                        >
                            <Forward/>
                        </span>
                        <span className={styles.volume}>
                            <Volume/>
                            <div>
                                <input 
                                    type='range'
                                    min='0' 
                                    max='100'
                                    onChange={(e)=>{
                                        const volumeProcess = e.target.parentElement.lastElementChild
                                        volumeProcess.style.width= e.target.value*0.9 + 'px'
                                        videoRef.current.volume=e.target.value/100
                                    }}
                                />
                                <span className={styles.volumeBar}></span>
                                <span className={styles.volumeProcess}></span>
                            </div>
                        </span>
                        <span className={styles.currentTime}>
                            00:00
                        </span>
                        <span className={styles.process}>
                            <input 
                                type='range' 
                                min='0' 
                                max='100' 
                                step='1'
                                onChange={(e)=>{
                                    e.target.parentElement.lastChild.style.width = e.target.value + '%'
                                    videoRef.current.currentTime = e.target.value*videoRef.current.duration/100
                                }}
                                onMouseMove={(e)=>{ 
                                    let initLeft = e.target.getBoundingClientRect().left
                                    let duration = videoRef.current.duration
                                    let maxWidth = e.target.offsetWidth
                                    let currentWidth = e.pageX-Math.floor(initLeft)
                                    let currentTimeHover = document.querySelector(`.${styles.currentTimeHover}`)
                                    if(currentWidth<0)
                                    {
                                        currentWidth=0
                                    }
                                    if(currentWidth>maxWidth)
                                    {
                                        currentWidth=maxWidth
                                    }
                                    currentTimeHover.style.visibility = 'visible'
                                    currentTimeHover.style.opacity = '1'
                                    currentTimeHover.innerText=converSecondstoHMS(currentWidth*duration/maxWidth)
                                    currentTimeHover.style.left=currentWidth+'px'
                                }}
                                onMouseLeave={()=>{
                                    let currentTimeHover = document.querySelector(`.${styles.currentTimeHover}`)
                                    currentTimeHover.style.visibility = 'hidden'
                                    currentTimeHover.style.opacity = '0'
                                }}
                            />
                            <div className={styles.currentTimeHover}>00:12</div>
                            <span></span>
                            <span></span>
                        </span>
                        <span className={styles.endTime}>
                            {converSecondstoHMS(videoRef.current.duration)}
                        </span>
                        <span 
                            className={styles.light}
                            onClick={handleLight}
                        >
                            <Light/>
                        </span>
                        <span 
                            className={styles.setting}
                            onClick={(e)=>{
                                let videoResolution = e.target.closest(`.${styles.setting}`).lastChild
                                if(videoResolution)
                                {
                                    let settingIcon = document.querySelector(`.${styles.setting} svg`)
                                    if(!videoResolution.style.visibility)
                                    {
                                        videoResolution.style.visibility='hidden'
                                    }
                                    if(videoResolution.style.visibility!=='hidden')
                                    {
                                        videoResolution.style.visibility='hidden'
                                        videoResolution.style.opacity='0'
                                        settingIcon.style.color='white'
                                    }
                                    else{
                                        videoResolution.style.visibility='visible'
                                        videoResolution.style.opacity='1'
                                        settingIcon.style.color='#4ed2db'
                                    }
                                }
                            }}
                        >
                            <Setting/>
                            <div 
                                className={styles.videoResolution}
                                onClick={(e)=>{
                                    e.stopPropagation()
                                }}
                            >
                                <h3>Độ phân giải Video</h3>
                                <div 
                                    className={styles.p720}
                                    onClick={(e)=>{
                                        handleSetResolution(e)
                                    }}
                                >720p</div>
                                <div 
                                    className={styles.p480}
                                    onClick={(e)=>{
                                        handleSetResolution(e)
                                    }}
                                >480p</div>
                                <div 
                                    className={styles.p360}
                                    onClick={(e)=>{
                                        handleSetResolution(e)
                                    }}
                                >360p</div>
                            </div>
                        </span>
                        <span 
                            className={styles.expand}
                            onClick={handleExpand}
                        >
                            <Expand/>
                        </span>
                        <span 
                            className={styles.expandAll}
                            onClick={()=>{
                                let expandAll = document.querySelector(`.${styles.expandAll}`)
                                expandAll.classList.toggle('video-controls-active')
                                if(document.fullscreen)
                                {
                                    document.exitFullscreen()
                                }
                                else{
                                    videoRef.current.parentElement.requestFullscreen()
                                }

                            }}
                        >
                            <ExpandAll/>
                        </span>
                    </div>
                :<Loading/>
                }
            </div>
            <div className={styles.options}>
                <button onClick={handleLight}>
                    Tắt đèn
                </button>
                <button ref={expandBtnRef} onClick={handleExpand}>
                    Phóng to
                </button>
                <button onClick={()=>{
                    if(active!==1)
                    {
                        setIsVideoLoaded(false)
                        setActive(pre=>pre-1)
                        let playIcon = document.querySelector(`.${styles.play}`)
                        if(playIcon)
                            playIcon.classList.remove(styles.playing)
                        window.scroll({
                            top:0,
                            behavior:'smooth'
                        })
                    }
                }}>
                    Prev
                </button>
                <button onClick={()=>{
                    if(active!==episodes.length)
                    {
                        setIsVideoLoaded(false)
                        setActive(pre=>pre+1)
                        let playIcon = document.querySelector(`.${styles.play}`)
                        if(playIcon)
                            playIcon.classList.remove(styles.playing)
                        window.scroll({
                            top:0,
                            behavior:'smooth'
                        })
                    }
                }}>
                    Next
                </button>
            </div>
            <div className={styles.episodes}>
                <h3>Danh sách tập</h3>
                {episodes.map((episode)=>{
                    return <button 
                        key={episode.episode}
                        className={active===episode.episode?'btn-active':''} 
                        onClick={()=>{
                            let errorElement = document.querySelector(`.${styles.error}`)
                            errorElement.style.display='none'
                            if(active!==episode.episode)
                            {
                                setIsVideoLoaded(false)
                                let playIcon = document.querySelector(`.${styles.play}`)
                                let videoProcess = document.querySelector(`.${styles.process}`)
                                if(videoProcess)
                                {
                                    videoProcess.lastChild.style.width=0
                                }
                                if(playIcon)
                                {
                                    playIcon.classList.remove(styles.playing)
                                }
                                videoRef.current.currentTime=0
                                videoRef.current.pause()
                                videoRef.current.isPlaying = false
                                window.scroll({
                                    top:0,
                                    behavior:'smooth'
                                })
                                setActive(episode.episode)
                            }
                        }}
                    >{episode.episode}</button>
                })}
            </div>
        </div>
        </>
    )
}

export default Watch
