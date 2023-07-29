// TodoWrapper.js
import React, { useState, useEffect } from 'react';
import { TodoForm } from './TodoForm';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import * as api from './api';

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();

    // Set up polling interval
    const pollingInterval = setInterval(fetchTodos, 5000); // Fetch data every 5 seconds

    return () => {
      clearInterval(pollingInterval); // Clean up interval when component unmounts
    };
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await api.getAllActivityGroups();
      console.log('API response:', response.data);
      setTodos(response.data.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (todo) => {
    try {
      const response = await api.createActivityGroup({
        title: todo,
        email: 'your_email@example.com',
      });
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      setTodos(updatedTodos);
      await api.updateActivityGroup(id, {
        completed: !todos.find((todo) => todo.id === id).completed,
      });
    } catch (error) {
      console.error('Error toggling completion status:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await api.deleteActivityGroup(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editTodo = async (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async (task, id) => {
    try {
      await api.updateActivityGroup(id, { title: task });
      setTodos((todos) =>
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, title: task, isEditing: !todo.isEditing }
            : todo
        )
      );
    } catch (error) {
      console.error('Error editing task:', error);
    }
  };

  return (
    <div className='TodoWrapper'>
      <h1>Get Things Done!</h1>
      <TodoForm addTodo={addTodo} />

      {Array.isArray(todos) && todos.length > 0 ? (
        todos.map((todo) =>
          todo.isEditing ? (
            <EditTodoForm
              key={todo.id}
              editTodo={editTask}
              task={todo}
              id={todo.id}
            />
          ) : (
            <Todo
              key={todo.id}
              task={todo}
              deleteTodo={deleteTodo}
              editTodo={editTodo}
              toggleComplete={toggleComplete}
            />
          )
        )
      ) : (
        <p>No todos found.</p>
      )}
    </div>
  );
};
