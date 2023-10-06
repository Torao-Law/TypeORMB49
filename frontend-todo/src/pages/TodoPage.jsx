import React, { useState, useContext } from 'react'
import { UserContext } from '../store/Context';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [ state ] = useContext(UserContext)

  console.log(state);

  const addTodo = () => {
    if (inputText.trim() === '') {
      return; // Menghindari menambahkan tugas kosong
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
    };

    setTodos([...todos, newTodo]);
    setInputText('');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Daftar Tugas (Todos)</h1>
      <input
        type="text"
        placeholder="Tambah tugas baru"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={addTodo}>Tambah</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
