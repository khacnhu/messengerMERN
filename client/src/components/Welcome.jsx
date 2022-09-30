import React, {useState, useEffect} from 'react'
import styled from 'styled-components';
import Logo from '../assets/Logo.jpg';


export const Welcome = ({currentUser}) => { 

  const [userName, setUserName] = useState("")

  useEffect(()=>{
    setUserName( 
      JSON.parse(localStorage.getItem("chat-app-user")).userName
    )
  }, [])

  return (
    <Container>
      <img src = {Logo} alt = "logoWelcome" />
      <h1>Welcome <span> {userName} </span> </h1>
      <h3>Please select a chat a Start messaging</h3>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;


export default Welcome;

