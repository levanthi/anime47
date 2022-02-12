import { Link } from 'react-router-dom'
import {useRef,useState,useContext} from 'react'
import clsx from 'clsx'

import { userContext } from '../../App'
import {ReactComponent as ArrowDown} from '../../static/icon/caret-down-solid.svg'
import removeAccents from '../../FunctionSpJs/removeAccents'
import genresToPath from '../../FunctionSpJs/genresToPath'
import {ReactComponent as Search} from '../../static/icon/search-solid.svg'
import styles from './navbar.module.scss'
import SearchWindow from '../SearchWindow'
import { PATHAPP } from '../../FunctionSpJs/constant'

function Navbar()
{
    // console.log('Navbar-render')
    const user = useContext(userContext).user
    const setUser = useContext(userContext).setUser
    const [searchInput,setSearchInput] = useState('')
    const filterRef = useRef({
        genres:[
            'Đời Thường','Harem','Shounen','Học Đường','Thể Thao',
            'Drama','Trinh Thám','Kinh Dị','Mecha','Phép Thuật',
            'Phiêu Lưu','Ecchi','Hài Hước','Hành Động','Romance',
            'Lịch Sử','Âm Nhạc','Tokusatsu','Viễn Tưởng','Fantasy',
            'Blu-ray','Game','Shoujo','Seinen','Super Power',
            'Space','Martial Art','Siêu Nhiên','Vampire','Mystery',
            'Psychological','Yuri','Shounen Ai','Shoujo Ai','Josei',
            'Parody','Coming Of Age','Tragedy','Demon','Car',
            'Dementia','Hentai','Kid','Military','Police',
            'Samurai','Thriller','Yaoi','Hoạt Hình Trung Quốc'
        ],
        status:['Hoàn Thành','Đang Tiến Hành'],
        topViews:['Ngày','Tuần','Tháng','Mùa Này','Năm Này','Mùa Trước','Năm Trước','Tất Cả'],
        topComments:['Mùa Này','Mùa Trước','Năm Này','Năm Trước','Tất Cả'],
        duo:[
            'Hành động + Hài Hước','Lãng Mạn + Hành Động','Harem + Hài Hước',
            'Ecchi + Harem','Đời Thường + Học Đường','Học Đường + Ecchi',
            'Romance + Tragedy','Kết Hợp Ngẫu Nhiên'
        ],
        year:[
            '2010','2011','2012','2013','2014','2015','2016','2017',
            '2018','2019','2020','2021'
        ],
        TVMovie:['TV Series','Movie','Drama-Live action','OVA','SP','Cartoon']
    })
    function getFilterElement(genres,path){
        return genres.map((genre,index)=>{
            return <Link key={index} to={`${PATHAPP}/filter${path}/${removeAccents(genresToPath(genre).replaceAll(' ','-').toLowerCase())}`}>{genre}</Link>
        })
    }

    return <div className={styles.navbar}>
        <nav>
            <Link to={PATHAPP}>
                <div className={styles.logo}>
                </div>
            </Link>
            <div className={styles.search}>
                <div className={styles.inputWrap}>
                    <label htmlFor='search'><Search/></label>
                    <input 
                        autoComplete='off' 
                        id='search' 
                        placeholder='Tìm: tên anime...'
                        value={searchInput}
                        onChange={(e)=>{
                            setSearchInput(e.target.value)
                        }}
                        onFocus={()=>{
                            let searchWindowElement = document.querySelector(`.${styles.searchWindow}`)
                            if(searchWindowElement)
                            {
                                searchWindowElement.style.display='block'
                            }
                        }}
                        onBlur={()=>{
                            setTimeout(() => {
                                let searchWindowElement = document.querySelector(`.${styles.searchWindow}`)
                                if(searchWindowElement)
                                {
                                    searchWindowElement.style.display='none'
                                }
                            }, 120);
                        }}
                    />
                    <div className={styles.searchWindow}>
                        <SearchWindow searchInput={searchInput}/>
                    </div>
                </div>
            </div>
            {user?
                <div className={styles.userGroup}>
                    <button 
                        className={styles.userOption}
                        onClick={function(e){
                            const root = document.querySelector('#root')
                            
                            function handleClick(e)
                            {
                                if(!e.target.closest(`.${styles.option}`) || e.target.closest(`.${styles.option} ul li`))
                                {
                                    root.removeEventListener('click',handleClick,true)
                                    setTimeout(()=>{
                                        optionElement.style.display='none'
                                    },20)
                                }
                            }
                            const optionElement = document.querySelector(`.${styles.option}`)
                            if(optionElement.style.display === 'block')
                            {
                                // optionElement.style.display='none'
                            }
                            else{
                                optionElement.style.display='block'
                                setTimeout(()=>{
                                    root.addEventListener('click',handleClick,true)
                                },10)
                            }
                        }}
                    >
                        <span>{`Xin chào, ${user.name}`}</span>
                        <span className={styles.arrowDow}>
                            <ArrowDown/>
                        </span>
                        <div className={styles.option}>
                            <ul>
                                <li
                                    onClick={()=>{
                                        setUser(null)
                                        sessionStorage.removeItem('anime47User')
                                    }}
                                >Thoát</li>
                            </ul>
                        </div>
                    </button>
                    <Link to={`${PATHAPP}/favorite`} >
                    <button 
                        className={styles.userCollection}
                    >
                        Tủ phim
                    </button>
                    </Link>
                </div>
            :
            <div className={styles.login}>
                <Link to={`${PATHAPP}/login/sign-up`}><button>Đăng Ký</button></Link>
                <Link to={`${PATHAPP}/login/sign-in`}><button>Đăng Nhập</button></Link>
            </div>
            }
            
        </nav>
        <div className={styles.filter}>
            <ul className={styles.filterList}>
                <li className={styles.filterItem}>
                    <span style={{color:'white'}}> TRANG CHỦ</span>
                    <Link className={styles.homeButton} to={PATHAPP} />
                </li>
                <li className={styles.filterItem}>
                    <Link to=''> THỂ LOẠI</Link>
                    <div className={clsx(styles.genres,'row')}>
                        {getFilterElement(filterRef.current.genres,'/genres')}
                    </div>
                </li>
                <li className={styles.filterItem}>
                    <Link to=''> TRẠNG THÁI</Link>
                    <div className={styles.status}>
                        {getFilterElement(filterRef.current.status,'/status')}
                    </div>
                </li>
                <li className={styles.filterItem}>
                    <Link to=''> XEM NHIỀU</Link>
                    <div className={styles.topViews}>
                        {getFilterElement(filterRef.current.topViews,'/topview')}
                    </div>
                </li>
                <li className={styles.filterItem}>
                    <Link to=''> BÌNH LUẬN NHIỀU</Link>
                    <div className={styles.topComments} >
                        {getFilterElement(filterRef.current.topComments,'/topcomment')}
                    </div>
                </li>
                <li className={styles.filterItem}>
                    <Link to=''> LƯỠNG LONG NHẤT THỂ</Link>
                    <div className={styles.duo} >
                        {getFilterElement(filterRef.current.duo,'/duo')}
                    </div>
                </li>
                <li className={styles.filterItem}>
                    <Link to=''> NĂM</Link>
                    <div className={styles.year}>
                        {getFilterElement(filterRef.current.year,'/year')}
                    </div>
                </li>
                <li className={styles.filterItem}>
                    <span style={{color:'white'}}>HỎI ĐÁP</span>
                    <Link className={styles.homeButton} to={`${PATHAPP}/q&a`}></Link>
                </li>
                <li className={styles.filterItem}>
                    <Link to=''> TV/MOVIE</Link>
                    <div className={styles.tvMovie} >
                        {getFilterElement(filterRef.current.TVMovie,'/tvMovie')}
                    </div>
                </li>
            </ul>
        </div>
    </div>
}

export default Navbar
