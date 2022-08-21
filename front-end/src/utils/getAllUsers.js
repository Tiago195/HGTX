import axios from 'axios';

export default async () => {
  const { data } = await axios.get('http://localhost:3001/users', {
    headers: { Authorization: JSON.parse(localStorage.getItem('admin')).token }
  });

  return data;
};