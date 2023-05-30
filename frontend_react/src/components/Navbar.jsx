import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PlusIcon from '../assets/plus_icon.png'
import ProfileIcon from '../assets/profile_icon.png'
import LogoutIcon from '../assets/logout_icon.png'

const Navbar = () => {
    const user = localStorage.getItem('userid')
    const handleLogout = () => { 
        localStorage.removeItem('userid')
        window.location.href = '/'
    }


  return (
    <nav className='flex justify-between px-3 py-4 border-b rounded-b'>
        <Link to='/' className='flex justify-center items-center'>
            <h1 className='font-bold text-xl text-_violet'>EventsKit</h1>
        </Link>

        <div>
            {user ? (
                <div className='flex gap-7 lg:gap-10'>
                    <Link to='/events/create' className='flex gap-1 justify-center items-center'>
                        <img src={PlusIcon} alt='profile icon' className='w-7 h-7 ring-1 lg:ring-0' />
                        <p className=' hidden lg:block text-gray-600 font-medium'>Add Event</p>
                    </Link>
                    <Link to='/profile' className='flex gap-1 justify-center items-center' >
                        <img src={ProfileIcon} alt='profile icon' className='w-7 h-7' />
                        <p className=' hidden lg:block text-gray-600 font-medium'>Profile</p>
                    </Link>

                    <button
                        className=''
                        onClick={handleLogout}
                    >
                        <img src={LogoutIcon} alt='profile icon' className='w-7 h-7' />
                    </button>
                </div>
            ):(
                <div>
                    <Link to='/login' className='px-3 py-2 rounded-md bg-_violet text-white'>Login</Link>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar