
import styles from './loading.module.scss'

function Loading()
{
    return(
        <div className={styles.loadingWrap}>
            <span className={styles.loading}>
                <span></span>
            </span>
        </div>
    )
}

export default Loading
