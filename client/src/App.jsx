import axios from "axios"
import context from "./UserContext";
import Register from "./Register";
// import Routes from "./Routes";
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login';
import MainContainer from './Components/MainContainer';

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true; //! Helps in using our cookies
  return (
    <>
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<MainContainer/>}/>
          
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
