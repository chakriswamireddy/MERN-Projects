import React, { useEffect } from 'react'

function DomainsList({setSearchedDomain}) {



    // useEffect(()=>{
    //     const apiUrl = "https://server9user.onrender.com/api/users";
    //     const domainList = new Set();
        
    //     fetch(apiUrl)
    //     .then(response => response.json())
    //     .then(data => {
            
    //         data.users.forEach(obj => {
    //             domainList.add(obj.domain)
    //             console.log(obj.domain)
    //         })
    //     })
        
        
    // },[])
  return (
    <div>
      <select name="" id="" onChange={(e)=> setSearchedDomain(e.target.value) }>
      <option value="">Choose Domain</option>
        
        <option value="Sales">Sales</option>
        <option value="Finance">Finance</option>
        <option value="Marketing">Marketing</option>
        <option value="IT">IT</option>
        <option value="UI Designing">UI Designing</option>
        <option value="Management">Management</option>
        <option value="Business Development">Business Development</option>


      </select>
    </div>
  )
}

export default DomainsList






