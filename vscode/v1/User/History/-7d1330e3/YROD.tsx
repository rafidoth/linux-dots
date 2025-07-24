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
  cls.push('dark')
  
  if(selected) cls.push(styles.main)
  else cls.push(styles.main_selected) 
  
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
