/* eslint-disable no-unused-vars */
import { useContext } from "react";
import Register from "./Register";
import context from "./UserContext";
import Chat from './Chat';

const Routes = () => {
    const { username, id } = useContext(context.UserContext);
    if (username) {
        return (<Chat />);
    }
    return (
        <Register/>
    );
}

export default Routes