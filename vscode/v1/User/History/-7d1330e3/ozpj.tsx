import { RiFolder5Fill } from "react-icons/ri";
import styles from './Application.module.scss'
import myfn from "../../../MyFn";

interface P{
    iconName : string
}



const Application = (props: P) => {
  let cls : Array<string> = [styles.main]
  cls.push('dark')
  return (
    <span
      className={myfn.getClassName(cls)}
    >
      <RiFolder5Fill
        size="3em" 
        color="red"
      />
      {props.iconName} 
    </span>
  )
}

export default Application 
