import React from "react";
import {Link,Route,Routes} from "react-router-dom"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import Home from "./components/Home.js"
import Protected from "./components/Protected.js";
import Inro from "./components/Inro.js"
export default function App(){
    return (
        <>
        <Routes>
            <Route path="/" element={<Inro/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<Protected>
                <Home/>
            </Protected>}/>
        </Routes>
        </>
    )
}