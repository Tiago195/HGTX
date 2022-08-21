/* eslint-disable react/prop-types */
import React from 'react';
import { useState } from 'react';
import { FiMoreVertical } from 'react-icons/fi';
import ViewsActions from './ViewsActions';
import ViewUser from './ViewUser';
import style from '../styles/RowUser.module.css';

export default function RowUser({ user, setUsers }) {
  const [isView, setIsView] = useState(false);
  const [isViewUser, setIsViewUser] = useState(false);

  const cpfFormater = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (r, a1, a2, a3, a4) => `${a1}.${a2}.${a3}-${a4}`);
  };

  const openModelActions = () => {
    setIsView(!isView);
  };

  const openViewUser = () => {
    setIsViewUser(!isViewUser);
  };

  return (
    <>
      {isViewUser && <ViewUser id={user.id} close={openViewUser} />}
      {isViewUser && <div className='greey'></div>}
      <tr key={user.id}>
        <td>{user.id.toString().padStart(4, '0')}</td>
        <td onClick={openViewUser} className={style.name}>{user.name}</td>
        <td>{user.email}</td>
        <td>{cpfFormater(user.cpf)}</td>
        <td>{user.status}</td>
        <td><button onClick={openModelActions} type='button'><FiMoreVertical /></button></td>
        {<ViewsActions setUsers={setUsers} isView={isView} id={user.id} openModelActions={openModelActions} />}
      </tr>
    </>
  );
}
