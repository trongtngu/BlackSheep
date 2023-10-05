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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  gap: 2vh;
`

const LoginTitle = styled.div`
  
`

const LoginNav = styled.button`
  background: 0;
  border: 0;
  color: #20B2AA;
`

const LoginFieldsContainer = styled.div`
  width: 90vw;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;

  gap: 1vh;
`

const LoginField = styled.input`
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

const LoginButton = styled.button`
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

const LoginError = styled.div`
  color: red;
  font-size: 0.8rem;
  width: 100%;
`

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [emailError, setEmailError] = React.useState("")
  const [passwordError, setPasswordError] = React.useState("")

  const handleLogin = async () => {

    const loginDetails = {
      "email": email,
      "password": password,
    }

    if (email === "") {
      setEmailError("Please enter an email")
    }
    if (password === "") {
      setPasswordError("Please enter a password")
    }

    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDetails)
      })

      const data = await response.json()

      if (!response.ok) {
        console.error("Server Error:", data.message || "Unknown Error");
        return;
      }
      
      console.log("Login Success", data)

      navigate(`/user/${data.userID}/home`)

    } catch (error) {
      console.error(error)
    }
  }

  const handleEnterKey = (e) =>{
    if (e.key === 'Enter'){
      handleLogin();
    }
  }

  return (
    <>
    <Navbar />
    <Wrapper>
     <LoginBanner>
      <LoginTitle>Login</LoginTitle>
      <LoginFieldsContainer>
        <LoginError>{emailError}</LoginError>
        <LoginField placeholder={"Email"} onChange={(e)=>{setEmail(e.target.value)}} onKeyDown={handleEnterKey}/>
        <LoginError>{passwordError}</LoginError>
        <LoginField type = 'password' placeholder={"Password"} onChange={(e)=>{setPassword(e.target.value)}} onKeyDown={handleEnterKey}/>
      </LoginFieldsContainer>
      <LoginButton onClick={()=>{handleLogin()}}>Log in</LoginButton>
     </LoginBanner>
    </Wrapper>
    </>
  )
}
