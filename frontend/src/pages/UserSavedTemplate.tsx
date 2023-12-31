import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import ExerciseColumn from '../components/ExerciseColumn';
import Footer from '../components/MobileFooter';
import { useParams } from 'react-router-dom';
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100vw;
`

const PageTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  height: 4rem;

  width: 100vw;
  padding: 5vw;
`

const TitleBanner = styled.div`
  display: flex;
  justify-content: space-between;

  width: 90vw;

  align-items: center;
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;

  color: #20B2AA;
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

const WorkoutButtonContainer = styled.div`
  display: flex;
  gap: 1vw;
  width: 90vw;
`

const WorkoutButton = styled.div`

  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);
  color: white;

  padding: 0vh 4vw 0vh 4vw;
  border-radius: 1vw;

  height: 4vh;

  display: flex;
  align-items: center;
  justify-content: center;
`

type Workout = {
  workout_name: string;
  exercise_name: string;
  sets: number;
  reps: number;
}

export default function UserSavedWorkout() {

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

  const { userID, templateID } = useParams();

  const getWorkoutDataById = async (id: number) => {
    try {
      const response: Response = await fetch(`/api/workout/${id}`);

      if (!response.ok) {
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

  type WorkoutNumbers = {
    id: number;
    userID: number;
    workoutDetails: string;
    workoutName: string;
  }

  const [workoutList, setWorkoutList] = React.useState<WorkoutNumbers[]>([])
  const getUserWorkoutsByTemplate = async (templateID: number) => {
    try {
      const response = await fetch(`/api/userWorkouts/${userID}/template/${templateID}`)

      const data = await response.json()

      console.log(data)
      setWorkoutList(data)
    } catch (error) {
      console.error("Error getting user template by ID")
    }
  }

  React.useEffect(() => {
    // if (templateID != undefined){
    //   getWorkoutDataById(parseInt(templateID))
    // }
    if (templateID != undefined) {
      getUserWorkoutsByTemplate(parseInt(templateID))
    }
  }, [])

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
      <Navbar />
      <Wrapper>
        <PageTitle>
          Workout
        </PageTitle>
        <TitleBanner>
          <Title>
            {workoutName}
          </Title>
        </TitleBanner>
        <WorkoutButtonContainer>
          {workoutList.map((w, idx) => (
            <WorkoutButton key={idx} onClick={()=>{getWorkoutDataById(w.id)}}>{w.workoutName}</WorkoutButton>
          ))}
        </WorkoutButtonContainer>
        <SpreadsheetBanner>
          <SpreadsheetTitle>
            {today}
          </SpreadsheetTitle>

          <SpreadsheetContainer>
            {
              workout.map((exercise, idx) => {
                return (
                  <ExerciseColumn
                    key={idx}
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
          <CompleteButton className={completed ? 'completed' : ''}>
            complete
          </CompleteButton>
        </CompleteBanner>
      </Wrapper>
      <Footer />
    </>
  )
}
