import React, { useEffect, useState } from 'react'
import Users from './Users'

function Teams() {

  const [teamData, setTeamData] = useState([])
  const [id, setId] = useState(1)


  const [teamCollection, setTeamCollection] = useState([])



  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://server9user.onrender.com/api/team/${id}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data)
        if (data) {
          setTeamData(data);
          setTeamCollection((prevCollection) => [...prevCollection, data]);
          setId((prevId)=> prevId+1);
          console.log(id)
          console.log(data)
        } else {
          
          console.log('wrong data')
          

          
        }
      } else {
        
        console.error('Error fetching data');
        clearInterval(timer)
      }
    };

    fetchData(); 

    
    const timer = setInterval(() => {
      fetchData();
    }, 1000); 

    
    return () => clearInterval(timer);
  }, [id]);

  return (
    <div>

      {teamCollection.length > 0 && teamCollection.map((item, index) => (
        
        <div>

          <h3> Team : {item.id} </h3>
          <Users users={item.team} />
        
          </div>
      ))}


    </div>
  )
}

export default Teams