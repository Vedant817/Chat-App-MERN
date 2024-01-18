import {useState} from "react";
import { useNavigate } from "react-router";
import axios from 'axios';



const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const fetchUser = async()=>{
    try {
      const response = await axios.get('http://localhost:4000/get_user',{username});
      const userData = response.data;
      displayUserDetails(userData);
    } catch (error) {
     console.error('Error fetching user:', error);
     alert('Error fetching user. Please try again.');
    }
  }
  
  
  const displayUserDetails = (userData) =>{
    const userDetailsDiv = document.getElementById('userDetails');
    userDetailsDiv.innerHTML = `<p> Username: ${userData.username} </p>`;
  }
  

  const handleSubmit = (e) => {
    try {
    e.preventDefault();
    axios.post('http://localhost:4000/login', { username, password })
      .then(result => {
        console.log(result)

        if (result.data === 'Login successful') {
          navigate("/main");
          fetchUser();
        }

        else if (result.data === "Incorrect password") {
          alert('The password is incorrect');
        }

        else
          alert('Wrong credentials');
      })

      .catch(err => console.log(err))
   }
      
    catch (error) {
      console.log("Internal Server Error")
    }
}
    

  


  return (
    <>
      <div className="bg-[#1B202D] h-screen flex items-center">
        <form className="w-64 mx-auto" onSubmit={handleSubmit}>
          <input value={username} onChange={e => setUsername(e.target.value)} className="block w-full rounded-md p-2 mb-2 border" type="text" placeholder="username" />
          <input value={password} onChange={e => setPassword(e.target.value)} className="block w-full rounded-md p-2 mb-2 border" type="password" placeholder="password" />
          <button onClick={handleSubmit} className="text-white block w-full rounded-md p-2 bg-[#373E4E] hover:bg-[#2b303c] active:bg-[#2b303c]">Login</button>
          <div id="userDetails"></div>
        </form>
      </div>
    </>
  )

};

export default Login;