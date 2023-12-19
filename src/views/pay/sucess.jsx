import React from 'react';
import Layout from '../../components/layout/layout';
import { Card, Container } from 'react-bootstrap';
import { CiCircleCheck } from "react-icons/ci";


const Success = () => {
    return (
        <Layout>
           <Container style={{height:"88vh"}} className='d-flex justify-content-center align-items-center'>
            <Card>
                <Card.Body>
                    <Card.Title  className=' p-3 d-flex flex-column justify-content-center align-items-center'>
                    <CiCircleCheck  className='text-success' size={50}/>
                        <h1>La compra ha sido realizada correctamente.</h1>
                    </Card.Title>
                </Card.Body>
            </Card>
           </Container>
        </Layout>
    );
};

export default Success;