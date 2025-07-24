import { RiFolder5Fill } from "react-icons/ri";
import styles from './Application.module.scss'

interface P{
    iconName : string
}



const SingleIconDesktop = (props: P) => {
  let cls : Array<string> = [styles.background]
  cls.push('dark')
  return (
    <span
    >
      <RiFolder5Fill
        size="3em" 
        color="red"
      />
      {props.iconName} 
    </span>
  )
}

export default SingleIconDesktop
