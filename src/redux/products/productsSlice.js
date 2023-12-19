import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
    name:"products", // cuando se usa el dispacth se llama con este

    initialState:{
        quantity: 0,
        purchaseSummary:[],
        productId: [],
        payment: 0
    },

    reducers:{
        addPurchase:(state,{payload}) => {
           const s = state.purchaseSummary.find((product) => product.id == payload.data.id)
           if(!s){
            state.purchaseSummary = [
                ...state.purchaseSummary,
                payload.data
            ]
        }else{
            const filterProduct = state.purchaseSummary.filter((product) => product.id !== payload.data.id)
            state.purchaseSummary =  [
                ...filterProduct,
                {
                    ...s,
                    quantity: s.quantity + payload.quantity
                }
            ]
        }
        },

        quantityProducts: (state) => {
            const quantity = state.purchaseSummary.reduce((accumulator, currentValue) => {
                return accumulator + currentValue.quantity;
              }, 0);
   
               state.quantity = quantity
        },

        getProductById: (state,action) => {
         
          state.productId =  [
            ...state.purchaseSummary,
        ]
        },

        delProductPurchase:(state,{payload}) =>{

        const filterProduct = payload.data.filter((product) => product.id !== payload.id)
        state.purchaseSummary =  filterProduct
        },

        filterPayment: (state) =>{  
         const totalPrice = state.purchaseSummary.reduce((accumulator, currentValue) => {
             return accumulator + currentValue.price*currentValue.quantity;
           }, 0);

            state.payment =  totalPrice
        }
     
    }
})

export const {filterPayment, delProductPurchase, quantityProducts,addPurchase,updatePurcharseCounter,getProductById } = productsSlice.actions


export default productsSlice.reducer