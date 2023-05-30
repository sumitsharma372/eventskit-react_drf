import React from 'react'
import Events from './Events/Events'
import Event_img from '../assets/home_event.jpg'

const Home = () => {
  console.log(process.env.REACT_APP_BASE_URL)
  return (
    <section>
      <div className='landing_image'>
        <img 
          src={Event_img} alt="event_img" 
          className='w-full md:h-[400px]'
          />
      </div>
      <Events />
    </section>
  )
}

export default Home