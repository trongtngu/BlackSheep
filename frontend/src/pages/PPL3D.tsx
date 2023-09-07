import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import HistoryIcon from '@mui/icons-material/History';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';

import ExerciseColumn from '../components/ExerciseColumn';

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

  width: 100vw;
  padding: 0vw 5vw 0vw 5vw;

  align-items: center;
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`

const InfoBar = styled.div`
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 120%);
  width: 100vw;
  height: 5vh;
  display: flex;
  justify-content: flex-end;
`

const InfoBarButton = styled.button`
  background: none;
  border: 0;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;
`

const SpreadsheetBanner = styled.div`
  width: 100vw;

  display: flex;
  align-items: center;
  flex-direction: column;
`

const SpreadsheetTitle = styled.div`
  border-bottom: 1px solid rgb(227, 227, 227);
  font-weight: bold;

  padding-top: 1vh;
  padding-bottom: 1vh;
  width: 90vw;
`

const SpreadsheetContainer = styled.div`
  overflow: auto;

  display: flex;
  flex-direction: row;

  padding: 2vh 0 2vh 0;
  background: rgb(247,247,247, 0.5);

  margin-bottom: 2vh;

  padding-left: 5vw;
  padding-right: 5vw;

  width: 100vw;
`

const CompleteBanner = styled.div`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`

const CompleteButton = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  padding: 1vw 6vw 1vw 6vw;
  border-radius: 10px;

  border: 1px solid lightgrey;
  color: lightgrey;

  &.completed {
    background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);
    color: white;

    text-transform: uppercase;
  }
`

type Workout = {
  workout_name: string;
  exercise_name: string;
  sets: number;
  reps: number;
}

export default function PPL3D() {

  // Updating styles when workout is completed
  const [completed, setCompleted] = React.useState(false);
  const [currentNumSets, setCurrentNumSets] = React.useState<number>(0);
  const [totalNumSets, setTotalNumSets] = React.useState<number>(0)
  
  // Passed as a callback to each ExerciseColumn to pass onto the children boxes.
  // updates the state variable to keep track of number of completed sets against
  // the number of sets currently.
  const handleSetClick = (done: Boolean) => {
    if (done) {
      setCurrentNumSets(currentNumSets - 1)
    }

    else {
      setCurrentNumSets(currentNumSets + 1)
    }
  }

  React.useEffect(() => {
    if (currentNumSets === totalNumSets) {
      setCompleted(true);
    } else {
      setCompleted(false);
    }
  }, [currentNumSets, totalNumSets]);

  // Initialising workout list
  // Also used to keep track of completion conditions: all sets done.
  const [workout, setWorkout] = React.useState<Workout[]>([])
  const [workoutName, setWorkoutName] = React.useState<string>("Workout Name")
  const getWorkoutDataById = async (id: number) => {
    try {
      const response: Response = await fetch(`/api/workout/${id}`);
      
      if(!response.ok) {
        throw new Error("Fetch Error")
      }

      const data = await response.json();
      setWorkout(data)
      setWorkoutName(data[0].workout_name)

      let totalSets = 0;
      for (let i = 0; i < data.length; i++) {
        totalSets += data[i].sets
      }

      setTotalNumSets(totalSets)
      
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(()=>{
    getWorkoutDataById(1)
  },[])

  const [today, setToday] = React.useState("01/01/2023")
  const getToday = () => {
    const newToday = new Date();
    const day = String(newToday.getDate()).padStart(2, '0');
    const month = String(newToday.getMonth() + 1).padStart(2, '0');
    const year = newToday.getFullYear();

    const formattedDate = `${day}/${month}/${year}`;

    setToday(formattedDate);
  }

  React.useEffect(() => {
    getToday();
  }, [])

  return (
    <>
    <Navbar/>
    <Wrapper>
      <TitleBanner>
        <Title>
          {workoutName}
        </Title>
      </TitleBanner>

      <InfoBar>
        <InfoBarButton><HomeIcon /></InfoBarButton>
        <InfoBarButton><HistoryIcon /></InfoBarButton>
        <InfoBarButton><SettingsIcon /></InfoBarButton>
      </InfoBar>

      <SpreadsheetBanner>
        <SpreadsheetTitle>
          {today}
        </SpreadsheetTitle>

        <SpreadsheetContainer>
          {
            workout.map((exercise, idx) => {
              return (
              <ExerciseColumn
                key = {idx}
                name={exercise.exercise_name} 
                sets={exercise.sets} 
                reps={exercise.reps}
                callback={handleSetClick}
              />
              )
            })
          }
        </SpreadsheetContainer>
      </SpreadsheetBanner>
      <CompleteBanner>
        <CompleteButton className={completed? 'completed' : ''}>
          complete
        </CompleteButton>
      </CompleteBanner>
    </Wrapper>
    </>
  )
}
