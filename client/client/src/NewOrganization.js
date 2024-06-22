import React from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

export default function NewOrganization() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  async function onSubmit (data) {
    console.log(data);
    const response = await fetch(`http://localhost:8000/organization/createWithAdmin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseJson = await response.json();
  }


  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type='text' placeholder='Název organizace' {...register("Name",{ required: true })}/>
      <input type='number' placeholder='Počet zaměstnaců' {...register("EmployeeCount",{ required: true })}/>

      <input type='text' placeholder='Dič' {...register("VATIN",{ required: true })}/>

      <input type='text' placeholder='Email Administrátora' {...register("AdminEmail",{ required: true })}/>

      <input type='text' placeholder='Jméno administrátora' {...register("AdminName",{ required: true })}/>

      <input type='text' placeholder='Přijmení administrátora' {...register("AdminSurname",{ required: true })}/>

      <input type='password' placeholder='Heslo administrátora' {...register("AdminPassword",{ required: true })}/>
<input type='submit' placeholder='Vytvořit' />
{errors.exampleRequired && <span>This field is required</span>}
    </form>
  )
}
