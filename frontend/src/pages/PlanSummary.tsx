import React from 'react'
import Navbar from '../components/Navbar'
import MobileFooter from '../components/MobileFooter'
import styled from 'styled-components'

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

const StartBanner = styled.div`

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StartButton = styled.button`
  border: 0;
  border-radius: 5px;

  color: white;
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);

  font-size: 1rem;

  padding: 1vh 10vw 1vh 10vw;
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

export default function PlanSummary() {

  const {userID, workout} = useParams();
  return (<>
  <Navbar />
  <Wrapper>
    <PlanBanner>
      <PlanTitle>Full Body</PlanTitle>
    </PlanBanner>
    <SummaryBanner>
      <SummaryTitle>
        Is full body for you?
      </SummaryTitle>
      <SummaryBody>
        <ul>
          <li>You can only workout 2-3 times a week</li>
          <li>You do not have the time to work on individual body parts</li>
        </ul>

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
