import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import LocationIcon from '../../assets/location.svg'
import CalenderIcon from '../../assets/calender.svg'

const EventDetails = () => {
    const { eventId } = useParams();


    const [eventData, setEventData] = useState({})
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await axios.get(`/api/events/${eventId}`)
                console.log(res.data)
                setEventData(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchEvent();
    }, [eventId])
  return (
    <section className='my-3 flex flex-col justify-center'>
        <div className='event_details_img'>
            <img 
                src={eventData?.image} alt='event_img' 
                className='w-[95%] rounded lg:w-[90%]  md:h-[500px] mx-auto'
            />
        </div>
        <div className='event_details_info mx-auto w-[95%] lg:w-[90%]'>
            <h2 className='text-purple-600 text-xl lg:text-2xl my-3 text-left font-semibold p-2'>{eventData?.event_name}</h2>

            <p className='text-left p-2 text-gray-500'>{eventData?.data}</p>

            <div className='grid grid-cols-2 justify-between items-center p-2 '>
                <div className='flex flex-col items-center justify-center border-r-2 my-2'>
                    <h4 className='flex gap-1 justify-center items-center text-_violet mt-2'>
                        <img src={LocationIcon}     alt="location" 
                        className='w-[20px] h-[20px] fill-purple-700'
                        />
                        <p>Location</p>
                    </h4>
                    <p className='my-2 text-gray-600'>{eventData?.location}</p>
                </div>
                <div flex flex-col items-center justify-center>
                    <h4 className='flex gap-1 justify-center items-center text-_violet'>
                        <img src={CalenderIcon}     alt="location" 
                        className='w-[20px] h-[20px] fill-purple-700'
                        />
                        <p>Date and Time</p>

                    </h4>
                        <p className='my-2 text-gray-500'>
                            {new Date(eventData?.time).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            year: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric',
                            second:'numeric',})}
                        </p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default EventDetails