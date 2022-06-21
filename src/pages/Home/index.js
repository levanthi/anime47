import { useRef } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

import styles from './home.module.scss'
import AnimeList from '../../Components/AnimeList'
import FilterListButton from '../../Components/FilterListButton'
import { domain } from '../../FunctionSpJs/constant'

function Home()
{
    const listRef = useRef({
        handleClick:async function(path){
            //call API
            // console.log(path)
        },
        buttonList:[
            {name:'Tất cả',path:'newest/all'},
            {name:'Mùa này',path:'newest/current-season'},
            {name:'Mùa trước',path:'newest/pre-season'},
            {name:'Bộ cũ',path:'newest/old'},
        ]
    })
    function apiCreater(path){
        return `${domain}/${path}`
    }
    return <div className={styles.home}>
            <div className={styles.body}>
                <div className='row'>
                    <div className={clsx('col l-12')}>
                        <div className={styles.btnListWrap}>
                            <div className='titleBtnList'>ANIME MỚI CẬP NHẬT</div>
                            <FilterListButton 
                                list={listRef.current} 
                                active={listRef.current.buttonList[0].name}
                                parentSelector = {`.${styles.btnListWrap}`}
                            />
                        </div>
                        <div className='row m-100'>
                            <AnimeList api={apiCreater('home/anime')} />
                            <Link to={`/filter/type/anime`} className='more'>Xem thêm</Link>
                        </div>

                        <div className='titleBtnList'>HOẠT HÌNH TRUNG QUỐC</div>
                        <div className='row m-100'>
                            <AnimeList api={apiCreater('home/china')} />
                            <Link to={`/filter/type/china`} className='more'>Xem thêm</Link>
                        </div>

                        <div className='titleBtnList'>PHIM DẠNG NGƯỜI ĐÓNG</div>
                        <div className='row m-100'>
                            <AnimeList api={apiCreater('home/live-action')} />
                            <Link to={`/filter/type/live-action`} className='more'>Xem thêm</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
}

export default Home
