import React from 'react'
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

import Landing from '../pages/Landing'
import UserDiscovery from '../pages/UserDiscovery'
import PPL3D from '../pages/PPL3D'
export default function Site() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Landing/>}/>
        <Route path = '/userDiscovery' element={<UserDiscovery/>}/>

        <Route path ='/template/PPL3D' element={<PPL3D/>}/>
      </Routes>
    </>
  )
}
