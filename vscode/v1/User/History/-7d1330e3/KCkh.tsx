import { RiFolder5Fill } from "react-icons/ri";
import styles from './Application.module.scss'
import myfn from "../../../MyFn";

interface P{
    iconName : string,
    iconColor : string,
    iconSize : string
}



const Application = (props: P) => {
  let cls : Array<string> = [styles.main]
  cls.push('dark')
  
  
  
  return (
    <div
      className={myfn.getClassName(cls)}
    >
      <span>
        <RiFolder5Fill
          size={props.iconSize} 
          color={props.iconColor}
        />
      </span>
      <p
         
      >{props.iconName} </p>
      
    </div>
  )
}

export default Application 
