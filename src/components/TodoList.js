import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import sendRequest from '../httpClient'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/userSlice'

function TodoList() {
    const [isLoading, setIsLoading] = useState(true)
    const [todoList, setTodoList] = useState(null)

    const user = useSelector(selectUser)
    
    useEffect(() => {
        (async () => {
            const response = await sendRequest('get', '/usertodo', `${user.user_id}`)
            setTodoList(response.data)
            setIsLoading(false)
        })()
    }, [])
    if (isLoading) return <Loader visible />
    return (
        <>
        {console.log(todoList)}
        {todoList ? todoList[0].title : null}      
        </>
    );
}

export default TodoList;