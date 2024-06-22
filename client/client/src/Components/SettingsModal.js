import React from 'react'
import { UserContext } from '../UserContext.js';
import { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { OrganizationContext } from '../OrganizationContext.js'

export default function SettingsModal({ visible, switchvisibility }) {
    const user = useContext(UserContext);
    const organization = useContext(OrganizationContext);

    const [name,setName] = useState();
    // const [surname,setSurname] = useState();
    // const [,setName] = useState();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    async function onSubmit(data) {
        data.Organization = organization.value.GUID;
        const response = await fetch(`http://localhost:8000/user/update`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const responseJson = await response.json();
        console.log(responseJson);
        document.getElementById("newUser").reset();


    }

    return (

        <div className='ModalWrap' style={{ display: visible }}>
            <form className='ModalBodyForm' id="newUser" onSubmit={handleSubmit(onSubmit)}>
                <label>GUID readonly: </label>

                <input type='text' placeholder='GUID' readOnly value={user.value.GUID} {...register("GUID", { required: true })} />
                <label>Jméno: </label>

                <input type='text' placeholder={user.value.Name}   {...register("Name", { required: true })} />
                <label>Přijmení: </label>

                <input type='text' placeholder={user.value.Surname}{...register("Surname", { required: true })} />
                <label>Email readonly: </label>

                <input type='email' placeholder='Email' readOnly value={user.value.Email} {...register("Email", { required: true })} />
                <label>OrganizationGUID readonly: </label>

                <input type='text' placeholder='Organization' readOnly value={user.value.Organization} {...register("Organization", { required: true })} />
                <label>Heslo: </label>
                <input type='text' placeholder={user.value.Password} {...register("Password", { required: true })} />


                <input type='submit' value="Změnit" placeholder='Přihlásit' />
                <input type="button" value="Zrušit" onClick={() => {
                    switchvisibility()
                }} />
                {errors.exampleRequired && <span>This field is required</span>}
            </form>
        </div>

    )
}
