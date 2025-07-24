

import myfn from '../../MyFn'
import styles from './Desktop.module.scss'



const Desktop= () => {
  let cls : Array<string> = [styles.Desktop]
  cls.push('dark')

  return (
    <div 
        className={myfn.getClassName(cls)}>
      
    </div>
  )
}

export default Desktop
