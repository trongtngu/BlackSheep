import React from 'react'

import Navbar from '../components/Navbar'
import styled from 'styled-components'

import FormFieldButton from '../components/FormFieldButton'
import { useNavigate } from 'react-router-dom'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 100vw;
  height: 70vh;
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

const FormField = styled.input`
  border: 1px solid grey;
  border-radius: 5px;

  font-size: 1.4rem;

  padding-left: 20px;
  padding-right: 20px;
  
  &:focus {
    outline: 2px solid #20B2AA;
  }

  ::placeholder {
    color: #888;
  }

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

const Recommendation = styled.button`
  border-radius: 5px;

  font-size: 1.4rem;

  background: linear-gradient(160deg, tomato 0%, #FFA07A 100%);
  color: white;
  font-weight: bold;

  text-align: center;

  border: 0;

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

  const navigate = useNavigate();

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
  const handlePrefClick = (pref: string) => {
    setPreferences((prevPref) => {
      if (prevPref.includes(pref)) {
        return prevPref.filter(((removePref) => removePref !== pref))
      } 
      
      else {
        return [...prevPref, pref]
      }
    })
  }

  const [numDays, setNumDays] = React.useState<Array<string>>([])
  const handleDaysClick = (day: string) => {
    setNumDays((prevDay) => {
      if (prevDay.includes(day)) {
        return prevDay.filter(((removeDay) => removeDay !== day))
      } 
      
      else {
        return [...prevDay, day]
      }
    })
  }

  const [form, setForm] = React.useState("About You");
  const [error, setError] = React.useState("")
  const handleNextClick = (curr: string, dest: string) => {

    let myError = ""

    if (curr === "About You" && name === "") {
      myError = "Please enter your name"
    }

    if (curr === "Your Goal" && goals.length === 0){
      myError = "Please choose at least ONE goal"
    }

    if (curr === "Workout Preferences" && preferences.length === 0) {
      myError = "Please choose at least ONE preference"
    }

    if (curr === "Lifestyle" && numDays.length === 0) {
      myError = "Please choose at least 1 day"
    }

    if (myError === "") {
      setForm(dest)
      setError("")
    } else {
      setError(myError)
    }
  }

  return (
    <>
      <Navbar />
      <Wrapper>
        {
          form === "About You" &&
          <Form>
            <FormTitle>
              About You
            </FormTitle>
            <FormSubtitle>
              Let us know a bit about you
            </FormSubtitle>
            <FormBody>
              <FormField placeholder='First Name' onChange={(e)=>setName(e.target.value)}>
              </FormField>
              {error}
              <FormButtonContainer>
                <FormBackButton>
                  Back
                </FormBackButton>
                <FormNextButton onClick={()=>{handleNextClick("About You", "Your Goal")}}>
                  Next ➜
                </FormNextButton>
              </FormButtonContainer>
            </FormBody>
          </Form>
        }

        {
          form === "Your Goal" &&
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
              <FormFieldButton value="Weight Loss" callback={handleGoalsClick}>
                Weight Loss
              </FormFieldButton>
              <FormFieldButton value="Weight Maintenance" callback={handleGoalsClick}>
                Weight Maintenance
              </FormFieldButton>
              <FormFieldButton value="Weight Gain" callback={handleGoalsClick}>
                Weight Gain
              </FormFieldButton>
              <FormFieldButton value="Build Muscle" callback={handleGoalsClick}>
                Build Muscle
              </FormFieldButton>
              <FormFieldButton value="Stress Relief" callback={handleGoalsClick}>
                Stress Relief
              </FormFieldButton>
              {error}
              <FormButtonContainer>
                <FormBackButton>
                  Back
                </FormBackButton>
                <FormNextButton onClick={()=>{handleNextClick("Your Goal", "Workout Preferences")}}>
                  Next ➜
                </FormNextButton>
              </FormButtonContainer>
            </FormBody>
          </Form>
        }

        {
          form === "Workout Preferences" &&
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
              <FormFieldButton value="Lifting Weights" callback={handlePrefClick}>
                Lifting Weights
              </FormFieldButton>
              <FormFieldButton value="Running" callback={handlePrefClick}>
                Running
              </FormFieldButton>
              <FormFieldButton value="Walking" callback={handlePrefClick}>
                Walking
              </FormFieldButton>
              <FormFieldButton value="Not sure" callback={handlePrefClick}>
                Not sure 
              </FormFieldButton>
              {error}
              <FormButtonContainer>
                <FormBackButton>
                  Back
                </FormBackButton>
                <FormNextButton onClick={()=>{handleNextClick("Workout Preferences", "Lifestyle")}}>
                  Next ➜
                </FormNextButton>
              </FormButtonContainer>
            </FormBody>
          </Form>
        }

        {
          form === "Lifestyle" &&
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
              <FormFieldButton value="1" callback={handleDaysClick}>
                1
              </FormFieldButton>
              <FormFieldButton value="2" callback={handleDaysClick}>
                2
              </FormFieldButton>
              <FormFieldButton value="3" callback={handleDaysClick}>
                3
              </FormFieldButton>
              <FormFieldButton value="4" callback={handleDaysClick}>
                4
              </FormFieldButton>
              <FormFieldButton value="5" callback={handleDaysClick}>
                5
              </FormFieldButton>
              <FormFieldButton value="6" callback={handleDaysClick}>
                6
              </FormFieldButton>
              <FormFieldButton value="7" callback={handleDaysClick}>
                7
              </FormFieldButton>
              {error}
              <FormButtonContainer>
                <FormBackButton>
                  Back
                </FormBackButton>
                <FormNextButton onClick={()=>{handleNextClick("Lifestyle", "Recommendations")}}>
                  Next ➜
                </FormNextButton>
              </FormButtonContainer>
            </FormBody>
          </Form>
        }

        {
          form === "Recommendations" &&
          <Form>
            <RecommendationTitle>
              Recommendations
            </RecommendationTitle>
            <RecommendationWrapper>
              <Recommendation onClick={()=>{navigate("/template/FullBody")}}>
                <div>Full Body</div>
                <div>3 days</div>
              </Recommendation>
              <Recommendation>
                <div>C25k</div>
                <div>3 days</div>
              </Recommendation>
              <Recommendation>
                <div>Push Pull Legs</div>
                <div>3 days</div>
              </Recommendation>

              <OwnChoice>
                <div>Find More</div>
                <div>➜</div>
              </OwnChoice>
            </RecommendationWrapper>
          </Form>
        }
      </Wrapper>
    </>
  )
}
