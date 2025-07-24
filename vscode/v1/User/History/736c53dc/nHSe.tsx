import Topbar from './components/Topbar/Topbar'
import styles from './App.module.scss'


function App() {
  
  
 let classnames : Array<string> = [];
 classnames.push(styles.screen)
 classnames.push('dark')
  
  return (
    <>
      <div>
          <Topbar/>      
      </div>
       
    </>
  )
}

export default App
