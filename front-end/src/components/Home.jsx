import React, { useEffect, useState } from 'react';
import style from '../app.module.css';
import { FiSearch, FiRefreshCw } from 'react-icons/fi';
// import axios from 'axios';
import ModelForm from './ModelForm';
import RowUser from './RowUser';
import getAllUsers from '../utils/getAllUsers';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isOpenModelForm, setIsOpenModelForm] = useState(false);
  // const [isViewsActions, setIsViewsActions] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getAllUsers().then(res => setUsers(res));
  }, []);

  const openAddUser = () => {
    setIsOpenModelForm(!isOpenModelForm);
  };

  const resetSearch = () => {
    setSearch('');
  };

  return (
    <>
      {isOpenModelForm && <ModelForm cancel={openAddUser} setUsers={setUsers} />}
      {isOpenModelForm && <div className='greey'></div>}
      <div className={style.root_container}
      >
        <div className={style.header}>
          <h1>Consultar usuários</h1>
        </div>
        <div className={style.main}>
          <button className={style.add} onClick={openAddUser}>+ Novo</button>
          <div className={style.search_container}>
            <div className={style.search}>
              <label htmlFor="search">
                <FiSearch />
                <input
                  value={search}
                  onChange={({ target }) => setSearch(target.value)}
                  type="text"
                  name="search" id="search" placeholder='Pesquisar'
                />
              </label>
              <button onClick={resetSearch} className={style.refresh}><FiRefreshCw /></button>
            </div>
            <div className={style.user_container}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>CPF</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(el => el.name.includes(search)).map(user => (
                    <RowUser setUsers={setUsers} key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
