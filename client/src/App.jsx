import axios from "axios"
import context from "./UserContext";
import Register from "./Register";
// import Routes from "./Routes";
import "./App.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './Login';

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
        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
