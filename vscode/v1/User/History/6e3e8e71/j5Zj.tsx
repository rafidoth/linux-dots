import styles from './Topbar.module.css'
import Logo from '../../assets/logo_rafidoth.svg'

const Topbar= () => {
  return (
    <div
        className={styles.main_topbar}
    >   
        <div>
            <span>rafidoth</span>
        </div>
        <div>
            <span> Sunday, 1:49pm</span>
        </div>
        <div>
            <span>system tools</span>
        </div>
    </div>
  )
}

export default Topbar
