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
  
`

const SummaryTitle = styled.div`
  
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
    <StartBanner>
      <StartButton>
        Start
      </StartButton>
    </StartBanner>

    <SummaryBanner>
      <SummaryTitle>
        Is full body for you?
      </SummaryTitle>
      <SummaryBody>
        <div>1. You can only workout 2-3 times a week</div>
        <div>2. You do not have the time to work on individual body parts</div>

        <div>TL;DR You are busy and/or do not have the time</div>
      </SummaryBody>
    </SummaryBanner>
  </Wrapper>
  <MobileFooter />
  </>)
}
