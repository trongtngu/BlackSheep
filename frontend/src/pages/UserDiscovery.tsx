import React from 'react'

import Navbar from '../components/Navbar'
import styled from 'styled-components'

import FormFieldButton from '../components/FormFieldButton'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
`
const Form = styled.div`
  width: 90vw;
  padding: 5vw;
  border: 1px solid #F4F5F7;
  border-radius: 15px;
  box-shadow: 0 2px 12px rgba(67,137,162,0.08);
  background: #fff;
`

const FormTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.4rem;
  font-weight: bold;

  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 1vh;

`

const FormSubtitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormBody = styled.div`
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1vh;
`

const FormField = styled.div`
  border: 1px solid grey;
  border-radius: 5px;

  font-size: 1.4rem;

  padding-left: 20px;
  padding-right: 20px;

  width: 80vw;
`

const FormButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 80vw;
`

const FormNextButton = styled.button`
  border-radius: 5px;

  font-size: 1.4rem;

  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);
  border: none;

  color: white;
  font-weight: bold;

  text-align: center;

  width: 45%;
  height: auto;
`

const FormBackButton = styled.button`
  border-radius: 5px;

  font-size: 1.4rem;

  border: 1px solid #20B2AA;

  font-weight: bold;

  text-align: center;
  background: white;
  color: #20B2AA;
  width: 45%;
  height: auto;
`

const RecommendationTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 1.5rem;

  overflow: hidden;

  font-weight: bold;

  margin-bottom: 1vh;
`

const RecommendationWrapper = styled.div`
  display: flex;

  flex-direction: column;

  gap: 1vh;

  justify-content: center;
  align-items: center;
`

const Recommendation = styled.div`
  border-radius: 5px;

  font-size: 1.4rem;

  background: linear-gradient(160deg, tomato 0%, #FFA07A 100%);
  color: white;
  font-weight: bold;

  text-align: center;

  width: 50vw;
`

const OwnChoice = styled.button`
  border-radius: 5px;

  font-size: 1.4rem;

  background: linear-gradient(160deg, #20B2AA 0%, #40E0D0 100%);
  border: none;

  color: white;
  font-weight: bold;

  text-align: center;

  width: 50vw;
  height: auto;
`

export default function UserDiscovery() {

  const [name, setName] = React.useState<string>("")

  const [goals, setGoals] = React.useState<Array<string>>([])
  const handleGoalsClick = (goal: string) => {
    setGoals((prevGoal) => {
      if (prevGoal.includes(goal)) {
        return prevGoal.filter(((removeGoal) => removeGoal !== goal))
      } 
      
      else {
        return [...prevGoal, goal]
      }
    })
  }

  const [preferences, setPreferences] = React.useState<Array<string>>([])

  const [numDays, setNumDays] = React.useState<Array<number>>([])

  return (
    <>
      <Navbar />
      <Wrapper>
      
        <Form>
          <FormTitle>
            About You
          </FormTitle>
          <FormSubtitle>
            Let us know a bit about you
          </FormSubtitle>
          <FormBody>
            <FormField>
              Name
            </FormField>
            <FormButtonContainer>
              <FormBackButton>
                Back
              </FormBackButton>
              <FormNextButton>
                Next ➜
              </FormNextButton>
            </FormButtonContainer>
          </FormBody>
        </Form>

        <Form>
          <FormTitle>
            Your Goal
          </FormTitle>
          <FormSubtitle>
            Your reason for wanting to do fitness
          </FormSubtitle>
          <FormSubtitle>
          </FormSubtitle>
          <FormBody>
            <FormFieldButton value="Weight Loss">
              Weight Loss
            </FormFieldButton>
            <FormFieldButton>
              Weight Maintenance
            </FormFieldButton>
            <FormFieldButton>
              Weight Gain
            </FormFieldButton>
            <FormFieldButton>
              Build Muscle
            </FormFieldButton>
            <FormFieldButton>
              Stress Relief
            </FormFieldButton>
            <FormButtonContainer>
              <FormBackButton>
                Back
              </FormBackButton>
              <FormNextButton>
                Next ➜
              </FormNextButton>
            </FormButtonContainer>
          </FormBody>
        </Form>

        <Form>
          <FormTitle>
            Workout Preferences
          </FormTitle>
          <FormSubtitle>
            What do you enjoy the most
          </FormSubtitle>
          <FormSubtitle>
          </FormSubtitle>
          <FormBody>
            <FormFieldButton>
              Lifting Weights
            </FormFieldButton>
            <FormFieldButton>
              Running
            </FormFieldButton>
            <FormFieldButton>
              Walking
            </FormFieldButton>
            <FormFieldButton>
              Not sure 
            </FormFieldButton>
            <FormButtonContainer>
              <FormBackButton>
                Back
              </FormBackButton>
              <FormNextButton>
                Next ➜
              </FormNextButton>
            </FormButtonContainer>
          </FormBody>
        </Form>

        <Form>
          <FormTitle>
            Lifestyle
          </FormTitle>
          <FormSubtitle>
            How many days can you work out
          </FormSubtitle>
          <FormSubtitle>
            Rockets never launch at full speed,
          </FormSubtitle>
          <FormSubtitle>
            be ambitious but realistic.
          </FormSubtitle>
          <FormBody>
            <FormFieldButton>
              1
            </FormFieldButton>
            <FormFieldButton>
              2
            </FormFieldButton>
            <FormFieldButton>
              3
            </FormFieldButton>
            <FormFieldButton>
              4
            </FormFieldButton>
            <FormFieldButton>
              5
            </FormFieldButton>
            <FormFieldButton>
              6
            </FormFieldButton>
            <FormFieldButton>
              7
            </FormFieldButton>
            <FormButtonContainer>
              <FormBackButton>
                Back
              </FormBackButton>
              <FormNextButton>
                Next ➜
              </FormNextButton>
            </FormButtonContainer>
          </FormBody>
        </Form>

        <Form>
          <RecommendationTitle>
            Recommendations
          </RecommendationTitle>
          <RecommendationWrapper>
            <Recommendation>
              <div>Push Pull Legs</div>
              <div>3 days</div>
            </Recommendation>
            <Recommendation>
              <div>C25k</div>
              <div>3 days</div>
            </Recommendation>
            <Recommendation>
              <div>Full Body</div>
              <div>3 days</div>
            </Recommendation>

            <OwnChoice>
              <div>Find More</div>
              <div>➜</div>
            </OwnChoice>
          </RecommendationWrapper>
        </Form>

      </Wrapper>
    </>
  )
}
