import Sidebar from './Sidebar'
import WorkArea from './WorkArea'
import './myStyle.css';

function MainContainer() {
  return (
    <div className='flex items-center justify-center'>
    <div className='main-container'>
       <Sidebar/>
       <WorkArea/>
       
       
    </div>
    </div>
   
  )
}

export default MainContainer