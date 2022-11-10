import { Outlet ,Link, Route, Routes } from "react-router-dom";
import logo from '../img/logo.png'
import '../Css/App.css'
import ToDoModelPage from "../routes/toDoModelPage";
import AddModel from "../routes/addModel";
import Home from "../routes/home";
import SelectModelPage from "../routes/selectModelPage";
import Photo from "../routes/Photo";
import React from "react";


export default function App() {
  return (
    <>
      <header className="Header">
        <div className="Logo">
        <Link to="/"><img src = {logo} /></Link>
        </div>
        <div className="Menu">
          <nav className="dws-menu">
            <ul>
              <div className="Select">
                <li>
                  <Link to = "/selectModelPage">Select Model</Link>
                </li>
              </div>
              <li>
                <div className="Add">
                  <Link to="/addModel" className="AddLink">Add Model</Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <Routes>
        <Route path="/Photo" element={<Photo />} />
        <Route path="/" element = {<Home/>}/>
        <Route path="/toDoModel" element = {<ToDoModelPage sm={1}/>}/>
        <Route path="/addModel" element = {<AddModel/>}/>
        <Route path="/selectModelPage/*" element = {<SelectModelPage/>}/>
      </Routes>
    </>

  );
}