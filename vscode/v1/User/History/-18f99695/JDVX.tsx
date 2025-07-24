

import myfn from '../../MyFn'
import styles from './Desktop.module.scss'



const Desktop= () => {
  let cls : Array<String> = [styles.Desktop]
  return (
    <div 
        className={myfn.getClassName(cls)}>
      
    </div>
  )
}

export default Desktop
