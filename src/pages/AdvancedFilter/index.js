import {useState,useEffect, useRef} from 'react'
import { collection, query, where, getDocs ,orderBy} from "firebase/firestore"
import {useLocation} from 'react-router-dom'

import {db} from '../../Firebase/config'
import genreToAccent from '../../FunctionSpJs/genreToAccent'
import AnimeList from '../../Components/AnimeList'
import Pagination from '../../Components/Pagination'
import styles from './filter.module.scss'
import Loading from '../../Components/Loading'
import {LIMIT} from '../../FunctionSpJs/constant'

const PATH = 'anime'

function AdvancedFilter()
{
    const [resultList,setResultList] = useState()
    const [currentPage,setCurrentPage] = useState(1)
    const location = useLocation()
    const pageNumb = useRef()
    let path = window.location.pathname
    let type = path.slice(path.indexOf('/',1)+1,path.lastIndexOf('/'))
    type=type.slice(type.indexOf('/')+1)
    let field = path.slice(path.lastIndexOf('/')+1).toLowerCase()
    let compareOperator
    let pathName
    switch (type) {
        case 'genres':
            compareOperator="array-contains"
            break;
        case 'status':
            compareOperator='=='
            break
        case 'anime':
            pathName='anime'
            break
        case 'china':
            pathName='china'
            break
        case 'live-action':
            pathName='live-action'
            break
        default:
            break;
    }
    useEffect(()=>{
        (async()=>{
            setResultList(null)
            let localType = type
            let localField = field
            switch (type) {
                case 'topview':
                    localType='views'
                    compareOperator='>'
                    localField=-1
                    break;
                case 'topcomment':
                    localType='comments'
                    compareOperator='>'
                    localField=-1
                    break;
                case 'year':
                    compareOperator='=='
                default:
                    break;
            }
            if(type==='topview')
            {
                queryTopView('views')
            }
            else if(type==='topcomment')
            {
                queryTopView('comments')
            }
            else if(type==='genres' || type==='status' || type=== 'year'){
                queryAll(PATH,localType,localField,compareOperator,handleSnapshot)
            }
            else if(type==='duo')
            {
                queryDou((list)=>{
                    let animeList = []
                    let max = list.length>LIMIT?LIMIT:list.length
                    for(var i=0;i<max;i++)
                    {
                        animeList.push(list[i])
                    }
                    pageNumb.current=Math.ceil((list.length/LIMIT))
                    if(animeList.length)
                    {
                        setResultList(animeList)
                    }
                    else{
                        setResultList([])
                    }
                })
            }
            else if(type==='anime' || type==='china' ||type==='live-action')
            {
                queryMore(type,handleSnapshot)
            }
            else setResultList([])
        })()
        setCurrentPage(1)
    },[location])
    useEffect(()=>{
        window.scroll({
            top:0
        })
    },[])
    async function queryAll(pathName,condition,value,compareOperator,callBack)
    {
        const q = query(
            collection(db, pathName),
            where(condition, compareOperator, value)
        )
        const querySnapshot = await getDocs(q)
        callBack(querySnapshot)
    }
    async function queryMore(pathName,callBack) {
        const q = query(
            collection(db, pathName)
        )
        const querySnapshot = await getDocs(q)
        callBack(querySnapshot)
    }
    async function queryDou(callback)
    {
        let firstGenre = field.slice(0,field.indexOf('+'))
        let lastGenre = field.slice(field.indexOf('+')+1)
        const q = query(
            collection(db,PATH),
            where('genres','array-contains',firstGenre),
        )
        const querySnapshot = await getDocs(q)
        let list = []
        querySnapshot.forEach((doc,index)=>{
            if(doc.data().genres.includes(lastGenre))
            {
                list.push(doc.data())
                querySnapshot.docs.splice(index,1)
            }
        })
        callback(list)
    }
    async function queryTopView(orderField,callBack)
    {
        const q = query(collection(db, PATH),orderBy(orderField,'desc'));
        const querySnapshot = await getDocs(q)
        handleSnapshot(querySnapshot)
        callBack(querySnapshot)
    }
    function handleSnapshot(querySnapshot)
    {
        let animeList = []
        let i = querySnapshot.docs.length>LIMIT?LIMIT:querySnapshot.docs.length
        pageNumb.current=Math.ceil((querySnapshot.docs.length/LIMIT))
        for(var j=0;j<i;j++)
        {
            animeList.push(querySnapshot.docs[j].data())
        }
        setResultList(animeList)
    }
    async function queryPagination(pageIndex)
    {
        function handlePagiantion(snapShot)
        {
            let animeList = []
            let i = (pageIndex-1)*LIMIT
            let max = i+LIMIT
            if(pageNumb.current===pageIndex)
            {
                max = snapShot.docs.length
            }
            for(;i<max;i++)
            {
                animeList.push(snapShot.docs[i].data())
            }
            setResultList(animeList)
        }
        setResultList(null)
        switch (type) {
            case 'topview':
                queryTopView('views',handlePagiantion)
                break;
            case 'topcomment':
                queryTopView('comments',handlePagiantion)
                break
            case 'duo':
                queryDou((list)=>{
                    let animeList = []
                    let i = (pageIndex-1)*LIMIT
                    let max = i+LIMIT
                    if(pageNumb.current===pageIndex)
                    {
                        max = list.length
                    }
                    for(;i<max;i++)
                    {
                        animeList.push(list[i])
                    }
                    setResultList(animeList)
                })
                break
            case 'year':
                queryAll(PATH,type,field,'==',handlePagiantion)
                break
            case 'anime':
                queryMore('anime',handlePagiantion)
                break
            case 'china':
                queryMore('china',handlePagiantion)
                break
            case 'live-action':
                queryMore('live-action',handlePagiantion)
                break
            default:
                queryAll(PATH,type,field,compareOperator,handlePagiantion)
                break;
        }
    }
    return(
        <div className={styles.advancedFilter}>
            <h2>{genreToAccent(field,type)}</h2>
            {resultList?<div className='row'>
                {resultList.length===0?<h3 className={styles.notFound}>Không tìm thấy</h3>:
                <>
                    <AnimeList path={`/${pathName || PATH}`} data={resultList}/>
                    <Pagination 
                        pageNumb={pageNumb.current} 
                        handlePagiantion={queryPagination}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </>
                }
            </div>:<Loading/>}
        </div>
    )
}

export default AdvancedFilter
