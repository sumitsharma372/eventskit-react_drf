import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import ProfileIcon from '../assets/profile_icon.png'

const Profile = () => {
    const user = JSON.parse(localStorage.getItem('userid'))
    if (!user) window.location.href = '/login'
    const [userData, setuserData] = useState({})
    const [likedEvents, setlikedEvents] = useState([])


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/users/profile/`, {
                    headers: {
                        'Authorization': `Bearer ${user?.access_token}`
                    }
                })
                console.log(res.data)
                setuserData(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        const getLikedEvents = async () => {
            try {
                const response = await axios('/api/event-likes')
                console.log(response.data)
                const user_liked_events = response.data?.filter(event => event.user === user?.userId)

                setlikedEvents(user_liked_events)
            } catch (error) {
                console.log(error)
            }
        }

        fetchUser();
        getLikedEvents();
    }, [user?.userId, user?.access_token])
  return (
    <section className='my-4 mx-auto'>
        <h1 className='font-semibold text-2xl border-b w-fit mx-auto'>Profile</h1>

        <div className='flex flex-col lg:flex-row my-3'>
            <div className='lg:w-[40%] flex flex-col gap-2 lg:border-r-2'>
                <h3 className='mt-3 text-lg font-medium'>Your Info</h3>
                <div className="profile_pic p-3 flex justify-center items-center">
                    <img src={userData?.image ? `${process.env.REACT_APP_BASE_URL}${userData?.image}` : ProfileIcon} alt="profile_pic" 
                    className='rounded-full w-[130px] h-[130px]'
                    />
                </div>
                <p>{userData?.user.username}</p>
                <p className='text-gray-500 text-sm'>{userData?.user?.email}</p>
            </div>

            <div className='lg:w-[60%] flex flex-col justify-center items-center'>
                <h3 className='my-3 text-lg font-medium text-center'>Liked Events</h3>

                <div className='flex flex-col gap-2 w-[90%] max-w-md'>
                    {likedEvents?.map(item => (
                        <div className='flex flex-col justify-center items-center gap-2 border p-2 rounded-md h-fit' key={item.id}>
                            <img src={`${process.env.REACT_APP_BASE_URL}${item.event.image}`} alt="event_img" 
                            className='max-w-md rounded-md aspect-video'
                            />
                            <Link to = {`/events/${item.event.id}`} className='text-xl font-medium text-left text-_violet'>{item.event.event_name}
                            </Link>
                            <p  className='event_date text-left font-semibold text-orange-600'>{new Date(item.event.time).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second:'numeric',})}
                        </p>

                        <div>
                            <p className=' h-[200px] line-clamp-3 p-3 text-gray-500 text-sm text-left'>
                            {item?.event.data}
                            </p>
                        </div>
                        </div>
                    ))}
                </div>

            </div>

        </div>
    </section>
  )
}

export default Profile