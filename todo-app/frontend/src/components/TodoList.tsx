import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TodoList.css";

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get("http://localhost:5000/api/todos");
    setTodos(response.data);
  };

  const createTodo = async () => {
    if (newTodo.trim() === "") {
      alert("Wpisz zadanie i zrób coś wreszcie!");
      return;
    }

    const response = await axios.post("http://localhost:5000/api/todos", {
      title: newTodo,
    });
    setTodos([...todos, response.data]);
    setNewTodo("");
  };

  const toggleComplete = async (id: string) => {
    const todo = todos.find((todo) => todo._id === id);
    if (todo) {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo);
      setTodos(todos.map((t) => (t._id === id ? updatedTodo : t)));
    }
  };

  const deleteTodo = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    setTodos(todos.filter((todo) => todo._id !== id));
  };

  return (
    <div className="todo-container">
      <h1>Twoja ulubiona lista To-do</h1>
      <div className="todo-input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="todo-input"
        />
        <button onClick={createTodo}>Dodaj zadanie</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id} className="todo-item">
            <span
              className="todo-title"
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
              onClick={() => toggleComplete(todo._id)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)}>Usuń zadanie</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

// Dodanie pustego eksportu, aby uniknąć błędu TS1208
export {};
