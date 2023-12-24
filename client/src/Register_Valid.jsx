/* eslint-disable no-unused-vars */
import { useContext } from "react";
import Register from "./Pages/Register";
import context from "./UserContext";
import Chat from './Chat';

const Register_Valid = () => {
    const { username, id } = useContext(context.UserContext);
    if (username) {
        return (<Chat />);
    }
    return (
        <Register/>
    );
}

export default Register_Valid;