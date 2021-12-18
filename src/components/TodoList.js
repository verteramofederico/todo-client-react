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
        <tbody key={props.key}>
            <tr>
            <td className="tdTitle ">{props.todoList.title}</td>
            <td className="tdButton" ><Button onClick={completeTask} variant="outline-success">Complete</Button>
            <Button onClick={deleteTask} variant="outline-danger">Delete</Button></td>
            </tr>
            </tbody> 
        : null }

        {props.todoList.completed === 1 ? 
        <tbody ClassName='tbodyCompleted' key={props.key}>
            <tr ClassName='tbodyCompleted'>
            <td className="tdTitle tbodyCompleted">{props.todoList.title}</td>
            <td className="tdButton" ><Button onClick={completeTask} variant="outline-secondary">Uncompleted</Button>
            <Button onClick={deleteTask} variant="danger">Delete</Button></td>
            </tr>
            </tbody> 
        
        : null }
        </>
    );
}

export default TodoList;