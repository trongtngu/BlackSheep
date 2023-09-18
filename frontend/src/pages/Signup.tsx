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
  cursor: pointer;
`

const SignupError = styled.div`
  color: red;
  font-size: 0.8rem;
  width: 100%;
`

export default function Signup() {

  const navigate = useNavigate()

  const [email, setEmail] = React.useState("")
  const [username, setUsername] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [emailError, setEmailError] = React.useState("")
  const [usernameError, setUsernameError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")

  const handleSignup = async () => {

    const signupDetails = {
      "username": username,
      "email": email,
      "password": password,
    }

    if (email === "") {
      setEmailError("Please enter an email")
      return;
    }
    if (username === "") {
      setUsernameError("Please enter your first name")
      return;
    }
    if (password === "") {
      setPasswordError("Please enter a password")
      return;
    }

    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupDetails)
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Server Error:", data.message || "Unknown Error");
        return;
      }
      
      console.log("Signup Success", data)

      
    } catch (error) {
      console.error(error)
    }
  }

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
        <SignupError>{usernameError}</SignupError>
        <SignupField placeholder={"Username"} onChange={(e)=>{setUsername(e.target.value)}}/>
        <SignupError>{emailError}</SignupError>
        <SignupField placeholder={"Email"} onChange={(e)=>{setEmail(e.target.value)}}/>
        <SignupError>{passwordError}</SignupError>
        <SignupField type = 'password' placeholder={"Password"} onChange={(e)=>{setPassword(e.target.value)}}/>
      </SignupFieldsContainer>
      <SignupButton onClick={()=>{handleSignup()}}>Sign Up</SignupButton>
     </SignupBanner>
    </Wrapper>
    </>
  )
}
