import logo from './logo.svg';
import './App.css';
import Homepage from './components/Homepage';
import TodoList from './components/TodoPage';
import NewTodo from './components/NewTodo';
import { useState } from 'react';

function App() {
  const [addedCount,setAddedCount] = useState(0)
  return (
    <div className="App">
      <h1>TODO APP</h1>
      <NewTodo setAddedCount={setAddedCount} addedCount={addedCount} />
      <Homepage addedCount={addedCount} />  
      {/* <TodoList /> */}
    </div>
  );
}

export default App;
