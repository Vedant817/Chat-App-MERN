/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react"
import axios from 'axios'

export const UserContext = createContext({});

const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState(null);
    const [id, setId] = useState(null);
    useEffect(()=>{
        axios.get('/profile').then(response => {
            console.log(response.data);
        });
    },[]);
    return (
        <>
            <UserContext.Provider value={{ username, setUsername, id, setId }}>
                {children}
            </UserContext.Provider>
        </>
    )
}

export default UserContextProvider