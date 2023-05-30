import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate();
  const user = localStorage.getItem('userid')
  if (user) navigate('/home')


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError(null);
      setLoading(true)
      const response = await axios.post('/api/users/register/', { username, email, password })
      if (response.status === 200) {
        console.log(response.data);
        toast.success(response.data.message);
      }
      setLoading(false)
      // console.log('status_not_200: ', response.data)
    } catch (error) {
      console.log(error.response.data)
      setError(error.response.data)
    }
  }

  return (
    <section>
      <form className='flex flex-col w-[90%] max-w-xl mx-auto my-3'
        onSubmit={handleSubmit}
      >
        <div className='form_item'>
          <label className='form_label' htmlFor="">Username</label>
          <input autoFocus className='form_input' type="text" onChange={e => setUsername(e.target.value)} value={username} />
          <p className='validation_error'>{error?.username ? error.username : ''}</p>
        </div>

        <div className='form_item'>
          <label className='form_label' htmlFor="">Email</label>
          <input className='form_input' type="text" onChange={e => setEmail(e.target.value)} value={email} />
          <p className='validation_error'>{error?.email ? error.email : ''}</p>
        </div>

        <div className='form_item'>
          <label className='form_label' htmlFor="">password</label>
          <input className='form_input' type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <p className='validation_error'>{error?.password ? error.password : ''}</p>
        </div>

        <button type="submit" className='purple_btn'>Register{loading ? '...' : ''}</button>


        <div>
          Already have an account? <Link className='text-purple-700 font-semibold' to='/login'> Login </Link>
        </div>
      </form>
      <ToastContainer />
    </section>
  )
}

export default Register