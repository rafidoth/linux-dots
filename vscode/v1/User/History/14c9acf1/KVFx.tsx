import myfn from '../../MyFn'
import styles from './Background.module.scss'
import SingleIconDesktop from './SingleIconDesktop/SingleIconDesktop'



const Background= () => {
  let cls : Array<string> = [styles.background]
  cls.push('dark')
  return (
    <div
        className={myfn.getClassName(cls)} 
    >
      <SingleIconDesktop
        
      />
         
    </div>
  )
}

export default Background
