import myfn from '../../MyFn'
import styles from './Background.module.scss'
import { RiFolder5Fill } from "react-icons/ri";




const Background= () => {
  let cls : Array<string> = [styles.background]
  cls.push('dark')
  return (
    <div
        className={myfn.getClassName(cls)} 
    >
      <div>
        <RiFolder5Fill
          size="3em" 
          color="red"
        />
      </div>        
         
    </div>
  )
}

export default Background
