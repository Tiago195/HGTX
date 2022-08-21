/* eslint-disable react/prop-types */
import axios from 'axios';
import React, { useState } from 'react';
import style from '../styles/Login.module.css';

export default function Login({ setAdmin }) {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const url = 'http://localhost:3001/users/signin';

  const handleChange = ({ target }) => {
    setState((old) => ({ ...old, [target.name]: target.value }));
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(url, state);
      localStorage.setItem('admin', JSON.stringify(data));
      setAdmin(data);
    } catch (error) {
      window.alert('Email or Password Invalid');
    }

  };

  return (
    <div className={style.login_container}>
      <form className={style.form_login} onSubmit={login}>
        <h1>Login</h1>
        <label htmlFor="email">
          <input onChange={handleChange} type="text" name="email" id="email" placeholder='E-mail' />
        </label>
        <label htmlFor="password">
          <input onChange={handleChange} type="password" name="password" id="password" placeholder='Senha' />
        </label>
        <button type='submit'>Entrar</button>
      </form>
    </div>
  );
}
