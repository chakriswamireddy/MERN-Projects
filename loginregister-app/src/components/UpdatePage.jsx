import axios from 'axios';
import '../updatepage.css'

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


function UpdatePage({setUpdateByEmail}) {

    const [apiData, setApiData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://server1login.onrender.com/`);

                console.log('Data:', response.data.users);
                setApiData(response.data.users);
            } catch (error) {

                console.error('Error fetching data:', error);
            }
        }

        fetchData();

    }, [apiData])

    const navigate = useNavigate()

    const handleUpdateClick = (value) => {
        setUpdateByEmail(value)
        navigate('/register')

    }

    const handleDeleteClick = async (deleteEmail) =>{
        try {
            const response = await axios.delete(`https://server1login.onrender.com/${deleteEmail}`);

            console.log('Data:', response.data.users);
            setApiData(response.data.users);
        } catch (error) {

            console.error('Error fetching data:', error);
        }
    }

 


    return (
        <div>

       
        <table className='update-page' >    
            <thead>
                <tr><td colSpan="3" >Registered Users</td></tr>
            </thead>
            <tbody>
            {apiData && apiData.map((item, index) => (
                <tr key={index}>

                        <td>{item.email}  </td>
                        <td>{item.firstname} {item.lastname}</td>
                        
                        <td><button onClick={()=> handleUpdateClick(item.email)}>Update</button></td>
                        <td><button onClick={()=> handleDeleteClick(item.email)}> Delete </button></td>

                    
                </tr>
            ))}
            </tbody>

        <Link to="/">Go Back </Link    >
        </table>

        </div>  
    )
}

export default UpdatePage