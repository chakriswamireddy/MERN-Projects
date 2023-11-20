import React, { useEffect, useState } from 'react'
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Homepage() {
    const [switchClick,setSwitchClick] = useState(false)


    const serverUrl = 'https://server1login.onrender.com/'

    const [checkEmail,setCheckEmail] = useState('')
    const [checkPassword,setcheckPassword] = useState('')

    const [successLogin,setSuccessLogin] = useState(false)


    function handleCheckboxChange(e) {
        setSwitchClick(e.target.checked)
    }


    // const [apiData]

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://server1login.onrender.com?email=${checkEmail}&password=${checkPassword}`);
                
                console.log('Data:', response.data);
              } catch (error) {
                
                console.error('Error fetching data:', error);
              }
        }

        fetchData();
        
    },[checkEmail,checkPassword])


    return (
        <div id='homepage'>
            <div id='switch-section'>

                <label htmlFor="signin" id='signin-label'  > <Link to="/login" >Sign in</Link> </label>
                <label htmlFor="signup" id='signup-label'> <Link to="/register">Sign up</Link> </label>

            </div>
            <div>
                {/* { switchClick? (
                    <LoginPage />
                ):(
                    <RegisterPage />
                )}
                 */}
            </div>


        </div>
    )
}

export default Homepage