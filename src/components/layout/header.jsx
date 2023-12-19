import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink } from 'react-router-dom';
import { CiShoppingCart } from "react-icons/ci";
import { useAuth } from '../../context/authContext';
import {  Badge } from 'antd';
import { useSelector } from 'react-redux';
import { FaAmazonPay } from "react-icons/fa6";

const Header = () => {
  const{user, logout} = useAuth()
  const{quantity} = useSelector((state) => state.products)

 const  handleLogout = () => {
  logout()
  }
    return (
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" style={{height:"8vh",zIndex:"12"}}>
        <Container>
          <Navbar.Brand >
            <Link to={'/'}><FaAmazonPay size={34} color='#ff6200' /> Pasarela de pago</Link>
            </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="bg-body-tertiary">
            <Nav className="me-auto">
              <Nav.Link href="#features"></Nav.Link>
            </Nav>
            <Nav style={{display: user? 'none': null}}>
              <Nav.Link to={'/register'}>
                <Link to={'/register'}>Register</Link>
                </Nav.Link>
              <Nav.Link  eventKey={2}>
                <Link to={'/login'}>Login</Link>
              </Nav.Link>
            </Nav>
            <Nav>

            <NavDropdown title={user?.email} id="collapsible-nav-dropdown" style={{display: user?null : 'none'}}>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
             
                <NavLink to={'/orderSummary'} >
                <Badge count={quantity} overflowCount={20} className='mt-2'>
                  <CiShoppingCart size={'30'} shape="square"  />
                </Badge>
                </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default Header;