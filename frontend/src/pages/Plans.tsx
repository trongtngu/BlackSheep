import styled from 'styled-components'

import Navbar from '../components/Navbar'
import MobileFooter from '../components/MobileFooter'

import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'

const Wrapper = styled.div`
  padding: 5vw;
`

const PlansBanner = styled.div`
  height: 3rem;
`

const PlansTitle = styled.div`
  font-size: 2rem;
  font-weight: bold;
`

const PlansCardContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 3vh;

  height: 80vh;
  
  overflow-y: auto;
  overflow-x: hidden;

  padding-bottom: 20vh;
`

const PlansCard = styled.div`
  border: 1px solid #E3E4E6;
  border-radius: 20px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);

  cursor: pointer;
`

const PlansCardImage = styled.div`
  width: 90vw;
  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);
  height: 60vw;

  display: flex;

  justify-content: flex-end;
  flex-direction: column;
  
  color: white;
  font-weight: bold;
  font-family: Roboto;
  font-size: 2rem;

  padding: 2vw;

  border-top-right-radius: inherit;
  border-top-left-radius: inherit;
`

const PlansCardTitle = styled.div`
  font-weight: bold;
  padding: 2vw 4vw 2vw 4vw;
`

const PlansCardBody = styled.div`
  color: darkgrey;
  padding: 0vw 4vw 0vw 4vw;
`

const PlansCardTagContainer = styled.div`

  padding: 2vw 4vw 4vw 4vw;
  
  border-bottom-left-radius: inherit;
  border-bottom-right-radius: inherit;

  display: flex;

  flex-wrap: wrap;

  gap: 2vw;
`

const PlansCardTag = styled.div`
  padding: 0vw 2vw 0vw 2vw;

  background: lightgrey;
  color: #777777;

  border-radius: 5px;
`

type Template = {
  templateName: string;
  templateDetails: string;
  id: number;
}
export default function Plans() {

  const navigate = useNavigate()

  const [templates, setTemplates] = React.useState<Template[]>([])

  const getAllTemplates = async () => {
    try{
      const response = await fetch("/api/templates")
      if(!response.ok) {
        throw new Error("Fetch Error")
      }

      const data = await response.json();

      console.log(data)

      setTemplates(data)
    } catch (error) {
      console.error("Error Fetching Templates", error)
    }
  }
  React.useEffect(()=>{
    getAllTemplates()
  },[])

  const { userID } = useParams();
  const handleRouting = (id: number) => {
    navigate(`/user/${userID}/plan/summary/${id}`)
  }
  return (
  <>
    <Navbar />
    <Wrapper>
      <PlansBanner>
        <PlansTitle>
          Plans
        </PlansTitle>
      </PlansBanner>

      <PlansCardContainer>
        {templates.map((item, idx)=>{
          return(
          <PlansCard key={idx} onClick={()=>{handleRouting(item.id)}}>
            <PlansCardImage>
              {item.templateName}
            </PlansCardImage>

            <PlansCardTitle>
              Full Body
            </PlansCardTitle>
            <PlansCardBody>
              {item.templateDetails}
            </PlansCardBody>

            <PlansCardTagContainer>
              <PlansCardTag>
                All Levels
              </PlansCardTag>
            </PlansCardTagContainer>
          </PlansCard>
          )
        })}
        
      </PlansCardContainer>
    </Wrapper>
    <MobileFooter />
  </>
  )
}
