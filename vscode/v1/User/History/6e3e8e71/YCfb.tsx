import styles from './Topbar.module.css'
import Logo from '../../assets/logo_rafidoth.svg'

const Topbar= () => {
  return (
    <div
        className={styles.main_topbar}
    >   
        <img src={Logo}/>
    </div>
  )
}

export default Topbar
