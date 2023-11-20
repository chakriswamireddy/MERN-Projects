import { Route, Routes } from "react-router-dom";
import "./App.css";


import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import SuccessPage from "./components/SuccessPage";
import Homepage from "./components/Homepage";
import UpdatePage from "./components/UpdatePage";
import { useState } from "react";




function App() {

  const [updateByEmail,setUpdateByEmail] = useState('')
  const [successLogin,setSuccessLogin] = useState(false)

  const [registerSuccess,setRegisterSuccess] = useState(false)

  const [updateSucces,setUpdateSuccess] = useState(false)



  return (
    <div className="App">

      
      <Routes>

      <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage successLogin={successLogin} setSuccessLogin={setSuccessLogin}  />} />

        <Route path="/register" element={<RegisterPage updateByEmail={updateByEmail} 
        registerSuccess={registerSuccess} setRegisterSuccess={setRegisterSuccess}
        updateSucces={updateSucces} setUpdateSuccess={setUpdateSuccess} />} />
         
        { ( successLogin || registerSuccess || updateSucces ) &&  

        <Route path="/success" element={ <UpdatePage  setUpdateByEmail={setUpdateByEmail}/> } />
        }
      </Routes>
      {/* <LoginPage /> */}
    </div>
  );
}

export default App;
