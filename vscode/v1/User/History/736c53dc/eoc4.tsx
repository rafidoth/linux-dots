import Topbar from './components/Topbar/Topbar'
import styles from './App.module.scss'
import Desktop from './components/Desktop/Desktop';
import myfn from './MyFn';

function App() {
    
  let classnames : Array<string> = [];
  classnames.push(styles.screen)
  
  return (
    <>
      <div
        className={myfn.getClassName(classnames)}
      >
          <Topbar/>      
          <Desktop/>
      </div>
       
    </>
  ) }

export default App
