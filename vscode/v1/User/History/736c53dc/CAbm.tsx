import Topbar from './components/Topbar/Topbar'
import styles from './App.module.scss'
import myfn from './util';



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
