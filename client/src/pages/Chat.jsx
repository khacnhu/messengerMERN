import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react'
import {useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ChatContainer from '../components/ChatContainer';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import { allUsersRoute } from '../utils/ApiRoutes';
import {io} from "socket.io-client";
import {host} from "../utils/ApiRoutes"


export const Chat = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(()=>{
    if(!localStorage.getItem("chat-app-user")){
      navigate("/login")
    } else{
      setCurrentUser(
         JSON.parse(
          localStorage.getItem("chat-app-user")
        )
      )
    }
  }, [navigate])


  useEffect(()=>{
    if (currentUser){
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id)

    }
  }, [currentUser]);



  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( ()=>{
    const a = async () => {
        if (currentUser){
          if (currentUser.isAvatarImageSet){
            const res = await axios.get(`${allUsersRoute}/${currentUser._id}`);
            setContacts(res.data);
          } else {
            navigate("/setAvatar")
          }
        }
    }
    a()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])


  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className='container'>
        <Contacts contacts = {contacts} changeChat={handleChatChange} currentUser = {currentUser} />
        {currentChat === null ? (
          <Welcome currentUser = {currentUser} />

        ) : (
          <ChatContainer currentChat={currentChat} currentUser = {currentUser} socket = {socket} />
        )
          
        }

      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: lightblue;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
