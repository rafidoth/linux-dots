import Topbar from './components/Topbar/Topbar'
import styles from './App.module.scss'



const getClassName = function(classnames : Array<string>){
  return classnames.join(' ')
} 



function App() {
  
  
   
  
  return (
    <>
      <div 
        className={styles.screen}>
          <Topbar/>      
      </div>
       
    </>
  )
}

export default App
