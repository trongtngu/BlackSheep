import React from 'react'
import styled from 'styled-components'

import Navbar from './components/Navbar'

// Declare the structure of WorkoutData
type WorkoutDataSingle = {
  workout_name: string;
  exercise_name: string;
  sets: number;
  reps: number;
}

type Workouts = {
  workout_name: string;
  workout_id: number;
}

// Styled Components
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 1vh;

  width: 100vw;
`

const WorkoutContainer = styled.div`
  flex: 1 1 1;
  height: 80vh;
  display: flex;
  align-items: center;

  flex-direction: column;
  gap: 3vh;
`

const Workout = styled.div`
  flex: 1 1 1;
  
  border: 1px solid lightgrey;
  width: 60vw;
  height: 10vh;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  background: #FFA07A;

  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: white;
`

const LandingBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: linear-gradient(160deg, #FFA07A 0%, #C8A2C8 35%, #9BB7D4 55%, #40E0D0 100%);
  width: 100vw;
  height: 60vh;
`
const LandingBannerTitle = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 4rem;
  color: white;
  width: 90%;
`

const LandingBannerWelcome = styled.div`

  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1rem;
  color: white;

  width: 90%;
`

const LandingBannerDescription = styled.div`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1.2rem;
  color: white;
  width: 90%;

  display: flex;
  justify-content: space-between;
  flex-direction: column;
`

const GetStartedButton = styled.button`
  width: 200px;

  margin-top: 2vh;
  border-radius: 10px;
  border: none;

  background: white;

  &:hover {
    background: lightgrey;
  }

  cursor: pointer;
`
function App() {

  const [workoutData, setWorkoutData] = React.useState<WorkoutDataSingle[]>([])

  const getWorkoutDataById = async (id: number) => {
    try {
      const response: Response = await fetch(`/api/workout/${id}`);
      
      if(!response.ok) {
        throw new Error("Fetch Error")
      }

      const data = await response.json();
      console.log(data)

      setWorkoutData(data)

    } catch (error) {
      console.error(error)
    }
  }

  const [workouts, setWorkouts] = React.useState<Workouts[]>([])
  const getWorkouts = async () => {
    try {
      const response: Response = await fetch('/api/workout');

      if (!response.ok) {
        throw new Error("Fetching All Workouts Error")
      }

      const data = await response.json()
      console.log(data)

      setWorkouts(data)
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(()=>{
    getWorkouts()
  },[])


  return (
    <>
      <Navbar />
      <Wrapper>

      <LandingBanner>

        <LandingBannerWelcome>
          BLACK SHEEP
        </LandingBannerWelcome>

        <LandingBannerTitle>
          Fit(ness) for you
        </LandingBannerTitle>

        <LandingBannerDescription>
          <div>Lost in the gym or super busy</div>
          <div>Start with a workout that fits you.</div>
          <GetStartedButton>
            Get Started
          </GetStartedButton>
        </LandingBannerDescription>


      </LandingBanner>


      {
        workouts.map((workout, idx)=>{
          return (
            <>
              <WorkoutContainer>
                <Workout>
                  {workout.workout_name}
                </Workout>
                <Workout>
                  {workout.workout_name}
                </Workout>
                <Workout>
                  {workout.workout_name}
                </Workout>
              </WorkoutContainer >
            </>
          )
        })
      }
      </Wrapper>
    </>
  )
}

export default App
