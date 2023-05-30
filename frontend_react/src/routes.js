import { Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import VerifyMail from "./components/VerifyMail";
import CreateEvent from "./components/Events/CreateEvent";
import EventDetails from "./components/Events/EventDetails";
import Profile from "./components/Profile";

function RoutesHandler () {
    return (
        <Routes>
            <Route exact path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/register" Component={Register} />
            <Route path="/verify-email/:userid/:token" Component={VerifyMail} />
            <Route path="/events/create" Component={CreateEvent} />
            <Route path="/events/:eventId" Component={EventDetails} />
            <Route path="/profile" Component={Profile} />
        </Routes>
    )
}

export default RoutesHandler;