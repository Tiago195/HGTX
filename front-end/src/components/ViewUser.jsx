/* eslint-disable react/prop-types */
import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdEdit, MdClose, MdEmail } from 'react-icons/md';
import { BsFillTelephoneFill, BsCalendar3 } from 'react-icons/bs';
import { GrStatusWarning, GrStatusGood, GrStatusDisabled } from 'react-icons/gr';
import style from '../styles/ViewUser.module.css';
import ModelForm from './ModelForm';


export default function ViewUser({ id, close }) {
  const [isViewEdit, setIsViewEdit] = useState(false);
  const [user, setUser] = useState({
    name: '',
    phoneNumber: '(00) 00000-0000',
    email: '',
    birthDate: '00/00/0000',
    status: '',
    cpf: ''
  });

  const url = 'http://localhost:3001/users/';
  useEffect(() => {
    axios.get(`${url}/${id}`, {
      headers: { Authorization: JSON.parse(localStorage.getItem('admin')).token }
    }).then(({ data }) => {
      const entries = Object.entries(data).filter(el => el[1]);
      const newData = Object.fromEntries(entries);
      setUser((old) => ({ ...old, ...newData }));
    });
  }, []);

  const editUser = () => {
    setIsViewEdit(!isViewEdit);
  };

  const getStatus = {
    Pendente: (() => <GrStatusWarning />)(),
    Ativo: (() => <GrStatusGood />)(),
    Desativado: (() => <GrStatusDisabled />)()
  };

  const cpfFormater = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, (r, a1, a2, a3, a4) => `${a1}.${a2}.${a3}-${a4}`);
  };

  return (
    <>
      {isViewEdit && (
        <div className={style.edit}>
          <ModelForm cancel={editUser} isAdd={false} url={url + id} verb='put' />
        </div>
      )}
      <div className={style.details_container}>
        <div className={style.details_header}>
          <h1>{user.name}</h1>
          <div>
            <button className={style.icon} onClick={editUser}>{<MdEdit />}</button>
            <button className={style.icon} onClick={close}>{<MdClose />}</button>
          </div>
        </div>
        <div className={style.details_body}>
          <h3>Detalhes do usuário</h3>
          <div>
            <div>
              <span className={style.icon}>{<BsFillTelephoneFill />}</span>
              <span>{user.phoneNumber}</span>
            </div>
            <div>
              <span className={style.icon}>{<MdEmail />}</span>
              <span>{user.email}</span>
            </div>
            <div>
              <span className={style.icon}>{<BsCalendar3 />}</span>
              <span>{user.birthDate}</span>
            </div>
            <div>
              <span className={style.icon}>{getStatus[user.status]}</span>
              <span>{user.status}</span>
            </div>
            <div>
              <span className={style.icon}>CPF</span>
              <span>{cpfFormater(user.cpf)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
