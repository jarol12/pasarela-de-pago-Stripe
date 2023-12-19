import { configureStore } from "@reduxjs/toolkit";
import products from "../products/productsSlice";
export default configureStore({
    reducer:{
        products: products,
    }
})