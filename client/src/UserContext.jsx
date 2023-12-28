/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import axios from 'axios';

const UserContext = createContext({});

const UserContextProvider = ({children}) => {
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);
    useEffect(()=>{
        axios.get('/profile').then(response => {
            setId(response.data.userId);
            setUsername(response.data.username);
        });
    },[]);
    return (
        <>
            <UserContext.Provider value={{ username, setUsername, id, setId }}>
                {children}
            </UserContext.Provider>
        </>
    );
}

export default { UserContextProvider, UserContext };


//NXIWtLLFTYM3St5m