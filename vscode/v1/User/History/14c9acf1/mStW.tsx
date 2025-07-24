import myfn from '../../MyFn'
import styles from './Background.module.scss'

const Background= () => {
  let cls : Array<string> = [styles.background]
  cls.push('dark')
  return (
    <div
        className={myfn.getClassName(cls)} 
    >
        
         
    </div>
  )
}

export default Background
