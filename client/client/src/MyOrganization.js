import React from 'react'
import { useContext, useState, useEffect } from "react";
import { OrganizationContext } from './OrganizationContext.js'
import { UserContext } from './UserContext.js';
import NewRecord from './Components/NewRecord.js'
import NewUserModal from './Components/NewUserModal.js';
import { useNavigate } from 'react-router-dom';

import { Label } from 'react-bootstrap';
export default function MyOrganization() {
    const navigate = useNavigate();

    const organization = useContext(OrganizationContext);
    const user = useContext(UserContext);

    const [records, setRecords] = useState(null);
    const [refresh, setRefresh] = useState(0);
    const [weekValue, setWeekValue] = useState(0);
    const [monthValue, setMonthValue] = useState(0);
    const [quarterValue, setQuarterValue] = useState(0);
    const [yearValue, setYearValue] = useState(0);
    const [lastActivity, setLastActivity] = useState(new Date());
    const [noOfUsers, setNoOfUsers] = useState(0);
    const [newUserVisible, setNewUserVisibile] = useState("none")
    const [lastRecords, setLastRecords] = useState([0,1]);

    function getEarliestRecords(records, count = 4) {
        // Seřaď pole podle času
        records.sort((a, b) => new Date(a.Date) - new Date(b.Date));

        // Vrať první 4 záznamy (nebo méně, pokud je záznamů méně než 4)
        return records.slice(0, count);
    }

    function refreshPage(){
        setRefresh(refresh+1);
    }

    const doSomething = async () => {

     
        const response = await fetch(`http://localhost:8000/record/listByOrganization?GUID=${organization.value.GUID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });
        const responseJson = await response.json();

        const response2 = await fetch(`http://localhost:8000/user/list?GUID=${organization.value.GUID}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },

        });
        const responseJson2 = await response2.json();
        setNoOfUsers(responseJson2.length);
        setRecords(responseJson);




        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const oneMonthAgo = new Date();
        oneMonthAgo.setDate(oneMonthAgo.getDate() - 30);
        const oneQuartalAgo = new Date();
        oneQuartalAgo.setDate(oneQuartalAgo.getDate() - 90);
        const oneYearAgo = new Date();
        oneYearAgo.setDate(oneYearAgo.getDate() - 365);


        responseJson.forEach(element => {
            if (lastActivity == null) {
                setLastActivity(String(element.Date))
            }
            else {
                if (new Date(element.Date).getTime() < new Date(lastActivity).getTime()) {
                    setLastActivity(String(element.Date));
                }
            }
        })

        const weekRecords = responseJson.filter(record => {
            const recordDate = new Date(record.Date);
            return recordDate > oneWeekAgo;
        });
        setLastRecords(getEarliestRecords(weekRecords));
        var weeknumber= 0;
        weekRecords.forEach(element => {
           weeknumber = weeknumber + Number(element.Value);
        })
        setWeekValue(weeknumber);

        const mothRecords = responseJson.filter(record => {
            const recordDate = new Date(record.Date);
            return recordDate > oneMonthAgo;
        });
        var number= 0;
        mothRecords.forEach(element => {
            number = number + Number(element.Value)
        })
setMonthValue(number);



        const quarterRecords = responseJson.filter(record => {
            const recordDate = new Date(record.Date);
            return recordDate > oneQuartalAgo;
        });
        var quarternumber = 0;
        quarterRecords.forEach(element => {
            quarternumber = quarternumber +  Number(element.Value);
        })
setQuarterValue(quarternumber);


        const yearRecords = responseJson.filter(record => {
            const recordDate = new Date(record.Date);
            return recordDate > oneYearAgo;
        });
        var yearnumber = 0;
        yearRecords.forEach(element => {
           yearnumber = yearnumber + Number(element.Value)

        })
        setYearValue(yearnumber)


    }

    function switchVisibility() {
        if (newUserVisible == "none") {
            setNewUserVisibile("block");

        } else {
            setNewUserVisibile("none");
        }
    }

    useEffect(() => {
        doSomething();

    }, [refresh]);


    if(user.value.Role == 2){

    return (
        <div className='MyOrganizationBody'>
            <div className='Left'>
                <p>Název: {organization.value.Name}</p>
                <p>IČO: {organization.value.VATIN}</p>
                <p>Počet Zaměnstanců: {organization.value.EmployeeCount}</p>
                <p>Počet uživatelů aplikace: {noOfUsers}</p>
                <p>Poslední aktivita: {String(lastActivity)}</p>

            </div>
            <div className='Right'>
                <div style={{ display: 'flex' }}>


                    <div style={{ marginRight: '10px' }}>
                        <p>Emise za poslední týden: {weekValue}</p>
                        <p>Emise za poslední měsíc: {monthValue}</p>
                        <p>Emise za poslední čtvrtletí: {quarterValue}</p>
                        <p>Emise za poslední týden: {yearValue}</p>
                    </div>
                    <div>
                        <label onClick={()=>{navigate("/allrecords")}}>Poslední záznamy:</label>
                        {lastRecords.map((object, i) => {
                            return <p key={i}>{object.Action}{" "}{object.Value}</p>
                        })}
                    </div>
                </div>
                <label style={{ fontSize: 'large' }}>Přidání nového záznamu:</label>
                <NewRecord refresh={refreshPage} />
                <input type='button' value="Přidat uživatele" onClick={() => { switchVisibility() }} />
                <NewUserModal visible={newUserVisible} switchvisibility={switchVisibility} />
            </div>

        </div>
    )
    
}
else{
    return (
        <div className='MyOrganizationBody'>
            <div className='Left'>
                <p>Název: {organization.value.Name}</p>
                <p>IČO: {organization.value.VATIN}</p>
                <p>Počet Zaměnstanců: {organization.value.EmployeeCount}</p>
                <p>Počet uživatelů aplikace: {noOfUsers}</p>
                <p>Poslední aktivita: {String(lastActivity)}</p>

            </div>
            <div className='Right'>
                <div style={{ display: 'flex' }}>


                    <div style={{ marginRight: '10px' }}>
                        <p>Emise za poslední týden: {weekValue}</p>
                        <p>Emise za poslední měsíc: {monthValue}</p>
                        <p>Emise za poslední čtvrtletí: {quarterValue}</p>
                        <p>Emise za poslední týden: {yearValue}</p>
                    </div>
                    <div>
                        <label onClick={()=>{navigate("/allrecords")}}>Poslední záznamy:</label>
                        {lastRecords.map((object, i) => {
                            return <p key={i}>{object.Action}{" "}{object.Value}</p>
                        })}
                    </div>
                </div>
                <label style={{ fontSize: 'large' }}>Přidání nového záznamu:</label>
                <NewRecord refresh={refreshPage} />
              
            </div>

        </div>
    )

}}
