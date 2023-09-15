import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import MobileFooter from '../components/MobileFooter'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AddBoxIcon from '@mui/icons-material/AddBox';

import {useNavigate, useParams} from 'react-router-dom';

const Wrapper = styled.div`

  width: 100vw;

  display: flex;
  justify-content: center;
  flex-direction: column;
`

const SavedTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;

  background: white;
  
  padding: 5vw;
  padding-bottom: 0;

  display: flex;
  justify-content: space-between;
`

const CreateNewWorkoutButton = styled.button`
  background: 0;
  border: 0;
  
  color: #20B2AA;
`

const SavedBanner = styled.div`
  padding-bottom: 20vh;

  display: flex;
  align-items: center;
  flex-direction: column;

  gap: 2vh;
`

const SavedWorkoutCard = styled.div`
  border: 1px solid #E3E4E6;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);
  background: white;

  width: 90vw;
  height: 10vh;
  display: flex;
`

const SavedWorkoutCardLogo = styled.div`
  border-radius: inherit;

  height: 100%;        
  aspect-ratio: 1/1;
  
  padding: 2vh;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 3rem;

`

const SavedWorkoutCardInfo = styled.div`
  border-radius: inherit;

  height: 100%;
  width: 60%;
  padding: 1vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const SavedWorkoutCardInfoTitle = styled.div`
  
`

const SavedWorkoutCardInfoDate = styled.div`
  color: darkgrey;
  font-size: 0.8rem;
`

const SavedWorkoutCardSettings = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  flex-grow: 1;
  border-radius: inherit;

  color: inherit;
`
export default function SavedWorkouts() {

  const navigate = useNavigate()
  const { userID } = useParams();

  return (<>
    <Navbar />
    <Wrapper>
      <div>
        <SavedTitle>
          <div>Saved Workouts</div> 
          <CreateNewWorkoutButton onClick={()=>{navigate(`/${userID}/createWorkout`)}}>
            <AddBoxIcon/>
          </CreateNewWorkoutButton>
        </SavedTitle>
      </div>

      <SavedBanner>
        <SavedWorkoutCard>
          <SavedWorkoutCardLogo>🐑</SavedWorkoutCardLogo>
          <SavedWorkoutCardInfo>
            <SavedWorkoutCardInfoTitle>
              Full Body
            </SavedWorkoutCardInfoTitle>
            <SavedWorkoutCardInfoDate>
              last opened: 15/09/2023
            </SavedWorkoutCardInfoDate>
          </SavedWorkoutCardInfo>
          <SavedWorkoutCardSettings>
            <MoreHorizIcon />
          </SavedWorkoutCardSettings>
        </SavedWorkoutCard>
        <SavedWorkoutCard>
          <SavedWorkoutCardLogo>🐑</SavedWorkoutCardLogo>
          <SavedWorkoutCardInfo>
            <SavedWorkoutCardInfoTitle>
              C25K
            </SavedWorkoutCardInfoTitle>
            <SavedWorkoutCardInfoDate>
              last opened: 04/09/2023
            </SavedWorkoutCardInfoDate>
          </SavedWorkoutCardInfo>
          <SavedWorkoutCardSettings>
            <MoreHorizIcon />
          </SavedWorkoutCardSettings>
        </SavedWorkoutCard>
        <SavedWorkoutCard>
          <SavedWorkoutCardLogo>🐑</SavedWorkoutCardLogo>
          <SavedWorkoutCardInfo>
            <SavedWorkoutCardInfoTitle>
              PPL
            </SavedWorkoutCardInfoTitle>
            <SavedWorkoutCardInfoDate>
              last opened: 11/08/2023
            </SavedWorkoutCardInfoDate>
          </SavedWorkoutCardInfo>
          <SavedWorkoutCardSettings>
            <MoreHorizIcon />
          </SavedWorkoutCardSettings>
        </SavedWorkoutCard>
      </SavedBanner>
    </Wrapper>
    <MobileFooter />
  </>)
}
