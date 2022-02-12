

import styles from './pagination.module.scss'

function Pagination({pageNumb,handlePagiantion,currentPage,setCurrentPage})
{
    
    return(
        <div className={styles.pagination}>
            <button
                onClick={()=>{
                    if(currentPage>1){
                        setCurrentPage(pre=>pre-1)
                        window.scroll({
                            behavior:'smooth', 
                            top:0
                        })
                        handlePagiantion(currentPage-1)
                    }
                }}
            >{'<'}</button>
            {[...Array(pageNumb)].map((value,index)=>{
                index+=1
                return(
                    <button 
                        className={currentPage===index?'active':''} 
                        key={index} 
                        onClick={(e)=>{
                            if(currentPage!==index)
                            {
                                setCurrentPage(index)
                                window.scroll({
                                    behavior:'smooth', 
                                    top:0
                                })
                                handlePagiantion(Number(e.target.innerText))
                            }
                        }}
                    >{index}</button>
                )
            })}
            <button
                onClick={()=>{
                    if(currentPage!==pageNumb){
                        setCurrentPage(pre=>pre+1)
                        window.scroll({
                            behavior:'smooth', 
                            top:0
                        })
                        handlePagiantion(currentPage+1)
                    }
                }}
            >{'>'}</button>
        </div>
    )
}

export default Pagination
