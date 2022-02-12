import {useState,useEffect, useRef} from 'react'
import { doc, getDoc,query,where,collection, getDocs } from "firebase/firestore"

import {db} from '../../Firebase/config'
import AnimeList from '../../Components/AnimeList'
import Pagination from '../../Components/Pagination'
import { LIMIT } from '../../FunctionSpJs/constant'
import styles from './favorite.module.scss'

function Favorite()
{
    const [favoriteList,setFavoriteList] = useState()
    const pageNumb = useRef(0)
    const [currentPage,setCurrentPage] = useState(1)
    const [activeType,setActiveType] = useState('anime')
    function handleActive(e){
        document.querySelector(`.${styles.selectWrap} button.active`).classList.remove('active')
        e.target.classList.add('active')
        setActiveType(e.target.name)
    }

    function handleFavorite(favoriteList=[]){
        const newList = []
        let max
        max=currentPage*LIMIT>favoriteList.length?favoriteList.length:currentPage*LIMIT
        for(var i=(currentPage-1)*LIMIT ;i<max;i++)
        {
            newList.push(favoriteList[i])
        }
        return newList
    }
    useEffect(async ()=>{
        const userName = JSON.parse(sessionStorage.getItem('anime47User')).name
        const docRef = doc(db, `user/${userName}`)
        const docSnap = await getDoc(docRef)

        let nameList = []
        let animeList = []
        if (docSnap.exists()) {
            nameList = docSnap.data()[activeType]|| []
            pageNumb.current= Math.ceil(nameList.length/LIMIT)||0
        }
        setCurrentPage(1)
        if(nameList.length===0)
        {
            setFavoriteList()
            return 
        }
        await nameList.forEach(async(name,index)=>{
            let animeRef = collection(db, activeType)
            let q = query(animeRef, where('name', "==", name))
            let querySnapshot = await getDocs(q)
            querySnapshot.forEach(doc=>{
                animeList.push(doc.data())
            })
            if(index===nameList.length-1)
            {
                setFavoriteList(animeList)
            }
        })
    },[activeType])
    return(
        <div className={styles.favorite}>
            <h2>Tủ Phim</h2>
            <div className={styles.selectWrap}>
                <button 
                    name='anime' 
                    className='filter-btn active'
                    onClick={handleActive}
                >Anime</button>
                <button 
                    name='china' 
                    className='filter-btn'
                    onClick={handleActive}
                >Hoạt Hình Trung Quốc</button>
                <button 
                    name='live-action' 
                    className='filter-btn'
                    onClick={handleActive}
                >Live Action</button>
            </div>
            <div className='row'>
                <AnimeList path={`/${activeType}`} data={handleFavorite(favoriteList)} />
            </div>
            {favoriteList?<Pagination 
                pageNumb={pageNumb.current}
                handlePagiantion={()=>{

                }}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            :<h3>Bạn chưa thêm phim vào tủ!</h3>
            }
        </div>
    )
}

export default Favorite
