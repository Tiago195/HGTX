import axios from 'axios';
import React, { useState } from 'react';
import style from '../styles/AddUser.module.css';

// eslint-disable-next-line react/prop-types
export default function AddUser({ cancel }) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    birthDate: '',
    phoneNumber: ''
  });

  const [verifyPassword, setVerifyPassword] = useState('');

  const handleChange = ({ target }) => {
    setState((old) => ({ ...old, [target.name]: target.value }));
  };
  // console.log(state);
  const addUser = async () => {
    if (state.password === verifyPassword) {
      await axios({
        method: 'post',
        url: 'http://localhost:3001/users/signup',
        data: state
      });
    }
    cancel();
  };

  return (
    <div className={style.modal_container}>
      <h3>Criar Usuário</h3>
      <form className={style.form}>
        <label htmlFor="name">
          <input onChange={handleChange} type="text" name="name" id="name" placeholder='Name *' />
        </label>
        <label htmlFor="email">
          <input onChange={handleChange} type="text" name="email" id="email" placeholder='E-mail *' />
        </label>
        <label htmlFor="password">
          <input onChange={handleChange} type="text" name="password" id="password" placeholder='Senha *' />
        </label>
        <label htmlFor="verifyPass">
          <input onChange={({ target }) => setVerifyPassword(target.value)} type="text" name="verifyPass" id="verifyPass" placeholder='Senha' />
        </label>
        <label htmlFor="cpf">
          <input onChange={handleChange} type="text" name="cpf" id="cpf" placeholder='CPF *' />
        </label>
        <label htmlFor="birthDate">
          <input onChange={handleChange} type="date" name="birthDate" id="birthDate" placeholder='Data de aniversario' />
        </label>
        <label htmlFor="phoneNumber">
          <input onChange={handleChange} type="text" name="phoneNumber" id="phoneNumber" placeholder='Numero de celular' />
        </label>
        <div>
          <button onClick={cancel} type='button'>Voltar</button>
          <button onClick={addUser} type='button'>Salvar</button>
        </div>
      </form>
    </div>
  );
}
