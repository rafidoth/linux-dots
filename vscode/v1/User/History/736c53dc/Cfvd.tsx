import Topbar from './components/Topbar/Topbar'
import styles from './App.module.scss'
import Desktop from './components/Desktop/Desktop';

function App() {
    
  let classnames : Array<string> = [];
  classnames.push(styles.screen)
  
  return (
    <>
      <div
        className={classnames}
      >
          <Topbar/>      
          <Desktop/>
      </div>
       
    </>
  ) }

export default App
