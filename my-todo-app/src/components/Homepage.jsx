import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';



const Homepage = ({ addedCount }) => {
  const [items, setItems] = useState([]);
  const API_URL = 'https://server2todos.onrender.com/';

  const [deleteCount, setDeleteCount] = useState(0)

  useEffect(() => {
    // Fetch initial positions of Todo items from the backend when the component mounts
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setItems(data.todos))
      .catch(error => console.error('Error fetching data:', error));
  }, [deleteCount, addedCount]);

  const handleDragEnd = result => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems);
    console.log(items)


    // Send updated positions to the backend to save
    axios.put(API_URL, reorderedItems, {
      headers: {
        'Content-Type': 'application/json', // Adjust content type if needed
      }
    })
      .then(response => {
        console.log('Positions updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating positions:', error);
      });
  };

  const deleteTodo = () => {

  }

  const updateAPI = (items) => {
    axios.put(API_URL, items, {
      headers: {
        'Content-Type': 'application/json', // Adjust content type if needed
      }
    })
      .then(response => {
        console.log('Positions updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating positions:', error);
      });
  }


  const handleTodoCheckChange = (checkedItemName) => {
    const updatedItems = items.map(item => {
      if (item.name === checkedItemName) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });

    setItems(updatedItems);
    console.log(items)
    //more time spent here sent items instead of updatedItems
    updateAPI(updatedItems);
  }

  const handleStrikeChange = (itemName) => {
    const updatedItems = items.map(item => {
      if (item.name === itemName) {
        return { ...item, strikethrough: !item.strikethrough };
      }
      return item;
    });

    setItems(updatedItems);
    console.log(items)
    updateAPI(updatedItems);
  }

  const handleDeleteItem = async (ItemName) => {
    if (window.confirm("are you sure to delete?")) {
      await axios.delete(`${API_URL}${ItemName}`)
        .then((response) => {
          if (response.status == 200) {
            console.log('deleted Successfully')
            setDeleteCount(deleteCount + 1)

            // const updatedItems = items.filter((item)=> item.name !== ItemName)
            // setItems(updatedItems); 
          }
          else {
            console.log(response)
          }
        })
    }

  }

  return (
    <DragDropContext onDragEnd={handleDragEnd} >
      <Droppable droppableId="todosss">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.name} draggableId={item.name} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >

                    <div className='todo-item'>


                      <div>
                        <div className="checkbox-wrapper">
                          <input type="checkbox" className="sc-gJwTLC ikxBAC" checked={item.checked} onChange={() => handleTodoCheckChange(item.name)}/>
                        </div>
                        
                        <span className="material-symbols-outlined" onClick={() => handleStrikeChange(item.name)}>format_strikethrough</span>
                        <span className="material-symbols-outlined" onClick={() => handleDeleteItem(item.name)}>delete</span>

                      </div>
                      <div className='todo-body'>
                        <div>

                       
                        <span className={`${item.strikethrough ? 'striked-text' : ''}`}>{item.name}  </span>
                        <span> {item.checked ? "Finished" : ''} </span>
                        </div>
                        
                        <div className='todo-time'>
                          <span> {item.date} </span>
                          <span> {item.time} </span>
                        </div>
                      </div>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Homepage;
