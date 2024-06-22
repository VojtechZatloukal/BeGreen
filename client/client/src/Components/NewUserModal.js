import React from 'react'
import { useContext, useState } from "react";


import { useForm, SubmitHandler } from "react-hook-form"
import { UserContext } from '../UserContext.js';
import { OrganizationContext } from '../OrganizationContext.js'

export default function NewUserModal({ visible, switchvisibility }) {


    const user = useContext(UserContext);
    const organization = useContext(OrganizationContext);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    async function onSubmit(data) {
        data.Organization = organization.value.GUID;


        console.log(data);
        const response = await fetch(`http://localhost:8000/user/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        
        document.getElementById("newUser").reset();


    }

    return (
        <div className='ModalWrap' style={{display:visible}}>


            <form className='ModalBodyForm' id="newUser" onSubmit={handleSubmit(onSubmit)}>

                <input type='text' placeholder='Jméno' {...register("Name", { required: true })} />
                <input type='text' placeholder='Přijmení' {...register("Surname", { required: true })} />
                <input type='email' placeholder='Email' {...register("Email", { required: true })} />

                <input type='submit' placeholder='Přihlásit' />
                <input type='button' value="Zrušit" onClick={()=>{switchvisibility()}} />
                {errors.exampleRequired && <span>This field is required</span>}
            </form>
        </div>
    )
}
