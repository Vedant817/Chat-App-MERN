import Register from "./Register"
import axios from "axios"

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true; //! Helps in using our cookies
  return (
    <>
      <Register />
    </>
  )
}

export default App
