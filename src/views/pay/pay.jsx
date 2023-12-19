import React, { useEffect } from 'react';
import Layout from '../../components/layout/layout';
import { Container, Row, Col, Card, Button} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addPurchase, delProductPurchase, filterPayment, quantityProducts} from '../../redux/products/productsSlice';
import { CiShoppingCart } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { Badge } from 'antd';
import styles from './pay.module.css'
import axios from 'axios';




const Pay = () => {
  const {purchaseSummary} = useSelector((store) => store.products)
  const {payment} = useSelector((store) => store.products)
  const {quantity} = useSelector((store) => store.products)
  const dispatch = useDispatch()

  const handleSummary = (id,stock,quantity,product,counter) => {
    
    
    stock > quantity?
      dispatch(addPurchase(
        {
          data:{...product,
          quantity: 1
      },
      quantity: counter
      }
      ))
   :null
  }

  const handleSummaryDis = (id,quantity,product,counter) => {
   
    
    quantity === 1?
    dispatch(delProductPurchase({
      data:purchaseSummary,
      id:id
    })):null
    quantity > 1?
    dispatch(addPurchase(
        {
          data:{...product,
          quantity: 1
      },
      quantity: counter
      }
      )): null
  }
  useEffect( () => {
    dispatch(filterPayment())
    dispatch(quantityProducts())
  },[handleSummary,handleSummaryDis])

  const continuePurchase  = ()=> {
    const checkout = purchaseSummary.map( (product) => {
      return {
       price_data:{
         product_data: {
           name: product.title,
           images: [product.image],
         },
         currency: "usd",
         unit_amount: parseInt(`${product.price}00`),
       },
       quantity: product.quantity,
      }
   }
   )
   axios.post(
          "http://localhost:3001/create-order",
          checkout
      )
          .then(response => {
            console.log(response)
              window.location.href = response.data.url;
          })
          .catch(error => console.log({ error: error.message }))

  console.log(checkout)
  }
  return (
    <Layout>
       <Container className='mt-5' >
       {quantity? <Row>
          <Col   sm={12} md={8}>
          <h3>Carro ({quantity} productos)</h3>
          {purchaseSummary.map((product) =>
          <Card className='mb-4'>
            
            <Card.Body className=' d-flex flex-row align-items-center flex-wrap' style={{justifyContent:'space-between'}}>
              <div className='d-flex gap-2 align-items-center'>
                <img src={product.image}  width={80}/>

                <div style={{width:"12rem"}}>
                  <strong>
                    <p className='mb-0'>{product.title}</p>
                  </strong>
                  <p className='text-muted'>stok: {product.stock}</p>
                </div>
               
              </div> 
              <div className='ms-2'>
                  ${product.price}
                </div>
            <div>
            <Button  variant='ligth border'  onClick={() => handleSummaryDis(product.id,product.quantity,product,-1)} className='me-1'>-</Button>
            {product.quantity}
            <Button variant='ligth border' onClick={() => handleSummary(product.id,product.stock,product.quantity,product,+1)} className='ms-1' >+</Button>
            </div>
            </Card.Body>
          </Card>
          )}
          </Col>
          <Col md={4}  className={styles.purchaseOrder}>
          <h3>Resumen de la orden</h3>
          <Card>
          <Card.Body>
              <p className='text-muted'>Envío a domicilio no incluido</p>
              <p className='d-flex justify-content-between'><strong>Productos ({quantity})</strong><strong> $ {payment},00</strong></p>
              <p className='d-flex justify-content-between'><strong>Total: </strong><strong>$ {payment},00</strong></p>
              <Button className='w-100 text-white'  variant='warning'  onClick={continuePurchase}>
                Continuar Compra
              </Button>
          </Card.Body>
          </Card>
          </Col>
        </Row>:
        <div className='d-flex justify-content-center align-items-center flex-column'>
          <Badge count={<MdErrorOutline style={{ color: '#f5222d' }} size={50} />}>
            <CiShoppingCart size={100}/>
          </Badge>
          <h2>Tu carrito está vacio</h2>
        </div>
        }
       </Container>
    </Layout>
  );
};

export default Pay;