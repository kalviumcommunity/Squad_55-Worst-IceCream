import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';
import './Form.css';

function App() {
  const [loginMessage, setLoginMessage] = useState('');
 

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let timer;
    if (loginMessage) {
      timer = setTimeout(() => {
        setLoginMessage('');
        
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [loginMessage]);

  const setCookie = (name, value, days) => {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  };

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post('https://squad-55-worst-icecream-isharode.onrender.com/login', { username, password });
      if (response.status === 200) {
        setCookie('username', username, 365);
        setCookie('password', password, 365);
        sessionStorage.setItem('login', true);
        navigate('/');
      } else {
        setLoginMessage('Invalid Credentials');
    
      }
    } catch (err) {
      console.error(err);
      setLoginMessage('Invalid Credentials');
      
    }
  };

  const onSubmit = (data) => {
    const { username, password } = data;
    if (password.length < 6) {
      setLoginMessage('Password should be more than 5 characters');
      
      return;
    }
    handleLogin(username, password);
  };

  return (
    <div>
      <div>
        <nav>
          <div className='logo'>LOGIN Page</div>
        </nav>
      </div>
      <div className='contain'>
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          <div className='app'>
            {loginMessage && <div className='loginnnn'>{loginMessage}</div>}

            <label>Username:</label>
            <input
              type='text'
              name='username'
              placeholder='Enter username'
              {...register('username', {
                required: 'Username is Required!',
              })}
            />
            {errors.username && <p className='mon'>{errors.username.message}</p>}

            <label>Password:</label>
            <input
              type='password'
              name='password'
              placeholder='Enter your password'
              {...register('password', {
                required: 'Password is Required!',
                minLength: {
                  value: 6,
                  message: 'Password should be more than 5 characters',
                },
              })}
            />
            {errors.password && <p className='mon'>{errors.password.message}</p>}

            <div className='button'>
              <input type='submit' value='LOGIN' />
            </div>

            <p className='usser'>
              Not a user? <NavLink to='/signup' className='login-link'>Sign Up</NavLink>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
