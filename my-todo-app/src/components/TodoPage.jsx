import React, { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import axios from 'axios'; 

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodosFromBackend();
  }, []);

  const fetchTodosFromBackend = async () => {
    try {
      const response = await axios.get('https://server2todos.onrender.com/'); // Change the URL to your backend endpoint
      setTodos(response.data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const moveTodo = (dragIndex, hoverIndex) => {
    const newTodos = [...todos];
    const draggedTodo = newTodos[dragIndex];

    newTodos.splice(dragIndex, 1);
    newTodos.splice(hoverIndex, 0, draggedTodo);

    setTodos(newTodos);

    saveTodoOrderToBackend(newTodos);
  };

  const saveTodoOrderToBackend = async (updatedTodos) => {
    try {
      await axios.put('https://server2todos.onrender.com/', { todos: updatedTodos }); // Change the URL to your backend endpoint
      console.log('Todo order saved');
    } catch (error) {
      console.error('Error saving todo order:', error);
    }
  };

  const Todo = ({ todo, index }) => {
    const [, drag] = useDrag({
      item: { type: 'todo', index },
    });

    const [, drop] = useDrop({
      accept: 'todo',
      hover(item) {
        if (item.index !== index) {
          moveTodo(item.index, index);
          item.index = index;
        }
      },
    });

    return (
      <div ref={(node) => drag(drop(node))}>
        {todo.title}
        {/* Display other todo details */}
      </div>
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div>
        {todos.map((todo, index) => (
          <Todo key={todo.id} todo={todo} index={index} />
        ))}
      </div>
    </DndProvider>
  );
};

export default TodoList;
