import axios from "axios"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from "./Pages/Register";

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true; //! Helps in using our cookies
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
