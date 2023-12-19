import React, { useState } from 'react';
import {Container, Form,Row, Col, Button} from 'react-bootstrap';
import Layout from '../../../components/layout/layout';
import { useAuth } from '../../../context/authContext'
import { Link, useNavigate } from 'react-router-dom';
import validations from '../validationsAuth';


const Login = () => {
   
  const[error, setError] = useState()
  const [ errorsAuth, setErrorsAuth] = useState({});

  const[user, setState] = useState({
    email: '',
    password: ''
});

const hasErrors = Object.keys(errorsAuth).some(key => !!errorsAuth[key])

const { login,loginWithGoogle} = useAuth()
const navigate = useNavigate()
const handleChange = ({target:{name,value}}) => {
  setErrorsAuth(validations(
    {
    ...user,
    [name]: value,
  }))

    setState(
      {...user,
        [name]: value 
      }
    )
}

const handleSubmit = async (e) =>{
  e.preventDefault()
  try {
    await login(user.email, user.password)
    navigate('/')
  } catch (error) {
    setError(error.message);
  }
}

const handleGoogleSignin = async () => {
    try {
      await loginWithGoogle();
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
    return (
      <Layout>
        <Container className='d-flex w-100 justify-content-center align-items-center flex-column'  style={{ minHeight: "87vh" }}>
          {error && <p>Credenciales incorrectas</p>}
         <Form onSubmit={handleSubmit}>
           <Row className='p-2 bg-primary text-white justify-content-center rounded'>
             <Col >
               <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control name='email' type="email" placeholder="Enter email" onChange={(e) => handleChange(e)}/>
                {errorsAuth.email && <p style={{ color: "red" }}>{errorsAuth.email}</p>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control name='password' type="password" placeholder="Password"  onChange={(e) => handleChange(e)}/>
                {errorsAuth.password && <p style={{ color: "red" }}>{errorsAuth.password}</p>}
                
                </Form.Group>
                <Button variant="light" className='w-100' type='submit'  disabled={hasErrors} >
                  log in
                </Button>
                <Link to={'/forgot-password'}  className='text-white'> Forgot Password?</Link>
                <Button
                  onClick={handleGoogleSignin}
                  className="w-100 bg-light text-secondary"
                >
                  Google login
                </Button>
             </Col>
           </Row>
         </Form>

      <p className="my-4 text-sm flex justify-between px-3">
        Don't have an account?
        <Link to="/register" className="text-blue-700 hover:text-blue-900">
          Register
        </Link>
      </p>
        </Container>
      </Layout>
    );
};

export default Login;