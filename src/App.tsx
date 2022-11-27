import { useEffect, useState } from "react";
import "./App.css";
import CreateToDo from "./components/CreateToDo";
import TodoList from "./components/TodoList";
import TodoService from "./API/TodoService";
import { ToDoItem } from "./models/ToDoItem";
import { UpdateContext } from "./context/UpdateContext";

function App() {
  const [fetching, setFetching] = useState(false);
  const [todo, setTodo] = useState<ToDoItem[]>([
    {
      id: 0,
      title: "",
      discription: "",
      expDate: "",
      isComplited: false,
    },
  ]);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    fetchTodos();
    setFetching(false);
  }, [fetching]);

  async function fetchTodos() {
    try {
      const response = await TodoService.getTodos();
      setTodo(response.data);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <UpdateContext.Provider
      value={{
        fetching,
        setFetching,
      }}
    >
      <div className="App">
        <h1 className="header">Todo List</h1>
        <CreateToDo />
        <TodoList todoList={todo} />
      </div>
    </UpdateContext.Provider>
  );
}

export default App;
