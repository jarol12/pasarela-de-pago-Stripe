const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')
const indexRoutes =  require("./src/routes/payment.routes.js");
const morgan = require('morgan');




const app = express()
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(indexRoutes);

app.listen(3001,()=>{
    console.log('server listening 3001')
})