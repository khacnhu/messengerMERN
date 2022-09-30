import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Logo from "../assets/Logo.jpg"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
// import { register } from "../../../server/controllers/userContronller";
import {registerRoute} from "../utils/ApiRoutes"
 
export const Register = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      const toastOptions = {
        position: "bottom-right",
        autoClose: 3000,
        pauseOnHover: true,
        draggable: true,
        theme: "green",
      };
    
    
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, [navigate]);


    const handleValidation = ()=>{
        const { password, confirmPassword, username, email } = values;
        if (password !== confirmPassword){
            toast.error(
                "Password và confirmPasword không giống nhau",
                toastOptions
              );
            return false;
        } else if (username.length < 3){
            toast.error(
                "Username của bạn quá ngắn nên dài hơn 3 kí tự",
                toastOptions
            )
            return false;
        } else if (password.length < 6){
            toast.error(
                "Password của bạn quá ngắn nên dài hơn 6 kí tự"
            )
            return false;
        } else if (email === "") {
            toast.error(
                "Bên nên điền thông tin email vào ô còn đang trống",
                toastOptions
            )
            return false
        }
        return true 
    }



    const handleSubmit = async (e) =>{
        e.preventDefault()
        if(handleValidation()){
          const {email, username, password } = values;
          const {data} = await axios.post(registerRoute, {
            username, 
            password,
            email
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
                />
             <input
                type="text"
                placeholder='Email'
                name = "email"
                onChange={(e)=>handleChange(e)}
                />
             <input
                type="text"
                placeholder='Password'
                name = "password"
                onChange={(e)=>handleChange(e)}
                />
             <input
                type="text"
                placeholder='Confirm Password'
                name = "confirmPassword"
                onChange={(e)=>handleChange(e)}
                />
                <button type='submit' >TẠO TÀI KHOẢN</button>
                <span>
                    Bạn đã có tài khoản chưa ? <Link to = "/login">ĐĂNG NHẬP</Link>
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

export default Register;
