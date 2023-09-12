import React from 'react'

import styled from 'styled-components'
import Navbar from '../components/Navbar'
import MobileFooter from '../components/MobileFooter'

const Wrapper = styled.div`
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  gap: 2vh;

  padding-bottom: 20vh;
`

const HomeTitleBanner = styled.div`
  width: 90vw;

  padding-top: 5vw;

  font-size: 2rem;
  font-weight: bold;
`

const HomeSubtitle = styled.div`
  font-size: 1.2rem;
  width: 90vw;
`

const JustStartingCard = styled.div`
  border: 1px solid #E3E4E6;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const JustStartingTitle = styled.div`
  width: 90vw;

  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 3vh;
  border-radius: 15px;
  color: #20B2AA;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const JustStartingSlogan= styled.div`
  font-size: 1rem;
  font-weight: normal;
  color: #4A4A4A;
`

const JustStartingButton = styled.button`
  font-size: 1rem;
  border: 0;
  background: none;
  
  color: white;
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);

  border-radius: 20px;

  padding: 5px 20px 5px 20px;

  margin-top: 2vh;
`

const SectionBanner = styled.div`
  width: 90vw;
`
const SectionHorizontalBoxContainer = styled.div`
  display: flex;

  width: 90vw;

  flex-direction: row;

  overflow-x: scroll;
  padding: 0vh 0vw 1vh 0vw;

  gap: 5vw;
`

const SectionBox = styled.div`
  
  min-width: 80vw;
  min-height: 20vw;

  border: 1px solid #E3E4E6;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);

  padding: 1vw;

  color: white;
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);

  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`

export default function Home() {
  return (<>
    <Navbar />
    <Wrapper>
      <HomeTitleBanner>
        Home
      </HomeTitleBanner>

      <JustStartingCard>
        <JustStartingTitle>
          <div>Just Starting, Don't Care</div>
          <JustStartingSlogan>
            Think less about working out 
          </JustStartingSlogan>
          <JustStartingButton>
            Beginner Guide ➜
          </JustStartingButton>
        </JustStartingTitle>
      </JustStartingCard>

      <SectionBanner>
        <HomeSubtitle>Strength Training</HomeSubtitle>
        <SectionHorizontalBoxContainer>
          <SectionBox>Starting Strength</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
        </SectionHorizontalBoxContainer>
        <SectionHorizontalBoxContainer>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
        </SectionHorizontalBoxContainer>
      </SectionBanner>
      <SectionBanner>
        <HomeSubtitle>Cardio</HomeSubtitle>
        <SectionHorizontalBoxContainer>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
        </SectionHorizontalBoxContainer>
        <SectionHorizontalBoxContainer>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
        </SectionHorizontalBoxContainer>
      </SectionBanner>
      <SectionBanner>
        <HomeSubtitle>Nutrition</HomeSubtitle>
        <SectionHorizontalBoxContainer>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
        </SectionHorizontalBoxContainer>
        <SectionHorizontalBoxContainer>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
        </SectionHorizontalBoxContainer>
      </SectionBanner>
      <SectionBanner>
        <HomeSubtitle>Recovery</HomeSubtitle>
        <SectionHorizontalBoxContainer>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
        </SectionHorizontalBoxContainer>
        <SectionHorizontalBoxContainer>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
          <SectionBox>PPL</SectionBox>
        </SectionHorizontalBoxContainer>
      </SectionBanner>
    </Wrapper>
    <MobileFooter />
  </>)
}
