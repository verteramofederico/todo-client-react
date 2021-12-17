import {Nav, Navbar, Container} from "react-bootstrap"

function Header() {
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
                </Navbar.Collapse>               
                </Container>
            </Navbar> 
    </>
    )
}

export default Header;
