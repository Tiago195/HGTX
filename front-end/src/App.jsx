import React, { useEffect, useState } from 'react';
import style from './app.module.css';
import { FiSearch, FiRefreshCw, FiMoreVertical } from 'react-icons/fi';
import axios from 'axios';
import AddUser from './components/AddUser';

const url = 'http://localhost:3001/users';

function App() {
  const [users, setUsers] = useState([]);
  const [isAddUser, setIsAddUser] = useState(false);
  useEffect(() => {
    axios.get(url, {
      headers: { Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0LCJuYW1lIjoiQWRtaW4iLCJlbWFpbCI6IkFkbWluQEFkbWluLmNvbSIsInN0YXR1cyI6IkF0aXZvIn0sImlhdCI6MTY2MDk1ODQ0NCwiZXhwIjoxNjYxNTYzMjQ0fQ.xidPDGuB4Ih630iAmtdV8HyHmbcpk3-h_2n_cqPqjIQ' }
    })
      .then(response => setUsers(response.data));
  }, []);

  const cpfFormater = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (r, a1, a2, a3, a4) => `${a1}.${a2}.${a3}-${a4}`);
  };

  const openAddUser = () => {
    setIsAddUser(!isAddUser);
  };

  return (
    <>
      {isAddUser && <AddUser cancel={openAddUser} />}
      {isAddUser && <div className={style.greey}></div>}
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
                <input type="text" name="search" id="search" placeholder='Pesquisar' />
              </label>
              <button className={style.refresh}><FiRefreshCw /></button>
            </div>
            <div className={style.user_container}>
              <table className={style.table}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>CPF</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id}>
                      <td>{user.id.toString().padStart(4, '0')}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{cpfFormater(user.cpf)}</td>
                      <td><button><FiMoreVertical /></button></td>
                    </tr>
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

export default App;
