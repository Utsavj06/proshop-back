import express from'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors';
dotenv.config();
import connectDB from './config/db.js';
const port = process.env.PORT || 5000
import productRoute from './routes/productRoutes.js';
import userRoute from './routes/userRoute.js'
import orderRoutes from './routes/orderRoute.js'
import paymentRoute from './routes/paymentRoute.js'
import addProductRoute from './routes/addProductRoute.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import getGoogleAuthRoute from './routes/googleAuthRoute.js'
import getGoogleCallback from './routes/googleOAuthCallbackRoute.js'

connectDB();

const app = express();

// Use cors middleware

const corsOpts = {
    origin: '*',
  
    credentials: true,
    
    methods: [
      'GET',
      'POST',
      'PUT',
    ],
  
    allowedHeaders: [
      'Content-Type',
      'Authorization'
    ],
  };

app.use(cors(corsOpts));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res)=>{
    res.send('API is running')
})

app.use('/api/products', productRoute)
app.use('/api/users', userRoute)
app.use('/api/orders', orderRoutes)
app.use('/api/addProduct', addProductRoute)
app.use('/api/process-payment', paymentRoute)
app.use('/api/getGoogleAuth', getGoogleAuthRoute)
app.use('/auth', getGoogleCallback)

app.use(notFound);
app.use(errorHandler)

app.listen(port, ()=> console.log('server running'))