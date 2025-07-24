import myfn from '../../MyFn'
import styles from './Background.module.scss'
import Application from './ApplicationIcon/Application'
import React from 'react'



const Background= () => {
  const [selectedApplication, setSelectedApplication] = React.useState(null)
  let cls : Array<string> = [styles.background]
  cls.push('dark')
   
  return (
    <div
        className={myfn.getClassName(cls)} 
    >
      {}
      <Application
        iconName='root'
      />
         
    </div>
  )
}

export default Background
