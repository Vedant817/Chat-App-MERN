import { useContext, useState } from "react";
import axios from 'axios'
import UserContext from "./UserContext";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = isLoginOrRegister === 'register' ? 'register' : 'login';
        const { data } = await axios.post(url, { username, password });
        setLoggedInUsername(username);
        setId(data.id);
    }
    return (
        <>
            <div className="bg-[#1B202D] h-screen flex items-center">
                <form className="w-64 mx-auto" onSubmit={handleSubmit}>
                    <input value={username} onChange={e => setUsername(e.target.value)} className="block w-full rounded-md p-2 mb-2 border" type="text" placeholder="username" />
                    <input value={password} onChange={e => setPassword(e.target.value)} className="block w-full rounded-md p-2 mb-2 border" type="password" placeholder="password" />
                    <button className="text-white block w-full rounded-md p-2 bg-[#373E4E] hover:bg-[#2b303c] active:bg-[#2b303c]">Register</button>
                    <div className="text-center mt-2">
                        {isLoginOrRegister === 'register' && (
                            <div>
                                Already a member?
                                <button className="ml-1" onClick={() => setIsLoginOrRegister('login')}>
                                    Login here
                                </button>
                            </div>
                        )}
                        {isLoginOrRegister === 'login' && (
                            <div>
                                Do not have an account?
                                <button className="ml-1" onClick={() => setIsLoginOrRegister('register')}>
                                    Register
                                </button>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
};

export default Register;
