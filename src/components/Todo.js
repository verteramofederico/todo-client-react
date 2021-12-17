import React, { useState } from 'react'
// import Swal from 'sweetalert2'
import sendRequest from '../httpClient'
import { useSelector, useDispatch } from 'react-redux'
import Loader from './Loader'
import { Button } from 'react-bootstrap'
import { selectUser } from '../store/userSlice'

function Todo() {
    const [isLoading, setIsLoading] = useState(false)
    const user = useSelector(selectUser)

    async function todoPost() {
            setIsLoading(true)
            const response = await sendRequest('post', '/todo', 
                {
                user_id: `${user.id}`,
                title: "swing"
                })
            setIsLoading(false)
            console.log(user)
        }
  if (isLoading) return <Loader visible />
    return (
        <>
        <h2>Tasks here</h2>
        <Button variant="outline-warning" onClick={todoPost}>{`Post`}</Button>
        </>
        )
}

export default Todo;