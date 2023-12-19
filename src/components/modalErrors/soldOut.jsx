import { Button, Modal } from 'antd';
import React from 'react';
import { CgDanger } from "react-icons/cg";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from 'react-router-dom';


const SoldOut = ({isModalOpenError,setIsModalOpenError}) => {

  const handleOk = () => {
    setIsModalOpenError(false);
  };

  const handleCancel = () => {
    setIsModalOpenError(false);
  };

  return (
    <Modal
    open={isModalOpenError} onOk={handleOk} onCancel={handleCancel}
    footer={[ 
      <Button onClick={handleOk}>
        Ok
      </Button>
     ]}
    >
      <hr/>
      <div className='d-flex flex-row gap-2'>
        <CgDanger color='#ff6200' size={40}/>
        <h4>Has alcanzado la cantidad máxima para este producto.</h4>
      </div>
      <Link to={'/orderSummary'}>
        <CiShoppingCart size={60}/>
        ir a la cesta
      </Link>
    </Modal>
  );
};

export default SoldOut;