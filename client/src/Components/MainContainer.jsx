import Sidebar from './Sidebar'
import WorkArea from './WorkArea'

function MainContainer() {
  return (
    <div className='main-container h-90vh w-90vh bg-[#f4f5f8] flex rounded-20'>
      <Sidebar />
      <WorkArea />
    </div>
  )
}

export default MainContainer