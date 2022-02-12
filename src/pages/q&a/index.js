import styles from './q&a.module.scss'
function QA()
{
    let list = [
        {
            q:'Tại sao xem phim bị chậm',
            a:'Có thể do một số vấn đề liên quan đến hạ tầng mạng, gói mạng, đứt cáp quang'
        },
        {
            q:'Xem ở server phụ như thế nào',
            a:'Click chuột vào một trong các server mà bạn nhìn thấy dưới player' 
        },
        {
            q:'Vì sao tôi xem không có tiếng',
            a:'Tại server fb nói trắng ra là phim được up thẳng lên facebook, và vì lý do bản quyển thường là các bài hát Open, Ending, hoặc các bài nhạc đệm khúc cao trào của phim, chúng đã bị làm tắt âm thanh để tránh bản quyền'
        },
        {
            q:'Tải phim về máy tính như thế nào',
            a:'Dùng cốc cốc hoặc nhấn nút download phía dưới video nếu có'
        },
    ]
    return(
        <div className={styles.qa}>
            <h1>Một số kiến thức và thắc mắc.</h1>
            {
                list.map((item,index)=>{
                    return <div className={styles.group} key={index}>
                        <h2>{`${index+1}. ${item.q}.`}</h2>
                        <p>{`+ Đáp : ${item.a}.`}</p>
                    </div>
                })
            }
        </div>
    )
}

export default QA
