import React from 'react'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

export default function Root() {
  const navigate = useNavigate();

  return (
  <div>
    <input className='navButton' type='button' value='Nová organizace'  onClick={()=>{navigate("/neworganization")}}/>
    <input className='navButton' type='button' value='Přihlásit se ' onClick={()=>{navigate("/login")}}/>

  </div>
  )
}
