// import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100vw;
`

const TitleBanner = styled.div`
  display: flex;
  justify-content: space-between;

  width: 90vw;
  height: 10vh;
  border-bottom: 1px solid lightgrey;

  align-items: center;
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

const CategoryButtonContainer = styled.div`
  display: flex;
  gap: 5vw;
`

const CategoryButton = styled.button`
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);

  border: 0;
  border-radius: 5px;

  color: white;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`

const DaySelectBanner = styled.div`
  width: 90vw;
  height: 10vh;
  border-bottom: 1px solid lightgrey;

  display: flex;
  align-items: center;
  justify-content: center;

  gap: 5vw;
`

const DaySelectButton = styled.button`
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);

  border: 0;
  border-radius: 5px;

  color: white;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`

const SpreadsheetBanner = styled.div`
  
`

// Declare the structure of WorkoutData
// type WorkoutDataSingle = {
//   workout_name: string;
//   exercise_name: string;
//   sets: number;
//   reps: number;
// }

// type Workouts = {
//   workout_name: string;
//   workout_id: number;
// }

export default function PPL3D() {

  // const [workoutData, setWorkoutData] = React.useState<WorkoutDataSingle[]>([])
  // const getWorkoutDataById = async (id: number) => {
  //   try {
  //     const response: Response = await fetch(`/api/workout/${id}`);
      
  //     if(!response.ok) {
  //       throw new Error("Fetch Error")
  //     }

  //     const data = await response.json();
  //     console.log(data)

  //     setWorkoutData(data)

  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // const [workouts, setWorkouts] = React.useState<Workouts[]>([])
  // const getWorkouts = async () => {
  //   try {
  //     const response: Response = await fetch('/api/workout');

  //     if (!response.ok) {
  //       throw new Error("Fetching All Workouts Error")
  //     }

  //     const data = await response.json()
  //     console.log(data)

  //     setWorkouts(data)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // React.useEffect(()=>{
  //   getWorkouts()
  // },[])

  return (
    <>
    <Navbar/>
    <Wrapper>
      <TitleBanner>
        <Title>
          FULL BODY
        </Title>

        <CategoryButtonContainer>
          <CategoryButton>
            history
          </CategoryButton>
          <CategoryButton>
            weights
          </CategoryButton>
        </CategoryButtonContainer>
      </TitleBanner>

      <DaySelectBanner>
        <DaySelectButton>
          Day 1
        </DaySelectButton>
        <DaySelectButton>
          Day 2
        </DaySelectButton>
        <DaySelectButton>
          Day 3
        </DaySelectButton>
      </DaySelectBanner>

      <SpreadsheetBanner>

      </SpreadsheetBanner>
    </Wrapper>
    </>
  )
}
