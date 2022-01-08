import './App.css';

import axios from "axios";
import React from "react";

const baseURL = "http://localhost:8080/todo";
function App() {

  const [todos, setTodos] = React.useState(null);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setTodos(response.data);
    });
  }, []);

  if (!todos) return null;

  return (
    <div className="App">
      <div>
        <h1>{todos[0].description}</h1>
      </div>
    </div>
  );
}

export default App;
