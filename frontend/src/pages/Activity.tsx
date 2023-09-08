import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import MobileFooter from '../components/MobileFooter'

const Wrapper = styled.div`

  width: 100vw;
  background: #f7f7f7;

  display: flex;
  justify-content: center;
  flex-direction: column;
`

const ActivityBanner = styled.div`
`

const ActivityTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;

  background: white;
  
  padding: 5vw;
  padding-bottom: 0;
`

const ActivityCardContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 3vh;

  height: 80vh;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-top: 5vw;
  
  overflow-y: auto;
  overflow-x: hidden;

  padding-bottom: 10vh;
`

const ActivityCard = styled.div`
  border: 1px solid #E3E4E6;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);
  background: white;
`

const ActivityCardImage = styled.div`
  width: 90vw;
  display: flex;

  justify-content: flex-end;
  flex-direction: column;
  
  color: #20B2AA;
  font-weight: bold;
  font-family: Roboto;
  font-size: 1.5rem;

  padding: 4vw;
  padding-bottom: 0;

  border-top-right-radius: inherit;
  border-top-left-radius: inherit;
`

const ActivityDate = styled.div`
  font-size: 0.8rem;
  color: darkgrey;
`

const ActivityCardBody = styled.div`
  color: darkgrey;
  padding: 2vw 4vw 2vw 4vw;

  display: flex;
  align-items: center;
  justify-content: center;

  flex-direction: column;
`

const ActivityIndicatorBox = styled.div`
  display: flex;
  width: 100%;

  gap: 15vw;

  padding: 1vh 0vw 1vh 0vw;
  border-bottom: 1px solid #E3E4E6;
`

const ActivityIndicator = styled.div`
  text-align: center;
`

const ActivityIndicatorName = styled.div`
`

const ActivityIndicatorValue = styled.div`
  font-weight: bold;
  color: #666666;
`

const ActivityCardBadgeContainer = styled.div`
  display: flex;
  width: 100%;

  gap: 2vw;

  padding: 1vh 0vw 1vh 0vw;
`

const ActivityCardBadge = styled.div`
  width: 50px;
  height: 50px;

  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 2.5rem;

  font-family: Bangers;
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 80%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  display: inline;

  &.deload {
    width: 110px;
  }
`

export default function Activity() {
  return (
    <>
      <Navbar />
      <Wrapper>
        <ActivityBanner>
          <ActivityTitle>
            Past Workouts
          </ActivityTitle>
        </ActivityBanner>
  
        <ActivityCardContainer>
          <ActivityCard>
            <ActivityCardImage>
              <div>Full Body</div>
              <ActivityDate>Friday - 08/09/2023</ActivityDate>
            </ActivityCardImage>

            <ActivityCardBody>
              <ActivityIndicatorBox>
                <ActivityIndicator>
                  <ActivityIndicatorValue>5</ActivityIndicatorValue>
                  <ActivityIndicatorName>Energy</ActivityIndicatorName>
                </ActivityIndicator>
                <ActivityIndicator>
                  <ActivityIndicatorValue>1</ActivityIndicatorValue>
                  <ActivityIndicatorName>Effort</ActivityIndicatorName>
                </ActivityIndicator>
                <ActivityIndicator>
                  <ActivityIndicatorValue>2</ActivityIndicatorValue>
                  <ActivityIndicatorName>Pain</ActivityIndicatorName>
                </ActivityIndicator>
              </ActivityIndicatorBox>
              <ActivityCardBadgeContainer>
                <ActivityCardBadge>
                  PB
                </ActivityCardBadge>
                <ActivityCardBadge>
                  PB
                </ActivityCardBadge>
              </ActivityCardBadgeContainer>
            </ActivityCardBody>

          </ActivityCard>

          <ActivityCard>
            <ActivityCardImage>
              <div>Full Body</div>
              <ActivityDate>Wednesday - 06/09/2023</ActivityDate>
            </ActivityCardImage>

            <ActivityCardBody>
              <ActivityIndicatorBox>
                <ActivityIndicator>
                  <ActivityIndicatorValue>7</ActivityIndicatorValue>
                  <ActivityIndicatorName>Energy</ActivityIndicatorName>
                </ActivityIndicator>
                <ActivityIndicator>
                  <ActivityIndicatorValue>3</ActivityIndicatorValue>
                  <ActivityIndicatorName>Effort</ActivityIndicatorName>
                </ActivityIndicator>
                <ActivityIndicator>
                  <ActivityIndicatorValue>0</ActivityIndicatorValue>
                  <ActivityIndicatorName>Pain</ActivityIndicatorName>
                </ActivityIndicator>
              </ActivityIndicatorBox>
              <ActivityCardBadgeContainer>
                <ActivityCardBadge className="deload">
                  deload
                </ActivityCardBadge>
              </ActivityCardBadgeContainer>
            </ActivityCardBody>

          </ActivityCard>
  

          <ActivityCard>
            <ActivityCardImage>
              <div>Full Body</div>
              <ActivityDate>Friday - 08/09/2023</ActivityDate>
            </ActivityCardImage>

            <ActivityCardBody>
              <ActivityIndicatorBox>
                <ActivityIndicator>
                  <ActivityIndicatorValue>5</ActivityIndicatorValue>
                  <ActivityIndicatorName>Energy</ActivityIndicatorName>
                </ActivityIndicator>
                <ActivityIndicator>
                  <ActivityIndicatorValue>1</ActivityIndicatorValue>
                  <ActivityIndicatorName>Effort</ActivityIndicatorName>
                </ActivityIndicator>
                <ActivityIndicator>
                  <ActivityIndicatorValue>2</ActivityIndicatorValue>
                  <ActivityIndicatorName>Pain</ActivityIndicatorName>
                </ActivityIndicator>
              </ActivityIndicatorBox>
              <ActivityCardBadgeContainer>
                <ActivityCardBadge>
                  PB
                </ActivityCardBadge>
                <ActivityCardBadge>
                  PB
                </ActivityCardBadge>
                <ActivityCardBadge>
                  PB
                </ActivityCardBadge>
              </ActivityCardBadgeContainer>
            </ActivityCardBody>

          </ActivityCard>
        </ActivityCardContainer>
      </Wrapper>
      <MobileFooter />
    </>
    )
}
