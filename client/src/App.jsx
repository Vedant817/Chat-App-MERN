import axios from "axios"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from "./Pages/Register";
import Login from './Pages/Login';
import MainContainer from './Components/MainContainer';

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true; //! Helps in using our cookies
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/main" element={<MainContainer/>}/>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
