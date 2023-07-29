import React, { useState } from 'react';

export const EditTodoForm = ({ editTodo, task, id }) => {
  const [value, setValue] = useState(task);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      editTodo(value.trim(), id);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='TodoForm'>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className='todo-input'
        placeholder='Update task'
      />
      <button type='submit' className='todo-btn'>
        Update Task
      </button>
    </form>
  );
};
