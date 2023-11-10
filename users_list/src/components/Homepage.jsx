import React, { useEffect, useState } from 'react'
import InputSection from './InputSection'
import DomainsList from './DomainsList'
import PagesSection from './PagesSection'
import { useDispatch, useSelector } from 'react-redux'
import { getAPiData } from '../Redux/counterSlice'


function Homepage() {
  const [searchedName, setSearchedName] = useState("")
  const [searchedGender, setSearchedGender] = useState("")
  const [searchedAvailable, setSearchedAvailable] = useState("")
  const [searchedDomain, setSearchedDomain] = useState("")

  const [pageNo, setPageNo] = useState(1)


  const [domainList, setDomainList] = useState([])

  const [selectTeamClick, setSelectTeamClick] = useState(false)
  const [teamMembers, setTeamMembers] = useState([])
  const [showTeams, setShowTeams] = useState(false)

  const users = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  useEffect(() => {
    const apiUrl = `https://server11user.onrender.com/api/users?page=${pageNo}&name=${searchedName}&domain=${searchedDomain}&gender=${searchedGender}&available=${searchedAvailable}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then((data) => {
        dispatch(getAPiData(data.users))
        console.log(data.users)
      }
      )
  }, [dispatch, pageNo, searchedName, searchedDomain, searchedGender, searchedAvailable])


  return (
    <div className='homepage'>



      <InputSection setSearchedName={setSearchedName} setSearchedAvailable={setSearchedAvailable} setSearchedGender={setSearchedGender} setSearchedDomain={setSearchedDomain} />



      {!showTeams && (


        <section>


          <button onClick={() => setSelectTeamClick(!selectTeamClick)}>  {!selectTeamClick ? "Select users for Team" : " Cancel"}  </button>
          <div>

            <button onClick={() => setPageNo(pageNo - 1)} disabled={pageNo == 1} > <i className="fa fa-angle-double-left" aria-hidden="true"></i>  Previous Page</button>
            <button onClick={() => setPageNo(pageNo + 1)} disabled={pageNo == users.length - 1} >   Next Page <i className="fa fa-angle-double-right" aria-hidden="true"></i> </button>
          </div>
        </section>


      )}

      <PagesSection users={users} selectTeamClick={selectTeamClick} teamMembers={teamMembers} setTeamMembers={setTeamMembers} showTeams={showTeams} setShowTeams={setShowTeams} />









    </div>
  )
}

export default Homepage