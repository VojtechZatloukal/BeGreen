import { Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from "react";

import SettingsModal from "./Components/SettingsModal";
import React from 'react'
import { UserContext } from './UserContext.js';

export default function Layout() {
  const navigate = useNavigate();
  const user = useContext(UserContext);

function switchVisibility(){
  if(settingsVisibility=="none"){
    setSettingsVisiblity("block")
  }else{
    setSettingsVisiblity("none")
  }
}

  const [settingsVisibility, setSettingsVisiblity] = useState("none")
  if(user.value == "unsigned"){
    return (
      <>
      <div className="Navbar">
  <input type="Button" value="Go Back" onClick={()=>{navigate(-1)}}/>
  <h1 className="Name">BeGreen</h1>
  <input type="Button" value="Přihlásit" onClick={()=>{navigate("/login")}}/>
  
      </div>
      <Outlet/>
      </>
    )
  }
  return (
    <>
    <div className="Navbar">
<input type="Button" value="Go Back" onClick={()=>{navigate(-1)}}/>
<h1 className="Name" onClick={()=>{navigate("/")}}>BeGreen</h1>
<input type="Button" value="Settings" onClick={()=>{ 
  switchVisibility()
}}/>
<SettingsModal visible={settingsVisibility} switchvisibility={switchVisibility}/>
    </div>
    <Outlet/>
    </>
  )
}
