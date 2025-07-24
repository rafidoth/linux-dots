import { RiFolder5Fill } from "react-icons/ri";
import styles from './Application.module.scss'
import myfn from "../../../MyFn";
import React from "react";

interface P{
    iconName : string,
    iconColor : string,
    iconSize : string
}



const Application = (props: P) => {
  const [selected, setSelected] = React.useState(false)
  let cls : Array<string> = []
  cls.push(styles.main)
  cls.push('dark')
  
  let titleClass: Array<string> = [];
  if(selected) titleClass.push(styles.main)
  else titleClass.push(styles.main_selected) 
  
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
        className={myfn.getClassName(titleClass)} 
      >{props.iconName} </p>
      
    </div>
  )
}

export default Application 
