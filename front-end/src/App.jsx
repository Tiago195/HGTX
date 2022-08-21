import React from 'react';
import Login from './components/Login';
import Home from './components/Home';
import { useState } from 'react';

function App() {
  const [admin, setAdmin] = useState(localStorage.getItem('admin') || '');

  return (
    <>
      {admin ? <Home /> : <Login setAdmin={setAdmin} />}
    </>
  );
}

export default App;
