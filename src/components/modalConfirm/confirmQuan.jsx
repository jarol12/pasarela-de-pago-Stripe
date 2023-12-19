import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { CiCircleCheck } from "react-icons/ci";
import { Button, Container,Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addPurchase, getProductById } from '../../redux/products/productsSlice';


const ConfirmQuan = ({isModalOpen,setIsModalOpen,productData}) => {


  const dispatch = useDispatch()
  const [quantity, setQuantity] = useState(0);
  const [product, setProduct] = useState([]);
  const {purchaseSummary} = useSelector((store) => store.products)

  useEffect(()=>{
    const getProduct = purchaseSummary.find(product => product.id == productData.id)
    setQuantity(getProduct?.quantity)
    setProduct(getProduct)
  },[purchaseSummary])


    
    const quantityIncrement = () => productData.stock > quantity
    ? dispatch(addPurchase({
      data:{...product,
        quantity: 1
    },
    quantity:+1
    }))
    : null;
    
const quantityDecrement = () => quantity > 1
    ? dispatch(addPurchase({
      data:{...product,
        quantity: 1
    },
    quantity:-1
    }))
    : null;

    const handleQuantity= (quantity) =>{
      dispatch(addPurchase({
        data:{
        ...product
    },
    "quantity":quantity
    }))
    }
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };
  
    return (
        <Modal
         open={isModalOpen} onOk={handleOk} onCancel={handleCancel}
         
         footer={[ 
            <Link
            onClick={handleOk}
            className='me-2'
            >Seguir Comprando
            </Link>,
            <Link to={'orderSummary'}>
            <Button
            >
              Ir al Carro
            </Button></Link>,
          ]}
         
         >
        <h5  >{<CiCircleCheck className='text-success' size={30} />} Lo que llevas en tu Carro </h5>
        <hr className='m-0' />
        <Container>
        <div>
            <img src={productData.image} alt={productData.name} width={50}/>
             <h2>{productData.title}</h2>
             <p>stock: {productData.stock}</p>
             <p>{productData.description}</p>
        </div>
        <Button variant='ligth border'  onClick={quantityDecrement} className='ps-3 pe-3 me-2' >-</Button>
          <span>{quantity}</span>
        <Button variant='ligth border' onClick={quantityIncrement} className='ps-3 pe-3 ms-2'>+</Button>
        </Container>
      </Modal>
    );
};

export default ConfirmQuan;