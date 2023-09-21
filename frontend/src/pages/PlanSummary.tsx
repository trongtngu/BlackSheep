import React from 'react'
import Navbar from '../components/Navbar'
import MobileFooter from '../components/MobileFooter'
import styled from 'styled-components'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlagIcon from '@mui/icons-material/Flag';

import {useParams} from 'react-router-dom'
const Wrapper = styled.div`
  padding: 5vw;

  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 2vh;

  padding-bottom: 20vh;
`

const PlanBanner = styled.div`
  display: flex;
`

const PlanTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
  font-family: 'Permanent Marker', cursive;
  width: 100%;
  text-align: center;
`

const SummaryBanner = styled.div`
  border: 1px solid #E3E4E6;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);
  padding: 5vw;

  &.pros {
    color: white;
    background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);
  }

  &.short {
    border: 0;
    border-radius: 0;
    box-shadow: 0 0 0 0;
    padding: 0;
  }
`

const SummaryTitle = styled.div`
  color: #20b2aa;
  font-weight: bold;

  &.pros {
    color: white;
  }
`

const SummaryBody = styled.div`
  
`

const IconBox = styled.div`
  display: flex;
  align-items: flex-start;

  padding: 1vw;

  gap: 2vw;

  font-size: 1rem;
`

interface WorkoutInfo {
  id: number;
  templateID: number;
  duration: string;
  programLevel: string;
  minimumDaysCommitment: string;
}
export default function PlanSummary() {

  const {userID, workout} = useParams();
  const [workoutInfo, setWorkoutInfo] = React.useState<WorkoutInfo | null>(null)
  const getWorkoutInfo = async () => {

    const id = 1;
    try {
      const response = await fetch(`/api/templates/${id}`);

      const data = await response.json();

      setWorkoutInfo(data)
    } catch (err) {
      console.error("Error fetching workout info", err)
    }
  }

  React.useEffect(()=>{
    getWorkoutInfo()
  })
  return (<>
  <Navbar />
  <Wrapper>
    <PlanBanner>
      <PlanTitle>Full Body</PlanTitle>
    </PlanBanner>
    <SummaryBanner className='short'>
      <SummaryBody className='short'>
        <IconBox><CalendarTodayIcon/> {workoutInfo && workoutInfo.duration}</IconBox>
        <IconBox><AccessTimeIcon /> Days per week: {workoutInfo && workoutInfo.minimumDaysCommitment}</IconBox>
        <IconBox><FlagIcon /> Build muscle</IconBox>
        <IconBox><FitnessCenterIcon /> Best for: {workoutInfo && workoutInfo.programLevel}</IconBox>
      </SummaryBody>
    </SummaryBanner>
    <SummaryBanner className="pros">
      <SummaryTitle className='pros'>
        Pros
      </SummaryTitle>
      <SummaryBody>
        <ul>
          <li>Low time commitment - upwards from 1-5 sessions a week</li>
          <li>Missing workouts is <i>less</i> damaging to progress because you already trained the muscle group during the week</li>
          <li>Less decisions about what to do in the gym - e.g. is it leg day?</li>
          <li>Less thinking = easier to start and stick to</li>
        </ul>
      </SummaryBody>
    </SummaryBanner>
    <SummaryBanner>
      <SummaryTitle>
        Cons
      </SummaryTitle>
      <SummaryBody>
        <ul>
          <li> <i>Less</i> training volume for each body part per workout</li>
          <li> Not able to focus on lagging body parts</li>
          <li> <i>More</i> time spent working out per session</li>
        </ul>
      </SummaryBody>
    </SummaryBanner>
  </Wrapper>
  <MobileFooter planName={workout}/>
  </>)
}
