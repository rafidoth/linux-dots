import styles from './Topbar.module.css'
import Logo from '../../assets/logo_rafidoth.svg'

const Topbar= () => {
  return (
    <div
        className={styles.main_topbar}
    >
        <div>
            <Logo/>
        </div>
    </div>
  )
}

export default Topbar
