import { Button, Container, Nav, Navbar } from 'react-bootstrap/'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, logOut } from '../store/userSlice'
import { Link } from 'react-router-dom'
import React from 'react'

function Header() {
    const dispatch = useDispatch()

    const closeSesion = () => {
        dispatch(logOut())
    }

    const user = useSelector(selectUser)
    
    return (
    <>
            <Navbar bg="light" expand="lg">
                <Container>

                <Navbar.Brand href="/">TO-DO App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                    <Nav.Link href="https://www.linkedin.com/in/federico-verteramo/" target="_blank">Developed by FV</Nav.Link>   
                    </Nav>
                    {user.isAuthenticated ? <Button variant="outline-warning" onClick={closeSesion}>{`Cerrar Sesion de ${user.name}`}</Button>
                    : ( <> {' '} <Button variant="outline-warning"><Link to="/login">Login</Link></Button></> )}
                </Navbar.Collapse>               
                </Container>
            </Navbar> 
    </>
    )
}

export default Header;
