import React from 'react'
import styled from 'styled-components'
import {Navigate, useNavigate} from 'react-router-dom'

// Local files
import Navbar from '../components/Navbar'

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100vw;
  height: 80vh;

  gap: 2vh;
`

const LoginBanner = styled.div`
  
`

const LoginTitle = styled.div`
  
`

const SignupBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 2vh;
`

const SignupTitle = styled.div`
  
`

const LoginNav = styled.button`
  background: 0;
  border: 0;
  color: #20B2AA;
`

const SignupFieldsContainer = styled.div`
  width: 90vw;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  gap: 1vh;
`

const SignupField = styled.input`
  border-radius: 5px;

  width: 100%;
  height: 5vh;

  padding: 0vh 2vw 0vh 2vw;

  border: 1px solid rgb(214, 218, 226);
  color: inherit;
  &:focus{
    
    outline: 1px solid #20B2AA;
  }
`

const SignupButton = styled.button`
  width: 100%;
  height: 5vh;

  padding: 0vh 2vw 0vh 2vw;

  background: #20B2AA;
  border: 1px solid rgb(214, 218, 226);
  border-radius: 5px;

  color: white;
 font-size: 1rem;
`

export default function Signup() {

  const navigate = useNavigate()
  return (
    <>
    <Navbar />
    <Wrapper>
     <LoginBanner>
      <LoginTitle>
        Already have an account? <LoginNav onClick={()=>{navigate("/login")}}>Sign in</LoginNav>
      </LoginTitle>
     </LoginBanner>

     <SignupBanner>
      <SignupTitle>Sign up now</SignupTitle>
      <SignupFieldsContainer>
        <SignupField placeholder={"First Name"}></SignupField>
        <SignupField placeholder={"Last Name"}></SignupField>
        <SignupField placeholder={"Email"}></SignupField>
        <SignupField placeholder={"Password"}></SignupField>
      </SignupFieldsContainer>
      <SignupButton>Sign Up</SignupButton>
     </SignupBanner>
    </Wrapper>
    </>
  )
}
