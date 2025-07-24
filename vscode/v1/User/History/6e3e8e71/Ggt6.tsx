import styles from './Topbar.module.scss'
import myfn from '../../MyFn' 

const Topbar= () => {
  
  
  
  let clsnames: Array<string> = []
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
