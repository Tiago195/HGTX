import axios from 'axios';
import React, { useState } from 'react';
import style from '../styles/AddUser.module.css';
import getAllUsers from '../utils/getAllUsers';

// eslint-disable-next-line react/prop-types
export default function ModelForm({ cancel, setUsers, isAdd = true, url = 'http://localhost:3001/users/signup', verb = 'post' }) {
  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    cpf: '',
    birthDate: '',
    phoneNumber: '',
    status: 'Ativo'
  });

  const [verifyPassword, setVerifyPassword] = useState('');

  const handleChange = ({ target }) => {
    setState((old) => ({ ...old, [target.name]: target.value }));
  };

  const addUser = async () => {
    const entries = Object.entries(state).filter(el => el[1]);
    const data = Object.fromEntries(entries);
    // console.log(data);
    if (state.password === verifyPassword) {
      try {
        await axios({
          method: verb,
          url,
          data,
          headers: { Authorization: JSON.parse(localStorage.getItem('admin')).token }
        });
        cancel({ target: { innerText: '' } });
        getAllUsers().then((res) => setUsers(res));
      } catch ({ response }) {
        window.alert(response.data.message);
      }
    } else {
      window.alert('As senhas não são iguais');
    }
  };

  return (
    <div className={style.modal_container}>
      <h3>{isAdd ? 'Criar Usuário' : 'Editar Usuário'}</h3>
      <form className={style.form}>
        <label htmlFor="name">
          <input onChange={handleChange} type="text" name="name" id="name" placeholder={`Nome ${isAdd ? '*' : ''}`} />
        </label>
        <label htmlFor="email">
          <input onChange={handleChange} type="text" name="email" id="email" placeholder={`E-mail ${isAdd ? '*' : ''}`} />
        </label>
        <label htmlFor="password">
          <input onChange={handleChange} type="text" name="password" id="password" placeholder={`Senha ${isAdd ? '*' : ''}`} />
        </label>
        <label htmlFor="verifyPass">
          <input onChange={({ target }) => setVerifyPassword(target.value)} type="text" name="verifyPass" id="verifyPass" placeholder='Senha' />
        </label>
        {isAdd ? (
          <label htmlFor="cpf">
            <input onChange={handleChange} type="text" name="cpf" id="cpf" placeholder='CPF *' />
          </label>
        ) : (
          <label htmlFor="Status">
            <select onChange={handleChange} name="status" id="Status" placeholder='Status'>
              <option value="Ativo">Ativo</option>
              <option value="Pendente">Pendente</option>
              <option value="Desativado">Desativado</option>
            </select>
          </label>
        )}
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
