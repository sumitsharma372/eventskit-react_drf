import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState()
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login/', {username, password})
      if (response.status === 200){
        console.log(response.data);
        const { access_token, userId } = response.data;
        localStorage.setItem('userid', JSON.stringify({access_token, userId}));
        // toast.success(response.data.message)
        window.location.href = '/';
      }
      console.log('status_not_200: ',response.data)
    } catch (error) {
      setError(error.response.data)
      console.log('Error failed: ', error.response.data);
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
    }
  }


  return (
    <section>
      <form className='flex flex-col w-[90%] max-w-xl mx-auto my-3'
        onSubmit={handleSubmit}
      >
        <div className='form_item'>
          <label className='form_label' htmlFor="">username</label>
          <input className='form_input' type="text" onChange={e => setUsername(e.target.value)} value={username}/>
        </div>

        <div className='form_item'>
          <label className='form_label' htmlFor="">password</label>
          <input className='form_input' type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </div>

        <button type="submit" className='purple_btn'>Login</button>

        <div>
          Don't have a account ? <Link className='text-purple-700 font-semibold' to = '/register'> Register </Link>
        </div>
      </form>

      <ToastContainer />
    </section>
  )
}

export default Login