import axios from "axios"
import context from "./UserContext";
import Routes from "./Routes";

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  axios.defaults.withCredentials = true; //! Helps in using our cookies
  return (
    <>
      <context.UserContextProvider>
        <Routes />
      </context.UserContextProvider>
    </>
  )
}

export default App
