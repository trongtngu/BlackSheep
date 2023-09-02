import React from 'react'
import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom'

import Landing from '../pages/Landing'
export default function Site() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Landing/>}/>
      </Routes>
    </>
  )
}
