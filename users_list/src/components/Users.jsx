import React from 'react'

function Users({ users,selectTeamClick,TeamMemberCheck }) {
    return (
        <div className='users-section'>
            {users && users.length > 0 && users.map((item, index) => (



                <div className='user-item' key={item.id}>
                    {selectTeamClick &&
                        <input type="checkbox" name="team-selection" id="" onChange={() => TeamMemberCheck(item, index)} />
                    }
                    <div>
                        <img src={item.avatar} alt="" />
                        <i className={` fa fa-${item.gender === "Male" ? 'mars' : 'venus'} `} aria-hidden="true"></i>
                    </div>

                    <div>
                        <span> {item.first_name} </span>
                        <span> {item.last_name} </span>

                    </div>
                    <div>

                        <span> {item.domain} </span>
                    </div>



                    {item.available ? (
                        <div id='green-light'>
                            <span ></span>
                            <span> Available </span>

                        </div>

                    ) : (
                        <div id='red-light'>
                            <span ></span>
                            <span> Not Available </span>

                        </div>
                    )}

                    <div>  <button id='email-btn' > {item.email} </button> </div>

                </div>


            ))}
        </div>
    )
}

export default Users