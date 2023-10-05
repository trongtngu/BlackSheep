import { create } from '@mui/material/styles/createTransitions'
import React from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import styled from 'styled-components'
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

type Template = {
  id: number,
  templateName: string,
  templateDetails: string
}
export default function CreateWorkout() {

  let navigate = useNavigate()
  const {userID} = useParams()

  const [templates, setTemplates] = React.useState<Template[]>([])

  const getTemplates = async () => {
    try {
      const response = await fetch("/api/templates")

      const data = await response.json()

      setTemplates(data)
      console.log(data)
    } catch (error) {
      console.error("Error getting templates", error)
    }
  }

  React.useEffect(() => {
    getTemplates()
  }, [])


  /** Creating a template workout for the user */
  const createUserWorkout = async (templateID: number) => {
    try{
      const response = await fetch(`/api/createWorkout/${userID}/${templateID}`)

      const data = await response.json()
      console.log(data)

    } catch (error) {
      console.error(error)
    }
    navigate(`/user/${userID}/savedTemplates`)
  }
  return (<>
    <Wrapper>
      <Title>Workout Creator</Title>
      <TemplatesBanner>
        <TemplatesBannerTitle>
          Popular Lifting Templates
        </TemplatesBannerTitle>

        <TemplatesContainer>
          {templates.map((template, idx) => (
            <TemplateCard key={idx} onClick={()=>{createUserWorkout(template.id)}}>
              {template.templateName}
            </TemplateCard>
          ))}
        </TemplatesContainer>
      </TemplatesBanner>
    </Wrapper>
  </>)
}
