import React, { useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'


const CreateEvent = () => {
    const [eventData, setEventData] = useState({
        event_name: "",
        data: "",
        user: 4,
        time: null,
        location: "",
        image: "",
    })
    const [error, setError] = useState(null)
    const [creating, setCreating] = useState(false)
    const user = JSON.parse(localStorage.getItem('userid'))

    if (!user) window.location.href = '/login'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData();
        
        for (var key in eventData) {
            formData.append(key, eventData[key])
        }
        try {
            setCreating(true)
            const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/events/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${user.access_token}`
                }
            })
            console.log(res)
            toast.success("Event Added")
            setCreating(false)
        } catch (error) {
            console.log(error.response.data)
            setError(error.response.data)
            setCreating(false);
        }
        
    }
  return (
    <section className='my-5 font-poppins'>
        <h1 className='form_heading'>Post your own event</h1>
        <form 
            className='w-[90%] max-w-xl mx-auto flex flex-col gap-3'  encType='multipart/form-data'
            onSubmit={handleSubmit}
        >
            <div className='form_item'>
                <label htmlFor="event_name" className='form_label'>Event Name</label>
                <input 
                    type="text"      className='form_input'
                    value={eventData.event_name}
                    onChange={e => setEventData({...eventData, event_name: e.target.value})}
                />
                <p className='validation_error'>{error?.event_name ? error.event_name[0] : ''}</p>
            </div>
            <div className='form_item'>
                <label className='form_label' htmlFor="data">Description</label>
                <textarea  
                    className='form_input'
                    value={eventData.data}
                    onChange={e => setEventData({...eventData, data: e.target.value})}
                />
                <p className='validation_error'>{error?.data ? error.data[0] : ''}</p>
            </div>
            
            <div className='form_item'>
                <label className='form_label' htmlFor="">Date and Time</label>
                <input type="datetime-local" className='form_input' value={eventData.time} onChange={(e) => setEventData({...eventData, time: e.target.value})} />
                <p className='validation_error'>{error?.time ? error.time[0] : ''}</p>
            </div>

            <div className='form_item'>
                <label className='form_label' htmlFor="">Location</label>
                <input 
                    type="text"  className='form_input' 
                    value={eventData.location}
                    onChange={e => setEventData({...eventData, location: e.target.value})}
                />
                <p  className='validation_error'>{error?.location ? error.location[0] : ''}
                </p>
            </div>

            <div className='form_item'>
                <label className='form_label' htmlFor="">Upload Image</label>
                <input 
                    className='form_input' type="file" accept='image/*' 
                    onChange={e => setEventData({...eventData, image: e.target.files[0]})}    
                />
            </div>
            <p className='validation_error'>{error?.image ? error.image[0] : ''}</p>
            <button className='purple_btn'>{creating ? 'Creating ...' : 'Create'}</button>
        </form>
    </section>
  )
}

export default CreateEvent