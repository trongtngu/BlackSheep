import React from 'react'

import Navbar from '../components/Navbar'
import styled from 'styled-components'

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

  overflow: hidden;

  white-space: nowrap;
  text-overflow: ellipsis;
`

const FormSubtitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const FormBody = styled.div`
  display: flex;

  flex-direction: column;

  gap: 1vh;
`

const FormField = styled.div`
  border: 1px solid grey;
  border-radius: 5px;

  font-size: 1.4rem;

  padding-left: 20px;
  padding-right: 20px;
`
export default function UserDiscovery() {
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
          </FormBody>
        </Form>

        <Form>
          <FormTitle>
            Lifestyle
          </FormTitle>
          <FormSubtitle>
            Fit workouts to your schedule
          </FormSubtitle>
          <FormSubtitle>
            Rockets never launch at full speed,
          </FormSubtitle>
          <FormSubtitle>
            Be Realistic
          </FormSubtitle>
          <FormBody>
            <FormField>
              Days free to workout
            </FormField>
          </FormBody>
        </Form>



      </Wrapper>
    </>
  )
}
