import myfn from '../../MyFn'
import styles from './Background.module.scss'
import Application from './ApplicationIcon/Application'



const Background= () => {
  let cls : Array<string> = [styles.background]
  cls.push('dark')
  return (
    <div
        className={myfn.getClassName(cls)} 
    >
      <Application
        iconName='root'        
      />
         
    </div>
  )
}

export default Background
