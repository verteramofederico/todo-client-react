import Button from 'react-bootstrap/Button'
import './Todo.css'
import React, { useState } from 'react'

function TodoList(props) {
    return (
        <>  
            {props.todoItem.completed === 0 ? 
            // to complete
            <tbody key={props.key}>
            <tr>
            <td className="tdTitle">{props.todoItem.title}</td>
            <td className="tdButton" ><Button variant="outline-success">Complete</Button>
            <Button variant="outline-danger">Delete</Button></td>
            </tr>
            </tbody> 
            :
            // completed
            <tbody key={props.key}>
            <tr>
            <td className="tdTitle">{props.todoItem.title}</td>
            <td className="tdButton" ><Button variant="outline-success">Uncompleted</Button>
            <Button variant="outline-danger">Delete</Button></td>
            </tr>
            </tbody> }
        </>
        )
}

export default TodoList;