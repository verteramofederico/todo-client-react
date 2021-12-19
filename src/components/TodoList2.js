import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import './Todo.css'
import Swal from 'sweetalert2'
import sendRequest from '../httpClient'
import Loader from './Loader'

function TodoList(props) {
    const [isLoading, setLoading] = useState(false) 

    const completeTask = async () => {
        try {
            setLoading(true)
            await sendRequest('put', '/todo', 
            {
            id: `${props.todoList.id}`
            })
        } catch (e) {
        const text = 'Error, please try again'
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text,
        })
        } finally {
        setLoading(false)
        }
    }

    const deleteTask = async () => {
        try {
            setLoading(true)
            await sendRequest('delete', '/todo', 
            {
            id: `${props.todoList.id}`
            })
        } catch (e) {
        const text = 'Error, please try again'
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text,
        })
        } finally {
        setLoading(false)
        }
    }
    
    return (
        <>
        { isLoading ? <Loader visible={isLoading} width={20} height={20} className="" /> : null }
        {props.todoList.completed === 0 ?      
            <div className="todoItem">
            <p className="tdTitle ">{props.todoList.title}</p>
           <Button onClick={completeTask} variant="outline-success">Complete</Button>
            <Button onClick={deleteTask} variant="outline-danger">Delete</Button>
            </div>
        : null }

        {props.todoList.completed === 1 ? 
            <div className='todoItem'>     
            <p className="tdTitle tbodyCompleted">{props.todoList.title}</p>
            <Button onClick={completeTask} variant="outline-secondary">Uncompleted</Button>
            <Button onClick={deleteTask} variant="danger">Delete</Button>
            </div>
        : null }
        </>
    );
}

export default TodoList;