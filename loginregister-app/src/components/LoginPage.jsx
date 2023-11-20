import React from 'react'
import Homepage from './Homepage'
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function LoginPage({successLogin,setSuccessLogin}) {

  const serverUrl = 'https://server1login.onrender.com/'

  const [checkEmail,setCheckEmail] = useState('')
  const [checkPassword,setcheckPassword] = useState('')



  const [loginClicked,setLoginClicked] = useState(false)



  const handleLoginClick = async (e) => {
    e.preventDefault();
    setLoginClicked(true)
  
    try {
      if (checkEmail !== '' && checkPassword !== '') {


        //i spent 1 hour to find that axios method might not encode these characters correctly,
        //  leading to a malformed URL and causing errors in the API request

        const encodedEmail = encodeURIComponent(checkEmail);
        const encodedPassword = encodeURIComponent(checkPassword);

        const response = await axios.get(`https://server1login.onrender.com/?email=${encodedEmail}&password=${encodedPassword}`);
        // console.log(checkEmail);  
        // console.log(checkPassword);
        // if(checkPassword === 'Fv5x#9nY') {
        //   console.log('password correct')
        // }
        // if(checkEmail === 'johndoe@example.com') {
        //   console.log("email correcet")
        // }

        console.log('Data:', response.data);
        if (response.data.users.length > 0) {
          setSuccessLogin(true);
        } else {
          setSuccessLogin(false);
        }
      } else {
        console.log('Email or password is empty');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setTimeout(() => {
      setLoginClicked(false);
    }, 4000); 
    
  };

  
  const navigate = useNavigate()

  useEffect(() => {
    if (successLogin ) {
      
      // setCheckEmail('')
      // setcheckPassword('')
      // setSuccessLogin(false)
      navigate('/success')
    }
  }, [successLogin, navigate])
  

  


  return (
    <div>


      <Homepage />
    <form action="" className='form' onSubmit={handleLoginClick} >
        <h2>User Login</h2>
        <div>
            
            <input type="text" name="" id="" required placeholder='Enter Username' value={checkEmail} onChange={(e)=> setCheckEmail(e.target.value)} />
            <span class="material-symbols-outlined">person</span>
            
        </div>
        <div>
            <input type="password" name="" id="" placeholder='Enter Password' value={checkPassword} onChange={(e)=> setcheckPassword(e.target.value)} />
            <span class="material-symbols-outlined">lock_open</span>
        </div>
        <div id='login-btn'>
            <button type='submit'  > Login  </button>
            
            {loginClicked && !successLogin && "Enter correct Credentials" && (
                <marquee behavior="slide" direction="" > Enter correct Credentials </marquee>
            )}
        </div>
    
        
    </form>
    </div>
  )
}

export default LoginPage