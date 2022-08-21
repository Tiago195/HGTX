/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { MdEdit, MdDeleteForever } from 'react-icons/md';
import style from '../styles/ViewsActions.module.css';
import getAllUsers from '../utils/getAllUsers';
import ModelForm from './ModelForm';

export default function ViewsActions({ isView, id, openModelActions, setUsers }) {
  const [isViewModalEdit, setIsViewModalEdit] = useState(false);
  const url = `http://localhost:3001/users/${id}`;

  const editUser = ({ target }) => {
    // console.log(target);
    setIsViewModalEdit(!isViewModalEdit);
    if (target.innerText !== 'Voltar') {
      openModelActions();
    }
  };

  const destroyUser = async () => {
    const r = window.confirm('Aperte "OK" caso tenha certeza de que deseja deletar esse usuario.');
    if (r) {
      await axios({
        method: 'delete',
        url,
        headers: { Authorization: JSON.parse(localStorage.getItem('admin')).token }
      });
      getAllUsers().then(res => setUsers(res));
    }
    openModelActions();
  };

  return (
    <>
      {isViewModalEdit && <ModelForm setUsers={setUsers} cancel={editUser} isAdd={false} url={url} verb='put' />}
      {isViewModalEdit && <div className='greey'></div>}
      {isView &&
        <div className={style.action}>
          <div>
            <button type='button' onClick={editUser}>
              <span>{<MdEdit />}</span>
              <span>Editar</span>
            </button>
          </div>
          <div>
            <button type='button' onClick={destroyUser}>
              <span style={{ color: 'red' }}>{<MdDeleteForever />}</span>
              <span>Excluir</span>
            </button>
          </div>
        </div>}
    </>
  );
}
