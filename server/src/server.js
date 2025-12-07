import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import cors from 'cors';
import { urlencoded } from 'express';
import cookieParser from 'cookie-parser';




dotenv.config();



const app = express()
const PORT = Number(process.env.PORT) || 4000;
const base_URL =  process.env.BASE_URL || `http://localhost:5173`;
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());



app.use(cors({
    origin: base_URL,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders : ['Content-Type', 'Authorization'],
    credentials : true
}))

app.get( '/', (req, res) => {
  res.send('Hello, World!');
  });

connectDB();


import leadRoutes from './routes/lead.route.js';
import healthcheckRoutes from './routes/healthcheck.route.js';
import authRoutes from './routes/auth.route.js';
import agentRoutes from './routes/agent.route.js';

app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/healthcheck', healthcheckRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/agents', agentRoutes);







app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});