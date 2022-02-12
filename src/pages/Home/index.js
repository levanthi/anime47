import { useRef } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
// import { doc, setDoc } from "firebase/firestore"
// import {db} from '../../Firebase/config'
import styles from './home.module.scss'
import AnimeList from '../../Components/AnimeList'
import FiterListbutton from '../../Components/FilterListButton'
import { PATHAPP } from '../../FunctionSpJs/constant'

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
    return <div className={styles.home}>
            <div className={styles.body}>
                <div className='row'>
                    <div className={clsx('col l-12')}>
                        <div className={styles.btnListWrap}>
                            <div className='titleBtnList'>ANIME MỚI CẬP NHẬT</div>
                            <FiterListbutton 
                                list={listRef.current} 
                                active={listRef.current.buttonList[0].name}
                                parentSelector = {`.${styles.btnListWrap}`}
                            />
                        </div>
                        <div className='row m-100'>
                            <AnimeList path={'/anime'} limited={20} />
                            <Link to={`/${PATHAPP}/filter/anime/all`} className='more'>Xem thêm</Link>
                        </div>

                        <div className='titleBtnList'>HOẠT HÌNH TRUNG QUỐC</div>
                        <div className='row m-100'>
                            <AnimeList path={'/china'} limited={4} />
                            <Link to={`/${PATHAPP}/filter/china/all`} className='more'>Xem thêm</Link>
                        </div>

                        <div className='titleBtnList'>PHIM DẠNG NGƯỜI ĐÓNG</div>
                        <div className='row m-100'>
                            <AnimeList path={'/live-action'} limited={4} />
                            <Link to={`/${PATHAPP}/filter/live-action/all`} className='more'>Xem thêm</Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
}

export default Home
