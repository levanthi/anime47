import {Link} from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore"
import { useEffect, useState } from 'react'

import {db} from '../../Firebase/config'
import removeAccents from '../../FunctionSpJs/removeAccents'
import slideShow from '../../FunctionSpJs/slideShow'
import {ReactComponent as Pre} from '../../static/icon/chevron-left-solid.svg'
import {ReactComponent as Next} from '../../static/icon/chevron-right-solid.svg'
import {ReactComponent as Play} from '../../static/icon/play-solid.svg'
import styles from './slider.module.scss'
import Loading from '../Loading'

function Slider()
{
    
    const [slider,setSlider] = useState()

    useEffect(()=>{
        ;(async()=>{
            let slider = []
            const querySnapshot = await getDocs(collection(db, "slider"))
            querySnapshot.forEach((doc) => {
                slider.push(doc.data())
            })
            const sliderEnd = slider.slice(0,7)
            const sliderStart = slider.slice(7)
            slider = [...sliderStart,...slider,...sliderEnd]
            setSlider(slider)
        })()
    },[])
    return (
        <div className='slideShowWrap'>
        {slider?
            <div className={styles.slideShow}>
            {console.log('Slider-render')}
            <button className={styles.pre} onClick={()=>{
                slideShow({
                    SLIDEWIDTH:198,
                    slidesSelector:`.${styles.slides}`,
                    slideShowSelector:`.${styles.slideShow}`,
                    plus:false,
                })
            }}>
                <Pre/>
            </button>
            <button className={styles.next} onClick={()=>{
                slideShow({
                    SLIDEWIDTH:198,
                    slidesSelector:`.${styles.slides}`,
                    slideShowSelector:`.${styles.slideShow}`,
                    plus:true,
                })
            }}>
                <Next/>
            </button>
            <div className={styles.slides}>
            {slider.map((slide,index)=>{
                return <div title={slide.name} key={index} className={styles.slide}>
                    <Link to={`/anime/${removeAccents(slide.name.toLowerCase())}`}>
                        <span className={styles.play}>
                            <Play/>
                        </span>
                        <div className={styles.thumbnail} style={{backgroundImage:`url(${slide.thumbnail})`}} ></div>
                        <span className={styles.brand}>
                            {`${slide.episodes}/${slide.maxEpisodes}`}
                        </span>
                        <span className={styles.nameWrap}>
                            <span>
                                {slide.name.toUpperCase().replaceAll('-',' ')}
                            </span>
                        </span>
                    </Link>
                </div>
            })}
            </div>
        </div>
        :<Loading/>
        }
    </div>
    )
}

export default Slider