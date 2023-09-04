import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import style from '../styles/login.module.css';

const LoginForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/devicestatus/login/', formData);
      if (response.data.status === 'SUCCESS') {

        localStorage.setItem('isLoggedIn', 'true');
        console.log(localStorage);
        navigate('devicelist');
      }
      else {
        navigate('/')
        alert('Invalid Credentials')
      }
    } catch (error) {
      console.error('Error sending data', error);
    }
  };


  return (

    <div className={style.main}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <div className={style.formData}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder='Email'
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={style.formData}>
          <input
            type="text"
            id="username"
            name="username"
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
          />
        </div >
        <div className={style.formData}>
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>

  )
}

export default LoginForm
