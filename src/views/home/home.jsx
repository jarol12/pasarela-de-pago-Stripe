import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/layout';
import { useAuth } from '../../context/authContext';
import { Button, Card, Container } from 'react-bootstrap';
import products from '../../assets/utils/products';
import ConfirmQuan from '../../components/modalConfirm/confirmQuan';
import { Rate } from 'antd';
import styles from './home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import SoldOut from '../../components/modalErrors/soldOut';
import { addPurchase, quantityProducts } from '../../redux/products/productsSlice';


const Home = () => {
    const dispatch = useDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenError, setIsModalOpenError] = useState(false);
    
    const [productData, setproductData] = useState([]);
    const {purchaseSummary} = useSelector((store => store.products))

  
    const showModal = (product) => {
        const quantityOrder = purchaseSummary.find(productSummary => productSummary.id === product.id)
        if(quantityOrder?.quantity !== product.stock){
        dispatch(addPurchase({
            data:{...product,
            quantity: 1
        },
        quantity:1
        }))
        setproductData(product)
        setIsModalOpen(true);
    }else{
        setIsModalOpenError(true)
    }
      };
      
      useEffect( () => {
        dispatch(quantityProducts())
      },[showModal])
    return (
        <Layout>
            <Container className='d-flex  flex-wrap justify-content-around mt-5'>
            {
                products.map(
                    product => (
                        <Card style={{ width: '15rem' }}
                        className= "mt-5"
                        >
                        <Card.Body>
                          <Card.Body style={{height:'30rem'}}>
                              <Card.Title>{product.title}</Card.Title>
                              <Card.Img src={product.image} alt={product.id} className={styles.zoom}/>
                              <Card.Subtitle>
                                <h2>price: {product.price}$</h2>
                                <p>stock: { product.stock }</p>
                                </Card.Subtitle>
                               <Card.Text className='d-flex flex-column'>
                                <p className='m-0'>* retiro en tienda</p>
                                <p>* pago a domicilio</p>
                               </Card.Text>
                               
                          </Card.Body>
                          <Rate disabled defaultValue={4} />
                           <Button  onClick={() => showModal(product)}  className='text-white w-100' style={{backgroundColor:"#ff6200", border:'none'}}>
                             Agregar al carrito 
                            </Button>
                        </Card.Body>
                      </Card>
                    )
                )
            }
            <ConfirmQuan 
            isModalOpen={isModalOpen} 
            setIsModalOpen ={setIsModalOpen}
            productData={productData} 
             />


             <SoldOut
               isModalOpenError = {isModalOpenError}
               setIsModalOpenError = {setIsModalOpenError}
             />
            </Container>
            
        </Layout>
    );
};

export default Home;