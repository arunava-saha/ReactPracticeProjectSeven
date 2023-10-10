import { createContext } from "react";
import { useContext } from "react";

export const TodoContext = createContext({
  todos: {
    id: 1,
    msg: " Todo message: ",
    isDone: false,
    data: "",
  },
  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  toggle: (id) => {},
});
export const UseTodo = () => {
  return useContext(TodoContext);
};
export const TodoProvider = TodoContext.Provider;
