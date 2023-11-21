import axios from 'axios'
import React, { useState } from 'react'

function NewTodo({setAddedCount,addedCount}) {
    const [name,setName] = useState('')

    const newTodoData = {
      name:name,
      checked: false,
      strikethrough: false,
      time:(new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: (new Date()).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }),
      
    }

    const handleCreateTodo =() => {
      if(name !=='') {
      axios.post('https://server2todos.onrender.com/',newTodoData )
      .then((response)=> {
        if(response.status === 200) {
          console.log("added successfully",response);
          setAddedCount(addedCount+1);
          
        }
      })
    }
    }

  return (
    <div className='input-section '>
        <h3>Create todo</h3>

        <div >
            <input type="text" name="" id="" onChange={(e)=> setName(e.target.value)} />
            <button onClick={handleCreateTodo}>Create</button>

        </div>
    </div>
  )
}

export default NewTodo