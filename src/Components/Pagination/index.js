import styles from "./pagination.module.scss";

function Pagination({ pageNumb, currentPage, setCurrentPage }) {
  const isOverFlow = !!(pageNumb >= 8) || false;
  let pageArr = [];
  if (isOverFlow) {
    let start
    for(var i = 3;i>-1;i--){
        if(currentPage-i>0 && currentPage<pageNumb-6){
            start = currentPage-i
            break
        }
    }
    if(currentPage>=pageNumb-6){
        start = pageNumb-6
    }
    for(var i=start;i<start+6;i++){
        pageArr.push(i)
    }
  } else {
    pageArr = [...Array(pageNumb)].map((value,index)=>(index+1))
  }
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage((pre) => pre - 1);
            window.scroll({
              behavior: "smooth",
              top: 0,
            });
          }
        }}
      >
        {"<"}
      </button>
      {pageArr.map((page,index) => {
        return (
          <button
            className={currentPage === page ? "active" : ""}
            key={index}
            onClick={() => {
              if (currentPage !== page) {
                setCurrentPage(page);
                window.scroll({
                  behavior: "smooth",
                  top: 0,
                });
              }
            }}
          >
            {page}
          </button>
        );
      })}
      {currentPage<pageNumb-6 && <span className={styles.etc}>...</span>}
      {isOverFlow && <button
        key={pageNumb}
        className={currentPage === pageNumb ? "active" : ""}
        onClick={() => {
          if (currentPage !== pageNumb) {
            setCurrentPage(pageNumb);
            window.scroll({
              behavior: "smooth",
              top: 0,
            });
          }
        }}
      >{pageNumb}</button>}
      <button
        onClick={() => {
          if (currentPage !== pageNumb) {
            setCurrentPage((pre) => pre + 1);
            window.scroll({
              behavior: "smooth",
              top: 0,
            });
          }
        }}
      >
        {">"}
      </button>
    </div>
  );
}

export default Pagination;
