import {addPurchase,incrementPurchase,getProductById,delProductPurchase,filterPayment,quantityProducts} from "./productsSlice";

export const addPurchase =(data)=>{
    incrementPurchase(data)
}


export const quantityProducts = ()=>{
    quantityProducts()
}


export const getProductByIdAction = (id)=>{
    getProductById(id)
}


export const delProductPurchase = (data) =>{
    delProductPurchase(data)
}

export const filterPayment = () =>{
    filterPayment()
}