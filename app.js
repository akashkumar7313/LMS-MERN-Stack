import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import {config} from 'dotenv';
import userRoutes from './routes/userRoutes.js'
import errorMiddleware from './middlewares/errorMiddleware.js'


config();

const app = express();

app.use(express.json());

app.use(cors({
    origin: [process.env.FRONTEND_URL]
}));

app.use(cookieParser());

//morgan is HTTP request logger middleware for node.js
app.use(morgan('dev'));

app.use('/ping', function(req, res){
    res.send('/pong');
});

app.use('/user', userRoutes)

app.all('*',(req, res) => {
    res.status(404).send('OPPS!!! 404 Page Not Found');
})

app.use(errorMiddleware);

export default app;