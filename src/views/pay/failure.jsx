import React from 'react';
import Layout from '../../components/layout/layout';
import { Card, Container } from 'react-bootstrap';
import { CgDanger } from "react-icons/cg";



const Failure = () => {
    return (
        <Layout>
           <Container style={{height:"88vh"}}>
            <Card>
                <Card.Body>
                    <Card.Title lassName=' p-3 d-flex flex-column justify-content-center align-items-center'>
                        <CgDanger className='text-danger'/>
                        Hubo un error al realizar la compra
                    </Card.Title>
                </Card.Body>
            </Card>
           </Container>
        </Layout>
    );
};

export default Failure;