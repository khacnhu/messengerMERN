
import './App.css';
import { Chat } from './pages/Chat';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { SetAvatar } from './components/SetAvatar';


function App() {
  return (
    <BrowserRouter>
      {/* <div className="App">
          <h1>TRAN KHAC NHU</h1>
          <Chat/>
          <Login/>
          <Register/>
      </div> */}
      <Routes>
          <Route path='/register' element={<Register/>}/>
          <Route path = "/login" element={<Login/>} /> 
          <Route path="/setAvatar" element={<SetAvatar />} />
          <Route path='/' element = {<Chat/>} /> 
      </Routes>    
    </BrowserRouter>
  );
}

export default App;

