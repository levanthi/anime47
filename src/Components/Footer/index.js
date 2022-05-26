import {Link} from 'react-router-dom'

import styles from './footer.module.scss'
import {ReactComponent as Facebook} from '../../static/icon/facebook-f-brands.svg'
import {ReactComponent as Like} from '../../static/icon/thumbs-up-solid.svg'
import {ReactComponent as Phone} from '../../static/icon/phone-alt-solid.svg'

function Footer()
{
    return (
        <footer>
            <div className={styles.footer}>
                <div className={styles.info}>
                    <Link to={'/'}>Xem anime</Link>
                    <span>© 2017 All Rights Reserved •</span>
                </div>
                <div className={styles.contact}>
                    <a href='https://www.facebook.com/A47FB/' className={styles.fanpage}>
                        <span className={styles.facebook}><Facebook/></span>
                        <div className={styles.faceGroup}>
                            <span>FANPAGE FACEBOOK</span>
                            <div>
                                <button>
                                    <Like/>
                                    Like 2.4K
                                </button>
                                <button>Share</button>
                            </div>
                        </div>
                    </a>

                    <div className={styles.advertise}>
                        <Link to={'/'}>
                            <span className={styles.phone}>
                                <Phone/>
                            </span>
                            <div>
                                <div>Liên hệ quảng cáo:</div>
                                <div>toiviet.com@gmail.com</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
