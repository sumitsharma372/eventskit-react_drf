import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import WhiteHeart from '../../assets/heart_white.svg'
import RedHeart from '../../assets/299063_heart_icon.png'


const Events = () => {
    const [events, setEvents] = useState([])
    const user = JSON.parse(localStorage.getItem('userid'))
    const [allLikes, setAllLikes] = useState([])
    const [liked, setLiked] = useState(false)

    useEffect(() => {
        const getEvents = async () => {
            try {
                const res = await axios.get('/api/events/')
                // console.log(res.data)
                setEvents(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        const getLikes = async () => {
            try {
                const res = await axios.get('/api/event-likes/')
                console.log(res.data);
                setAllLikes(res.data)
            }catch(error){
                console.log(error)
            }
        }

        getEvents()
        getLikes();
    }, [])

    const handleLike = async (event_id) => {
        if (!user) window.location.href = '/login'
        await axios.post(`/api/events/${event_id}/like/`,null, {
            headers: {
                'Authorization' : `Bearer ${user.access_token}`
            }
        })
        .then(res => {
            console.log(res)
            window.location.reload(true)
        }).catch(err => {
            console.log(err)
        })
    }

    const isLiked = (eventid) => {
        const like = allLikes?.filter(like => like.user === user?.userId && like.event.id === eventid)
        console.log(like)
        if(like.length > 0){
            return true
        }else{
            return false
        }
    }
  return (
    <div className='my-10'>
        <h2 className=' my-3 lg:my-5 font-bold uppercase text-2xl text-orange-600 lg:text-4xl'>
            Events
        </h2>
        <div className="events p-3 flex flex-1 gap-2 lg:gap-4 flex-wrap lg:flex-col justify-center">
            {events.map(event => (
                <div className="event lg:flex max-w-xs lg:max-w-6xl lg:mx-auto relative" key={event.id} >
                    <div className='event_img lg:w-[40%]'>
                        <img 
                            src={event.image} alt=""
                            className='w-full aspect-[5/3] lg:aspect-video
                            object-cover'
                        />
                    </div>
                    <div className="info p-2 py-3 pl-4 flex flex-col gap-2 bg-gradient-to-br from-white to bg-zinc-300 rounded lg:w-[60%]">
                        <Link to={`events/${event.id}`}
                        className='event_name text-left font-semibold text-xl '>
                            <p>{event.event_name}</p>
                        </Link>
                        <p  className='event_date text-left font-semibold text-orange-600'>{new Date(event.time).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second:'numeric',})}
                        </p>
                        
                        <p className='text-left'>
                            {event.location}
                        </p>

                        <p className='text-gray-700 line-clamp-3 text-sm text-left mt-2 lg:pr-3'>
                            {event.data}
                        </p>
                    </div>
                    <button className='absolute top-2 right-2 rounded-full p-2 bg-gray-100 flex justify-center items-center'
                        onClick={() => handleLike(event.id)}
                    >
                        {isLiked(event.id) ? (
                            <img 
                            src={RedHeart}   
                            alt=""
                            className=' object-contain w-[30px] h-[30px]'
                        />
                        ):(
                            <img 
                            src={WhiteHeart}   
                            alt=""
                            className=' object-contain w-[30px] h-[30px]'
                        />
                        )}
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Events