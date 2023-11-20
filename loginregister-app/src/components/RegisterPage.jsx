import React, { useEffect, useState } from 'react'
import Homepage from './Homepage'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage({updateByEmail,registerSuccess,setRegisterSuccess,updateSucces,setUpdateSuccess}) {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');



  const navigate = useNavigate()

  useEffect(() => {
    if (registerSuccess || updateSucces ) {
      navigate('/success')
    }
  }, [registerSuccess, navigate,updateSucces])
  

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstname:firstname,
      lastname:lastname,
      email:email,
      password: password,
      confirmPassword:confirmPassword,
      dob:dob,
      phone:phone
    }

    try {
      const response = await axios.post('https://server1login.onrender.com/', formData, {
        headers: {
          'Content-Type': 'application/json' 
        }
      });
      
      console.log('Response:', response.data);

      if(response.data.message) {
        setRegisterSuccess(true)
      }
      else {
        setRegisterSuccess(false)
      }



    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstname:firstname,
      lastname:lastname,
      password: password,
      confirmPassword:confirmPassword,
      dob:dob,
      phone:phone
    }

    try {
      const response = await axios.put(`https://server1login.onrender.com/${updateByEmail}`, formData, {
        headers: {
          'Content-Type': 'application/json' 
        }
      });
      
      // console.log('Response:', response.data);

      if(response.data.message) {
        setUpdateSuccess(true)
      }
      else {
        setUpdateSuccess(false)
      }

    } catch (error) {
      console.error('Error:', error);
      
    }
  };

  



  return (
    <div>
      {/* <h1>{[firstname ,lastname,dob,phone,password,email]} </h1> */}

      <Homepage />

      <form action="" className='form' onSubmit={ updateByEmail? handleUpdateSubmit: handleRegisterSubmit}>


        <h2> {updateByEmail ? `Update User : ${updateByEmail  }` : ' New User'} </h2>
        {!updateByEmail &&
        <div>

          <input type="text" name=""  placeholder='Enter Email'value={email} onChange={(e) => setEmail(e.target.value)}  />
          <span class="material-symbols-outlined">mail</span>
          

        </div>
        }

        <div>
          <input type="password" name=""  placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <span class="material-symbols-outlined">lock_open</span>
        </div>
        <div>

          <input type="password" name=""  placeholder='Confirm Password'  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <span class="material-symbols-outlined">lock</span>

        </div>
        <div>

          <input type="text" name=""  placeholder='Enter Firstname' value={firstname} onChange={(e)=>setFirstname(e.target.value)} />
          <span class="material-symbols-outlined">person</span>

        </div>
        <div>

          <input type="text" name=""  placeholder='Enter Lastname' value={lastname} onChange={(e) => setLastname(e.target.value)} />
          <span class="material-symbols-outlined">person</span>

        </div>

        <div>

          {/* <input type="text" name="" id="" placeholder='Enter Data of Birth' /> */}
          <input type="date" name=""  placeholder='Enter Data of Birth' value={dob} onChange={(e) => setDob(e.target.value)} />
          <span class="material-symbols-outlined">date_range</span>

        </div>
        <div>

          <input type="number" name=""  placeholder='Enter Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
          <span class="material-symbols-outlined">phone_in_talk</span>


        </div>
        <div>
          <button type='submit' > {updateByEmail ? 'Update':"Join"}   </button>
          {/* {registerSuccess && <Link to="/success">Join</Link> } */}
        </div>

        


      </form>
    </div>
  )
}

export default RegisterPage