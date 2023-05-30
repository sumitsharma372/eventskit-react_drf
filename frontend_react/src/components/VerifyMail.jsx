import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const VerifyMail = () => {
const { userid, token } = useParams()
console.log(userid, token)
const [sucessmsg, setSucessmsg] = useState(null)
const [errormsg, setErrormsg] = useState(null)
const [loading, setLoading] = useState(true)



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/users/verify-email/${userid}/${token}`)
            .then(res => {
                if (res.status === 200){
                    console.log(res)
                    setSucessmsg(res.data.message);
                    setLoading(false)

                    localStorage.setItem("userid", JSON.stringify({
                        access_token: res.data.access_token,
                        userId: res.data.userId
                    }))
                }
                setErrormsg(null)

                setTimeout(() => {
                    window.location.href = '/'
                }, 3000)
            })
            .catch(err => {
                console.log(err)
                setErrormsg(err.response.data)
                setSucessmsg(null);
                setLoading(false)
            })
    }, [token, userid])

    return (
        <div>
            {loading ? <h1>Loading...</h1> : (
                <div>
                    {sucessmsg ? <div>{sucessmsg}</div>: <div>{errormsg.message}</div>}
                </div>
            )}
        </div>
    )
}

export default VerifyMail