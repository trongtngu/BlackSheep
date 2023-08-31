import React from 'react'
import styled from 'styled-components'

import Navbar from './components/Navbar'

// Styled Prop Types:

type StyledProps = {
  hybrid?: string;
}

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
  width: 100vw;

  gap: 5vh;
`

const WorkoutContainer = styled.div`
  flex: 1 1 1;

  display: flex;

  gap: 3vh;
  
  max-width: 100vw;
  padding-left: 5vw;
  padding-right: 5vw;
  overflow-x: auto;
  padding-bottom: 2vh;
`

const WorkoutContainerTitle = styled.div`
  color: #4A4A4A;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;

  font-size: 1.5rem;
`

const Workout = styled.div<StyledProps>`
  flex: 1 1 1;
  
  border: 1px solid lightgrey;
  width: 60vw;
  height: 10vh;

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  background: #FFA07A;
  background: ${props => props.hybrid === 'hybrid' ? '#40E0D0' : "#FFA07A"};

  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 2rem;
  color: white;

  min-width: 60vw;
`

const LandingBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  background: linear-gradient(160deg, #FFA07A 0%, #C8A2C8 35%, #9BB7D4 55%, #40E0D0 100%);
  width: 100vw;
  height: 90vh;
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
  width: 170px;

  margin-top: 2vh;
  border-radius: 5px;
  border: none;

  background: white;

  &:hover {
    background: lightgrey;
  }

  cursor: pointer;
`
const ProgressBanner = styled.div`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2vh;

  background: #f7f7f7;
  padding-top: 2vh;
  padding-bottom: 4vh;
`

const ProgressBannerCard = styled.div`
  width: 90vw;
  padding: 5vw;
  border: 1px solid #F4F5F7;
  border-radius: 15px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);
  background: #fff;
`

const ProgressBannerTitle = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
`

const ProgressBannerBoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5vw;

  color: white;
  // Children Styles
  & > :nth-child(1) {
    background: #333333;
    color: white;
  }

  & > :nth-child(2) {
    background: #333333;
    color: white;
  }

  & > :nth-child(3) {
    background: #333333;
    color: white;
  }

  & > :nth-child(4){
    background: #333333;
    color: white;
  }

`

const ProgressBannerBox = styled.div`
  border-radius: 10px;

  font-weight: bold;
  
  display: flex;
  justify-content: center;
  align-items: center;

  height: 10vh;

  font-size: 1.2rem;
`

const ProgressTitle = styled.div`
  font-weight: bold;
`

// About Us Styles

const AboutUsBanner = styled.div`
  
  width: 90vw;
  color: white;
`

const AboutUsTitle = styled.div`
  color: #4A4A4A;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;

  font-size: 1.5rem;
`

const AboutUsDescription = styled.div`
  background: linear-gradient(160deg, black 0%, #333333 70%);
  padding: 5vw;
  border-radius: 15px;
  font-size: 1.1rem;
`

const AboutUsSlogan = styled.div`
  color: #4A4A4A;

  display: flex;
  justify-content: center;
  align-items: center;

  font-weight: bold;

  font-size: 1rem;
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
            <div>Lost in the gym or super busy?</div>
            <div>Start with a workout that fits you.</div>
            <GetStartedButton>
              Get Started ➜
            </GetStartedButton>
          </LandingBannerDescription>


        </LandingBanner>

        <AboutUsBanner>
          <AboutUsTitle>
            WHY BLACK SHEEP?
          </AboutUsTitle>
          <AboutUsDescription>
            We stand out. We understand everyone has the same hours in a day, but those hours will be spent differently.

            With us, you will find a workout that fits your goals and your schedule.
          </AboutUsDescription>

          <AboutUsSlogan>
            FIND YOUR OWN
          </AboutUsSlogan>

        </AboutUsBanner>

        <div>
          <WorkoutContainerTitle>THE "FAVOURITES"</WorkoutContainerTitle>
          <WorkoutContainer>
            
            <Workout>FULL BODY</Workout>
            <Workout>PPL</Workout>
            <Workout>C25K</Workout>
            <Workout>UPPER LOWER</Workout>
          </WorkoutContainer>
        </div>

        <ProgressBanner>
          <ProgressBannerTitle>
            TRACK&nbsp;<span style={{textDecoration: "underline"}}>YOUR</span>&nbsp;PROGRESS
          </ProgressBannerTitle>

          <ProgressBannerCard>
            <ProgressTitle></ProgressTitle>
            <ProgressBannerBoxContainer>
              <ProgressBannerBox>
                8-WEEK C25K
              </ProgressBannerBox>
              <ProgressBannerBox>
                4-WEEK FULL BODY
              </ProgressBannerBox>
              <ProgressBannerBox>
                12-WEEK UPPER LOWER
              </ProgressBannerBox>
              <ProgressBannerBox>
                6-WEEK PPL 
              </ProgressBannerBox>
            </ProgressBannerBoxContainer>
          </ProgressBannerCard>
        </ProgressBanner>

        <div>
          <WorkoutContainerTitle>THE HYBRID</WorkoutContainerTitle>
          <WorkoutContainer>
            <Workout hybrid='hybrid'>80RUN</Workout>
            <Workout hybrid='hybrid'>80LIFT</Workout>
            <Workout hybrid='hybrid'>FIFTY</Workout>
            <Workout hybrid='hybrid'>JUMP</Workout>
          </WorkoutContainer>
        </div>

      </Wrapper>
    </>
  )
}

export default App
