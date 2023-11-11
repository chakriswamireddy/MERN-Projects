import React, { useState } from 'react'
import Teams from './Teams';
import Users from './Users';



function PagesSection({ users ,selectTeamClick,setTeamMembers,teamMembers, showTeams,setShowTeams, setSelectTeamClick, serverUrl }) {


  const usersLength = users.length

  const falseArray = Array.from({  length: usersLength }, () => false);

  const [checkboxList,setCheckboxList] =  useState(falseArray)



  const [emptyTeamError,setEmptyTeamError] = useState(false)

  const TeamMemberCheck=(item,index) => {
    setEmptyTeamError(false)
    const tempList = [...checkboxList]

    tempList[index] =  !tempList[index]

    setCheckboxList(tempList)

    if (tempList[index] === true) {
      setTeamMembers([...teamMembers, users[index]]);
      console.log(teamMembers);
    } else {
      setTeamMembers(teamMembers.filter((member) => member !== item));
    }
  }

  const postData = async () => {
   

      if (teamMembers.length == 0) {
        
        setEmptyTeamError(true)
        console.error('Error: teamMembers is empty');
        
        return;
      }
      setEmptyTeamError(false)

    try {
      
      const response = await fetch(`${serverUrl}/api/team/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(teamMembers),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setTeamMembers([]);
      setCheckboxList(falseArray);
      setSelectTeamClick(!selectTeamClick);
    
    } catch (error) {
      console.error(error)
    }
  };



  return (
    <div className='page-section'>

      
      
     
      <button onClick={()=>setShowTeams(!showTeams) }> {showTeams?'Go Back to Users':"Show Teams"} </button>
      
      {showTeams ? 
        <Teams  serverUrl={serverUrl} />
        :
        <>
        <button onClick={postData}>CreateTeam</button>
        {emptyTeamError && (

        <span id='error-msg'> please select users to create team  </span>
         )}
        <Users users={users} selectTeamClick={selectTeamClick} TeamMemberCheck={TeamMemberCheck} />
        </>
      }
     

    </div>
  )
}

export default PagesSection