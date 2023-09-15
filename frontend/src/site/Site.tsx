import {
  Routes,
  Route
} from 'react-router-dom'

import Landing from '../pages/Landing'
import UserDiscovery from '../pages/UserDiscovery'
import FullBody from '../pages/FullBody'

import Plans from '../pages/Plans'
import Forums from '../pages/Forums.tsx'
import Activity from '../pages/Activity.tsx'
import Home from '../pages/Home.tsx'

import Signup from '../pages/Signup.tsx'
import Login from '../pages/Login.tsx'
import SavedWorkouts from '../pages/SavedWorkouts.tsx'
import CreateWorkout from '../pages/CreateWorkout.tsx'

export default function Site() {
  return (
    <>
      <Routes>
        <Route path = '/' element = {<Landing/>}/>
        <Route path = '/userDiscovery' element={<UserDiscovery/>}/>

        <Route path ='/template/FullBody' element={<FullBody/>}/>

        <Route path = '/:userID/savedWorkouts' element={<SavedWorkouts/>}/>
        <Route path = '/:userID/createWorkout' element={<CreateWorkout/>}/>
        <Route path = '/:userID/Plans' element = {<Plans/>}/>
        <Route path = '/:userID/Forums' element = {<Forums/>}/>
        <Route path = '/:userID/Activity' element = {<Activity/>}/>
        <Route path = '/:userID/home' element = {<Home/>}/>

        <Route path = '/signup' element={<Signup/>}/>
        <Route path = '/login' element={<Login/>}/>
      </Routes>
    </>
  )
}
