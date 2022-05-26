import { useRef ,useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import clsx from 'clsx'

import AnimeList from '../../Components/AnimeList'
import styles from './filter.module.scss'
import genreToAccent from '../../FunctionSpJs/genreToAccent'
import { domain } from '../../FunctionSpJs/constant'

function AdvancedFilter()
{
    const location = useLocation()
    const type = location.pathname.slice(location.pathname.lastIndexOf('/')+1)
    useEffect(()=>{
        window.scrollTo({
            top:0
        })
    },[])
    return(
        <div className={styles.advancedFilter}>
            <h1>{genreToAccent(type)}</h1>
            <div className={clsx('row',styles.wrap)}>
                <AnimeList api={`${domain}${location.pathname}`} pagination />
            </div>
        </div>
    )
}

export default AdvancedFilter
