import React from 'react'
import { useContext, useState, useEffect  } from "react";
import { useNavigate } from 'react-router-dom';

import { useForm, SubmitHandler } from "react-hook-form"
import { UserContext } from './UserContext.js';
import { OrganizationContext } from './OrganizationContext.js'

export default function Login() {
  const user = useContext(UserContext);
  const organization = useContext(OrganizationContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  async function onSubmit(data) {

    const response = await fetch(`http://localhost:8000/user/login?Email=${data.Email}&Password=${data.Password}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });
    const responseJson = await response.json();
    user.changevalue(responseJson);
    
    const response2 = await fetch(`http://localhost:8000/organization/get?GUID=${responseJson.Organization}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(data),
    });
    const responseJson2 = await response2.json();
    organization.changevalue(responseJson2);

   navigate("/MyOrganization")
  }



  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <input type='text' placeholder='Email' {...register("Email", { required: true })} />
      <input type='password' placeholder='Heslo' {...register("Password", { required: true })} />
      <input type='submit' placeholder='Přihlásit' />
      {errors.exampleRequired && <span>This field is required</span>}
    </form>
  )
}
