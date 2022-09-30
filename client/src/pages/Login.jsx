import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/Logo.jpg"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { register } from "../../../server/controllers/userContronller";
import {loginRoute} from "../utils/ApiRoutes"
 
export const Login = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: ""
      });

      const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "green",
      };
    
    const validateForm = ()=>{
        const { username, password } = values;
        if (username.length === "" ){
            toast.error(
                "Tên đăng nhập hoặc Mật khẩu của bạn chưa được điền",
                toastOptions
            )
            return false
        } else if (password.length === ""){
            toast.error(
                "Tên đăng nhập hoặc Mật khẩu của bạn chưa được điền",
                toastOptions
            )
            return false
        } 
        return true 
    }

    
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);

    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(validateForm()){
          const { username, password } = values;
          const {data} = await axios.post(loginRoute, {
            username, 
            password
          });
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }

        if (data.status === true){
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/")
        }
 
        }
    }



    const handleChange = (event)=>{
        setValues({ ...values, [event.target.name]: event.target.value });
    }
    return (
    <>
        <FormContainer>
            <form action = "" onSubmit = {(event)=>handleSubmit(event)} >
                <div className='brand'>
                    <img src = {Logo} alt = "logo" />
                    <h1>KHAC NHU</h1>
                </div>
            <input
                type="text"
                placeholder='Username'
                name = "username"
                onChange={(e)=>handleChange(e)}
                min = "3"
                />
             <input
                type="text"
                placeholder='Password'
                name = "password"
                onChange={(e)=>handleChange(e)}
                />
                <button type='submit' >Đăng nhập</button>
                <span>
                    Bạn chưa có tài khoản đăng nhập ? <Link to = "/register">Đăng ký</Link>
                </span>
            </form>

        </FormContainer>
        <ToastContainer />

    </>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: black;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: lightblue;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }
  button {
    background-color: #4e0eff;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #4e0eff;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

export default Login;
