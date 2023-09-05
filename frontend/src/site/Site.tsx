import React from 'react'
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

import Landing from '../pages/Landing'
import UserDiscovery from '../pages/UserDiscovery'
export default function Site() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Landing/>}/>
        <Route path = '/userDiscovery' element={<UserDiscovery/>}/>
      </Routes>
    </>
  )
}
