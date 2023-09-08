import React from 'react'
import styled from 'styled-components'
import Navbar from '../components/Navbar'
import MobileFooter from '../components/MobileFooter'

const Wrapper = styled.div`
  padding: 5vw;
`

const ForumsBanner = styled.div`
  height: 3rem;
`

const ForumsTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`

const ForumsCardContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 3vh;

  height: 80vh;
  
  overflow-y: auto;
  overflow-x: hidden;

  padding-bottom: 20vh;
`

const ForumsCard = styled.div`
  border: 1px solid #E3E4E6;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);
`

const ForumsCardImage = styled.div`
  width: 90vw;
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);

  display: flex;

  justify-content: flex-end;
  flex-direction: column;
  
  color: white;
  font-weight: bold;
  font-family: Roboto;
  font-size: 1.5rem;

  padding: 4vw;

  border-top-right-radius: inherit;
  border-top-left-radius: inherit;
`

const ForumMembersCount = styled.div`
  font-size: 0.8rem;
  color: #F4F5F7;
`

const ForumsCardBody = styled.div`
  color: darkgrey;
  padding: 2vw 4vw 2vw 4vw;
`

export default function Forum() {
  return (
    <>
      <Navbar />
      <Wrapper>
        <ForumsBanner>
          <ForumsTitle>
            Forums
          </ForumsTitle>
        </ForumsBanner>
  
        <ForumsCardContainer>
          <ForumsCard>
            <ForumsCardImage>
              <div>Full Body</div>
              <ForumMembersCount>314 members</ForumMembersCount>
            </ForumsCardImage>

            <ForumsCardBody>
              Discuss full body workout improvements and share experiences
            </ForumsCardBody>
          </ForumsCard>
          <ForumsCard>
            <ForumsCardImage>
              <div>PPL</div>
              <ForumMembersCount>572 members</ForumMembersCount>
            </ForumsCardImage>

            <ForumsCardBody>
              Discuss the gold standard workout Push Pull Legs
            </ForumsCardBody>
          </ForumsCard>
          <ForumsCard>
            <ForumsCardImage>
              <div>Upper Lower</div>
              <ForumMembersCount>193 members</ForumMembersCount>
            </ForumsCardImage>

            <ForumsCardBody>
              Discuss the alternating workouts of Upper Lower
            </ForumsCardBody>
            </ForumsCard>
  
        </ForumsCardContainer>
      </Wrapper>
      <MobileFooter />
    </>
    )
}
