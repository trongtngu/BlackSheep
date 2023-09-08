import {
  Routes,
  Route
} from 'react-router-dom'

import Landing from '../pages/Landing'
import UserDiscovery from '../pages/UserDiscovery'
import FullBody from '../pages/FullBody'

import Plans from '../pages/Plans'
import Forums from '../pages/Forums.tsx'

export default function Site() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Landing/>}/>
        <Route path = '/userDiscovery' element={<UserDiscovery/>}/>

        <Route path ='/template/FullBody' element={<FullBody/>}/>
        <Route path = '/Plans' element = {<Plans/>}/>
        <Route path = '/Forums' element = {<Forums/>}/>
      </Routes>
    </>
  )
}
