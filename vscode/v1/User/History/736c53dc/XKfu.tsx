import Topbar from './components/Topbar/Topbar'
import styles from './App.module.scss'



const getClassName = function(classnames : Array<string>){
  return classnames.join(' ')
} 



function App() {
  
  
 let classnames : Array<string> = [];
 classnames.push(styles.screen)
 classnames.push('dark')
  
  return (
    <>
      <div 
        className="dark">
          <Topbar/>      
      </div>
       
    </>
  )
}

export default App
