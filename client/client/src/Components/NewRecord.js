import React from 'react'
import { useContext, useState } from "react";


import { useForm, SubmitHandler } from "react-hook-form"
import { UserContext } from '../UserContext.js';
import { OrganizationContext } from '../OrganizationContext.js'

export default function NewRecord({refresh}) {

    const user = useContext(UserContext);
    const organization = useContext(OrganizationContext);


    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    async function onSubmit(data) {
        data.OrganizationGUID = organization.value.GUID;
        data.CreatorGUID = user.value.GUID;

        const response = await fetch(`http://localhost:8000/record/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        refresh();
    }

    return (
        <div >

            <form onSubmit={handleSubmit(onSubmit)} style={{display:'flex',flexDirection:'column'}}>

                <input className='TextInput' type='text' placeholder='Název činnosti(emise)' {...register("Action", { required: true })} />
                <input className='TextInput' type='number' placeholder='Hodnota' {...register("Value", { required: true })} />
                <input type='submit' className='primary' value='Odeslat'  />
                {errors.exampleRequired && <span>This field is required</span>}
            </form>

        </div>
    )
}
