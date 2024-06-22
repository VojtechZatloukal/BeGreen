import React from 'react'
import { UserContext } from './UserContext.js';
import { useContext, useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { OrganizationContext } from './OrganizationContext.js'

export default function AllRecords() {
    const user = useContext(UserContext);
    const organization = useContext(OrganizationContext);
    const [records,setRecords] = useState([0,1])

    const doSomething = async () => {
    const response = await fetch(`http://localhost:8000/record/listByOrganization?GUID=${organization.value.GUID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },

    });
    const responseJson = await response.json();
setRecords(responseJson);
}
    useEffect(() => {
        doSomething();

    }, []);


  return (
    <div>

<table style={{width:'100%'}}>
<tr>
    <th style={{width:'30%'}}>Jméno</th>
    <th style={{width:'30%'}}>Hodnota</th>
    <th style={{width:'40%'}}>Datum</th>
  </tr>



        {records.map(function(object,i){
            return <tr>
              <td>{object.Action}</td>
    <td>{object.Value}</td>
    <td>{object.Date}</td>
                 </tr>
        })}
        </table>

    </div>
  )
}
