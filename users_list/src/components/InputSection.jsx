import React from 'react'
import DomainsList from './DomainsList'



function InputSection({setSearchedName,setSearchedGender, setSearchedAvailable, setSearchedDomain}) {

    // const resetSearching =() => {

    //     setSearchedName('')
    //     setSearchedAvailable('')
    //     setSearchedGender('')
    //     setSearchedDomain('')
    // }


    return (
        <div className='input-section'>
            <div >

            <input type="text" name="" id="" placeholder='Search By Name' onChange={(e)=> setSearchedName(e.target.value)}  />


            <div className='gender-inputs'>


            <label >
                <input type="radio" name="gender" id="" value="Male" onClick={(e)=> setSearchedGender(e.target.value)} />
                Male
            </label>
            <label >
                <input type="radio" name="gender" id="" value="Female" onClick={(e)=> setSearchedGender(e.target.value)} />
                Female
            </label>
            <label >
                <input type="radio" name="gender" id="" value="Female" defaultChecked onClick={()=> setSearchedGender('')} />
                Both
            </label>
            </div>


            
            <select name="availability" id="" onClick={(e)=> setSearchedAvailable(e.target.value)}>
                <option value="">Choose Availability</option>
                <option value="true"> Available </option>
                <option value="false"> Not Available </option>
            </select>

            <DomainsList setSearchedDomain={setSearchedDomain}  />

            {/* <button onClick={resetSearching} > Reset Searching </button> */}
        </div>
        </div>

    )
}

export default InputSection