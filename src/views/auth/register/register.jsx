import React, { useState } from 'react';
import {Container, Form,Row, Col, Button} from 'react-bootstrap';
import Layout from '../../../components/layout/layout';
import { useAuth } from '../../../context/authContext'
import { useNavigate } from 'react-router-dom';
import validations from '../validationsAuth';

const Register = () => {
  const [ errorsAuth, setErrorsAuth] = useState({});

  const[error, setError] = useState()

  const[user, setState] = useState({
    email: '',
    password: ''
});


const hasErrors = Object.keys(errorsAuth).some(key => !!errorsAuth[key])

const { signup } = useAuth()
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

console.log(errorsAuth)

const handleSubmit = async (e) =>{
  errorsAuth &&
  e.preventDefault()
  try {
    await signup(user.email, user.password)
    navigate('/')
  } catch (error) {
    setError(error.message);
  }
}

    return (
      <Layout>
        <Container className='d-flex w-100 justify-content-center align-items-center'  style={{ minHeight: "87vh" }}>
          
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
                <Button variant="light" className='w-100' type='submit' disabled={hasErrors}>
                  Submit
                </Button>
             </Col>
        
           </Row>
         </Form>
        </Container>
      </Layout>
    );
};

export default Register;