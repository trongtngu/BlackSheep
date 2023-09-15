import React from 'react'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add';
const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  
  align-items: center;
  flex-direction: column;
  padding-top: 5vh;
`

const Title = styled.div`
  font-size: 2rem;
`

const TemplatesBanner = styled.div`
  width: 90vw;

  display: flex;
  flex-direction: column;
`

const TemplatesBannerTitle = styled.div`
  font-size: 1.5rem;
`

const TemplatesContainer = styled.div`
  display: flex;
  flex-direction: row;

  gap: 2vw;

  flex-wrap: wrap;
`

const TemplateCard = styled.div`
  border: 1px solid #E3E4E6;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);
  background: white;

  width: calc(33.33% - 2vw);
  height: 25vh;
`

const BlankTemplateContainer = styled.div`
  display: flex;
  justify-content: center;
`
const BlankTemplateTitle = styled.div`
  display: flex;
  justify-content: center;
  font-size: 1.5rem;
`

const BlankTemplateCard = styled.div`
  border: 1px solid #E3E4E6;
  border-radius: 10px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);
  background: white;

  width: calc(33.33% - 2vw);
  height: 25vh;

  font-size: 8rem;

  display: flex;
  align-items: center;
  justify-content: center;
  
  color: #20B2AA;
`

export default function CreateWorkout() {
  return (<>
  <Wrapper>
    <Title>Workout Creator</Title>
    <TemplatesBanner>
      <TemplatesBannerTitle>
        Popular Lifting Templates
      </TemplatesBannerTitle>
      <TemplatesContainer>
        <TemplateCard>
          PPL
        </TemplateCard>
        <TemplateCard>
          FULL BODY
        </TemplateCard>
        <TemplateCard>
          c25k
        </TemplateCard>
      </TemplatesContainer>
      <TemplatesBannerTitle>
        Popular Cardio Templates
      </TemplatesBannerTitle>
      <TemplatesContainer>
        <TemplateCard>
          PPL
        </TemplateCard>
        <TemplateCard>
          FULL BODY
        </TemplateCard>
        <TemplateCard>
          c25k
        </TemplateCard>
        
      </TemplatesContainer>

      <BlankTemplateTitle>
        From Scratch
      </BlankTemplateTitle>
      <BlankTemplateContainer>
        <BlankTemplateCard>
          <AddIcon style={{ fontSize: '10vh' }}/>
        </BlankTemplateCard>
      </BlankTemplateContainer>
    </TemplatesBanner>
  </Wrapper>
  </>)
}
