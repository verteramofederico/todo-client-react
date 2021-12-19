import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import sendRequest from '../httpClient'
import { useSelector } from 'react-redux'
import { selectUser } from '../store/userSlice'
import Container from 'react-bootstrap/Container'
import './Todo.css'
import TodoList from './TodoList'
import Table from 'react-bootstrap/Table'
import Card from 'react-bootstrap/Card'

function TodoContainer() {
    const [isLoading, setIsLoading] = useState(true)
    const [todoList, setTodoList] = useState(null)

    const user = useSelector(selectUser)
    
    useEffect(() => {
        (async () => {
            const response = await sendRequest('get', '/usertodo', `${user.user_id}`)
            setTodoList(response.data)
            setIsLoading(false)
        })()
    })
    if (isLoading) return <Loader visible />

    return (
        <>
        

    <Container>
        <Card className="text-center cardTodo">
            <Card.Body>
            <Card.Title className="cardTitle">To do:</Card.Title>
            <Table>
            <thead>
                <tr>
                </tr>
            </thead>
            {todoList ? 
            todoList.map((todo, i) => 
            <TodoList key={todo.id} todoList={todo}/>)
            : null}
            </Table>       
            </Card.Body>
        </Card>
    </Container>
        </>
    )
}

export default TodoContainer