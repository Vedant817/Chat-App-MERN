import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('./register', { username, password });
        setUsername('');
        setPassword('');
    }
    return (
        <>
            <div className="bg-[#1B202D] h-screen flex items-center">
                    <form className="w-64 mx-auto" onSubmit={handleSubmit}>
                        <input value={username} onChange={e => setUsername(e.target.value)} className="block w-full rounded-md p-2 mb-2 border" type="text" placeholder="username" />
                        <input value={password} onChange={e => setPassword(e.target.value)} className="block w-full rounded-md p-2 mb-2 border" type="password" placeholder="password" />
                        <button className="text-white block w-full rounded-md p-2 bg-[#373E4E] hover:bg-[#2b303c] active:bg-[#2b303c]">Register</button>
                        <span className="mx-2 text-lg font-medium">Already a user?</span>
                        <span><Link className="mx-2 text-lg text-cyan-300" to={'/login'}><button>Login</button></Link></span>
                    </form>
            </div>
        </>
    )
};

export default Register;
