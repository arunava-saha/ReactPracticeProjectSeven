import { useState, useEffect } from "react";
import { TodoProvider } from "./context";
import { TodoForm, TodoItem } from "./components";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((pre) => [{ id: Date.now(), ...todo }, ...pre]);
  };

  const deleteTodo = (id) => {
    setTodos((pre) => pre.filter((task) => task.id !== id));
  };
  const updateTodo = (id, todo) => {
    setTodos((pre) => pre.map((task) => (task.id === id ? todo : task)));
  };
  const toggle = (id) => {
    setTodos((pre) =>
      pre.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggle }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg bg-slate-500 h-[34rem] px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-9">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
